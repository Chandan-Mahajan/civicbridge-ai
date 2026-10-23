/**
 * VoiceInput — Phase 6: Voice Input and Speech-to-Text
 *
 * Implements:
 *  - Browser Web Speech API (SpeechRecognition / webkitSpeechRecognition)
 *  - Runtime feature detection with graceful fallback
 *  - Locales: en-IN, hi-IN, mr-IN (auto-matched to UI with spoken override)
 *  - States: idle, requesting_permission, listening, partial, completed, denied, unsupported, error
 *  - Safe transcript handling: Append / Replace choice when text already exists
 *  - Fully localized in English, Marathi, Hindi
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Square,
  RefreshCw,
  AlertTriangle,
  Info,
  Check,
  Plus,
  Replace,
  X,
  Volume2,
} from 'lucide-react';
import type { SpeechRecognitionStatus, SpokenLanguage, OutputLanguage } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

// ─── Browser Web Speech API Type Shims ─────────────────────────────────────────
interface IWindowSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

interface VoiceInputProps {
  currentDescription: string;
  onTranscriptInsert: (transcript: string, mode: 'append' | 'replace') => void;
  outputLanguage: OutputLanguage;
  disabled?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  currentDescription,
  onTranscriptInsert,
  outputLanguage,
  disabled = false,
}) => {
  const { t } = useLanguage();

  // Spoken locale (defaults to match outputLanguage, user can toggle)
  const defaultSpokenLocale: SpokenLanguage =
    outputLanguage === 'mr' ? 'mr-IN' : outputLanguage === 'hi' ? 'hi-IN' : 'en-IN';

  const [spokenLang, setSpokenLang] = useState<SpokenLanguage>(defaultSpokenLocale);

  // Sync spoken language default when outputLanguage changes, if user hasn't customized
  useEffect(() => {
    const matched: SpokenLanguage =
      outputLanguage === 'mr' ? 'mr-IN' : outputLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    setSpokenLang(matched);
  }, [outputLanguage]);

  const [status, setStatus] = useState<SpeechRecognitionStatus>('idle');
  const [interimText, setInterimText] = useState<string>('');
  const [completedTranscript, setCompletedTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isStoppingIntentionally = useRef<boolean>(false);

  // Runtime feature detection
  const isSupported = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    const win = window as unknown as IWindowSpeech;
    return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const stopRecording = useCallback(() => {
    isStoppingIntentionally.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!isSupported()) {
      setStatus('unsupported');
      return;
    }

    setErrorMessage(null);
    setInterimText('');
    setCompletedTranscript('');
    isStoppingIntentionally.current = false;
    setStatus('requesting_permission');

    const win = window as unknown as IWindowSpeech;
    const SpeechConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;

    try {
      const recognition = new SpeechConstructor();
      recognitionRef.current = recognition;

      recognition.lang = spokenLang;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setStatus('listening');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0].transcript;
          if (result.isFinal) {
            final += (final ? ' ' : '') + text;
          } else {
            interim += (interim ? ' ' : '') + text;
          }
        }

        if (interim) {
          setInterimText(interim);
          setStatus('partial');
        }

        if (final) {
          setCompletedTranscript(final);
        }
      };

      recognition.onerror = (event: any) => {
        const errType = event.error;
        if (errType === 'not-allowed' || errType === 'permission-denied') {
          setStatus('denied');
          setErrorMessage(t.voice.deniedError);
        } else if (errType === 'no-speech') {
          // If stopped without speech, return to idle or keep last transcript
          if (completedTranscript) {
            setStatus('completed');
          } else {
            setStatus('idle');
          }
        } else {
          setStatus('error');
          setErrorMessage(t.voice.genericError);
        }
      };

      recognition.onend = () => {
        // Recognition completed naturally or stopped by user
        if (completedTranscript.trim()) {
          setStatus('completed');
          // If the problem description is completely empty, insert automatically
          if (!currentDescription.trim()) {
            onTranscriptInsert(completedTranscript.trim(), 'replace');
          }
        } else if (interimText.trim()) {
          setCompletedTranscript(interimText.trim());
          setStatus('completed');
          if (!currentDescription.trim()) {
            onTranscriptInsert(interimText.trim(), 'replace');
          }
        } else if (!isStoppingIntentionally.current && status === 'listening') {
          setStatus('idle');
        }
      };

      recognition.start();
    } catch (e) {
      setStatus('error');
      setErrorMessage(t.voice.genericError);
    }
  }, [
    isSupported,
    spokenLang,
    t.voice.deniedError,
    t.voice.genericError,
    completedTranscript,
    interimText,
    currentDescription,
    onTranscriptInsert,
    status,
  ]);

  const handleAppend = () => {
    if (completedTranscript) {
      onTranscriptInsert(completedTranscript.trim(), 'append');
      setCompletedTranscript('');
      setStatus('idle');
    }
  };

  const handleReplace = () => {
    if (completedTranscript) {
      onTranscriptInsert(completedTranscript.trim(), 'replace');
      setCompletedTranscript('');
      setStatus('idle');
    }
  };

  const handleDiscard = () => {
    setCompletedTranscript('');
    setInterimText('');
    setStatus('idle');
  };

  return (
    <div
      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3"
      aria-label="Voice input control"
    >
      {/* ── Top Bar: Microphone Button & Language Selector ──────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* Main Voice Toggle Button */}
          {status === 'listening' || status === 'partial' ? (
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-900/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer animate-pulse"
              aria-label={t.voice.ariaStop}
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{t.voice.stopButton}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={startRecording}
              disabled={disabled || status === 'requesting_permission'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 shadow-md shadow-teal-950/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-sans"
              aria-label={t.voice.ariaMicrophone}
            >
              <Mic className="w-4 h-4 text-teal-300" />
              <span>
                {status === 'requesting_permission'
                  ? t.voice.requestingPermission
                  : t.voice.speakButton}
              </span>
            </button>
          )}

          {/* Status Indicator Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
              status === 'listening' || status === 'partial'
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : status === 'completed'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : status === 'denied' || status === 'error'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-white text-slate-600 border-slate-200'
            }`}
            role="status"
            aria-live="polite"
          >
            {status === 'listening' || status === 'partial' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>{t.voice.statusBadge.listening}</span>
              </>
            ) : status === 'completed' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.voice.statusBadge.completed}</span>
              </>
            ) : status === 'denied' ? (
              <>
                <MicOff className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.voice.statusBadge.denied}</span>
              </>
            ) : status === 'unsupported' ? (
              <span>{t.voice.statusBadge.unsupported}</span>
            ) : status === 'error' ? (
              <span>{t.voice.statusBadge.error}</span>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.voice.statusBadge.ready}</span>
              </>
            )}
          </span>
        </div>

        {/* Spoken Language Selector (allows speaking Hindi / Marathi / English independently) */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs text-slate-600">
          <span className="font-semibold text-[11px] text-slate-500">{t.voice.spokenLangLabel}</span>
          <select
            value={spokenLang}
            onChange={(e) => setSpokenLang(e.target.value as SpokenLanguage)}
            disabled={status === 'listening' || status === 'partial' || disabled}
            className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-60 cursor-pointer"
            aria-label={t.voice.spokenLangLabel}
          >
            <option value="en-IN">{t.voice.spokenLanguages['en-IN']}</option>
            <option value="hi-IN">{t.voice.spokenLanguages['hi-IN']}</option>
            <option value="mr-IN">{t.voice.spokenLanguages['mr-IN']}</option>
          </select>
        </div>
      </div>

      {/* ── Active Waveform / Listening State ──────────────────────────────── */}
      {(status === 'listening' || status === 'partial') && (
        <div className="p-3 bg-white rounded-xl border border-rose-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-rose-700">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex gap-0.5 items-end h-3.5">
                <span className="w-1 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-3.5 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-2.5 bg-rose-500 rounded-full animate-bounce" />
              </span>
              <span>{t.voice.listening}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {spokenLang}
            </span>
          </div>

          {/* Live partial transcription preview */}
          <p className="text-xs text-slate-700 italic font-sans min-h-[1.5rem] bg-rose-50/40 p-2 rounded-lg border border-rose-100">
            {interimText || completedTranscript || (
              <span className="text-slate-400 font-normal">{t.voice.interimHint}</span>
            )}
          </p>
        </div>
      )}

      {/* ── Completed Transcript Review & Append / Replace Choice ──────────── */}
      {status === 'completed' && completedTranscript && (
        <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between text-xs text-emerald-800">
            <span className="font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{t.voice.transcriptReadyTitle}</span>
            </span>
            <button
              type="button"
              onClick={handleDiscard}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
              title={t.voice.discardButton}
              aria-label={t.voice.discardButton}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-sans text-slate-800 p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100 leading-relaxed font-medium">
            "{completedTranscript}"
          </p>

          {/* If there is existing text, present Append vs Replace options */}
          {currentDescription.trim() ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleAppend}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 transition shadow-2xs cursor-pointer font-sans"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.voice.appendButton}</span>
              </button>
              <button
                type="button"
                onClick={handleReplace}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-250 transition cursor-pointer font-sans"
              >
                <Replace className="w-3.5 h-3.5" />
                <span>{t.voice.replaceButton}</span>
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="text-xs text-slate-500 hover:text-rose-600 px-2 py-1 underline transition cursor-pointer font-sans"
              >
                {t.voice.discardButton}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-emerald-700 pt-0.5">
              <span>{t.voice.insertDirectly}</span>
              <button
                type="button"
                onClick={startRecording}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 hover:underline cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.voice.retryButton}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Denied Error Notice ────────────────────────────────────────────── */}
      {status === 'denied' && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5"
        >
          <div className="flex items-center justify-between font-bold text-amber-950">
            <span className="flex items-center gap-1.5">
              <MicOff className="w-4 h-4 text-amber-600" />
              <span>{t.voice.statusBadge.denied}</span>
            </span>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-amber-700 hover:text-amber-900 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="leading-relaxed font-sans">{t.voice.deniedError}</p>
        </div>
      )}

      {/* ── Unsupported Browser Notice ────────────────────────────────────── */}
      {status === 'unsupported' && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-1.5"
        >
          <div className="flex items-center justify-between font-bold text-slate-900">
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-slate-500" />
              <span>{t.voice.statusBadge.unsupported}</span>
            </span>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="leading-relaxed font-sans">{t.voice.unsupportedNotice}</p>
        </div>
      )}

      {/* ── Generic Recognition Error ─────────────────────────────────────── */}
      {status === 'error' && errorMessage && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start justify-between gap-2"
        >
          <div className="flex items-start gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <p className="font-sans">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={startRecording}
            className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 transition cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t.voice.retryButton}</span>
          </button>
        </div>
      )}
    </div>
  );
};
