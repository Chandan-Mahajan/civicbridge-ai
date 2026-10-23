import type { OutputLanguage, CivicCategory } from '../types';

export interface CategoryTranslation {
  label: string;
  desc: string;
}

export interface SampleProblemTranslation {
  title: string;
  category: CivicCategory;
  district: string;
  city: string;
  area: string;
  streetLandmark: string;
  description: string;
}

export interface TranslationSchema {
  common: {
    appName: string;
    tagline: string;
    phaseBadge: string;
    pilotRegionLabel: string;
    pilotRegionValue: string;
    loading: string;
    error: string;
  };
  nav: {
    howItWorks: string;
    authorities: string;
    selectLanguage: string;
    draftLanguageLabel: string;
    languageMenuTitle: string;
    languageMenuNote: string;
    openMenu: string;
    closeMenu: string;
    activeLanguage: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    zeroLogin: string;
    antiHallucination: string;
    wardMapping: string;
  };
  form: {
    title: string;
    subtitle: string;
    categoryLabel: string;
    categorySelectHelp: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    descriptionHelp: string;
    minCharsNotice: string;
    samplesTitle: string;
    samplesSubtitle: string;
    submitButton: string;
    submittingButton: string;
    resetButton: string;
    validation: {
      descRequired: string;
      descTooShort: string;
      districtRequired: string;
    };
  };
  categories: Record<CivicCategory, CategoryTranslation>;
  samples: SampleProblemTranslation[];
  photos: {
    title: string;
    subtitle: string;
    dragDropText: string;
    dragDropSubtext: string;
    browseButton: string;
    captureButton: string;
    maxLimitNotice: string;
    slotsRemaining: (count: number) => string;
    removePhotoAria: (name: string) => string;
    previewAria: (name: string) => string;
    closePreview: string;
    sizeError: (name: string, size: string, max: string) => string;
    formatError: (name: string, allowed: string) => string;
    limitError: (canAccept: number, skipped: number) => string;
  };
  location: {
    title: string;
    subtitle: string;
    gpsSectionTitle: string;
    gpsButton: string;
    gpsDetecting: string;
    gpsSuccessBadge: string;
    gpsAccuracy: (meters: number) => string;
    clearGps: string;
    stateLabel: string;
    districtLabel: string;
    districtPlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    areaLabel: string;
    areaPlaceholder: string;
    areaDatalistHint: string;
    streetLabel: string;
    streetPlaceholder: string;
    pincodeLabel: string;
    pincodePlaceholder: string;
    suggestedAuthorityLabel: string;
    suggestedAuthorityHint: string;
    gpsStatus: {
      denied: string;
      unavailable: string;
      timeout: string;
      unsupported: string;
    };
  };
  results: {
    title: string;
    statusAwaiting: string;
    statusAnalyzing: string;
    statusReady: string;
    statusError: string;
    idleTitle: string;
    idleSubtitle: string;
    pipelineHeading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    loadingTitle: string;
    loadingSubtitle: string;
    loadingProgress: string;
    errorTitle: string;
    apiKeyRequiredTitle: string;
    apiKeyInstruction1: string;
    apiKeyInstruction2: string;
    apiKeyNote: string;
    retryButton: string;
    reviewInputsButton: string;
    cardHeaderTitle: string;
    targetAuthorityLabel: string;
    wardLabel: string;
    priorityLabels: {
      CRITICAL: string;
      HIGH: string;
      MEDIUM: string;
      LOW: string;
    };
    incidentSummaryTitle: string;
    slaPrefix: string;
    rtsActSuffix: string;
    triageJustification: string;
    factsTitle: (count: number) => string;
    observationsTitle: string;
    noObservations: string;
    missingInfoTitle: string;
    allInfoProvided: string;
    safetyHazardsTitle: string;
    noHazards: string;
    draftTitle: string;
    citizenEditedBadge: string;
    restoreOriginalDraft: string;
    charCount: (count: number) => string;
    copyButton: string;
    copiedButton: string;
    downloadButton: string;
    printButton: string;
    pasteInstruction: string;
    nextStepTitle: string;
    limitationsTitle: string;
    analyzedAt: (time: string) => string;
    reportLanguageLabel: string;
    languageMismatchNotice: (reportLang: string, currentLang: string) => string;
    regenerateInCurrentLang: (langName: string) => string;
    keepExistingReport: string;
  };
  authorities: {
    title: string;
    subtitle: string;
    verifiedBadge: string;
    tabSuffix: string;
    helplineLabel: string;
    whatsappLabel: string;
    portalLabel: string;
    headquartersLabel: string;
    departmentsTitle: string;
    slaTableTitle: string;
    slaTableSubtitle: string;
    colCategory: string;
    colTargetHours: string;
    colLegalAct: string;
    colTier1: string;
    colTier2: string;
    rtsCharterNote: string;
  };
  howItWorks: {
    modalTitle: string;
    modalSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step1Tag: string;
    step2Title: string;
    step2Desc: string;
    step2Tag: string;
    step3Title: string;
    step3Desc: string;
    step3Tag: string;
    step4Title: string;
    step4Desc: string;
    step4Tag: string;
    disclaimerTitle: string;
    disclaimerDesc: string;
    closeButton: string;
  };
  footer: {
    appName: string;
    tagline: string;
    description: string;
    disclaimer: string;
    pilotNotice: string;
    rightsReserved: string;
  };
  voice: {
    speakButton: string;
    listening: string;
    requestingPermission: string;
    stopButton: string;
    retryButton: string;
    spokenLangLabel: string;
    spokenLanguages: {
      'en-IN': string;
      'hi-IN': string;
      'mr-IN': string;
    };
    transcriptReadyTitle: string;
    insertDirectly: string;
    appendButton: string;
    replaceButton: string;
    discardButton: string;
    statusBadge: {
      ready: string;
      listening: string;
      completed: string;
      denied: string;
      unsupported: string;
      error: string;
    };
    deniedError: string;
    unsupportedNotice: string;
    genericError: string;
    interimHint: string;
    ariaMicrophone: string;
    ariaStop: string;
    ariaRetry: string;
  };
  whereToSubmit: {
    sectionTitle: string;
    sectionSubtitle: string;
    recommendedAuthorityHeading: string;
    whyResponsibleHeading: string;
    confidenceHeading: string;
    confidenceLabels: {
      LIKELY: string;
      POSSIBLE: string;
      UNCONFIRMED: string;
    };
    officialSourceLabel: string;
    sourceStatusNotice: string;
    submissionInstructionsHeading: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    evidenceChecklistHeading: string;
    checklistPhotos: string;
    checklistPhotosMissing: string;
    checklistLocation: string;
    checklistLocationMissing: string;
    checklistDescription: string;
    checklistContact: string;
    openPortalButton: string;
    copyComplaintButton: string;
    copiedComplaintButton: string;
    portalDisclaimerNotice: string;
    notOfficiallyConfirmedDisclaimer: string;
  };
}

export const translations: Record<OutputLanguage, TranslationSchema> = {
  // ───────────────────────────────────────────────────────────────────────────
  // ENGLISH (Default)
  // ───────────────────────────────────────────────────────────────────────────
  en: {
    common: {
      appName: 'CivicBridge AI',
      tagline: 'From Civic Problems to Action.',
      phaseBadge: 'AI-Powered Civic Grievance Assistant',
      pilotRegionLabel: 'Priority Region:',
      pilotRegionValue: 'Pune Metropolitan Area (PMC & PCMC)',
      loading: 'Loading...',
      error: 'An error occurred',
    },
    nav: {
      howItWorks: 'How It Works',
      authorities: 'Authorities & Helplines',
      selectLanguage: 'Select Language',
      draftLanguageLabel: 'Draft Language',
      languageMenuTitle: 'Grievance Draft & UI Language',
      languageMenuNote: 'Gemini AI will synthesize formal complaints in the chosen language.',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      activeLanguage: 'Active language',
    },
    hero: {
      badge: 'Gemini AI Analysis • Multilingual Support • Location Assistance • Authority Finder',
      title: 'From Civic Problems to Action.',
      subtitle:
        'Describe potholes, garbage dumping, drainage overflows, water supply leaks, or broken streetlights. CivicBridge AI analyzes your description and photos using Google Gemini, drafts a structured formal complaint, and guides you to the relevant Maharashtra authority portal for submission.',
      zeroLogin: 'Zero login or personal data tracking',
      antiHallucination: 'Factual preservation & anti-hallucination',
      wardMapping: 'Location Assistance & Authority Finder',
    },
    form: {
      title: 'Civic Grievance Intake Workspace',
      subtitle:
        'Enter details below. Google Gemini will extract verified facts, assess public safety priority, and synthesize a formal petition draft.',
      categoryLabel: 'Problem Category',
      categorySelectHelp: 'Select the primary civic category to apply statutory RTS SLA guidelines',
      descriptionLabel: 'Describe the Civic Problem',
      descriptionPlaceholder:
        'e.g. Deep pothole approximately 2 feet wide on the main carriageway near the school gate, causing two-wheelers to swerve dangerously...',
      descriptionHelp: 'Provide specific facts: exact location, duration, danger to pedestrians or traffic.',
      minCharsNotice: 'Minimum 15 characters required for accurate analysis',
      samplesTitle: 'Quick Load Pune Priority Samples:',
      samplesSubtitle: 'Click any sample to auto-fill realistic civic scenarios',
      submitButton: 'Analyze & Generate Complaint',
      submittingButton: 'Analyzing with Gemini AI...',
      resetButton: 'Clear Form',
      validation: {
        descRequired: 'Please enter a description of the civic problem before generating a complaint.',
        descTooShort:
          'Please provide a bit more detail (at least 15 characters) so the municipal ward office can identify and investigate the issue.',
        districtRequired:
          'Please select a district so CivicBridge AI can identify the correct Maharashtra authority.',
      },
    },
    categories: {
      pothole: {
        label: 'Pothole & Road Damage',
        desc: 'Craters, asphalt peeling, dangerous trenches, or broken dividers.',
      },
      garbage: {
        label: 'Garbage & Waste Overflow',
        desc: 'Uncollected domestic waste, open dumping spots, or bin overflow.',
      },
      drainage: {
        label: 'Drainage & Sewage Overflow',
        desc: 'Blocked stormwater drains, overflowing manholes, or foul odor.',
      },
      water_supply: {
        label: 'Water Supply & Contamination',
        desc: 'Pipeline burst, low pressure supply, brown/murky water, or no supply.',
      },
      streetlight: {
        label: 'Streetlight & Dark Spot',
        desc: 'Non-functional street lamps, dangling wires, or dark public walkways.',
      },
      electricity: {
        label: 'MSEDCL Electricity Issue',
        desc: 'Transformer spark, prolonged unannounced outage, or exposed feeder box.',
      },
      encroachment: {
        label: 'Footpath Encroachment',
        desc: 'Illegal barricades, footpath hawking blocking pedestrians, or debris.',
      },
      other: {
        label: 'Other Civic Grievance',
        desc: 'Stray animal menace, garden maintenance, public toilet upkeep, etc.',
      },
    },
    samples: [
      {
        title: 'Baner Main Road Pothole',
        category: 'pothole',
        district: 'Pune',
        city: 'Pune',
        area: 'Baner - Balewadi',
        streetLandmark: 'Near D-Mart, 50m towards High Street junction',
        description:
          'A deep and hazardous pothole (approx. 2 feet wide and 6 inches deep) has developed right in the middle of the left lane on Baner Main Road. Two two-wheelers skidded during the evening rush hour. Needs urgent tar patching and asphalt leveling before serious accidents occur.',
      },
      {
        title: 'Shivajinagar Garbage Dump',
        category: 'garbage',
        district: 'Pune',
        city: 'Pune',
        area: 'Shivajinagar',
        streetLandmark: 'Opposite Railway Station Sub-way exit',
        description:
          'Solid municipal waste and rotting food scraps have been accumulating on the open walkway for 4 consecutive days without garbage truck clearance. Stray cattle and dogs are scattering waste across the road, creating an intolerable stench and disease hazard for commuters.',
      },
      {
        title: 'Kothrud Water Supply Murkiness',
        category: 'water_supply',
        district: 'Pune',
        city: 'Pune',
        area: 'Kothrud',
        streetLandmark: 'Near Ideal Colony Ground, Lane No. 3',
        description:
          'Drinking water supplied during the morning 6 AM - 8 AM slot has been coming out brownish with heavy silt and foul odor for the past 2 days. Suspected underground sewage pipe cross-contamination. Residents are forced to buy private tankers.',
      },
      {
        title: 'Hinjawadi Streetlight Dark Spot',
        category: 'streetlight',
        district: 'Pune',
        city: 'Pune',
        area: 'Hinjawadi (Phase 1-3, PMRDA)',
        streetLandmark: 'Phase 1 to Phase 2 connecting spine road, near Cognizant circle',
        description:
          'A stretch of 6 consecutive street poles have been completely non-functional for over a week, plunging the tech park corridor into pitch darkness. This poses severe safety risks for night shift workers, pedestrians, and cyclists.',
      },
    ],
    photos: {
      title: 'Photo Evidence (Gemini Vision)',
      subtitle: 'Attach up to 5 photos to verify conditions, surface damage, and safety hazards.',
      dragDropText: 'Drop photos here, or',
      dragDropSubtext: 'Supports JPG, PNG, WebP up to 10 MB each',
      browseButton: 'Browse files',
      captureButton: 'Use Camera',
      maxLimitNotice: 'Maximum 5 photos reached. Remove a photo to add another.',
      slotsRemaining: (count) => `${count} more photo${count !== 1 ? 's' : ''} allowed`,
      removePhotoAria: (name) => `Remove photo ${name}`,
      previewAria: (name) => `Preview photo ${name}`,
      closePreview: 'Close photo preview',
      sizeError: (name, size, max) =>
        `"${name}" is too large (${size}). Maximum allowed size is ${max}.`,
      formatError: (name, allowed) =>
        `"${name}" is not a supported format. Please use ${allowed}.`,
      limitError: (canAccept, skipped) =>
        `You can only add ${canAccept} more photo(s). ${skipped} file(s) were skipped.`,
    },
    location: {
      title: 'Location & Jurisdiction (Maharashtra)',
      subtitle:
        'Specify where the problem is located. All fields except District are optional, but details help ward officers inspect quickly.',
      gpsSectionTitle: 'Device Location (Optional)',
      gpsButton: 'Use My Current Location',
      gpsDetecting: 'Detecting GPS coordinates...',
      gpsSuccessBadge: 'GPS Acquired',
      gpsAccuracy: (m) => `Accurate to ±${m} m`,
      clearGps: 'Clear GPS',
      stateLabel: 'State',
      districtLabel: 'District *',
      districtPlaceholder: 'Select Maharashtra District',
      cityLabel: 'City / Municipality',
      cityPlaceholder: 'Select or type City',
      areaLabel: 'Area / Locality / Ward',
      areaPlaceholder: 'e.g. Kothrud, Aundh, Hinjawadi Phase 1, Wakad...',
      areaDatalistHint: 'Suggestions available for Pune district',
      streetLabel: 'Street / Landmark',
      streetPlaceholder: 'e.g. Near D-Mart, Lane 4, opposite SBI branch...',
      pincodeLabel: 'PIN Code',
      pincodePlaceholder: '6-digit PIN (e.g. 411038)',
      suggestedAuthorityLabel: 'Likely Civic Authority:',
      suggestedAuthorityHint:
        'Suggested based on city/district. Final complaint will route per municipal charter.',
      gpsStatus: {
        denied:
          'Location permission was denied by your browser. Please enter your location manually below, or enable location access in browser settings.',
        unavailable:
          'Your device could not determine its current location (e.g. indoor or airplane mode). Please enter location manually.',
        timeout: 'Location detection timed out. Please enter your location manually.',
        unsupported: 'Your browser does not support Geolocation. Please enter location manually.',
      },
    },
    results: {
      title: 'Gemini Complaint Analysis',
      statusAwaiting: 'Awaiting Input',
      statusAnalyzing: 'Analyzing...',
      statusReady: 'Analysis Ready',
      statusError: 'Error',
      idleTitle: 'Real Gemini AI Analysis Workspace',
      idleSubtitle:
        'Describe the civic issue on the left and click "Analyze & Generate Complaint". The official Gemini API will structure facts, evaluate public safety risk, and draft an editable complaint petition.',
      pipelineHeading: 'Structured Gemini Pipeline:',
      step1Title: 'Factual Extraction:',
      step1Desc: 'Preserves user facts, isolates physical observations, never invents details.',
      step2Title: 'Safety Triage:',
      step2Desc: 'Assesses pedestrian and vehicular hazard levels under Maharashtra RTS standards.',
      step3Title: 'Formal Petition Drafting:',
      step3Desc: 'Generates respectful, editable grievance text in English, Marathi, or Hindi.',
      step4Title: 'Actionable Routing:',
      step4Desc: 'Next steps with official PMC/PCMC helpline routes and tracking receipts.',
      loadingTitle: 'Analyzing Civic Complaint with Gemini AI',
      loadingSubtitle:
        'Structuring facts, evaluating safety hazards under Maharashtra Right to Public Services Act (RTS 2015), and synthesizing a formal petition...',
      loadingProgress: 'Backend model call in progress',
      errorTitle: 'Analysis Request Failed',
      apiKeyRequiredTitle: 'Gemini API Key Required',
      apiKeyInstruction1: 'Open or create the backend configuration file at:',
      apiKeyInstruction2: 'Add your Google Gemini key:',
      apiKeyNote: 'Once saved, restart the backend or click Retry below.',
      retryButton: 'Retry Analysis',
      reviewInputsButton: 'Review Input Details',
      cardHeaderTitle: 'Structured Civic Analysis',
      targetAuthorityLabel: 'Target Authority',
      wardLabel: 'Ward',
      priorityLabels: {
        CRITICAL: 'CRITICAL PRIORITY',
        HIGH: 'HIGH PRIORITY',
        MEDIUM: 'MEDIUM PRIORITY',
        LOW: 'STANDARD PRIORITY',
      },
      incidentSummaryTitle: 'Objective Incident Summary',
      slaPrefix: 'SLA:',
      rtsActSuffix: 'h (RTS Act)',
      triageJustification: 'Triage Justification:',
      factsTitle: (count) => `Preserved User Facts (${count})`,
      observationsTitle: 'Physical Observations',
      noObservations: 'No visible physical dimensions noted',
      missingInfoTitle: 'Missing Information for Ward Team',
      allInfoProvided: 'All necessary location details provided',
      safetyHazardsTitle: 'Public Safety & Health Hazards',
      noHazards: 'No severe secondary hazards flagged',
      draftTitle: 'Official Grievance Petition Draft (Editable)',
      citizenEditedBadge: 'Edited by citizen',
      restoreOriginalDraft: 'Restore Original Draft',
      charCount: (count) => `${count} chars`,
      copyButton: 'Copy Final Grievance Draft',
      copiedButton: 'Copied Petition to Clipboard!',
      downloadButton: 'Download Petition (.txt)',
      printButton: 'Print / Save as PDF',
      pasteInstruction: 'Ready to paste into PMC Care WhatsApp (+91 96899 00002) or portal.',
      nextStepTitle: 'Recommended Next Step & Official Channel',
      limitationsTitle: 'CivicBridge AI Limitations & Disclaimers',
      analyzedAt: (time) => `Analyzed: ${time}`,
      reportLanguageLabel: 'Report Language:',
      languageMismatchNotice: (reportLang, currentLang) =>
        `This complaint was generated in ${reportLang}. Your active interface language is now ${currentLang}.`,
      regenerateInCurrentLang: (langName) => `Regenerate Complaint in ${langName}`,
      keepExistingReport: 'Keep Current Report',
    },
    authorities: {
      title: 'Maharashtra & Pune Civic Authority Guide',
      subtitle:
        'Official grievance contact routes, portals, WhatsApp helplines, and statutory resolution standards under the Maharashtra Right to Public Services Act (RTS 2015).',
      verifiedBadge: 'Verified Official Channels',
      tabSuffix: '',
      helplineLabel: 'Official Helpline',
      whatsappLabel: 'WhatsApp Grievance',
      portalLabel: 'Official Portal',
      headquartersLabel: 'Headquarters',
      departmentsTitle: 'Responsible Departments',
      slaTableTitle: 'Statutory Resolution Timelines (RTS Act 2015)',
      slaTableSubtitle: 'Legally mandated grievance turnaround standards for Maharashtra citizens',
      colCategory: 'Civic Problem Category',
      colTargetHours: 'Max SLA Time',
      colLegalAct: 'Statutory Mandate',
      colTier1: 'First Level Escalation',
      colTier2: 'Second Level Escalation',
      rtsCharterNote:
        'Under RTS Act 2015, citizens have the right to receive an official registration token number and written rationale if work exceeds the mandated turnaround.',
    },
    howItWorks: {
      modalTitle: 'How CivicBridge AI Works',
      modalSubtitle: 'Transforming citizen voice into official, enforceable civic action',
      step1Title: 'Describe the Civic Issue',
      step1Desc:
        'Citizens describe issues such as potholes, overflowing waste bins, sewage leaks, or broken streetlights in plain words. Specify your Pune ward or landmark for pinpoint routing.',
      step1Tag: 'Step 1: Input',
      step2Title: 'Gemini AI Fact Structuring',
      step2Desc:
        'Google Gemini extracts objective facts, validates physical conditions from uploaded photos, checks for ambiguities, and assesses public safety risk under Maharashtra RTS standards.',
      step2Tag: 'Step 2: AI Processing',
      step3Title: 'Jurisdiction & SLA Mapping',
      step3Desc:
        'CivicBridge routes your complaint to the appropriate municipal body (PMC, PCMC, PMRDA, or MSEDCL) and attaches the statutory resolution deadline mandated by Maharashtra law.',
      step3Tag: 'Step 3: Routing',
      step4Title: 'Copy & Submit to Official Portal',
      step4Desc:
        'Copy the synthesized formal petition and open the recommended official portal (such as PMC, MSEDCL, or the Maharashtra state portal) to submit your grievance and receive an official tracking token.',
      step4Tag: 'Step 4: Action',
      disclaimerTitle: 'Independent Civic Technology Initiative',
      disclaimerDesc:
        'CivicBridge AI is an open civic tool designed to empower citizens. It does not replace municipal authority offices but formats complaints to match administrative requirements for faster action.',
      closeButton: 'Close',
    },
    footer: {
      appName: 'CivicBridge AI',
      tagline: 'From Civic Problems to Action.',
      description:
        'Empowering citizens across Maharashtra to report and track municipal grievances with structured AI precision under the Maharashtra Right to Public Services Act (RTS 2015).',
      disclaimer:
        'CivicBridge AI is an independent civic utility. It does not store personal data or require user login. Complaints are submitted directly by citizens to authorized government portals.',
      pilotNotice: 'Priority Region: Pune Metropolitan Area (PMC & PCMC). Statewide Maharashtra coverage active.',
      rightsReserved: 'CivicBridge AI • Open Public Interest Technology',
    },
    voice: {
      speakButton: 'Speak Your Problem',
      listening: 'Listening... speak clearly into microphone',
      requestingPermission: 'Requesting microphone permission...',
      stopButton: 'Stop Recording',
      retryButton: 'Try Voice Input Again',
      spokenLangLabel: 'Spoken Language:',
      spokenLanguages: {
        'en-IN': 'English (India)',
        'hi-IN': 'हिन्दी (Hindi)',
        'mr-IN': 'मराठी (Marathi)',
      },
      transcriptReadyTitle: 'Voice Transcript Captured',
      insertDirectly: 'Insert into Description',
      appendButton: 'Append to Description',
      replaceButton: 'Replace Existing Text',
      discardButton: 'Discard',
      statusBadge: {
        ready: 'Microphone Ready',
        listening: 'Recording Audio...',
        completed: 'Transcript Ready',
        denied: 'Microphone Denied',
        unsupported: 'Voice Unsupported',
        error: 'Recognition Error',
      },
      deniedError:
        'Microphone access was denied. Please allow microphone permission in your browser address bar/settings to speak your problem, or type it manually below.',
      unsupportedNotice:
        'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari, or type your complaint manually in the text box.',
      genericError:
        'Speech recognition encountered an issue. Please click "Try Voice Input Again" or type your description manually.',
      interimHint: 'Hearing you speak (live preview)...',
      ariaMicrophone: 'Speak your problem using microphone',
      ariaStop: 'Stop voice recording',
      ariaRetry: 'Retry speech recognition',
    },
    whereToSubmit: {
      sectionTitle: 'Where to Submit',
      sectionSubtitle: 'Recommended official intake channel based on incident category and your confirmed location',
      recommendedAuthorityHeading: 'Recommended Authority',
      whyResponsibleHeading: 'Why It May Be Responsible',
      confidenceHeading: 'Authority Confidence',
      confidenceLabels: {
        LIKELY: 'Likely authority',
        POSSIBLE: 'Possible authority — please confirm',
        UNCONFIRMED: 'Authority not confirmed',
      },
      officialSourceLabel: 'Official Information Source',
      sourceStatusNotice: 'Official information source requiring confirmation. Candidate source, not proof of active direct intake.',
      submissionInstructionsHeading: 'Submission Instructions',
      step1: '1. Review the petition draft and click "Copy Complaint" below.',
      step2: '2. Verify all items in the evidence checklist before proceeding.',
      step3: '3. Click "Open Official Portal" to navigate to the government portal.',
      step4: '4. Paste your complaint into the portal form, attach your photos, and record the official reference number.',
      evidenceChecklistHeading: 'Evidence Checklist',
      checklistPhotos: 'Photo evidence attached (clear view with visible landmarks)',
      checklistPhotosMissing: 'Optional: Add photos to strengthen official investigation',
      checklistLocation: 'Specific street, locality, or GPS coordinates recorded',
      checklistLocationMissing: 'Location specified (confirm boundary before filing)',
      checklistDescription: 'Objective problem description with severity and facts',
      checklistContact: 'Citizen mobile number ready for OTP and official SMS updates',
      openPortalButton: 'Open Official Portal',
      copyComplaintButton: 'Copy Complaint Draft',
      copiedComplaintButton: 'Complaint Copied!',
      portalDisclaimerNotice: 'Opening an external portal does not submit your complaint. CivicBridge AI never generates fake acknowledgement numbers or files on your behalf.',
      notOfficiallyConfirmedDisclaimer: 'Authority recommendations are advisory guides based on public administrative structures. They are not officially confirmed or guaranteed.',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // MARATHI (मराठी)
  // ───────────────────────────────────────────────────────────────────────────
  mr: {
    common: {
      appName: 'सिव्हिकब्रिज AI',
      tagline: 'नागरी समस्यांपासून प्रत्यक्ष कृतीकडे.',
      phaseBadge: 'एआय-सक्षम नागरी तक्रार सहाय्यक',
      pilotRegionLabel: 'प्राधान्य क्षेत्र:',
      pilotRegionValue: 'पुणे महानगर क्षेत्र (मनपा व पिंपरी चिंचवड मनपा)',
      loading: 'लोड होत आहे...',
      error: 'एक त्रुटी आढळली',
    },
    nav: {
      howItWorks: 'कार्यपद्धती',
      authorities: 'प्राधिकरणे व हेल्पलाईन',
      selectLanguage: 'भाषा निवडा',
      draftLanguageLabel: 'तक्रार मसुदा भाषा',
      languageMenuTitle: 'तक्रार मसुदा व इंटरफेस भाषा',
      languageMenuNote: 'जेमिनी AI निवडलेल्या भाषेत औपचारिक तक्रार मसुदा तयार करेल.',
      openMenu: 'नेव्हिगेशन मेनू उघडा',
      closeMenu: 'नेव्हिगेशन मेनू बंद करा',
      activeLanguage: 'सक्रिय भाषा',
    },
    hero: {
      badge: 'जेमिनी एआय विश्लेषण • बहुभाषिक सहाय्य • स्थान मार्गदर्शन • प्राधिकरण शोध',
      title: 'नागरी समस्यांपासून प्रत्यक्ष कृतीकडे.',
      subtitle:
        'रस्त्यांवरील खड्डे, कचऱ्याचे ढीग, ड्रेनेज ओव्हरफ्लो, पाणी गळती किंवा बंद पथदिव्यांची समस्या सांगा. सिव्हिकब्रिज AI गुगल जेमिनीच्या साहाय्याने तक्रारीचे विश्लेषण करून औपचारिक मसुदा तयार करते आणि योग्य शासकीय पोर्टलवर सादर करण्यासाठी मार्गदर्शन करते.',
      zeroLogin: 'लॉगिन किंवा वैयक्तिक माहिती ट्रॅकिंग नाही',
      antiHallucination: 'तथ्यांचे अचूक जतन आणि वास्तववादी विश्लेषण',
      wardMapping: 'स्थान मार्गदर्शन व प्राधिकरण शोध',
    },
    form: {
      title: 'नागरी तक्रार नोंदणी कक्ष',
      subtitle:
        'खाली समस्या नमूद करा. गुगल जेमिनी अचूक तथ्ये संकलित करेल, सार्वजनिक सुरक्षिततेचे मूल्यांकन करेल आणि अधिकृत तक्रार मसुदा तयार करेल.',
      categoryLabel: 'समस्येचा प्रकार',
      categorySelectHelp: 'RTS कायद्यानुसार निराकरण कालमर्यादा निश्चित करण्यासाठी योग्य प्रकार निवडा',
      descriptionLabel: 'नागरी समस्येचे तपशीलवार वर्णन',
      descriptionPlaceholder:
        'उदा. शाळेच्या मुख्य प्रवेशद्वाराजवळील रस्त्यावर सुमारे २ फूट रुंद आणि खोल खड्डा पडला असून, दुचाकी वाहने घसरून अपघात होत आहेत...',
      descriptionHelp: 'नेमके स्थान, समस्येचा कालावधी आणि नागरिकांच्या सुरक्षेचा धोका स्पष्टपणे लिहा.',
      minCharsNotice: 'अचूक विश्लेषणासाठी किमान १५ अक्षरे आवश्यक आहेत',
      samplesTitle: 'पुणे प्राधान्य नमुना तक्रारी:',
      samplesSubtitle: 'वास्तविक परिस्थिती पाहण्यासाठी कोणत्याही नमुन्यावर क्लिक करा',
      submitButton: 'विश्लेषण करा व तक्रार तयार करा',
      submittingButton: 'जेमिनी AI द्वारे विश्लेषण सुरू आहे...',
      resetButton: 'फॉर्म पूर्ववत करा',
      validation: {
        descRequired: 'तक्रार तयार करण्यापूर्वी कृपया समस्येचे वर्णन प्रविष्ट करा.',
        descTooShort:
          'कृपया अधिक माहिती द्या (किमान १५ अक्षरे), जेणेकरून प्रभाग कार्यालयाला समस्येची पाहणी करणे सोपे जाईल.',
        districtRequired:
          'योग्य प्राधिकरण निश्चित करण्यासाठी कृपया महाराष्ट्रातील जिल्हा निवडा.',
      },
    },
    categories: {
      pothole: {
        label: 'खड्डे व रस्ता दुरुस्ती',
        desc: 'खड्डे, डांबर उखडणे, धोकादायक चर किंवा तुटलेले दुभाजक.',
      },
      garbage: {
        label: 'कचरा व्यवस्थापन व स्वच्छता',
        desc: 'कचरा न उचलणे, उघड्यावरील कचरा डेपो किंवा कुंड्या ओसंडून वाहणे.',
      },
      drainage: {
        label: 'सांडपाणी व ड्रेनेज ओव्हरफ्लो',
        desc: 'तुंबलेली गटारे, मॅनहोलमधून सांडपाणी वाहणे किंवा दुर्गंधी पसरणे.',
      },
      water_supply: {
        label: 'पाणीपुरवठा व गळती',
        desc: 'पाईपलाईन फुटणे, कमी दाबाने पुरवठा, गढूळ पाणी किंवा पाणी न येणे.',
      },
      streetlight: {
        label: 'पथदिवे बंद असणे',
        desc: 'बंद पडलेले पथदिवे, लटकणाऱ्या विद्युत तारा किंवा अंधारलेले रस्ते.',
      },
      electricity: {
        label: 'महावितरण वीज पुरवठा समस्या',
        desc: 'ट्रान्सफॉर्मरमध्ये ठिणग्या, दीर्घकाळ वीज खंडित होणे किंवा उघडी फिडर पेटी.',
      },
      encroachment: {
        label: 'पादचारी मार्ग अतिक्रमण',
        desc: 'अनधिकृत बांधकामे, फेरीवाल्यांमुळे अडवलेले पदपथ किंवा डेब्रिज.',
      },
      other: {
        label: 'इतर नागरी तक्रार',
        desc: 'भटके प्राणी, सार्वजनिक उद्याने, सार्वजनिक स्वच्छतागृह दुरुस्ती इत्यादी.',
      },
    },
    samples: [
      {
        title: 'बाणेर मुख्य रस्ता खड्डा',
        category: 'pothole',
        district: 'Pune',
        city: 'Pune',
        area: 'Baner - Balewadi',
        streetLandmark: 'डी-मार्ट जवळ, हाय स्ट्रीट जंक्शनकडे ५० मीटर',
        description:
          'बाणेर मुख्य रस्त्यावर डाव्या लेनमध्ये सुमारे २ फूट रुंद आणि ६ इंच खोल धोकादायक खड्डा पडला आहे. संध्याकाळच्या गर्दीच्या वेळी दोन दुचाकी घसरल्या. मोठा अपघात होण्यापूर्वी तात्काळ डांबरीकरण करून रस्ता सपाट करणे आवश्यक आहे.',
      },
      {
        title: 'शिवाजीनगर कचरा साचणे',
        category: 'garbage',
        district: 'Pune',
        city: 'Pune',
        area: 'Shivajinagar',
        streetLandmark: 'रेल्वे स्टेशन भुयारी मार्ग बाहेर पडण्याच्या जागेसमोर',
        description:
          'गेल्या ४ दिवसांपासून पदपथावर महापालिकेचा कचरा आणि सडलेले अन्न साचले आहे. मोकाट जनावरे हा कचरा रस्त्यावर पसरवत असून, तीव्र दुर्गंधीमुळे प्रवाशांच्या आरोग्याला धोका निर्माण झाला आहे.',
      },
      {
        title: 'कोथरूड गढूळ पाणीपुरवठा',
        category: 'water_supply',
        district: 'Pune',
        city: 'Pune',
        area: 'Kothrud',
        streetLandmark: 'आयडियल कॉलनी मैदान जवळ, गल्ली क्र. ३',
        description:
          'सकाळी ६ ते ८ या वेळेत येणारे पिण्याचे पाणी गेल्या २ दिवसांपासून मातकट रंगाचे आणि दुर्गंधीयुक्त येत आहे. भूगर्भातील सांडपाणी पाईपलाईन मिसळल्याचा संशय आहे. नागरिकांना विकतचे टँकर मागवावे लागत आहेत.',
      },
      {
        title: 'हिंजवडी पथदिवे बंद असणे',
        category: 'streetlight',
        district: 'Pune',
        city: 'Pune',
        area: 'Hinjawadi (Phase 1-3, PMRDA)',
        streetLandmark: 'फेज १ ते फेज २ जोडणारा मुख्य रस्ता, कॉग्निझंट सर्कल जवळ',
        description:
          'गेल्या आठवड्यापासून सलग ६ पथदिव्यांचे खांब पूर्णपणे बंद आहेत, ज्यामुळे संपूर्ण रस्ता अंधारात बुडाला आहे. रात्रीच्या पाळीत काम करणाऱ्या कामगारांसाठी आणि पादचाऱ्यांसाठी हा मोठा धोका आहे.',
      },
    ],
    photos: {
      title: 'छायाचित्र पुरावा (जेमिनी व्हिजन)',
      subtitle: 'परिस्थिती, रस्त्याचे नुकसान आणि सुरक्षेचा धोका दाखवणारे ५ पर्यंत फोटो जोडा.',
      dragDropText: 'फोटो येथे ड्रॅग करा, किंवा',
      dragDropSubtext: 'प्रत्येकी कमाल १० MB पर्यंतचे JPG, PNG, WebP फोटो स्वीकारले जातात',
      browseButton: 'फाईल्स निवडा',
      captureButton: 'कॅमेरा वापरा',
      maxLimitNotice: 'कमाल ५ फोटो जोडले गेले आहेत. नवीन फोटो जोडण्यासाठी आधीचा फोटो हटवा.',
      slotsRemaining: (count) => `आणखी ${count} फोटो जोडता येतील`,
      removePhotoAria: (name) => `${name} फोटो हटवा`,
      previewAria: (name) => `${name} फोटो मोठा करून पहा`,
      closePreview: 'फोटो बंद करा',
      sizeError: (name, size, max) =>
        `"${name}" फाईल खूप मोठी आहे (${size}). कमाल मर्यादा ${max} आहे.`,
      formatError: (name, allowed) =>
        `"${name}" हे समर्थित फॉरमॅट नाही. कृपया ${allowed} वापरा.`,
      limitError: (canAccept, skipped) =>
        `आपण फक्त आणखी ${canAccept} फोटो जोडू शकता. ${skipped} फोटो वगळले गेले.`,
    },
    location: {
      title: 'स्थान व कार्यक्षेत्र (महाराष्ट्र)',
      subtitle:
        'समस्या कोठे घडली ते नमूद करा. जिल्हा वगळता इतर माहिती ऐच्छिक आहे, परंतु तपशीलांमुळे तपासणी जलद होते.',
      gpsSectionTitle: 'उपकरण स्थान (ऐच्छिक)',
      gpsButton: 'माझे सध्याचे स्थान वापरा',
      gpsDetecting: 'GPS स्थान शोधत आहे...',
      gpsSuccessBadge: 'GPS स्थान प्राप्त झाले',
      gpsAccuracy: (m) => `±${m} मीटर अचूकता`,
      clearGps: 'GPS काढून टाका',
      stateLabel: 'राज्य',
      districtLabel: 'जिल्हा *',
      districtPlaceholder: 'महाराष्ट्रातील जिल्हा निवडा',
      cityLabel: 'शहर / नगरपालिका',
      cityPlaceholder: 'शहर निवडा किंवा टाईप करा',
      areaLabel: 'परिसर / प्रभाग / वॉर्ड',
      areaPlaceholder: 'उदा. कोथरूड, औंध, हिंजवडी फेज १, वाकड...',
      areaDatalistHint: 'पुणे जिल्ह्यासाठी सूचना उपलब्ध आहेत',
      streetLabel: 'रस्ता / महत्त्वाची खूण',
      streetPlaceholder: 'उदा. डी-मार्ट जवळ, गल्ली क्र. ४, एसबीआय बँकेसमोर...',
      pincodeLabel: 'पिन कोड',
      pincodePlaceholder: '६ अंकी पिन कोड (उदा. ४११०३८)',
      suggestedAuthorityLabel: 'संभाव्य नागरी प्राधिकरण:',
      suggestedAuthorityHint:
        'शहर/जिल्ह्यानुसार सुचवलेले. अंतिम तक्रार प्रशासकीय नियमांनुसार पाठवली जाईल.',
      gpsStatus: {
        denied:
          'ब्राउझरने स्थान परवानगी नाकारली आहे. कृपया खाली स्वतः स्थान भरा किंवा सेटिंग्जमध्ये परवानगी द्या.',
        unavailable:
          'उपकरणाचे स्थान शोधता आले नाही (उदा. इमारतीमध्ये किंवा विमानात). कृपया स्वतः स्थान भरा.',
        timeout: 'स्थान शोधण्याची वेळ संपली. कृपया खाली स्वतः पत्ता प्रविष्ट करा.',
        unsupported: 'आपला ब्राउझर भौगोलिक स्थानास समर्थन देत नाही. कृपया स्वतः स्थान भरा.',
      },
    },
    results: {
      title: 'जेमिनी तक्रार विश्लेषण',
      statusAwaiting: 'माहितीची प्रतीक्षा',
      statusAnalyzing: 'विश्लेषण सुरू...',
      statusReady: 'विश्लेषण तयार',
      statusError: 'त्रुटी',
      idleTitle: 'प्रत्यक्ष जेमिनी AI विश्लेषण कक्ष',
      idleSubtitle:
        'डाव्या बाजूला समस्येचे वर्णन करा आणि "विश्लेषण करा व तक्रार तयार करा" वर क्लिक करा. गुगल जेमिनी तथ्ये संकलित करेल आणि संपादनायोग्य तक्रार मसुदा तयार करेल.',
      pipelineHeading: 'संरचित जेमिनी प्रक्रिया:',
      step1Title: 'तथ्यांचे संकलन:',
      step1Desc: 'नागरिकांच्या तथ्यांचे जतन करते, भौतिक निरीक्षणे वेगळी ठेवते, खोटी माहिती जोडत नाही.',
      step2Title: 'सुरक्षा मूल्यांकन:',
      step2Desc: 'महाराष्ट्र RTS मानकांनुसार पादचारी व वाहतुकीच्या धोक्याचे वर्गीकरण करते.',
      step3Title: 'अधिकृत मसुदा लेखन:',
      step3Desc: 'मराठी, हिंदी किंवा इंग्रजी भाषेत आदरयुक्त आणि परिपूर्ण तक्रार पत्र तयार करते.',
      step4Title: 'अधिकृत पाठपुरावा:',
      step4Desc: 'पुणे मनपा/पिंपरी चिंचवड हेल्पलाईन आणि टोकन नंबर नोंदणीसाठी योग्य दिशा दाखवते.',
      loadingTitle: 'जेमिनी AI द्वारे नागरी समस्येचे विश्लेषण सुरू आहे',
      loadingSubtitle:
        'तथ्य संकलन, लोकसेवा हक्क कायदा (RTS २०१५) अंतर्गत सुरक्षा मूल्यांकन आणि अधिकृत मसुदा तयार करण्याचे काम चालू आहे...',
      loadingProgress: 'बॅकएंड मॉडेल संपर्क सुरू आहे',
      errorTitle: 'विश्लेषण विनंती अयशस्वी',
      apiKeyRequiredTitle: 'जेमिनी API की आवश्यक आहे',
      apiKeyInstruction1: 'कृपया खालील बॅकएंड कॉन्फिगरेशन फाईल तपासा:',
      apiKeyInstruction2: 'आपली गुगल जेमिनी की प्रविष्ट करा:',
      apiKeyNote: 'सेव्ह केल्यानंतर बॅकएंड पुन्हा सुरू करा किंवा खाली पुन्हा प्रयत्न करा.',
      retryButton: 'पुन्हा प्रयत्न करा',
      reviewInputsButton: 'माहिती तपासा',
      cardHeaderTitle: 'संरचित नागरी विश्लेषण',
      targetAuthorityLabel: 'लक्ष्य प्राधिकरण',
      wardLabel: 'प्रभाग',
      priorityLabels: {
        CRITICAL: 'अति तातडीचे (CRITICAL)',
        HIGH: 'उच्च प्राधान्य (HIGH)',
        MEDIUM: 'मध्यम प्राधान्य (MEDIUM)',
        LOW: 'सामान्य प्राधान्य (STANDARD)',
      },
      incidentSummaryTitle: 'समस्येचा वस्तुनिष्ठ सारांश',
      slaPrefix: 'निराकरण कालावधी:',
      rtsActSuffix: 'तास (RTS कायदा)',
      triageJustification: 'प्राधान्य कारण:',
      factsTitle: (count) => `नागरिकाने दिलेली वस्तुनिष्ठ तथ्ये (${count})`,
      observationsTitle: 'छायाचित्रातील भौतिक निरीक्षणे',
      noObservations: 'कोणतीही अतिरिक्त भौतिक निरीक्षणे नोंदवली नाहीत',
      missingInfoTitle: 'प्रभाग कार्यालयासाठी आवश्यक उर्वरित माहिती',
      allInfoProvided: 'सर्व आवश्यक स्थान तपशील पुरवले गेले आहेत',
      safetyHazardsTitle: 'सार्वजनिक सुरक्षितता व आरोग्याचे धोके',
      noHazards: 'कोणताही गंभीर दुय्यम धोका आढळला नाही',
      draftTitle: 'अधिकृत तक्रार मसुदा (संपादनायोग्य)',
      citizenEditedBadge: 'नागरिकाने संपादित केले',
      restoreOriginalDraft: 'मूळ मसुदा परत आणा',
      charCount: (count) => `${count} अक्षरे`,
      copyButton: 'तक्रार मसुदा कॉपी करा',
      copiedButton: 'तक्रार मसुदा क्लिपबोर्डवर कॉपी केला!',
      downloadButton: 'मसुदा डाउनलोड करा (.txt)',
      printButton: 'प्रिंट करा / PDF जतन करा',
      pasteInstruction: 'PMC Care WhatsApp (+91 96899 00002) किंवा पोर्टलवर पेस्ट करण्यासाठी तयार.',
      nextStepTitle: 'पुढील शिफारस केलेली कृती व अधिकृत माध्यम',
      limitationsTitle: 'सिव्हिकब्रिज AI मर्यादा व अस्वीकरण',
      analyzedAt: (time) => `विश्लेषण वेळ: ${time}`,
      reportLanguageLabel: 'तक्रार मसुदा भाषा:',
      languageMismatchNotice: (reportLang, currentLang) =>
        `हा तक्रार मसुदा ${reportLang} भाषेत तयार केला होता. आपली सध्याची भाषा आता ${currentLang} आहे.`,
      regenerateInCurrentLang: (langName) => `${langName} मध्ये पुन्हा तयार करा`,
      keepExistingReport: 'सध्याचा मसुदा ठेवा',
    },
    authorities: {
      title: 'महाराष्ट्र व पुणे नागरी प्राधिकरण मार्गदर्शक',
      subtitle:
        'अधिकृत तक्रार संपर्क क्रमांक, वेब पोर्टल्स, व्हॉट्सॲप हेल्पलाईन आणि महाराष्ट्र लोकसेवा हक्क अधिनियम (RTS २०१५) अंतर्गत निश्चित कालमर्यादा.',
      verifiedBadge: 'प्रमाणित अधिकृत माध्यमे',
      tabSuffix: '',
      helplineLabel: 'अधिकृत हेल्पलाईन',
      whatsappLabel: 'व्हॉट्सॲप तक्रार',
      portalLabel: 'अधिकृत पोर्टल',
      headquartersLabel: 'मुख्यालय',
      departmentsTitle: 'संबंधित प्रशासकीय विभाग',
      slaTableTitle: 'कायदेशीर निराकरण कालमर्यादा (RTS कायदा २०१५)',
      slaTableSubtitle: 'महाराष्ट्रातील नागरिकांसाठी सेवा हमी मानके',
      colCategory: 'नागरी समस्येचा प्रकार',
      colTargetHours: 'कमाल कालमर्यादा',
      colLegalAct: 'कायदेशीर नियम',
      colTier1: 'प्रथम अपीलीय अधिकारी',
      colTier2: 'द्वितीय अपीलीय अधिकारी',
      rtsCharterNote:
        'लोकसेवा हक्क कायद्यानुसार नागरिकांना तक्रार नोंदणी टोकन क्रमांक मिळवण्याचा आणि कालमर्यादा उलटल्यास कारणांची लेखी विचारणा करण्याचा कायदेशीर अधिकार आहे.',
    },
    howItWorks: {
      modalTitle: 'सिव्हिकब्रिज AI कसे कार्य करते?',
      modalSubtitle: 'नागरिकांच्या आवाजाचे परिणामकारक प्रशासकीय कारवाईत रूपांतर',
      step1Title: 'समस्येचे वर्णन करा',
      step1Desc:
        'खड्डे, कचऱ्याचे ढीग, सांडपाणी किंवा बंद पथदिवे साध्या शब्दांत लिहा. अचूक कारवाईसाठी आपला प्रभाग किंवा महत्त्वाची खूण नमूद करा.',
      step1Tag: 'टप्पा १: नोंदणी',
      step2Title: 'जेमिनी AI द्वारे तथ्य संकलन',
      step2Desc:
        'गुगल जेमिनी वस्तुनिष्ठ माहिती वेगळी करते, फोटोंवरून परिस्थिती तपासते आणि लोकसेवा कायद्यानुसार धोक्याचे मूल्यांकन करते.',
      step2Tag: 'टप्पा २: AI विश्लेषण',
      step3Title: 'प्राधिकरण व कालमर्यादा मॅपिंग',
      step3Desc:
        'सिव्हिकब्रिज योग्य महापालिका (PMC, PCMC, PMRDA किंवा महावितरण) निवडते आणि कायद्याने ठरवलेली निराकरण कालमर्यादा जोडते.',
      step3Tag: 'टप्पा ३: दिशा निर्देश',
      step4Title: 'मसुदा कॉपी करून अधिकृत पोर्टलवर सादर करा',
      step4Desc:
        'तयार केलेला औपचारिक मसुदा कॉपी करा आणि शिफारस केलेल्या शासकीय पोर्टलवर (जसे की मनपा, महावितरण किंवा राज्य पोर्टल) जाऊन तक्रार नोंदवा.',
      step4Tag: 'पायरी ४: प्रत्यक्ष कृती',
      disclaimerTitle: 'स्वतंत्र नागरी तंत्रज्ञान उपक्रम',
      disclaimerDesc:
        'सिव्हिकब्रिज AI हा नागरिकांना सक्षम करण्यासाठी तयार केलेला खुला नागरी उपक्रम आहे. हे महापालिकेचे कार्यालय नाही, तर जलद कारवाईसाठी प्रशासकीय भाषेत तक्रार तयार करणारे माध्यम आहे.',
      closeButton: 'बंद करा',
    },
    footer: {
      appName: 'सिव्हिकब्रिज AI',
      tagline: 'नागरी समस्यांपासून प्रत्यक्ष कृतीकडे.',
      description:
        'महाराष्ट्र लोकसेवा हक्क अधिनियम (RTS २०१५) अंतर्गत अचूक AI तंत्रज्ञानाद्वारे नागरी समस्या सोडवण्यासाठी नागरिकांना सक्षम बनवणारा मंच.',
      disclaimer:
        'सिव्हिकब्रिज AI ही एक स्वतंत्र सार्वजनिक सुविधा आहे. येथे वैयक्तिक माहिती साठवली जात नाही किंवा लॉगिनची आवश्यकता नाही. तक्रारी नागरिक थेट शासकीय पोर्टलवर दाखल करतात.',
      pilotNotice: 'प्राधान्य क्षेत्र: पुणे महानगर क्षेत्र (PMC व PCMC). संपूर्ण महाराष्ट्रात कार्यरत.',
      rightsReserved: 'सिव्हिकब्रिज AI • सार्वजनिक हिताचे मुक्त तंत्रज्ञान',
    },
    voice: {
      speakButton: 'समस्या बोलून सांगा',
      listening: 'ऐकत आहे... कृपया माईकमध्ये स्पष्ट बोला',
      requestingPermission: 'मायक्रोफोन परवानगी विचारत आहे...',
      stopButton: 'रेकॉर्डिंग थांबवा',
      retryButton: 'पुन्हा बोलण्याचा प्रयत्न करा',
      spokenLangLabel: 'बोलण्याची भाषा:',
      spokenLanguages: {
        'en-IN': 'English (इंग्रजी)',
        'hi-IN': 'हिंदी (Hindi)',
        'mr-IN': 'मराठी (Marathi)',
      },
      transcriptReadyTitle: 'आवाज मजकूर संकलित झाला',
      insertDirectly: 'वर्णनात जोडा',
      appendButton: 'मजकुराच्या पुढे जोडा',
      replaceButton: 'आधीचा मजकूर बदलून लिहा',
      discardButton: 'रद्द करा',
      statusBadge: {
        ready: 'माईक सज्ज आहे',
        listening: 'आवाज रेकॉर्ड होत आहे...',
        completed: 'मजकूर तयार आहे',
        denied: 'माईक परवानगी नाकारली',
        unsupported: 'व्हॉइस असमर्थित',
        error: 'आवाज ओळखण्यात त्रुटी',
      },
      deniedError:
        'मायक्रोफोन परवानगी नाकारली आहे. कृपया ब्राउझर सेटिंग्जमध्ये माईकची परवानगी द्या किंवा खाली स्वतः समस्या टाईप करा.',
      unsupportedNotice:
        'या ब्राउझरमध्ये आवाज ओळखण्याचे तंत्रज्ञान (Web Speech) उपलब्ध नाही. कृपया Chrome, Edge, किंवा Safari वापरा किंवा स्वतः मजकूर टाईप करा.',
      genericError:
        'आवाज ओळखताना त्रुटी आली. कृपया "पुन्हा प्रयत्न करा" वर क्लिक करा किंवा खाली स्वतः टाईप करा.',
      interimHint: 'आपले बोलणे ऐकत आहे (थेट पूर्वावलोकन)...',
      ariaMicrophone: 'मायक्रोफोन वापरून समस्या बोलून सांगा',
      ariaStop: 'व्हॉइस रेकॉर्डिंग थांबवा',
      ariaRetry: 'पुन्हा व्हॉइस इनपुट सुरू करा',
    },
    whereToSubmit: {
      sectionTitle: 'तक्रार कुठे सादर करावी (Where to Submit)',
      sectionSubtitle: 'नागरी समस्येचा प्रकार आणि नोंदवलेल्या ठिकाणानुसार सुचवलेले अधिकृत शासकीय कार्यालय',
      recommendedAuthorityHeading: 'सुचवलेले अधिकृत प्राधिकरण',
      whyResponsibleHeading: 'हे प्राधिकरण का जबाबदार असू शकते',
      confidenceHeading: 'प्राधिकरणाची संभाव्यता',
      confidenceLabels: {
        LIKELY: 'संभाव्य मुख्य प्राधिकरण (Likely authority)',
        POSSIBLE: 'संभाव्य प्राधिकरण — कृपया खात्री करा (Possible authority)',
        UNCONFIRMED: 'प्राधिकरण अधिकृतपणे निश्चित नाही (Authority not confirmed)',
      },
      officialSourceLabel: 'अधिकृत माहिती स्रोत',
      sourceStatusNotice: 'अधिकृत माहिती स्रोत — नागरिकांनी खात्री करणे आवश्यक. हा प्राथमिक संभाव्य स्रोत असून थेट तक्रार सुविधेची हमी नाही.',
      submissionInstructionsHeading: 'तक्रार सादर करण्याच्या पायऱ्या',
      step1: '१. अर्जाचा मसुदा तपासा आणि खालील "तक्रार कॉपी करा" बटणावर क्लिक करा.',
      step2: '२. पुढे जाण्यापूर्वी पुराव्यांची तपासणी सूची (चेकलिस्ट) पूर्ण असल्याची खात्री करा.',
      step3: '३. संबंधित शासकीय वेबसाइटवर जाण्यासाठी "अधिकृत पोर्टल उघडा" बटणावर क्लिक करा.',
      step4: '४. पोर्टलवरील फॉर्ममध्ये मसुदा पेस्ट करा, छायाचित्रे जोडा आणि अधिकृत नोंदणी क्रमांक लिहून ठेवा.',
      evidenceChecklistHeading: 'पुराव्यांची तपासणी सूची (Evidence Checklist)',
      checklistPhotos: 'छायाचित्रे जोडलेली आहेत (परिसरातील खुणेसह स्पष्ट फोटो)',
      checklistPhotosMissing: 'पर्यायी: अधिकृत चौकशीसाठी छायाचित्र जोडल्यास मदत होईल',
      checklistLocation: 'विशिष्ट रस्ता, परिसर किंवा जीपीएस स्थान नोंदवले आहे',
      checklistLocationMissing: 'नोंदवलेले ठिकाण (तक्रार दाखल करण्यापूर्वी हद्द तपासा)',
      checklistDescription: 'तारीख, गांभीर्य व तथ्यांसह वस्तुनिष्ठ तक्रार वर्णन',
      checklistContact: 'ओटीपी व एसएमएस सूचनांसाठी नागरिकाचा मोबाईल क्रमांक तयार आहे',
      openPortalButton: 'अधिकृत पोर्टल उघडा',
      copyComplaintButton: 'तक्रार मसुदा कॉपी करा',
      copiedComplaintButton: 'तक्रार कॉपी झाली!',
      portalDisclaimerNotice: 'अधिकृत पोर्टल उघडल्याने तक्रार परस्पर दाखल होत नाही. CivicBridge AI कधीही बनावट पोचपावती क्रमांक तयार करत नाही किंवा थेट सबमिशनचा खोटा दावा करत नाही.',
      notOfficiallyConfirmedDisclaimer: 'प्राधिकरणाची शिफारस ही केवळ शासकीय प्रशासकीय माहितीवर आधारित मार्गदर्शक मदत आहे. ही अधिकृत खात्रीशीर मान्यता नाही.',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // HINDI (हिंदी)
  // ───────────────────────────────────────────────────────────────────────────
  hi: {
    common: {
      appName: 'सिविकब्रिज AI',
      tagline: 'नागरिक समस्याओं से समाधान तक।',
      phaseBadge: 'एआई-संचालित नागरिक शिकायत सहायक',
      pilotRegionLabel: 'प्राथमिकता क्षेत्र:',
      pilotRegionValue: 'पुणे महानगर क्षेत्र (PMC व PCMC)',
      loading: 'लोड हो रहा है...',
      error: 'एक त्रुटि उत्पन्न हुई',
    },
    nav: {
      howItWorks: 'यह कैसे काम करता है',
      authorities: 'प्राधिकरण व हेल्पलाइन',
      selectLanguage: 'भाषा चुनें',
      draftLanguageLabel: 'शिकायत प्रारूप भाषा',
      languageMenuTitle: 'शिकायत प्रारूप व इंटरफेस भाषा',
      languageMenuNote: 'जेमिनी AI चुनी हुई भाषा में औपचारिक शिकायत पत्र तैयार करेगा।',
      openMenu: 'नेविगेशन मेनू खोलें',
      closeMenu: 'नेविगेशन मेनू बंद करें',
      activeLanguage: 'सक्रिय भाषा',
    },
    hero: {
      badge: 'जेमिनी एआई विश्लेषण • बहुभाषी समर्थन • स्थान सहायता • प्राधिकरण खोज',
      title: 'नागरिक समस्याओं से समाधान तक।',
      subtitle:
        'सड़क के गड्ढे, कचरे का ढेर, ड्रेनेज ओवरफ्लो, पानी का रिसाव या बंद स्ट्रीट लाइट की समस्या बताएं। सिविकब्रिज AI गूगल जेमिनी की मदद से आपकी शिकायत का विश्लेषण कर औपचारिक प्रारूप तैयार करता है और संबंधित महाराष्ट्र प्राधिकरण पोर्टल पर जमा करने हेतु मार्गदर्शन करता है।',
      zeroLogin: 'कोई लॉगिन या व्यक्तिगत डेटा ट्रैकिंग नहीं',
      antiHallucination: 'तथ्यों का सटीक संरक्षण और यथार्थवादी विश्लेषण',
      wardMapping: 'स्थान सहायता एवं प्राधिकरण खोज',
    },
    form: {
      title: 'नागरिक शिकायत पंजीकरण कार्यस्थान',
      subtitle:
        'नीचे समस्या का विवरण दें। गूगल जेमिनी प्रमाणित तथ्य निकालेगा, जनसुरक्षा जोखिम का आकलन करेगा और औपचारिक शिकायत पत्र तैयार करेगा।',
      categoryLabel: 'समस्या की श्रेणी',
      categorySelectHelp: 'RTS समय-सीमा लागू करने के लिए उपयुक्त नागरिक श्रेणी चुनें',
      descriptionLabel: 'नागरिक समस्या का विवरण दें',
      descriptionPlaceholder:
        'उदा. स्कूल के मुख्य गेट के पास मुख्य सड़क पर लगभग २ फीट चौड़ा व गहरा गड्ढा है, जिससे दोपहिया वाहन चालक फिसल रहे हैं...',
      descriptionHelp: 'सटीक स्थान, समस्या की अवधि और जनसुरक्षा के जोखिम का स्पष्ट उल्लेख करें।',
      minCharsNotice: 'सटीक विश्लेषण के लिए न्यूनतम १५ अक्षर आवश्यक हैं',
      samplesTitle: 'पुणे प्राथमिकता के नमूना उदाहरण:',
      samplesSubtitle: 'यथार्थवादी परिदृश्य स्वतः भरने हेतु किसी भी नमूने पर क्लिक करें',
      submitButton: 'विश्लेषण करें व शिकायत तैयार करें',
      submittingButton: 'जेमिनी AI द्वारा विश्लेषण जारी है...',
      resetButton: 'फ़ॉर्म साफ़ करें',
      validation: {
        descRequired: 'शिकायत तैयार करने से पहले कृपया समस्या का विवरण दर्ज करें।',
        descTooShort:
          'कृपया थोड़ा और विवरण दें (कम से कम १५ अक्षर), ताकि वार्ड कार्यालय समस्या की जांच आसानी से कर सके।',
        districtRequired:
          'उचित महाराष्ट्र प्राधिकरण की पहचान के लिए कृपया जिला चुनें।',
      },
    },
    categories: {
      pothole: {
        label: 'सड़क के गड्ढे व मरम्मत',
        desc: 'गड्ढे, उखड़ा हुआ डामर, खतरनाक खाइयां या टूटे डिवाइडर।',
      },
      garbage: {
        label: 'कचरा प्रबंधन व स्वच्छता',
        desc: 'कचरा न उठना, खुले में कचरा डंपिंग या कूड़ेदान का ओवरफ्लो होना।',
      },
      drainage: {
        label: 'ड्रेनेज व सीवेज ओवरफ्लो',
        desc: 'अवरुद्ध नाले, खुले मैनहोल से बहता गंदा पानी या दुर्गंध।',
      },
      water_supply: {
        label: 'जलापूर्ति व दूषित जल',
        desc: 'पाइपलाइन फटना, कम दबाव, मटमैला पानी या जलापूर्ति ठप होना।',
      },
      streetlight: {
        label: 'स्ट्रीटलाइट व अंधेरा स्थल',
        desc: 'बंद पड़ी स्ट्रीटलाइटें, लटकते बिजली के तार या अंधेरे सार्वजनिक मार्ग।',
      },
      electricity: {
        label: 'महावितरण विद्युत समस्या',
        desc: 'ट्रांसफार्मर में स्पार्क, लंबे समय तक बिजली कटौती या खुला फीडर बॉक्स।',
      },
      encroachment: {
        label: 'फुटपाथ पर अतिक्रमण',
        desc: 'अवैध अवरोध, पैदल चलने वालों का रास्ता रोकते रेहड़ी-पटरी वाले या मलबा।',
      },
      other: {
        label: 'अन्य नागरिक शिकायत',
        desc: 'आवारा पशु, सार्वजनिक पार्क, सार्वजनिक शौचालयों की देखरेख आदि।',
      },
    },
    samples: [
      {
        title: 'बानेर मुख्य मार्ग गड्ढा',
        category: 'pothole',
        district: 'Pune',
        city: 'Pune',
        area: 'Baner - Balewadi',
        streetLandmark: 'डी-मार्ट के पास, हाई स्ट्रीट जंक्शन की ओर ५० मीटर',
        description:
          'बानेर मुख्य मार्ग पर बाईं लेन में लगभग २ फीट चौड़ा और ६ इंच गहरा खतरनाक गड्ढा हो गया है। शाम के समय दो दोपहिया वाहन फिसल चुके हैं। किसी गंभीर दुर्घटना से पहले तुरंत डामरीकरण आवश्यक है।',
      },
      {
        title: 'शिवाजीनगर कचरा डंप',
        category: 'garbage',
        district: 'Pune',
        city: 'Pune',
        area: 'Shivajinagar',
        streetLandmark: 'रेलवे स्टेशन सबवे निकास के सामने',
        description:
          'पिछले ४ दिनों से फुटपाथ पर ठोस नगरपालिका कचरा और सड़ा हुआ खाना जमा है। आवारा पशु सड़क पर कचरा फैला रहे हैं, जिससे अत्यधिक दुर्गंध और बीमारी का खतरा पैदा हो रहा है।',
      },
      {
        title: 'कोथरूड मटमैला पानी',
        category: 'water_supply',
        district: 'Pune',
        city: 'Pune',
        area: 'Kothrud',
        streetLandmark: 'आइडियल कॉलोनी ग्राउंड के पास, गली नं. ३',
        description:
          'सुबह ६ से ८ बजे के दौरान आने वाला पीने का पानी पिछले २ दिनों से मटमैला और दुर्गंधयुक्त आ रहा है। भूमिगत सीवेज पाइपलाइन मिलने की आशंका है। नागरिक निजी टैंकर मंगाने को मजबूर हैं।',
      },
      {
        title: 'हिंजवड़ी स्ट्रीटलाइट बंद',
        category: 'streetlight',
        district: 'Pune',
        city: 'Pune',
        area: 'Hinjawadi (Phase 1-3, PMRDA)',
        streetLandmark: 'फेज १ से फेज २ को जोड़ने वाला मार्ग, कॉग्निजेंट सर्कल के पास',
        description:
          'लगातार ६ स्ट्रीटलाइट खंभे एक सप्ताह से बंद पड़े हैं, जिससे पूरा मार्ग अंधेरे में डूब गया है। यह नाइट शिफ्ट कर्मियों और पैदल यात्रियों के लिए गंभीर सुरक्षा जोखिम है।',
      },
    ],
    photos: {
      title: 'फोटो साक्ष्य (जेमिनी विज़न)',
      subtitle: 'नुकसान और सुरक्षा खतरों की पुष्टि हेतु अधिकतम ५ फोटो संलग्न करें।',
      dragDropText: 'फोटो यहाँ खींचें, या',
      dragDropSubtext: 'प्रत्येक १० MB तक के JPG, PNG, WebP फोटो समर्थित हैं',
      browseButton: 'फ़ाइलें चुनें',
      captureButton: 'कैमरा उपयोग करें',
      maxLimitNotice: 'अधिकतम ५ फोटो जोड़े जा चुके हैं। नया फोटो जोड़ने के लिए पहले का फोटो हटाएं।',
      slotsRemaining: (count) => `अधिकतम ${count} और फोटो जोड़े जा सकते हैं`,
      removePhotoAria: (name) => `${name} फोटो हटाएं`,
      previewAria: (name) => `${name} फोटो बड़ा देखें`,
      closePreview: 'फोटो पूर्वावलोकन बंद करें',
      sizeError: (name, size, max) =>
        `"${name}" फ़ाइल बहुत बड़ी है (${size})। अधिकतम आकार ${max} है।`,
      formatError: (name, allowed) =>
        `"${name}" समर्थित प्रारूप नहीं है। कृपया ${allowed} उपयोग करें।`,
      limitError: (canAccept, skipped) =>
        `आप केवल ${canAccept} और फोटो जोड़ सकते हैं। ${skipped} फ़ाइलें छोड़ दी गईं।`,
    },
    location: {
      title: 'स्थान एवं क्षेत्राधिकार (महाराष्ट्र)',
      subtitle:
        'समस्या का सटीक स्थान बताएं। जिले के अतिरिक्त अन्य विवरण वैकल्पिक हैं, परंतु विस्तार से जांच में आसानी होती है।',
      gpsSectionTitle: 'डिवाइस का स्थान (वैकल्पिक)',
      gpsButton: 'मेरा वर्तमान स्थान उपयोग करें',
      gpsDetecting: 'GPS स्थान खोजा जा रहा है...',
      gpsSuccessBadge: 'GPS स्थान प्राप्त',
      gpsAccuracy: (m) => `±${m} मीटर सटीकता`,
      clearGps: 'GPS हटाएं',
      stateLabel: 'राज्य',
      districtLabel: 'जिला *',
      districtPlaceholder: 'महाराष्ट्र का जिला चुनें',
      cityLabel: 'शहर / नगरपालिका',
      cityPlaceholder: 'शहर चुनें या लिखें',
      areaLabel: 'क्षेत्र / इलाका / वार्ड',
      areaPlaceholder: 'उदा. कोथरूड, औंध, हिंजवड़ी फेज १, वाकड...',
      areaDatalistHint: 'पुणे जिले के लिए सुझाव उपलब्ध हैं',
      streetLabel: 'सड़क / लैंडमार्क',
      streetPlaceholder: 'उदा. डी-मार्ट के पास, गली नं. ४, एसबीआई बैंक के सामने...',
      pincodeLabel: 'पिन कोड',
      pincodePlaceholder: '६ अंकों का पिन कोड (उदा. ४११०३८)',
      suggestedAuthorityLabel: 'संभावित नागरिक प्राधिकरण:',
      suggestedAuthorityHint:
        'शहर/जिले के आधार पर सुझाया गया। अंतिम शिकायत नगर नियमों के अनुसार प्रेषित होगी।',
      gpsStatus: {
        denied:
          'ब्राउज़र द्वारा स्थान की अनुमति अस्वीकार कर दी गई। कृपया नीचे स्थान स्वयं लिखें या ब्राउज़र सेटिंग में अनुमति दें।',
        unavailable:
          'डिवाइस का स्थान निर्धारित नहीं हो सका (उदा. इनडोर या एयरप्लेन मोड)। कृपया स्वयं स्थान भरें।',
        timeout: 'स्थान खोजने का समय समाप्त हो गया। कृपया नीचे स्थान स्वयं दर्ज करें।',
        unsupported: 'आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है। कृपया स्वयं स्थान भरें।',
      },
    },
    results: {
      title: 'जेमिनी शिकायत विश्लेषण',
      statusAwaiting: 'विवरण की प्रतीक्षा',
      statusAnalyzing: 'विश्लेषण जारी...',
      statusReady: 'विश्लेषण तैयार',
      statusError: 'त्रुटि',
      idleTitle: 'वास्तविक जेमिनी AI विश्लेषण कार्यक्षेत्र',
      idleSubtitle:
        'बाईं ओर समस्या का विवरण दें और "विश्लेषण करें व शिकायत तैयार करें" पर क्लिक करें। आधिकारिक जेमिनी API तथ्यों को व्यवस्थित करेगा और संपादन योग्य शिकायत प्रारूप तैयार करेगा।',
      pipelineHeading: 'संरचित जेमिनी प्रक्रिया:',
      step1Title: 'तथ्य संकलन:',
      step1Desc: 'नागरिक के तथ्यों को सुरक्षित रखता है, भौतिक टिप्पणियों को अलग करता है, भ्रामक विवरण नहीं जोड़ता।',
      step2Title: 'सुरक्षा मूल्यांकन:',
      step2Desc: 'महाराष्ट्र RTS मानकों के तहत पैदल यात्रियों और वाहनों के जोखिम स्तर का आकलन करता है।',
      step3Title: 'औपचारिक आवेदन प्रारूप:',
      step3Desc: 'हिंदी, मराठी या अंग्रेजी में सम्मानजनक एवं संपादन योग्य शिकायत पत्र तैयार करता है।',
      step4Title: 'मार्गदर्शन एवं ट्रैकिंग:',
      step4Desc: 'पुणे नगर निगम/पिंपरी चिंचवड हेल्पलाइन और टोकन नंबर ट्रैकिंग के लिए सही मार्ग बताता है।',
      loadingTitle: 'जेमिनी AI द्वारा नागरिक समस्या का विश्लेषण जारी',
      loadingSubtitle:
        'तथ्यों का संकलन, लोक सेवा गारंटी अधिनियम (RTS २०१५) के तहत सुरक्षा मूल्यांकन और औपचारिक प्रारूप तैयार किया जा रहा है...',
      loadingProgress: 'बैकएंड मॉडल कॉल प्रगति पर है',
      errorTitle: 'विश्लेषण अनुरोध विफल',
      apiKeyRequiredTitle: 'जेमिनी API कुंजी आवश्यक है',
      apiKeyInstruction1: 'कृपया बैकएंड कॉन्फ़िगरेशन फ़ाइल देखें:',
      apiKeyInstruction2: 'अपनी गूगल जेमिनी कुंजी जोड़ें:',
      apiKeyNote: 'सहेजने के बाद बैकएंड पुनः आरंभ करें या नीचे पुनः प्रयास करें।',
      retryButton: 'पुनः प्रयास करें',
      reviewInputsButton: 'दर्ज विवरण जांचें',
      cardHeaderTitle: 'संरचित नागरिक विश्लेषण',
      targetAuthorityLabel: 'लक्षित प्राधिकरण',
      wardLabel: 'वार्ड',
      priorityLabels: {
        CRITICAL: 'अति आवश्यक (CRITICAL)',
        HIGH: 'उच्च प्राथमिकता (HIGH)',
        MEDIUM: 'मध्यम प्राथमिकता (MEDIUM)',
        LOW: 'सामान्य प्राथमिकता (STANDARD)',
      },
      incidentSummaryTitle: 'समस्या का निष्पक्ष सारांश',
      slaPrefix: 'समाधान समय-सीमा:',
      rtsActSuffix: 'घंटे (RTS अधिनियम)',
      triageJustification: 'प्राथमिकता का कारण:',
      factsTitle: (count) => `नागरिक द्वारा दिए गए तथ्य (${count})`,
      observationsTitle: 'तस्वीरों से भौतिक टिप्पणियां',
      noObservations: 'कोई विशेष भौतिक माप दर्ज नहीं किया गया',
      missingInfoTitle: 'वार्ड टीम के लिए शेष आवश्यक जानकारी',
      allInfoProvided: 'सभी आवश्यक स्थान विवरण उपलब्ध कराए गए हैं',
      safetyHazardsTitle: 'जनसुरक्षा एवं स्वास्थ्य खतरे',
      noHazards: 'कोई गंभीर द्वितीयक खतरा नहीं पाया गया',
      draftTitle: 'औपचारिक शिकायत आवेदन (संपादन योग्य)',
      citizenEditedBadge: 'नागरिक द्वारा संपादित',
      restoreOriginalDraft: 'मूल प्रारूप वापस लाएं',
      charCount: (count) => `${count} अक्षर`,
      copyButton: 'शिकायत प्रारूप कॉपी करें',
      copiedButton: 'शिकायत प्रारूप क्लिपबोर्ड पर कॉपी हो गया!',
      downloadButton: 'आवेदन डाउनलोड करें (.txt)',
      printButton: 'प्रिंट करें / PDF सहेजें',
      pasteInstruction: 'PMC Care WhatsApp (+91 96899 00002) या पोर्टल पर पेस्ट करने हेतु तैयार।',
      nextStepTitle: 'अनुशंसित अगला कदम व आधिकारिक माध्यम',
      limitationsTitle: 'सिविकब्रिज AI की सीमाएं एवं अस्वीकरण',
      analyzedAt: (time) => `विश्लेषण समय: ${time}`,
      reportLanguageLabel: 'शिकायत प्रारूप भाषा:',
      languageMismatchNotice: (reportLang, currentLang) =>
        `यह शिकायत पत्र ${reportLang} भाषा में तैयार किया गया था। आपकी सक्रिय इंटरफ़ेस भाषा अब ${currentLang} है।`,
      regenerateInCurrentLang: (langName) => `${langName} में पुनः तैयार करें`,
      keepExistingReport: 'मौजूदा प्रारूप रखें',
    },
    authorities: {
      title: 'महाराष्ट्र एवं पुणे नागरिक प्राधिकरण मार्गदर्शिका',
      subtitle:
        'आधिकारिक शिकायत संपर्क नंबर, वेब पोर्टल, व्हाट्सएप हेल्पलाइन और महाराष्ट्र लोक सेवा गारंटी अधिनियम (RTS २०१५) के तहत निवारण समय-सीमा।',
      verifiedBadge: 'प्रमाणित आधिकारिक माध्यम',
      tabSuffix: '',
      helplineLabel: 'आधिकारिक हेल्पलाइन',
      whatsappLabel: 'व्हाट्सएप शिकायत',
      portalLabel: 'आधिकारिक पोर्टल',
      headquartersLabel: 'मुख्यालय',
      departmentsTitle: 'जिम्मेदार विभाग',
      slaTableTitle: 'वैधानिक समाधान समय-सीमा (RTS अधिनियम २०१५)',
      slaTableSubtitle: 'महाराष्ट्र के नागरिकों हेतु कानूनी रूप से बाध्यकारी सेवा मानक',
      colCategory: 'नागरिक समस्या की श्रेणी',
      colTargetHours: 'अधिकतम समय',
      colLegalAct: 'कानूनी प्रावधान',
      colTier1: 'प्रथम अपीलीय अधिकारी',
      colTier2: 'द्वितीय अपीलीय अधिकारी',
      rtsCharterNote:
        'लोक सेवा गारंटी अधिनियम के तहत नागरिकों को टोकन नंबर प्राप्त करने और समय-सीमा पार होने पर लिखित स्पष्टीकरण मांगने का अधिकार है।',
    },
    howItWorks: {
      modalTitle: 'सिविकब्रिज AI कैसे काम करता है?',
      modalSubtitle: 'नागरिकों की आवाज़ को आधिकारिक प्रशासनिक कार्रवाई में बदलना',
      step1Title: 'समस्या का विवरण दें',
      step1Desc:
        'सड़क के गड्ढे, कचरे का ढेर, ड्रेनेज या बंद स्ट्रीटलाइट का विवरण सरल शब्दों में दें। सटीक कार्रवाई हेतु अपना वार्ड या लैंडमार्क दर्ज करें।',
      step1Tag: 'चरण १: इनपुट',
      step2Title: 'जेमिनी AI द्वारा तथ्य संरचना',
      step2Desc:
        'गूगल जेमिनी निष्पक्ष तथ्यों को अलग करता है, फोटो से स्थिति की पुष्टि करता है और लोक सेवा गारंटी कानून के तहत सुरक्षा जोखिम का आकलन करता है।',
      step2Tag: 'चरण २: AI विश्लेषण',
      step3Title: 'प्राधिकरण एवं समय-सीमा मैपिंग',
      step3Desc:
        'सिविकब्रिज उचित नगर निगम (PMC, PCMC, PMRDA या महावितरण) को शिकायत निर्देशित करता है और अनिवार्य कानूनी समय-सीमा जोड़ता है।',
      step3Tag: 'चरण ३: रूटिंग',
      step4Title: 'ड्राफ्ट कॉपी करें और आधिकारिक पोर्टल पर सबमिट करें',
      step4Desc:
        'तैयार औपचारिक आवेदन कॉपी करें और अनुशंसित सरकारी पोर्टल (जैसे मनपा, महावितरण या राज्य पोर्टल) पर जाकर शिकायत दर्ज करें।',
      step4Tag: 'चरण ४: कार्रवाई',
      disclaimerTitle: 'स्वतंत्र नागरिक तकनीक पहल',
      disclaimerDesc:
        'सिविकब्रिज AI नागरिकों को सशक्त बनाने हेतु एक खुला नागरिक उपकरण है। यह नगर निगम का कार्यालय नहीं है, बल्कि प्रशासनिक भाषा में सटीक शिकायत तैयार करने का माध्यम है।',
      closeButton: 'बंद करें',
    },
    footer: {
      appName: 'सिविकब्रिज AI',
      tagline: 'नागरिक समस्याओं से समाधान तक।',
      description:
        'महाराष्ट्र लोक सेवा गारंटी अधिनियम (RTS २०१५) के तहत सटीक AI तकनीक के माध्यम से नागरिक समस्याओं के निवारण हेतु एक स्वतंत्र मंच।',
      disclaimer:
        'सिविकब्रिज AI एक स्वतंत्र नागरिक उपयोगिता है। यह व्यक्तिगत डेटा संग्रहीत नहीं करता और न ही लॉगिन की आवश्यकता होती है। नागरिक सीधे सरकारी पोर्टल पर शिकायत दर्ज करते हैं।',
      pilotNotice: 'प्राथमिकता क्षेत्र: पुणे महानगर क्षेत्र (PMC व PCMC)। संपूर्ण महाराष्ट्र में सक्रिय।',
      rightsReserved: 'सिविकब्रिज AI • जनहित में खुला नागरिक तंत्रज्ञान',
    },
    voice: {
      speakButton: 'समस्या बोलकर बताएं',
      listening: 'सुन रहा है... कृपया माइक में स्पष्ट बोलें',
      requestingPermission: 'माइक्रोफोन की अनुमति मांगी जा रही है...',
      stopButton: 'रिकॉर्डिंग रोकें',
      retryButton: 'पुनः बोलें',
      spokenLangLabel: 'बोलने की भाषा:',
      spokenLanguages: {
        'en-IN': 'English (अंग्रेज़ी)',
        'hi-IN': 'हिन्दी (Hindi)',
        'mr-IN': 'मराठी (Marathi)',
      },
      transcriptReadyTitle: 'ध्वनि पाठ्य दर्ज हुआ',
      insertDirectly: 'विवरण में जोड़ें',
      appendButton: 'वर्तमान विवरण के आगे जोड़ें',
      replaceButton: 'मौजूदा विवरण बदलकर लिखें',
      discardButton: 'रद्द करें',
      statusBadge: {
        ready: 'माइक तैयार है',
        listening: 'ध्वनि रिकॉर्ड हो रही है...',
        completed: 'पाठ्य तैयार है',
        denied: 'माइक की अनुमति नहीं मिली',
        unsupported: 'आवाज़ असमर्थित',
        error: 'पहचान में त्रुटि',
      },
      deniedError:
        'माइक्रोफोन की अनुमति अस्वीकार कर दी गई। कृपया ब्राउज़र सेटिंग्स में माइक की अनुमति दें या नीचे समस्या स्वयं टाइप करें।',
      unsupportedNotice:
        'इस ब्राउज़र में आवाज़ पहचान तकनीक (Web Speech API) समर्थित नहीं है। कृपया Chrome, Edge या Safari का उपयोग करें अथवा स्वयं टाइप करें।',
      genericError:
        'आवाज़ पहचानते समय समस्या आई। कृपया "पुनः बोलें" पर क्लिक करें अथवा विवरण स्वयं टाइप करें।',
      interimHint: 'आपकी आवाज़ सुन रहा है (सजीव पूर्वावलोकन)...',
      ariaMicrophone: 'माइक का उपयोग कर समस्या बोलकर बताएं',
      ariaStop: 'ध्वनि रिकॉर्डिंग रोकें',
      ariaRetry: 'ध्वनि पहचान पुनः प्रारंभ करें',
    },
    whereToSubmit: {
      sectionTitle: 'शिकायत कहां दर्ज करें (Where to Submit)',
      sectionSubtitle: 'समस्या की श्रेणी और आपके द्वारा बताए गए स्थान के आधार पर अनुशंसित आधिकारिक निकाय',
      recommendedAuthorityHeading: 'अनुशंसित आधिकारिक प्राधिकरण',
      whyResponsibleHeading: 'यह प्राधिकरण क्यों उत्तरदायी हो सकता है',
      confidenceHeading: 'प्राधिकरण की संभावना',
      confidenceLabels: {
        LIKELY: 'संभावित मुख्य प्राधिकरण (Likely authority)',
        POSSIBLE: 'संभावित प्राधिकरण — कृपया पुष्टि करें (Possible authority)',
        UNCONFIRMED: 'प्राधिकरण की पुष्टि नहीं हुई (Authority not confirmed)',
      },
      officialSourceLabel: 'आधिकारिक सूचना स्रोत',
      sourceStatusNotice: 'आधिकारिक सूचना स्रोत — पुष्टि आवश्यक। यह प्रारंभिक प्रत्याशी स्रोत है, सीधी शिकायत की उपलब्धता का प्रमाण नहीं।',
      submissionInstructionsHeading: 'शिकायत दर्ज करने के निर्देश',
      step1: '1. ड्राफ्ट देखें और नीचे दिए गए "शिकायत कॉपी करें" बटन पर क्लिक करें।',
      step2: '2. आगे बढ़ने से पहले साक्ष्य चेकलिस्ट में सभी विवरणों की जांच करें।',
      step3: '3. बाहरी सरकारी पोर्टल पर जाने के लिए "आधिकारिक पोर्टल खोलें" पर क्लिक करें।',
      step4: '4. पोर्टल के फॉर्म में शिकायत पेस्ट करें, फोटो अपलोड करें और आधिकारिक टोकन नंबर नोट करें।',
      evidenceChecklistHeading: 'साक्ष्य चेकलिस्ट (Evidence Checklist)',
      checklistPhotos: 'फोटो साक्ष्य संलग्न (स्पष्ट दृश्य और पहचान योग्य लैंडमार्क)',
      checklistPhotosMissing: 'वैकल्पिक: आधिकारिक जांच हेतु फोटो जोड़ना उपयोगी रहेगा',
      checklistLocation: 'विशिष्ट सड़क, क्षेत्र या जीपीएस निर्देशांक दर्ज हैं',
      checklistLocationMissing: 'दर्ज किया गया स्थान (दर्ज करने से पहले प्रशासनिक सीमा की पुष्टि करें)',
      checklistDescription: 'गंभीरता और तथ्यों के साथ वस्तुनिष्ठ समस्या विवरण',
      checklistContact: 'ओटीपी और आधिकारिक एसएमएस के लिए मोबाइल नंबर तैयार है',
      openPortalButton: 'आधिकारिक पोर्टल खोलें',
      copyComplaintButton: 'शिकायत ड्राफ्ट कॉपी करें',
      copiedComplaintButton: 'शिकायत कॉपी हो गई!',
      portalDisclaimerNotice: 'बाहरी पोर्टल खोलने से शिकायत स्वतः दर्ज नहीं होती। CivicBridge AI कभी भी फर्जी पावती संख्या नहीं बनाता और न ही आपकी ओर से स्वतः सबमिट करता है।',
      notOfficiallyConfirmedDisclaimer: 'प्राधिकरण की सिफारिशें सार्वजनिक प्रशासनिक नियमों पर आधारित एक सहायक मार्गदर्शिका हैं। ये आधिकारिक तौर पर पुष्ट नहीं हैं।',
    },
  },
};

export const LANGUAGE_DISPLAY_NAMES: Record<OutputLanguage, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  mr: { name: 'Marathi', nativeName: 'मराठी' },
  hi: { name: 'Hindi', nativeName: 'हिंदी' },
};
