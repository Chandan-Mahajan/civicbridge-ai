import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { analyzeRouter } from './routes/analyze.routes.js';

// Load environment variables from server/.env, then root .env as fallback
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001;

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible local client dev
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL || '',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Dev convenience
    },
    credentials: true,
  })
);

// JSON body parser (retained for any non-multipart API calls; multer handles multipart/form-data)
app.use(express.json({ limit: '100kb' }));
// URL-encoded form support (fallback)
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

// Rate limiting: 60 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many analysis requests from this IP. Please try again in a few minutes.',
    },
  },
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  const isApiKeyConfigured = Boolean(
    process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0
  );

  res.status(200).json({
    status: 'ok',
    service: 'CivicBridge AI Backend',
    version: '1.0.0',
    gemini: {
      isApiKeyConfigured,
      model: process.env.GEMINI_MODEL?.trim() || 'gemini-3.8-flash',
      supportedLanguages: ['en', 'hi', 'mr'],
    },
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Primary analysis routes
app.use('/api', analyzeRouter);

// Central error handler (Never log secrets or full complaints)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Safe sanitised error log
  console.error('[CivicBridge Server Error]', {
    name: err.name,
    message: err.message,
    timestamp: new Date().toISOString(),
  });

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'A secure server error occurred. Please try again.',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[CivicBridge AI] Backend listening on http://localhost:${PORT}`);
  console.log(`[CivicBridge AI] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[CivicBridge AI] Gemini API key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
});

export default app;
