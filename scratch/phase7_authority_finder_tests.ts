/**
 * CivicBridge AI — Phase 7: Rapid Authority Finder Tests
 * Tests routing engine, official sources directory, confidence levels,
 * localized translations, and submission disclaimers.
 */

import {
  OFFICIAL_SOURCES,
  findRecommendedAuthority,
} from '../src/data/authorityDirectory';
import { translations } from '../src/i18n/translations';
import type { LocationDetails } from '../src/types';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`✅ [PASS] ${msg}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${msg}`);
    failCount++;
  }
}

console.log('\n--- Test 1: Official Sources Directory & URLs ---');
const expectedUrls: Record<string, string> = {
  MAHA_GRIEVANCE: 'https://grievances.maharashtra.gov.in/',
  MAHA_PWD: 'https://pwd.maharashtra.gov.in/en/grievance-redressal/',
  PMC_SERVICES: 'https://efaq.pmc.gov.in/en',
  PUNE_DISTRICT: 'https://pune.gov.in/en/service/grievance-monitoring/',
  MSEDCL_SERVICE: 'https://wss.mahadiscom.in/wss/wss?Lang=English&uiActionName=getServiceRequestConsumerDetailsLink',
  CPGRAMS: 'https://pgportal.gov.in/',
};

for (const [key, expectedUrl] of Object.entries(expectedUrls)) {
  const source = OFFICIAL_SOURCES[key];
  assert(Boolean(source), `Source ${key} exists in directory`);
  assert(source?.url === expectedUrl, `Source ${key} has exact URL: ${expectedUrl}`);
  assert(
    source?.verificationStatus.includes('requiring confirmation'),
    `Source ${key} is marked as requiring confirmation (no false claim of verified direct intake)`
  );
}

console.log('\n--- Test 2: Potholes Routing & PWD vs Municipal Body ---');
// Highway pothole -> PWD
const highwayLocation: LocationDetails = {
  state: 'Maharashtra',
  district: 'Pune',
  city: 'Pune',
  area: 'Katraj',
  streetLandmark: 'Pune-Bangalore Highway Bypass near Katraj Tunnel',
  pincode: '411046',
  suggestedAuthority: 'PMC',
};
const highwayRec = findRecommendedAuthority('pothole', highwayLocation, true, true);
assert(highwayRec.sourceId === 'MAHA_PWD', 'Pothole on highway routes to Maharashtra PWD');
assert(highwayRec.confidence === 'POSSIBLE', 'Highway pothole confidence is "Possible authority — please confirm"');
assert(
  highwayRec.whyResponsible.en.toLowerCase().includes('pwd') ||
  highwayRec.whyResponsible.en.toLowerCase().includes('highway'),
  'Why responsible mentions PWD and highways'
);

// City municipal pothole -> PMC
const cityLocation: LocationDetails = {
  state: 'Maharashtra',
  district: 'Pune',
  city: 'Pune',
  area: 'Kothrud',
  streetLandmark: 'Near Paud Road Metro Pillar 42',
  pincode: '411038',
  suggestedAuthority: 'PMC',
};
const cityPotholeRec = findRecommendedAuthority('pothole', cityLocation, true, true);
assert(cityPotholeRec.sourceId === 'PMC_SERVICES', 'Pothole in central Pune routes to PMC Services');
assert(cityPotholeRec.confidence === 'LIKELY', 'City street pothole confidence is "Likely authority"');

// Pune peri-urban / PMRDA location -> Does NOT assume PMC
const hinjawadiLocation: LocationDetails = {
  state: 'Maharashtra',
  district: 'Pune',
  city: 'Pune',
  area: 'Hinjawadi Phase 1',
  streetLandmark: 'Near IT Park circle',
  pincode: '411057',
  suggestedAuthority: 'PMRDA',
};
const hinjawadiRec = findRecommendedAuthority('pothole', hinjawadiLocation, true, true);
assert(
  hinjawadiRec.sourceId !== 'PMC_SERVICES',
  'Hinjawadi location NEVER assumed to belong to PMC (routes to Pune District / PMRDA)'
);
assert(hinjawadiRec.confidence === 'POSSIBLE', 'Peri-urban road confidence is "Possible authority — please confirm"');

console.log('\n--- Test 3: Garbage & Drainage Routing ---');
// Pune central garbage
const garbageRec = findRecommendedAuthority('garbage', cityLocation, true, true);
assert(garbageRec.sourceId === 'PMC_SERVICES', 'Garbage in Pune central routes to PMC Solid Waste');
assert(garbageRec.confidence === 'LIKELY', 'Garbage in central PMC has "Likely authority"');

// Pune central drainage
const drainageRec = findRecommendedAuthority('drainage', cityLocation, false, true);
assert(drainageRec.sourceId === 'PMC_SERVICES', 'Drainage in Pune central routes to PMC Drainage Dept');
assert(drainageRec.confidence === 'LIKELY', 'Drainage in central PMC has "Likely authority"');

// Garbage in Wagholi (PMRDA/Gram Panchayat)
const wagholiLocation: LocationDetails = {
  state: 'Maharashtra',
  district: 'Pune',
  city: 'Pune',
  area: 'Wagholi',
  streetLandmark: 'Nagar Road',
  pincode: '412207',
  suggestedAuthority: '',
};
const wagholiGarbageRec = findRecommendedAuthority('garbage', wagholiLocation, false, true);
assert(
  wagholiGarbageRec.sourceId !== 'PMC_SERVICES',
  'Wagholi garbage does not assume PMC jurisdiction'
);
assert(
  wagholiGarbageRec.confidence === 'POSSIBLE',
  'Non-PMC Pune area garbage is marked "Possible authority — please confirm"'
);

// Garbage in Nashik
const nashikLocation: LocationDetails = {
  state: 'Maharashtra',
  district: 'Nashik',
  city: 'Nashik',
  area: 'Panchavati',
  streetLandmark: 'Market Yard',
  pincode: '422003',
  suggestedAuthority: '',
};
const nashikRec = findRecommendedAuthority('garbage', nashikLocation, true, true);
assert(
  nashikRec.sourceId === 'MAHA_GRIEVANCE',
  'Garbage in other Maharashtra city routes to Maharashtra State Portal for local body routing'
);

console.log('\n--- Test 4: Electricity & MSEDCL Provider Confirmation ---');
// Electricity in Pune -> MSEDCL
const elecPuneRec = findRecommendedAuthority('electricity', cityLocation, false, true);
assert(elecPuneRec.sourceId === 'MSEDCL_SERVICE', 'Electricity in Pune routes to MSEDCL');
assert(elecPuneRec.confidence === 'LIKELY', 'Electricity in Pune confidence is "Likely authority"');

// Electricity in Mumbai Suburban -> Must request provider confirmation
const mumbaiLocation: LocationDetails = {
  state: 'Maharashtra',
  district: 'Mumbai Suburban',
  city: 'Mumbai',
  area: 'Andheri West',
  streetLandmark: 'SV Road',
  pincode: '400058',
  suggestedAuthority: '',
};
const elecMumbaiRec = findRecommendedAuthority('electricity', mumbaiLocation, false, true);
assert(elecMumbaiRec.sourceId === 'MSEDCL_SERVICE', 'Electricity in Mumbai references distribution service');
assert(
  elecMumbaiRec.confidence === 'POSSIBLE',
  'Electricity in Mumbai is marked "Possible authority — please confirm" (requires bill confirmation)'
);
assert(
  elecMumbaiRec.submissionCaveat.en.toLowerCase().includes('bill') ||
  elecMumbaiRec.whyResponsible.en.toLowerCase().includes('adani') ||
  elecMumbaiRec.whyResponsible.en.toLowerCase().includes('tata'),
  'Explains private distributors (Adani/Tata/BEST) in Mumbai area'
);

console.log('\n--- Test 5: Other or Uncertain Grievances ---');
// Encroachment / Other
const otherRec = findRecommendedAuthority('other', cityLocation, false, true);
assert(otherRec.sourceId === 'MAHA_GRIEVANCE', 'Other civic issue routes to Maharashtra State Grievance Portal');
assert(
  otherRec.confidence === 'POSSIBLE' || otherRec.confidence === 'UNCONFIRMED',
  'Other issue confidence is Possible or Unconfirmed'
);
assert(
  otherRec.submissionCaveat.en.toLowerCase().includes('state') ||
  otherRec.submissionCaveat.en.toLowerCase().includes('confirm'),
  'Contains clear caveat advising citizen to confirm eligibility and department'
);

// Missing / Empty location
const emptyLocRec = findRecommendedAuthority('other', null, false, true);
assert(emptyLocRec.confidence === 'UNCONFIRMED', 'Unspecified location sets confidence to UNCONFIRMED');

console.log('\n--- Test 6: Localization Dictionary Completeness (en, mr, hi) ---');
const langs = ['en', 'mr', 'hi'] as const;
for (const l of langs) {
  const dict = translations[l].whereToSubmit;
  assert(Boolean(dict.sectionTitle), `${l}: whereToSubmit.sectionTitle is defined`);
  assert(Boolean(dict.recommendedAuthorityHeading), `${l}: recommendedAuthorityHeading is defined`);
  assert(Boolean(dict.whyResponsibleHeading), `${l}: whyResponsibleHeading is defined`);
  assert(dict.confidenceLabels.LIKELY.includes('Likely'), `${l}: LIKELY confidence label includes Likely`);
  assert(dict.confidenceLabels.POSSIBLE.includes('Possible'), `${l}: POSSIBLE confidence label includes Possible`);
  assert(dict.confidenceLabels.UNCONFIRMED.includes('confirmed'), `${l}: UNCONFIRMED confidence label includes confirmed`);
  assert(Boolean(dict.openPortalButton), `${l}: openPortalButton is defined`);
  assert(Boolean(dict.copyComplaintButton), `${l}: copyComplaintButton is defined`);
  assert(Boolean(dict.portalDisclaimerNotice), `${l}: portalDisclaimerNotice is defined`);
  assert(Boolean(dict.notOfficiallyConfirmedDisclaimer), `${l}: notOfficiallyConfirmedDisclaimer is defined`);
}

console.log('\n--- Test 7: Submission Safety & Non-Submission Disclaimers ---');
for (const l of langs) {
  const disclaimer = translations[l].whereToSubmit.portalDisclaimerNotice;
  assert(
    disclaimer.toLowerCase().includes('fake') ||
    disclaimer.includes('बनावट') ||
    disclaimer.includes('फर्जी'),
    `${l}: Disclaimer explicitly guarantees no fake acknowledgement numbers are generated`
  );
}

console.log('\n======================================================');
console.log(`Phase 7 Tests Completed: PASS=${passCount}, FAIL=${failCount}`);
console.log('======================================================');

if (failCount > 0) {
  process.exit(1);
}
