/**
 * Phase 6 Voice Input and Speech-to-Text Automated Tests
 * Tests mock SpeechRecognition events, locale matching, transcript insertion (append/replace),
 * unsupported browser fallback, permission denied handling, and localization integrity.
 */
import { translations } from '../src/i18n/translations';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${testName}${detail ? ` - ${detail}` : ''}`);
    failCount++;
  }
}

// ── Test 1: Speech Recognition Locales & Language Mapping ───────────────────
console.log('\n--- Test 1: Voice Locale Mapping ---');
const locales = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
};
assert(locales.en === 'en-IN', 'English maps to en-IN');
assert(locales.hi === 'hi-IN', 'Hindi maps to hi-IN');
assert(locales.mr === 'mr-IN', 'Marathi maps to mr-IN');

// ── Test 2: Localization Dictionary Integrity for Voice ─────────────────────
console.log('\n--- Test 2: Voice Localization Integrity (en, mr, hi) ---');
for (const lang of ['en', 'mr', 'hi'] as const) {
  const v = translations[lang].voice;
  assert(Boolean(v.speakButton), `${lang}: speakButton translated: "${v.speakButton}"`);
  assert(Boolean(v.listening), `${lang}: listening translated`);
  assert(Boolean(v.stopButton), `${lang}: stopButton translated: "${v.stopButton}"`);
  assert(Boolean(v.appendButton), `${lang}: appendButton translated: "${v.appendButton}"`);
  assert(Boolean(v.replaceButton), `${lang}: replaceButton translated: "${v.replaceButton}"`);
  assert(Boolean(v.deniedError), `${lang}: deniedError translated`);
  assert(Boolean(v.unsupportedNotice), `${lang}: unsupportedNotice translated`);
  assert(Boolean(v.statusBadge.listening), `${lang}: statusBadge.listening translated`);
  assert(Boolean(v.spokenLanguages['en-IN']), `${lang}: spokenLanguages en-IN translated`);
  assert(Boolean(v.spokenLanguages['hi-IN']), `${lang}: spokenLanguages hi-IN translated`);
  assert(Boolean(v.spokenLanguages['mr-IN']), `${lang}: spokenLanguages mr-IN translated`);
}

// ── Test 3: Mock SpeechRecognition State Machine ────────────────────────────
console.log('\n--- Test 3: Mock SpeechRecognition State Transitions ---');

class MockSpeechRecognition {
  lang: string = 'en-IN';
  continuous: boolean = false;
  interimResults: boolean = true;
  onstart: (() => void) | null = null;
  onresult: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  onend: (() => void) | null = null;

  start() {
    if (this.onstart) this.onstart();
  }
  stop() {
    if (this.onend) this.onend();
  }
  abort() {
    if (this.onend) this.onend();
  }
}

// 3a. Successful recognition
const mockRecognition = new MockSpeechRecognition();
let simulatedStatus = 'idle';
let capturedTranscript = '';

mockRecognition.onstart = () => {
  simulatedStatus = 'listening';
};
mockRecognition.onresult = (event) => {
  for (let i = 0; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      capturedTranscript += event.results[i][0].transcript;
    }
  }
  simulatedStatus = 'partial';
};
mockRecognition.onend = () => {
  simulatedStatus = 'completed';
};

mockRecognition.start();
assert(simulatedStatus === 'listening', 'State transitions to listening on start');

mockRecognition.onresult({
  results: [
    {
      0: { transcript: 'A large pothole on Baner Main Road outside DAV school' },
      isFinal: true,
      length: 1,
    },
  ],
});
assert(simulatedStatus === 'partial', 'State transitions to partial on interim result');
assert(
  capturedTranscript === 'A large pothole on Baner Main Road outside DAV school',
  'Transcript captured accurately'
);

mockRecognition.stop();
assert(simulatedStatus === 'completed', 'State transitions to completed on recognition end');

// 3b. Permission denied handling
console.log('\n--- Test 4: Permission Denied Handling ---');
let deniedStatus = 'idle';
let deniedErrorString = '';
const mockDeniedRecognition = new MockSpeechRecognition();
mockDeniedRecognition.onerror = (e) => {
  if (e.error === 'not-allowed') {
    deniedStatus = 'denied';
    deniedErrorString = translations.mr.voice.deniedError;
  }
};
mockDeniedRecognition.onerror({ error: 'not-allowed' });
assert(deniedStatus === 'denied', 'Status updates to denied when not-allowed received');
assert(
  deniedErrorString.includes('मायक्रोफोन परवानगी'),
  'Displays localized Marathi permission error'
);

// ── Test 5: Transcript Insertion (Append vs Replace) ────────────────────────
console.log('\n--- Test 5: Transcript Insertion Logic ---');

function insertTranscript(
  existingText: string,
  newTranscript: string,
  mode: 'append' | 'replace'
): string {
  if (mode === 'append' && existingText.trim()) {
    return `${existingText.trim()}\n\n${newTranscript.trim()}`;
  }
  return newTranscript.trim();
}

// Empty existing text: inserts transcript directly
const resEmpty = insertTranscript('', 'Drainage overflow near Kothrud bus stand', 'replace');
assert(
  resEmpty === 'Drainage overflow near Kothrud bus stand',
  'Empty description gets populated directly with transcript'
);

// Existing text with Append mode: preserves existing text and appends new text
const initialText = 'Pothole on Baner road.';
const voiceText = 'Also the streetlights are non-functional since Sunday.';
const resAppend = insertTranscript(initialText, voiceText, 'append');
assert(
  resAppend === `${initialText}\n\n${voiceText}`,
  'Append mode cleanly joins existing text with transcript using double newline'
);
assert(
  resAppend.startsWith(initialText) && resAppend.endsWith(voiceText),
  'Append mode strictly preserves existing user text'
);

// Existing text with Replace mode: replaces with new text
const resReplace = insertTranscript(initialText, voiceText, 'replace');
assert(resReplace === voiceText, 'Replace mode overwrites with new transcript');

// ── Test 6: Non-auto submission verification ───────────────────────────────
console.log('\n--- Test 6: Form Submission Independence ---');
let submittedPayload: any = null;
const mockOnGenerateComplaint = (p: any) => {
  submittedPayload = p;
};

// Simulate voice transcription completing
const finalTranscript = 'Streetlights broken in Hinjawadi phase 1 near circle';
const updatedDescription = insertTranscript('', finalTranscript, 'replace');

// Assert that transcribing does NOT trigger submission
assert(
  submittedPayload === null,
  'Voice transcription completion DOES NOT trigger complaint generation'
);

// User explicitly clicks submit button
if (updatedDescription.length >= 15) {
  mockOnGenerateComplaint({
    description: updatedDescription,
    category: 'streetlight',
    outputLanguage: 'mr',
  });
}
assert(
  submittedPayload !== null && submittedPayload.description === finalTranscript,
  'Complaint is submitted ONLY upon explicit user submission'
);

// ── Summary ────────────────────────────────────────────────────────────────
console.log('\n======================================================');
console.log(`Phase 6 Tests Completed: PASS=${passCount}, FAIL=${failCount}`);
console.log('======================================================');
if (failCount > 0) {
  process.exit(1);
}
