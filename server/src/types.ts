export type CivicCategory =
  | 'pothole'
  | 'garbage'
  | 'drainage'
  | 'water_supply'
  | 'streetlight'
  | 'electricity'
  | 'encroachment'
  | 'other';

export type AuthorityJurisdiction =
  | 'PMC'
  | 'PCMC'
  | 'PMRDA'
  | 'MSEDCL'
  | 'OTHER_MAHARASHTRA';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type OutputLanguage = 'en' | 'hi' | 'mr';

export interface LocationDetail {
  /** Concatenated display string used in Gemini prompt */
  state: string;
  district: string;
  city: string;
  area: string;
  streetLandmark: string;
  jurisdiction: string;
  pincode: string;
  /** Informational suggestion only */
  suggestedAuthority: string;
  /** GPS lat/lng if provided */
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsAccuracyMeters?: number;
}

export interface InlineImageData {
  /** Base-64 encoded image bytes (no data-URI prefix) */
  base64: string;
  /** MIME type, e.g. 'image/jpeg' */
  mimeType: string;
  /** Original filename for audit logging only */
  filename: string;
  /** File size in bytes (for logging/diagnostics only) */
  sizeBytes: number;
}

export interface AnalyzeComplaintRequest {
  description: string;
  category: CivicCategory;
  outputLanguage?: OutputLanguage;
  // Phase 4 location
  state?: string;
  district?: string;
  city?: string;
  area?: string;
  streetLandmark?: string;
  pincode?: string;
  suggestedAuthority?: string;
  // GPS (numeric, already parsed by Zod)
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsAccuracyMeters?: number;
  /** Phase 3: optional images for Gemini Vision analysis */
  images?: InlineImageData[];
}

export interface StructuredCivicAnalysis {
  incidentSummary: string;
  category: CivicCategory;
  userProvidedFacts: string[];
  visualObservations: string[];
  priority: PriorityLevel;
  priorityReason: string;
  location: LocationDetail;
  missingInformation: string[];
  safetyConsiderations: string[];
  complaintDraft: string;
  recommendedNextStep: string;
  limitations: string[];
  outputLanguage: OutputLanguage;
  analyzedAt: string;
  modelUsed: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
