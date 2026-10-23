import { GoogleGenAI, Type, type Schema, type Part } from '@google/genai';
import type {
  AnalyzeComplaintRequest,
  StructuredCivicAnalysis,
} from '../types.js';
import { structuredAnalysisSchema } from '../schemas/complaint.schema.js';

export class GeminiServiceError extends Error {
  constructor(
    public readonly code:
      | 'MISSING_API_KEY'
      | 'GEMINI_API_ERROR'
      | 'INVALID_MODEL_OUTPUT'
      | 'RATE_LIMITED',
    message: string,
    public readonly statusCode: number = 500,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

// ─── Gemini response schema ───────────────────────────────────────────────────
const civicAnalysisResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    incidentSummary: {
      type: Type.STRING,
      description:
        'A concise, objective 1-2 sentence neutral summary of the civic hazard described by the citizen.',
    },
    category: {
      type: Type.STRING,
      enum: [
        'pothole',
        'garbage',
        'drainage',
        'water_supply',
        'streetlight',
        'electricity',
        'encroachment',
        'other',
      ],
      description:
        'The categorized civic issue type based strictly on the user input.',
    },
    userProvidedFacts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        'List of concrete factual claims explicitly stated by the user (e.g. specific road names, duration, observed physical signs). Never assume or embellish.',
    },
    visualObservations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        'Physical visible conditions observed in images or described in text (e.g. stagnant water, garbage pile size, cracked asphalt). If photos were provided, describe ONLY what is clearly visible. Clearly prefix each image observation with "Photo evidence:" to distinguish from text-based observations.',
    },
    priority: {
      type: Type.STRING,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      description:
        'Public safety and health hazard severity triage rating.',
    },
    priorityReason: {
      type: Type.STRING,
      description:
        'Clear objective justification for the priority rating based on risk to pedestrians, vehicular traffic, public health, or electrical shock.',
    },
    location: {
      type: Type.OBJECT,
      properties: {
        wardOrArea: { type: Type.STRING },
        streetLandmark: { type: Type.STRING },
        jurisdiction: { type: Type.STRING },
        pincode: { type: Type.STRING },
      },
      required: ['wardOrArea', 'streetLandmark', 'jurisdiction', 'pincode'],
    },
    missingInformation: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        'List of critical details that the citizen did not specify, which the municipal ward engineer will need (e.g., exact house number, nearest landmark, GPS coordinates).',
    },
    safetyConsiderations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        'Immediate hazard warnings for citizens, two-wheeler riders, children, or residents nearby.',
    },
    complaintDraft: {
      type: Type.STRING,
      description:
        'A formal, respectful, and legally sound municipal grievance letter addressed to the competent municipal authority referencing the citizen charter and requesting prompt inspection.',
    },
    recommendedNextStep: {
      type: Type.STRING,
      description:
        'Actionable instruction for the citizen on which official municipal channel or helpline to use, and to record their tracking token number.',
    },
    limitations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        'Explicit legal and technical limitations (e.g., this draft is generated from citizen-submitted text/images, not an official government dispatch or verification).',
    },
  },
  required: [
    'incidentSummary',
    'category',
    'userProvidedFacts',
    'visualObservations',
    'priority',
    'priorityReason',
    'location',
    'missingInformation',
    'safetyConsiderations',
    'complaintDraft',
    'recommendedNextStep',
    'limitations',
  ],
};

// ─── Main function ────────────────────────────────────────────────────────────
export async function analyzeCivicComplaintWithGemini(
  input: AnalyzeComplaintRequest
): Promise<StructuredCivicAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new GeminiServiceError(
      'MISSING_API_KEY',
      'GEMINI_API_KEY is not configured on the server. Please add your GEMINI_API_KEY in the backend .env file.',
      503
    );
  }

  const modelName = process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash';
  const language = input.outputLanguage || 'en';
  const hasImages = Boolean(input.images && input.images.length > 0);
  const imageCount = input.images?.length ?? 0;

  // ── Language directive ─────────────────────────────────────────────────────
  const languagePromptDirective =
    language === 'mr'
      ? 'CRITICAL LANGUAGE DIRECTIVE: The target output language is MARATHI (मराठी). You MUST write ALL narrative text fields (incidentSummary, complaintDraft, priorityReason, missingInformation, safetyConsiderations, recommendedNextStep, userProvidedFacts, visualObservations, limitations) in formal, authentic Marathi (मराठी). The citizen description may be in English, Hindi, or Marathi — regardless of input language, generate the complete structured complaint in Marathi while preserving factual details, names, addresses, numbers, dates, quantities, and official portal URLs without distortion. Category and priority enum keys must remain in English.'
      : language === 'hi'
        ? 'CRITICAL LANGUAGE DIRECTIVE: The target output language is HINDI (हिंदी). You MUST write ALL narrative text fields (incidentSummary, complaintDraft, priorityReason, missingInformation, safetyConsiderations, recommendedNextStep, userProvidedFacts, visualObservations, limitations) in formal, authentic Hindi (हिंदी). The citizen description may be in English, Hindi, or Marathi — regardless of input language, generate the complete structured complaint in Hindi while preserving factual details, names, addresses, numbers, dates, quantities, and official portal URLs without distortion. Category and priority enum keys must remain in English.'
        : 'LANGUAGE DIRECTIVE: The target output language is ENGLISH. You MUST write all narrative text fields in formal, respectful English. If the input was provided in Hindi or Marathi, translate it accurately into English while strictly preserving factual details, names, addresses, dates, numbers, and official portal URLs verbatim.';

  // ── Vision directive (only if images are present) ─────────────────────────
  const visionDirective = hasImages
    ? `
VISION ANALYSIS RULES (${imageCount} photo${imageCount !== 1 ? 's' : ''} attached):
V1. Describe ONLY what is clearly and unambiguously visible in the photos. Do NOT invent locations, timestamps, ownership, measurements, accident history, GPS tags, or depth estimates unless directly visible with scale reference.
V2. Prefix each image-derived observation with "Photo evidence:" in the visualObservations array.
V3. If an image is blurry, too dark, or inconclusive, state: "Photo evidence: Image quality insufficient to determine [specific detail]."
V4. Do NOT claim the photographs constitute official evidence or government-verified proof.
V5. Do NOT read or rely on any text visible in the images (e.g., signboards, license plates) — describe only physical conditions.`
    : `
VISION ANALYSIS NOTE: No photos were uploaded. The visualObservations field should contain only conditions described in the citizen's text.`;

  // ── Location context ───────────────────────────────────────────────────────
  const hasGps = input.gpsLatitude != null && input.gpsLongitude != null;
  const locationLines: string[] = [];
  if (input.district) locationLines.push(`District: ${input.district}`);
  if (input.city) locationLines.push(`City / Municipality: ${input.city}`);
  if (input.area) locationLines.push(`Area / Locality: ${input.area}`);
  if (input.streetLandmark) locationLines.push(`Street / Landmark: ${input.streetLandmark}`);
  if (input.pincode) locationLines.push(`PIN Code: ${input.pincode}`);
  if (input.suggestedAuthority)
    locationLines.push(`Likely Authority (user's hint only, not verified): ${input.suggestedAuthority}`);
  if (hasGps) {
    const acc = input.gpsAccuracyMeters != null ? ` (±${Math.round(input.gpsAccuracyMeters)} m)` : '';
    locationLines.push(
      `GPS: ${input.gpsLatitude}° N, ${input.gpsLongitude}° E${acc} — device-provided, NOT a verified address`
    );
  }
  const locationSection =
    locationLines.length > 0
      ? locationLines.join('\n')
      : 'No specific location provided — use only what the citizen stated in the description.';

  // ── Location integrity rules ───────────────────────────────────────────────
  const locationDirective = `
LOCATION INTEGRITY RULES:
L1. Use ONLY the location fields provided. Do NOT invent a street address from GPS coordinates.
L2. GPS coordinates confirm approximate position only — do NOT use them to deduce road names, ward numbers, or jurisdiction.
L3. Do NOT assume Pune if no city is given. State "city not specified" in missingInformation if the city is absent.
L4. The response location object should reflect only what the citizen supplied. Leave fields empty if not provided.
L5. If GPS is present but no address was entered, add to missingInformation: "Full address not confirmed — only GPS coordinates were provided."`;

  const systemInstruction = `You are CivicBridge AI, an expert civic technology analysis engine for municipal governance in Maharashtra, India.

Your task is to analyze a citizen's civic issue description${hasImages ? ' and photo evidence' : ''} and produce a structured, factual analysis and formal complaint letter draft.

FIRM INTEGRITY RULES:
1. FACTUAL ACCURACY: Strictly preserve the user's factual claims. Distinguish facts from assumptions.
2. ZERO HALLUCINATION: NEVER invent dates, locations, accidents, measurements, officials, phone numbers, or token numbers. If a detail is missing, list it in "missingInformation".
3. STATE UNCERTAINTY: If severity or cause is ambiguous, state the uncertainty explicitly.
4. TONE & RESPECT: The complaintDraft must be respectful, formal, and objective — suitable for submission under the Maharashtra Right to Public Services Act (RTS 2015).
5. NON-GOVERNMENTAL STATUS: This is an AI-assisted draft. The "limitations" field must state the citizen must review before filing.
6. ${languagePromptDirective}
${locationDirective}
${visionDirective}`;

  // ── Build text prompt ──────────────────────────────────────────────────────
  const textPrompt = `Analyze the following civic problem report:
- Problem Category: ${input.category}
- State: Maharashtra, India
- Location Details (citizen-provided):
${locationSection}
- Photos attached: ${hasImages ? `${imageCount} image${imageCount !== 1 ? 's' : ''}` : 'None'}
- Citizen's Problem Description:
"""
${input.description}
"""

Please produce a fully structured JSON response adhering precisely to the specified schema. Populate the location object using ONLY the citizen-provided fields above.`;

  // ── Build multi-modal contents array ──────────────────────────────────────
  // Always start with the text prompt part
  const contentParts: Part[] = [{ text: textPrompt }];

  // Append each image as an inline data part
  if (hasImages && input.images) {
    for (const img of input.images) {
      contentParts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64,
        },
      });
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: contentParts }],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: civicAnalysisResponseSchema,
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new GeminiServiceError(
        'INVALID_MODEL_OUTPUT',
        'Gemini model returned an empty response.',
        502
      );
    }

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseErr) {
      throw new GeminiServiceError(
        'INVALID_MODEL_OUTPUT',
        'Failed to parse Gemini model output as valid JSON.',
        502,
        parseErr
      );
    }

    const validatedResult = structuredAnalysisSchema.safeParse(parsedData);
    if (!validatedResult.success) {
      throw new GeminiServiceError(
        'INVALID_MODEL_OUTPUT',
        'Gemini model response failed schema validation.',
        502,
        validatedResult.error.format()
      );
    }

    const finalAnalysis: StructuredCivicAnalysis = {
      ...validatedResult.data,
      category: input.category,
      location: {
        state: input.state || 'Maharashtra',
        district: input.district || validatedResult.data.location.wardOrArea || '',
        city: input.city || '',
        area: input.area || '',
        streetLandmark:
          input.streetLandmark || validatedResult.data.location.streetLandmark || '',
        jurisdiction: validatedResult.data.location.jurisdiction || input.suggestedAuthority || '',
        pincode: input.pincode || validatedResult.data.location.pincode || '',
        suggestedAuthority: input.suggestedAuthority || '',
        ...(input.gpsLatitude != null && {
          gpsLatitude: input.gpsLatitude,
          gpsLongitude: input.gpsLongitude,
          gpsAccuracyMeters: input.gpsAccuracyMeters,
        }),
      },
      outputLanguage: language,
      analyzedAt: new Date().toISOString(),
      modelUsed: modelName,
    };

    return finalAnalysis;
  } catch (error: unknown) {
    if (error instanceof GeminiServiceError) {
      throw error;
    }

    const errMessage = error instanceof Error ? error.message : String(error);

    // Detect rate limit / quota exhaustion
    if (errMessage.includes('RESOURCE_EXHAUSTED') || errMessage.includes('429')) {
      throw new GeminiServiceError(
        'RATE_LIMITED',
        'Gemini API quota or rate limit exceeded. Please try again shortly.',
        429,
        error
      );
    }

    throw new GeminiServiceError(
      'GEMINI_API_ERROR',
      `Gemini API request failed: ${errMessage}`,
      500,
      error
    );
  }
}
