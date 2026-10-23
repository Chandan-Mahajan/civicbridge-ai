import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { analyzeComplaintSchema } from '../schemas/complaint.schema.js';
import {
  analyzeCivicComplaintWithGemini,
  GeminiServiceError,
} from '../services/gemini.service.js';
import type {
  ApiResponse,
  InlineImageData,
  StructuredCivicAnalysis,
} from '../types.js';

// ─── Multer configuration ─────────────────────────────────────────────────────
// Store files in memory (no disk persistence, no database)
const MAX_PHOTOS = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_BYTES,
    files: MAX_PHOTOS,
  },
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Unsupported file type: "${file.mimetype}". Only JPEG, PNG, and WebP images are accepted.`
        )
      );
    }
  },
});

// ─── Router ───────────────────────────────────────────────────────────────────
export const analyzeRouter = Router();

async function handleAnalyzeComplaint(
  req: Request,
  res: Response<ApiResponse<StructuredCivicAnalysis>>
) {
  // Validate text fields with Zod (works on req.body populated by multer)
  const validationResult = analyzeComplaintSchema.safeParse(req.body);

  if (!validationResult.success) {
    const errorIssues = validationResult.error.format();
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid complaint submission data.',
        details: errorIssues,
      },
    });
  }

  // ── Convert uploaded image buffers to InlineImageData ──────────────────────
  const uploadedFiles = req.files as Express.Multer.File[] | undefined;
  const images: InlineImageData[] = [];

  if (uploadedFiles && uploadedFiles.length > 0) {
    for (const file of uploadedFiles) {
      // Secondary MIME validation (belt-and-suspenders after multer fileFilter)
      if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: `File "${file.originalname}" has an unsupported type: ${file.mimetype}. Accepted: JPEG, PNG, WebP.`,
          },
        });
      }

      // Verify the buffer is non-empty
      if (!file.buffer || file.buffer.length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: `File "${file.originalname}" appears to be empty or corrupt.`,
          },
        });
      }

      images.push({
        base64: file.buffer.toString('base64'),
        mimeType: file.mimetype,
        filename: file.originalname,
        sizeBytes: file.size,
      });
    }
  }

  try {
    const analysis = await analyzeCivicComplaintWithGemini({
      description: validationResult.data.description,
      category: validationResult.data.category,
      outputLanguage: validationResult.data.outputLanguage,
      state: validationResult.data.state,
      district: validationResult.data.district,
      city: validationResult.data.city,
      area: validationResult.data.area,
      streetLandmark: validationResult.data.streetLandmark,
      pincode: validationResult.data.pincode,
      suggestedAuthority: validationResult.data.suggestedAuthority,
      gpsLatitude: validationResult.data.gpsLatitude,
      gpsLongitude: validationResult.data.gpsLongitude,
      gpsAccuracyMeters: validationResult.data.gpsAccuracyMeters,
      images: images.length > 0 ? images : undefined,
    });

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (err: unknown) {
    if (err instanceof GeminiServiceError) {
      return res.status(err.statusCode).json({
        success: false,
        error: {
          code: err.code,
          message: err.message,
          details: err.originalError ? String(err.originalError) : undefined,
        },
      });
    }

    const safeMessage = err instanceof Error ? err.message : 'Unknown server error';
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: `An unexpected error occurred while analyzing the complaint: ${safeMessage}`,
      },
    });
  }
}

// ─── Multer error handler wrapper ─────────────────────────────────────────────
function withMulter(
  handler: (req: Request, res: Response<ApiResponse<StructuredCivicAnalysis>>) => Promise<Response>
) {
  return (req: Request, res: Response<ApiResponse<StructuredCivicAnalysis>>) => {
    // Accept optional multi-file upload under field name 'photos'
    upload.array('photos', MAX_PHOTOS)(req, res, (err: unknown) => {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors (file too large, too many files, etc.)
        let userMessage = `File upload error: ${err.message}`;
        if (err.code === 'LIMIT_FILE_SIZE') {
          userMessage = `One or more photos exceeds the ${MAX_FILE_BYTES / (1024 * 1024)} MB size limit. Please compress the image and try again.`;
        } else if (err.code === 'LIMIT_FILE_COUNT') {
          userMessage = `Too many photos. A maximum of ${MAX_PHOTOS} photos may be uploaded at a time.`;
        }
        return res.status(400).json({
          success: false,
          error: { code: 'FILE_UPLOAD_ERROR', message: userMessage },
        });
      } else if (err instanceof Error) {
        return res.status(400).json({
          success: false,
          error: { code: 'FILE_UPLOAD_ERROR', message: err.message },
        });
      }
      // No error — proceed to handler
      return handler(req, res);
    });
  };
}

// Support both POST /api/analyze and alias POST /api/complaints/generate
analyzeRouter.post('/analyze', withMulter(handleAnalyzeComplaint));
analyzeRouter.post('/complaints/generate', withMulter(handleAnalyzeComplaint));
