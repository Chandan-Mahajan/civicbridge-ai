import type { CivicCategory, LocationDetails } from '../types';

export type AuthorityConfidence = 'LIKELY' | 'POSSIBLE' | 'UNCONFIRMED';

export interface OfficialSource {
  id: string;
  name: string;
  marathiName: string;
  hindiName: string;
  url: string;
  verificationStatus: string;
  scope: string;
}

export interface AuthorityRecommendation {
  sourceId: string;
  authorityName: string;
  marathiAuthorityName: string;
  hindiAuthorityName: string;
  whyResponsible: {
    en: string;
    hi: string;
    mr: string;
  };
  confidence: AuthorityConfidence;
  officialSource: OfficialSource;
  submissionCaveat: {
    en: string;
    hi: string;
    mr: string;
  };
  evidenceChecklist: {
    hasPhotos: boolean;
    hasLocation: boolean;
    hasDescription: boolean;
  };
}

/**
 * Initial Official-Source Directory
 * As specified in Phase 7 requirements:
 * 1. Maharashtra state grievance portal: https://grievances.maharashtra.gov.in/
 * 2. Maharashtra PWD grievance page: https://pwd.maharashtra.gov.in/en/grievance-redressal/
 * 3. Pune Municipal Corporation services: https://efaq.pmc.gov.in/en
 * 4. Pune district grievance information: https://pune.gov.in/en/service/grievance-monitoring/
 * 5. MSEDCL complaint service: https://wss.mahadiscom.in/wss/wss?Lang=English&uiActionName=getServiceRequestConsumerDetailsLink
 * 6. CPGRAMS: https://pgportal.gov.in/
 *
 * NOTE: These are candidate sources requiring citizen confirmation prior to submission.
 */
export const OFFICIAL_SOURCES: Record<string, OfficialSource> = {
  MAHA_GRIEVANCE: {
    id: 'MAHA_GRIEVANCE',
    name: 'Maharashtra State Grievance Portal',
    marathiName: 'महाराष्ट्र राज्य तक्रार निवारण पोर्टल',
    hindiName: 'महाराष्ट्र राज्य शिकायत निवारण पोर्टल',
    url: 'https://grievances.maharashtra.gov.in/',
    verificationStatus: 'Official information source requiring confirmation',
    scope: 'State Government of Maharashtra (All Departments & District Offices)',
  },
  MAHA_PWD: {
    id: 'MAHA_PWD',
    name: 'Maharashtra Public Works Department (PWD)',
    marathiName: 'महाराष्ट्र सार्वजनिक बांधकाम विभाग (PWD)',
    hindiName: 'महाराष्ट्र लोक निर्माण विभाग (PWD)',
    url: 'https://pwd.maharashtra.gov.in/en/grievance-redressal/',
    verificationStatus: 'Official information source requiring confirmation',
    scope: 'State Highways, Major District Roads & State Infrastructure',
  },
  PMC_SERVICES: {
    id: 'PMC_SERVICES',
    name: 'Pune Municipal Corporation (PMC) Citizen Services',
    marathiName: 'पुणे महानगरपालिका (PMC) नागरिक सेवा',
    hindiName: 'पुणे नगर निगम (PMC) नागरिक सेवाएं',
    url: 'https://efaq.pmc.gov.in/en',
    verificationStatus: 'Official information source requiring confirmation',
    scope: 'Pune City Municipal Corporation (15 Administrative Wards)',
  },
  PUNE_DISTRICT: {
    id: 'PUNE_DISTRICT',
    name: 'Pune District Grievance Monitoring System',
    marathiName: 'पुणे जिल्हा तक्रार निवारण कक्ष',
    hindiName: 'पुणे जिला शिकायत निगरानी प्रणाली',
    url: 'https://pune.gov.in/en/service/grievance-monitoring/',
    verificationStatus: 'Official information source requiring confirmation',
    scope: 'Pune District Collectorate, Peri-urban & Rural Talukas',
  },
  MSEDCL_SERVICE: {
    id: 'MSEDCL_SERVICE',
    name: 'MSEDCL (Mahavitaran) Consumer Grievance Service',
    marathiName: 'महावितरण (MSEDCL) ग्राहक तक्रार सेवा',
    hindiName: 'महावितरण (MSEDCL) उपभोक्ता शिकायत सेवा',
    url: 'https://wss.mahadiscom.in/wss/wss?Lang=English&uiActionName=getServiceRequestConsumerDetailsLink',
    verificationStatus: 'Official information source requiring confirmation',
    scope: 'Maharashtra State Electricity Distribution Company Limited',
  },
  CPGRAMS: {
    id: 'CPGRAMS',
    name: 'Centralised Public Grievance Redress and Monitoring System (CPGRAMS)',
    marathiName: 'केंद्रीय सार्वजनिक तक्रार निवारण प्रणाली (CPGRAMS)',
    hindiName: 'केंद्रीय लोक शिकायत निवारण प्रणाली (CPGRAMS)',
    url: 'https://pgportal.gov.in/',
    verificationStatus: 'Official information source requiring confirmation',
    scope: 'Central Government Ministries, National Highways & Central Authorities',
  },
};

// Known urban Pune corporation areas vs peri-urban / PCMC / PMRDA
const PMC_AREAS = [
  'kothrud', 'shivajinagar', 'hadapsar', 'swargate', 'camp', 'viman nagar',
  'kalyani nagar', 'baner', 'aundh', 'sinhagad', 'katraj', 'dhankawadi',
  'yerawada', 'karve nagar', 'warje', 'kasba', 'bhavani peth', 'bibvewadi',
  'sahakar nagar', 'deccan', 'parvati', 'gokhale nagar', 'kondhwa', 'vadgaon sheri',
];

const PCMC_AREAS = [
  'wakad', 'chinchwad', 'pimpri', 'bhosari', 'nigdi', 'moshi', 'ravet',
  'pimple saudagar', 'pimple nilakh', 'dighi', 'charholi', 'thergaon',
  'sangvi', 'punawale', 'kiwale',
];

const PMRDA_OR_RURAL_PUNE_AREAS = [
  'hinjawadi', 'hinjewadi', 'wagholi', 'pirangut', 'marunji', 'maan',
  'lavale', 'bhugaon', 'loni kalbhor', 'chakan', 'talegaon', 'shikrapur',
  'uruli kanchan', 'saswad', 'shirur', 'baramati', 'daund', 'khed', 'haveli',
];

/**
 * Rapid Authority Finder Routing Engine
 * Recommends a likely official authority based on incident category and confirmed location.
 *
 * Rules:
 * - Potholes: recommend the relevant municipal or road-maintaining authority; PWD only where applicable.
 * - Garbage and drainage: recommend the relevant local body when identifiable.
 * - Electricity: recommend MSEDCL only when the provider is known to be MSEDCL; otherwise request confirmation.
 * - Other or uncertain issues: show Maharashtra state grievance portal with clear caveat.
 * - Use confirmed location: NEVER assume every Pune-area location belongs to PMC.
 * - Never claim authority recommendation is officially confirmed.
 */
export function findRecommendedAuthority(
  category: CivicCategory,
  location?: LocationDetails | null,
  hasPhotos: boolean = false,
  hasDescription: boolean = true
): AuthorityRecommendation {
  const district = (location?.district || '').trim().toLowerCase();
  const city = (location?.city || '').trim().toLowerCase();
  const area = (location?.area || '').trim().toLowerCase();
  const street = (location?.streetLandmark || '').trim().toLowerCase();

  const isPuneDistrict = district.includes('pune') || city.includes('pune');
  const isPcmcArea = PCMC_AREAS.some(a => area.includes(a) || city.includes(a));
  const isPmrdaOrRuralArea = PMRDA_OR_RURAL_PUNE_AREAS.some(a => area.includes(a) || city.includes(a));
  const isExplicitPmc = (city === 'pune' || PMC_AREAS.some(a => area.includes(a))) && !isPcmcArea && !isPmrdaOrRuralArea;

  const isStateHighwayOrPwdRoad =
    street.includes('highway') ||
    street.includes('sh-') ||
    street.includes('sh ') ||
    street.includes('nh-') ||
    street.includes('nh ') ||
    street.includes('bypass') ||
    street.includes('ghat') ||
    street.includes('pwd') ||
    area.includes('highway');

  const isMumbai =
    district.includes('mumbai') ||
    city.includes('mumbai') ||
    area.includes('mumbai');

  const baseChecklist = {
    hasPhotos,
    hasLocation: Boolean(location?.city || location?.area || location?.streetLandmark),
    hasDescription,
  };

  // 1. POTHOLE & ROAD DAMAGE
  if (category === 'pothole') {
    if (isStateHighwayOrPwdRoad) {
      return {
        sourceId: 'MAHA_PWD',
        authorityName: 'Maharashtra Public Works Department (PWD)',
        marathiAuthorityName: 'महाराष्ट्र सार्वजनिक बांधकाम विभाग (PWD)',
        hindiAuthorityName: 'महाराष्ट्र लोक निर्माण विभाग (PWD)',
        whyResponsible: {
          en: 'State highways, classified arterial bypasses, and major district roads are maintained by the Maharashtra PWD rather than municipal corporations.',
          hi: 'राज्य राजमार्ग, प्रमुख जिला सड़कें और बाईपास नगर निगम के बजाय महाराष्ट्र लोक निर्माण विभाग (PWD) के अधिकार क्षेत्र में आते हैं।',
          mr: 'राज्य महामार्ग, मुख्य जिल्हा रस्ते व बायपास हे स्थानिक महापालिकेऐवजी महाराष्ट्र सार्वजनिक बांधकाम विभाग (PWD) कडे येतात.',
        },
        confidence: 'POSSIBLE',
        officialSource: OFFICIAL_SOURCES.MAHA_PWD,
        submissionCaveat: {
          en: 'Confirm road ownership: Internal urban streets belong to the local municipality, while classified highways belong to PWD.',
          hi: 'सड़क के स्वामित्व की पुष्टि करें: आंतरिक शहरी सड़कें नगर निगम के अधीन होती हैं, जबकि वर्गीकृत राजमार्ग PWD के अधीन हैं।',
          mr: 'रस्त्याच्या मालकीची खात्री करा: अंतर्गत शहर रस्ते स्थानिक महापालिकेकडे असतात, तर वर्गीकृत महामार्ग PWD कडे असतात.',
        },
        evidenceChecklist: baseChecklist,
      };
    }

    if (isPuneDistrict && isExplicitPmc) {
      return {
        sourceId: 'PMC_SERVICES',
        authorityName: 'Pune Municipal Corporation (PMC) Road Dept',
        marathiAuthorityName: 'पुणे महानगरपालिका (रस्ते व वाहतूक विभाग)',
        hindiAuthorityName: 'पुणे नगर निगम (सड़क एवं यातायात विभाग)',
        whyResponsible: {
          en: 'The PMC Road Department is responsible for asphalt resurfacing, pothole repairs, and stormwater drainage along municipal city roads within Pune corporation boundaries.',
          hi: 'पुणे नगर निगम का सड़क विभाग पुणे शहर सीमा के भीतर डामरीकरण, गड्ढों की मरम्मत और नगर निगम सड़कों के रखरखाव के लिए जिम्मेदार है।',
          mr: 'पुणे महानगरपालिकेचा रस्ते विभाग पुणे शहर हद्दीतील डांबरीकरण, खड्डे दुरुस्ती व महापालिका रस्त्यांच्या देखभालीसाठी जबाबदार आहे.',
        },
        confidence: 'LIKELY',
        officialSource: OFFICIAL_SOURCES.PMC_SERVICES,
        submissionCaveat: {
          en: 'Verify that this specific street is under PMC jurisdiction and not an unhanded developer road, cantonment property, or PWD bypass.',
          hi: 'जांचें कि यह सड़क PMC के अधिकार क्षेत्र में है और किसी छावनी बोर्ड, निजी बिल्डर या PWD बाईपास के अधीन नहीं है।',
          mr: 'हा रस्ता पीएमसीच्या अखत्यारीत आहे व कॅन्टोन्मेंट बोर्ड किंवा पीडब्ल्यूडीच्या बायपासमध्ये येत नाही याची खात्री करा.',
        },
        evidenceChecklist: baseChecklist,
      };
    }

    if (isPuneDistrict && (isPmrdaOrRuralArea || isPcmcArea || !isExplicitPmc)) {
      return {
        sourceId: 'PUNE_DISTRICT',
        authorityName: isPcmcArea ? 'PCMC / Pune District Administration' : 'PMRDA / Pune District Grievance Monitoring',
        marathiAuthorityName: isPcmcArea ? 'पिंपरी चिंचवड महापालिका / जिल्हा प्रशासन' : 'पीएमआरडीए / पुणे जिल्हा तक्रार कक्ष',
        hindiAuthorityName: isPcmcArea ? 'पीसीएमसी / पुणे जिला प्रशासन' : 'पीएमआरडीए / पुणे जिला शिकायत निगरानी',
        whyResponsible: {
          en: 'This location is in Pune district outside central PMC jurisdiction (e.g., PCMC, PMRDA, or Gram Panchayat). Road repairs must be filed with the corresponding local urban authority or district office.',
          hi: 'यह स्थान केंद्रीय PMC सीमा से बाहर पुणे जिले (जैसे PCMC, PMRDA या ग्राम पंचायत) में है। सड़क मरम्मत संबंधित स्थानीय प्राधिकरण या जिला कार्यालय में दर्ज होनी चाहिए।',
          mr: 'हे ठिकाण पुणे महापालिकेबाहेर (उदा. PCMC, PMRDA किंवा ग्रामपंचायत हद्दीत) आहे. रस्ता दुरुस्ती संबंधित स्थानिक प्राधिकरणाकडे नोंदवणे आवश्यक आहे.',
        },
        confidence: 'POSSIBLE',
        officialSource: OFFICIAL_SOURCES.PUNE_DISTRICT,
        submissionCaveat: {
          en: 'Do not submit to PMC. Verify whether your sector falls under PCMC, PMRDA, or the local Gram Panchayat before lodging.',
          hi: 'PMC में जमा न करें। शिकायत दर्ज करने से पहले पुष्टि करें कि आपका क्षेत्र PCMC, PMRDA या ग्राम पंचायत के अंतर्गत है।',
          mr: 'पीएमसीमध्ये तक्रार करू नका. आपला भाग PCMC, PMRDA किंवा स्थानिक ग्रामपंचायतीच्या हद्दीत आहे का ते तपासा.',
        },
        evidenceChecklist: baseChecklist,
      };
    }

    // Generic Maharashtra Pothole
    return {
      sourceId: 'MAHA_GRIEVANCE',
      authorityName: 'Local Municipal Council / Maharashtra State Portal',
      marathiAuthorityName: 'स्थानिक महापालिका / नगरपालिका (महाराष्ट्र राज्य पोर्टल)',
      hindiAuthorityName: 'स्थानीय नगर निगम / नगरपालिका (महाराष्ट्र राज्य पोर्टल)',
      whyResponsible: {
        en: 'City and town streets are maintained by local municipal corporations or councils, while inter-city roads fall under PWD.',
        hi: 'शहर की सड़कें स्थानीय नगर निगम/नगरपालिका द्वारा पोषित होती हैं, जबकि अंतर-शहरी सड़कें PWD के अंतर्गत आती हैं।',
        mr: 'शहरातील रस्ते स्थानिक महानगरपालिका किंवा नगरपालिकेकडे असतात, तर आंतर-शहर रस्ते सार्वजनिक बांधकाम विभागाकडे (PWD) असतात.',
      },
      confidence: 'POSSIBLE',
      officialSource: OFFICIAL_SOURCES.MAHA_GRIEVANCE,
      submissionCaveat: {
        en: 'Candidate source: Use the Maharashtra State Grievance portal to locate your specific municipal body or district PWD executive engineer.',
        hi: 'प्रत्याशी स्रोत: अपने विशिष्ट नगर निकाय या PWD कार्यकारी अभियंता तक पहुंचने के लिए महाराष्ट्र राज्य शिकायत पोर्टल का उपयोग करें।',
        mr: 'पर्यायी स्रोत: आपल्या स्थानिक स्वराज्य संस्थेपर्यंत पोहोचण्यासाठी महाराष्ट्र राज्य तक्रार निवारण पोर्टलचा वापर करा.',
      },
      evidenceChecklist: baseChecklist,
    };
  }

  // 2. GARBAGE & DRAINAGE
  if (category === 'garbage' || category === 'drainage') {
    if (isPuneDistrict && isExplicitPmc) {
      return {
        sourceId: 'PMC_SERVICES',
        authorityName: category === 'garbage' ? 'PMC Solid Waste Management Dept' : 'PMC Drainage & Sewage Dept',
        marathiAuthorityName: category === 'garbage' ? 'पुणे महानगरपालिका (घनकचरा व्यवस्थापन विभाग)' : 'पुणे महानगरपालिका (मलनिःसारण व ड्रेनेज विभाग)',
        hindiAuthorityName: category === 'garbage' ? 'पुणे नगर निगम (ठोस अपशिष्ट प्रबंधन विभाग)' : 'पुणे नगर निगम (जल निकासी एवं सीवरेज विभाग)',
        whyResponsible: {
          en: category === 'garbage'
            ? 'PMC Solid Waste Management Department oversees door-to-door waste collection, container clearance, and sanitation across 15 administrative wards in Pune.'
            : 'PMC Drainage Department manages public sewer mains, chamber desilting, and stormwater drainage lines within municipal boundaries.',
          hi: category === 'garbage'
            ? 'पुणे नगर निगम का ठोस अपशिष्ट प्रबंधन विभाग पुणे के 15 प्रशासनिक वार्डों में कचरा संग्रहण और स्वच्छता के लिए उत्तरदायी है।'
            : 'पुणे नगर निगम का जल निकासी विभाग नगर सीमा के भीतर सार्वजनिक सीवर लाइनों और चैंबर की सफाई के लिए उत्तरदायी है।',
          mr: category === 'garbage'
            ? 'पुणे महानगरपालिकेचा घनकचरा व्यवस्थापन विभाग पुणे शहरातील १५ क्षेत्रीय कार्यालयांच्या हद्दीत कचरा संकलन व स्वच्छतेचे काम पाहतो.'
            : 'पुणे महापालिकेचा मलनिःसारण विभाग शहर हद्दीतील भुयारी गटारे, चेंबर सफाई व सांडपाणी वाहिन्यांच्या देखभालीसाठी उत्तरदायी आहे.',
        },
        confidence: 'LIKELY',
        officialSource: OFFICIAL_SOURCES.PMC_SERVICES,
        submissionCaveat: {
          en: 'Confirm your municipal ward number (1–15) to ensure prompt dispatch to the local sanitary inspector.',
          hi: 'स्थानीय स्वच्छता निरीक्षक तक त्वरित कार्रवाई के लिए अपने नगर निगम वार्ड नंबर (1–15) की पुष्टि करें।',
          mr: 'स्थानिक आरोग्य निरीक्षकांकडून जलद कारवाईसाठी आपला प्रभाग क्रमांक (१-१५) अचूक नमूद करा.',
        },
        evidenceChecklist: baseChecklist,
      };
    }

    if (isPuneDistrict && (isPmrdaOrRuralArea || isPcmcArea || !isExplicitPmc)) {
      return {
        sourceId: 'PUNE_DISTRICT',
        authorityName: isPcmcArea ? 'PCMC Health & Sanitation Department' : 'Local Body / Pune District Monitoring',
        marathiAuthorityName: isPcmcArea ? 'पिंपरी चिंचवड आरोग्य व स्वच्छता विभाग' : 'स्थानिक संस्था / पुणे जिल्हा तक्रार कक्ष',
        hindiAuthorityName: isPcmcArea ? 'पीसीएमसी स्वास्थ्य एवं स्वच्छता विभाग' : 'स्थानीय निकाय / पुणे जिला निगरानी प्रणाली',
        whyResponsible: {
          en: 'This location is situated outside PMC municipal jurisdiction. Garbage and drainage are operated by PCMC, PMRDA, or the respective Village Panchayat.',
          hi: 'यह स्थान PMC नगर निगम के अधिकार क्षेत्र से बाहर है। अपशिष्ट और सीवरेज का संचालन PCMC, PMRDA या संबंधित ग्राम पंचायत द्वारा किया जाता है।',
          mr: 'हे ठिकाण पुणे महापालिका हद्दीबाहेर आहे. कचरा व सांडपाणी व्यवस्थापन PCMC, PMRDA किंवा स्थानिक ग्रामपंचायतीच्या अखत्यारीत येते.',
        },
        confidence: 'POSSIBLE',
        officialSource: OFFICIAL_SOURCES.PUNE_DISTRICT,
        submissionCaveat: {
          en: 'Never assume PMC handles this area. Verify whether your locality is under PCMC, PMRDA, or a rural panchayat.',
          hi: 'यह न मानें कि PMC इस क्षेत्र को संभालता है। जांचें कि आपका इलाका PCMC, PMRDA या ग्राम पंचायत के अधीन है।',
          mr: 'पीएमसी या भागात सेवा देते असे समजू नका. आपला परिसर PCMC, PMRDA किंवा ग्रामपंचायतीत येतो का ते निश्चित करा.',
        },
        evidenceChecklist: baseChecklist,
      };
    }

    // Generic Maharashtra Garbage/Drainage
    return {
      sourceId: 'MAHA_GRIEVANCE',
      authorityName: 'Local Municipal Body / Maharashtra State Portal',
      marathiAuthorityName: 'स्थानिक नागरी संस्था / महाराष्ट्र राज्य पोर्टल',
      hindiAuthorityName: 'स्थानीय नगर निकाय / महाराष्ट्र राज्य पोर्टल',
      whyResponsible: {
        en: 'Sanitation, waste disposal, and sewer lines are managed by the designated urban local body (Nagar Nigam / Nagar Parishad) or rural Gram Panchayat.',
        hi: 'स्वच्छता, अपशिष्ट प्रबंधन और जल निकासी का प्रबंधन नामित शहरी स्थानीय निकाय (नगर निगम / नगर परिषद) या ग्रामीण ग्राम पंचायत द्वारा किया जाता है।',
        mr: 'स्वच्छता, कचरा व्यवस्थापन आणि सांडपाणी वाहिन्यांची जबाबदारी स्थानिक नागरी संस्था (महानगरपालिका/नगरपरिषद) किंवा ग्रामपंचायतीकडे असते.',
      },
      confidence: 'POSSIBLE',
      officialSource: OFFICIAL_SOURCES.MAHA_GRIEVANCE,
      submissionCaveat: {
        en: 'Candidate source: Confirm your specific municipal corporation or district health office before final filing.',
        hi: 'प्रत्याशी स्रोत: अंतिम जमा करने से पहले अपने विशिष्ट नगर निगम या जिला स्वास्थ्य कार्यालय की पुष्टि करें।',
        mr: 'पर्यायी स्रोत: तक्रार नोंदवण्यापूर्वी आपल्या स्थानिक महापालिका किंवा आरोग्य विभागाची खात्री करा.',
      },
      evidenceChecklist: baseChecklist,
    };
  }

  // 3. ELECTRICITY
  if (category === 'electricity') {
    if (isMumbai) {
      return {
        sourceId: 'MSEDCL_SERVICE',
        authorityName: 'MSEDCL / Licensed Power Distributor',
        marathiAuthorityName: 'महावितरण / स्थानिक विद्युत वितरण कंपनी',
        hindiAuthorityName: 'महावितरण / स्थानीय बिजली वितरण कंपनी',
        whyResponsible: {
          en: 'In Mumbai and parts of Mumbai suburban, power distribution is shared among private licensees (Adani Electricity, Tata Power, BEST) and MSEDCL in outlying areas.',
          hi: 'मुंबई और उपनगरीय क्षेत्रों में बिजली वितरण निजी कंपनियों (अडानी, टाटा पावर, बेस्ट) और बाहरी क्षेत्रों में महावितरण द्वारा किया जाता है।',
          mr: 'मुंबई आणि उपनगरांमध्ये वीज वितरण खासगी कंपन्या (अदानी, टाटा पॉवर, बेस्ट) व काही भागांत महावितरणकडे विभागलेले आहे.',
        },
        confidence: 'POSSIBLE',
        officialSource: OFFICIAL_SOURCES.MSEDCL_SERVICE,
        submissionCaveat: {
          en: 'Provider confirmation required: Check your monthly electricity bill to confirm whether MSEDCL, Adani, Tata Power, or BEST supplies your premises.',
          hi: 'प्रदाता की पुष्टि आवश्यक: अपने मासिक बिजली बिल की जांच करें कि आपका कनेक्शन महावितरण, अडानी, टाटा या बेस्ट का है।',
          mr: 'वीज कंपनीची खात्री करा: आपले वीज बिल तपासून कनेक्शन महावितरण, अदानी, टाटा पॉवर की बेस्टचे आहे ते निश्चित करा.',
        },
        evidenceChecklist: baseChecklist,
      };
    }

    // Maharashtra / Pune where MSEDCL is standard
    return {
      sourceId: 'MSEDCL_SERVICE',
      authorityName: 'Maharashtra State Electricity Distribution Co. (MSEDCL / Mahavitaran)',
      marathiAuthorityName: 'महाराष्ट्र राज्य विद्युत वितरण कंपनी (महावितरण / MSEDCL)',
      hindiAuthorityName: 'महाराष्ट्र राज्य बिजली वितरण कंपनी (महावितरण / MSEDCL)',
      whyResponsible: {
        en: 'MSEDCL (Mahavitaran) is the primary state power utility responsible for transformers, power outages, metering, and feeder maintenance across Maharashtra.',
        hi: 'महावितरण (MSEDCL) महाराष्ट्र में ट्रांसफार्मर, बिजली कटौती, मीटरिंग और फीडर रखरखाव के लिए जिम्मेदार राज्य विद्युत उपयोगिता है।',
        mr: 'महावितरण (MSEDCL) ही संपूर्ण महाराष्ट्रात ट्रान्सफॉर्मर, वीज पुरवठा खंडित होणे, मीटर व वीज वाहिन्यांच्या देखभालीसाठी मुख्य संस्था आहे.',
      },
      confidence: 'LIKELY',
      officialSource: OFFICIAL_SOURCES.MSEDCL_SERVICE,
      submissionCaveat: {
        en: 'Have your 12-digit Consumer Number (printed on your Mahavitaran electricity bill) ready before opening the portal.',
        hi: 'पोर्टल खोलने से पहले अपने महावितरण बिजली बिल पर छपा 12-अंकों का उपभोक्ता नंबर तैयार रखें।',
        mr: 'पोर्टल उघडण्यापूर्वी आपल्या वीज बिलावरील १२ अंकी ग्राहक क्रमांक (Consumer No.) तयार ठेवा.',
      },
      evidenceChecklist: baseChecklist,
    };
  }

  // 4. STREETLIGHT
  if (category === 'streetlight') {
    if (isPuneDistrict && isExplicitPmc) {
      return {
        sourceId: 'PMC_SERVICES',
        authorityName: 'Pune Municipal Corporation (PMC) Electrical Dept',
        marathiAuthorityName: 'पुणे महानगरपालिका (विद्युत विभाग)',
        hindiAuthorityName: 'पुणे नगर निगम (विद्युत विभाग)',
        whyResponsible: {
          en: 'PMC Electrical Department is responsible for maintaining municipal street poles, LED fixtures, and dark spot lighting within Pune corporation limits.',
          hi: 'पुणे नगर निगम का विद्युत विभाग नगर निगम सीमा के भीतर स्ट्रीट लाइट पोल, एलईडी लाइट और अंधेरे स्थानों में प्रकाश व्यवस्था के लिए जिम्मेदार है।',
          mr: 'पुणे महापालिकेचा विद्युत विभाग शहर हद्दीतील पथदिवे, एलईडी दिवे व अंधारे रस्ते दुरुस्तीसाठी जबाबदार आहे.',
        },
        confidence: 'LIKELY',
        officialSource: OFFICIAL_SOURCES.PMC_SERVICES,
        submissionCaveat: {
          en: 'If the street pole is located along a national highway or state highway bypass, it may fall under PWD/NHAI instead.',
          hi: 'यदि पोल राष्ट्रीय या राज्य राजमार्ग बाईपास पर है, तो यह PWD/NHAI के अधिकार क्षेत्र में आ सकता है।',
          mr: 'जर पथदिवा राष्ट्रीय महामार्ग किंवा बायपासवर असेल तर तो PWD किंवा NHAI च्या अखत्यारीत असू शकतो.',
        },
        evidenceChecklist: baseChecklist,
      };
    }
  }

  // 5. OTHER / UNCERTAIN / WATER SUPPLY / ENCROACHMENT / UNCONFIRMED LOCATION
  const hasSpecificLocation = Boolean(location?.district || location?.city || location?.area);
  return {
    sourceId: 'MAHA_GRIEVANCE',
    authorityName: 'Maharashtra State Grievance Redressal Portal',
    marathiAuthorityName: 'महाराष्ट्र राज्य तक्रार निवारण पोर्टल (आपले सरकार)',
    hindiAuthorityName: 'महाराष्ट्र राज्य शिकायत निवारण पोर्टल (आपले सरकार)',
    whyResponsible: {
      en: 'The Maharashtra State Grievance Portal provides centralized intake for eligible public grievances across state departments, district collectorates, and urban local bodies.',
      hi: 'महाराष्ट्र राज्य शिकायत पोर्टल राज्य विभागों, जिला कलेक्ट्रेट और शहरी स्थानीय निकायों में पात्र शिकायतों के लिए केंद्रीकृत पोर्टल प्रदान करता है।',
      mr: 'महाराष्ट्र राज्य तक्रार निवारण पोर्टल राज्य सरकारी विभाग, जिल्हाधिकारी कार्यालये आणि स्थानिक नागरी संस्थांच्या तक्रारींसाठी मुख्य व्यासपीठ आहे.',
    },
    confidence: hasSpecificLocation ? 'POSSIBLE' : 'UNCONFIRMED',
    officialSource: OFFICIAL_SOURCES.MAHA_GRIEVANCE,
    submissionCaveat: {
      en: 'Authority not officially confirmed: Verify whether your specific grievance falls under state department purview or local municipal jurisdiction before filing.',
      hi: 'प्राधिकरण आधिकारिक रूप से पुष्ट नहीं: शिकायत दर्ज करने से पहले जांचें कि आपका मामला राज्य विभाग के अधीन है या स्थानीय नगर निकाय के अधीन।',
      mr: 'प्राधिकरण अधिकृतपणे निश्चित नाही: तक्रार करण्यापूर्वी आपला प्रश्न राज्य शासनाकडे येतो की स्थानिक पालिकेकडे ते तपासा.',
    },
    evidenceChecklist: baseChecklist,
  };
}
