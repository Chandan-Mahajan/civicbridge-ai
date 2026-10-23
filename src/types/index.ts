/**
 * CivicBridge AI - Core Domain Types
 * Phase 4: Full Maharashtra Location Capture
 */

export type CivicCategory =
  | 'pothole'
  | 'garbage'
  | 'drainage'
  | 'water_supply'
  | 'streetlight'
  | 'electricity'
  | 'encroachment'
  | 'other';

export interface CivicCategoryOption {
  id: CivicCategory;
  label: string;
  marathiLabel: string;
  description: string;
  iconName: string;
  slaGuideline: string;
}

export type AuthorityJurisdiction =
  | 'PMC'
  | 'PCMC'
  | 'PMRDA'
  | 'MSEDCL'
  | 'OTHER_MAHARASHTRA';

export interface JurisdictionOption {
  id: AuthorityJurisdiction;
  fullName: string;
  marathiName: string;
  primaryArea: string;
  defaultPortal: string;
}

export type OutputLanguage = 'en' | 'hi' | 'mr';

export interface LanguageOption {
  id: OutputLanguage;
  label: string;
  nativeLabel: string;
}

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface GpsLocation {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  timestamp?: number;
}

/**
 * Phase 4: structured location entry for any Maharashtra location.
 * All fields are optional — the user may know only district + city.
 */
export interface LocationDetails {
  /** Always 'Maharashtra' for this application */
  state: string;
  /** One of the 36 districts */
  district: string;
  /** City / municipality name */
  city: string;
  /** Locality, ward, neighbourhood, or area */
  area: string;
  /** Specific street, chowk, or landmark */
  streetLandmark: string;
  /** 6-digit PIN code (optional) */
  pincode: string;
  /** Suggested civic authority based on city (informational, NOT authoritative) */
  suggestedAuthority: string;
}

export interface PhotoEntry {
  file: File;
  previewUrl: string;
  id: string; // unique id for stable key/removal
}

/** Phase 4 GPS capture state machine */
export type GpsStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'denied'
  | 'unavailable'
  | 'timeout'
  | 'unsupported';

/** Phase 6 Web Speech API voice input states */
export type SpeechRecognitionStatus =
  | 'idle'
  | 'requesting_permission'
  | 'listening'
  | 'partial'
  | 'completed'
  | 'denied'
  | 'unsupported'
  | 'error';

export type SpokenLanguage = 'en-IN' | 'hi-IN' | 'mr-IN';

export interface ReportingFormState {
  category: CivicCategory;
  description: string;
  outputLanguage: OutputLanguage;
  /** Phase 4: structured full Maharashtra location */
  location: LocationDetails;
  /** Phase 3 + 4: GPS device coordinates (separate from entered location) */
  gpsCoordinates: GpsLocation | null;
  gpsStatus: GpsStatus;
  /** Phase 3: multi-photo evidence */
  photoEntries: PhotoEntry[];
}

export interface FormValidationErrors {
  description?: string;
  jurisdiction?: string;
  wardOrArea?: string;
  general?: string;
}

export interface StructuredCivicAnalysis {
  incidentSummary: string;
  category: CivicCategory;
  userProvidedFacts: string[];
  visualObservations: string[];
  priority: PriorityLevel;
  priorityReason: string;
  location: {
    wardOrArea: string;
    streetLandmark: string;
    jurisdiction: string;
    pincode: string;
  };
  missingInformation: string[];
  safetyConsiderations: string[];
  complaintDraft: string;
  recommendedNextStep: string;
  limitations: string[];
  outputLanguage: OutputLanguage;
  analyzedAt: string;
  modelUsed: string;
}

export type AnalysisStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AnalysisState {
  status: AnalysisStatus;
  data: StructuredCivicAnalysis | null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}

export interface AiBridgePayload {
  category: CivicCategory;
  description: string;
  outputLanguage: OutputLanguage;
  /** Phase 4: structured location */
  location: LocationDetails;
  /** Phase 3+4: GPS coordinates (separate from entered location) */
  gpsCoordinates: GpsLocation | null;
  /** Phase 3: photo files */
  photoEntries: PhotoEntry[];
  submittedAt: string;
  clientVersion: string;
}

export interface AuthorityDetail {
  id: AuthorityJurisdiction;
  name: string;
  acronym: string;
  marathiName: string;
  tagline: string;
  coverage: string;
  officialHelpline: string;
  whatsappGrievance?: string;
  officialPortalUrl: string;
  portalName: string;
  rtsCharterUrl?: string;
  headquarters: string;
  commonDepartments: string[];
}

export interface SlaStandard {
  categoryName: string;
  targetHours: number;
  legalAct: string;
  escalationTier1: string;
  escalationTier2: string;
}
