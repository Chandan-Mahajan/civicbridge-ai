import { z } from 'zod';

// ─── Location sub-schema ──────────────────────────────────────────────────────
export const locationSchema = z.object({
  state: z.string().trim().default('Maharashtra'),
  district: z.string().trim().max(100).optional().default(''),
  city: z.string().trim().max(150).optional().default(''),
  area: z.string().trim().max(200).optional().default(''),
  streetLandmark: z.string().trim().max(300).optional().default(''),
  pincode: z
    .string()
    .trim()
    .regex(/^(\d{6})?$/, 'Pincode must be exactly 6 digits if provided')
    .optional()
    .default(''),
  /** Informational suggestion only — not authoritative */
  suggestedAuthority: z.string().trim().max(200).optional().default(''),
});

// ─── GPS sub-schema ───────────────────────────────────────────────────────────
export const gpsSchema = z
  .object({
    latitude: z
      .number()
      .min(-90, 'Latitude must be between -90 and 90')
      .max(90, 'Latitude must be between -90 and 90'),
    longitude: z
      .number()
      .min(-180, 'Longitude must be between -180 and 180')
      .max(180, 'Longitude must be between -180 and 180'),
    accuracyMeters: z.number().nonnegative().optional(),
  })
  .optional();

// ─── Main request schema (accepts multipart form-data fields as strings) ──────
export const analyzeComplaintSchema = z.object({
  description: z
    .string()
    .trim()
    .min(10, 'Problem description must be at least 10 characters long')
    .max(5000, 'Problem description cannot exceed 5000 characters'),
  category: z
    .enum([
      'pothole',
      'garbage',
      'drainage',
      'water_supply',
      'streetlight',
      'electricity',
      'encroachment',
      'other',
    ])
    .default('pothole'),
  outputLanguage: z.enum(['en', 'hi', 'mr']).optional().default('en'),

  // Phase 4 location fields (from FormData, all strings)
  state: z.string().trim().optional().default('Maharashtra'),
  district: z.string().trim().max(100).optional().default(''),
  city: z.string().trim().max(150).optional().default(''),
  area: z.string().trim().max(200).optional().default(''),
  streetLandmark: z.string().trim().max(300).optional().default(''),
  pincode: z
    .string()
    .trim()
    .regex(/^(\d{6})?$/, 'Pincode must be exactly 6 digits if provided')
    .optional()
    .default(''),
  suggestedAuthority: z.string().trim().max(200).optional().default(''),

  // Phase 3+4: GPS coordinates (arrive as strings from FormData)
  gpsLatitude: z
    .string()
    .optional()
    .transform((v) => (v ? parseFloat(v) : undefined))
    .pipe(z.number().min(-90).max(90).optional()),
  gpsLongitude: z
    .string()
    .optional()
    .transform((v) => (v ? parseFloat(v) : undefined))
    .pipe(z.number().min(-180).max(180).optional()),
  gpsAccuracyMeters: z
    .string()
    .optional()
    .transform((v) => (v ? parseFloat(v) : undefined))
    .pipe(z.number().nonnegative().optional()),
});

// ─── Gemini output validation schema ─────────────────────────────────────────
export const structuredAnalysisSchema = z.object({
  incidentSummary: z.string().min(5),
  category: z.enum([
    'pothole',
    'garbage',
    'drainage',
    'water_supply',
    'streetlight',
    'electricity',
    'encroachment',
    'other',
  ]),
  userProvidedFacts: z.array(z.string()).min(1),
  visualObservations: z.array(z.string()).default([]),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  priorityReason: z.string().min(5),
  location: z.object({
    wardOrArea: z.string(),
    streetLandmark: z.string().default(''),
    jurisdiction: z.string(),
    pincode: z.string().default(''),
  }),
  missingInformation: z.array(z.string()).default([]),
  safetyConsiderations: z.array(z.string()).default([]),
  complaintDraft: z.string().min(20),
  recommendedNextStep: z.string().min(10),
  limitations: z.array(z.string()).min(1),
});

export type ValidatedAnalyzeComplaintInput = z.infer<typeof analyzeComplaintSchema>;
