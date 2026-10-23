import React, { useState } from 'react';
import {
  AlertTriangle,
  Trash2,
  Waves,
  Droplets,
  Lightbulb,
  Zap,
  ShieldAlert,
  HelpCircle,
  Sparkles,
  ArrowRight,
  AlertCircle,
  RotateCcw,
  Loader2,
  Globe,
} from 'lucide-react';
import type {
  CivicCategory,
  ReportingFormState,
  FormValidationErrors,
  AiBridgePayload,
} from '../types';
import {
  CIVIC_CATEGORIES,
  SUPPORTED_LANGUAGES,
} from '../data/civicData';
import { PhotoUpload } from './PhotoUpload';
import { LocationInput } from './LocationInput';
import { VoiceInput } from './VoiceInput';
import { useLanguage } from '../i18n/LanguageContext';

interface ReportingFormProps {
  onGenerateComplaint: (payload: AiBridgePayload) => void;
  formState: ReportingFormState;
  setFormState: React.Dispatch<React.SetStateAction<ReportingFormState>>;
  isLoading: boolean;
}

export const ReportingForm: React.FC<ReportingFormProps> = ({
  onGenerateComplaint,
  formState,
  setFormState,
  isLoading,
}) => {
  const { t, language, setLanguage } = useLanguage();
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState(false);

  const getCategoryIcon = (category: CivicCategory) => {
    switch (category) {
      case 'pothole':
        return <AlertTriangle className="w-4 h-4 text-amber-500" aria-hidden="true" />;
      case 'garbage':
        return <Trash2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />;
      case 'drainage':
        return <Waves className="w-4 h-4 text-cyan-600" aria-hidden="true" />;
      case 'water_supply':
        return <Droplets className="w-4 h-4 text-blue-600" aria-hidden="true" />;
      case 'streetlight':
        return <Lightbulb className="w-4 h-4 text-yellow-500" aria-hidden="true" />;
      case 'electricity':
        return <Zap className="w-4 h-4 text-amber-600" aria-hidden="true" />;
      case 'encroachment':
        return <ShieldAlert className="w-4 h-4 text-rose-500" aria-hidden="true" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500" aria-hidden="true" />;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormValidationErrors = {};
    const trimmedDescription = formState.description.trim();

    if (!trimmedDescription) {
      newErrors.description = t.form.validation.descRequired;
    } else if (trimmedDescription.length < 15) {
      newErrors.description = t.form.validation.descTooShort;
    }

    if (!formState.location.district.trim()) {
      newErrors.wardOrArea = t.form.validation.districtRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setTouched(true);

    if (validateForm()) {
      const payload: AiBridgePayload = {
        category: formState.category,
        description: formState.description.trim(),
        outputLanguage: formState.outputLanguage || language || 'en',
        location: formState.location,
        photoEntries: formState.photoEntries,
        gpsCoordinates: formState.gpsCoordinates,
        submittedAt: new Date().toISOString(),
        clientVersion: '5.0.0-multilingual',
      };
      onGenerateComplaint(payload);
    }
  };

  const handleApplySample = (sample: (typeof t.samples)[0]) => {
    setFormState((prev) => ({
      ...prev,
      category: sample.category,
      description: sample.description,
      location: {
        ...prev.location,
        district: sample.district || 'Pune',
        city: sample.city || 'Pune',
        area: sample.area,
        streetLandmark: sample.streetLandmark,
        suggestedAuthority:
          sample.area.includes('PMRDA')
            ? 'Pune Metropolitan Region Development Authority (PMRDA)'
            : 'Pune Municipal Corporation (PMC)',
      },
    }));
    setErrors({});
  };

  const handleReset = () => {
    for (const entry of formState.photoEntries) {
      URL.revokeObjectURL(entry.previewUrl);
    }
    setFormState({
      category: 'pothole',
      description: '',
      outputLanguage: language,
      location: {
        state: 'Maharashtra',
        district: '',
        city: '',
        area: '',
        streetLandmark: '',
        pincode: '',
        suggestedAuthority: '',
      },
      photoEntries: [],
      gpsCoordinates: null,
      gpsStatus: 'idle',
    });
    setErrors({});
    setTouched(false);
  };

  const handleTranscriptInsert = (transcript: string, mode: 'append' | 'replace') => {
    setFormState((prev) => {
      let newDesc = '';
      if (mode === 'append' && prev.description.trim()) {
        newDesc = `${prev.description.trim()}\n\n${transcript.trim()}`;
      } else {
        newDesc = transcript.trim();
      }
      return { ...prev, description: newDesc };
    });
    if (transcript.trim().length >= 15) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const activeCategoryDetail = CIVIC_CATEGORIES.find((c) => c.id === formState.category);

  return (
    <section aria-labelledby="reporting-workspace-title" className="space-y-6">
      {/* Quick Test Presets */}
      <div className="bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200/90 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
            <span>{t.form.samplesTitle}</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="text-slate-500 hover:text-slate-800 flex items-center space-x-1 underline text-[11px] disabled:opacity-50 cursor-pointer"
            title={t.form.resetButton}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.form.resetButton}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {t.samples.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleApplySample(sample)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-teal-50 hover:text-teal-900 border border-slate-200 text-slate-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Validation Error Banner */}
        {touched && Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5 shadow-sm"
          >
            <div className="flex items-center space-x-2 font-bold text-rose-800 text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{t.common.error}</span>
            </div>
            <ul className="list-disc list-inside text-xs space-y-1 text-rose-700 pl-1">
              {errors.description && <li>{errors.description}</li>}
              {errors.wardOrArea && <li>{errors.wardOrArea}</li>}
            </ul>
          </div>
        )}

        {/* Step 1: Category Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-slate-900">
              {t.form.categoryLabel}
            </label>
            {activeCategoryDetail && (
              <span className="text-xs font-medium text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                SLA: {activeCategoryDetail.slaGuideline}
              </span>
            )}
          </div>

          <div
            role="radiogroup"
            aria-label={t.form.categoryLabel}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          >
            {CIVIC_CATEGORIES.map((cat) => {
              const isSelected = formState.category === cat.id;
              const catTrans = t.categories[cat.id] || { label: cat.label, desc: cat.description };
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isLoading}
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, category: cat.id }))
                  }
                  className={`p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-60 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-1 ring-slate-900'
                      : 'bg-white hover:bg-slate-50 border-slate-250 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-slate-100 text-slate-800 inline-flex">
                      {getCategoryIcon(cat.id)}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1 rounded ${
                        isSelected
                          ? 'bg-slate-800 text-teal-300'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.id}
                    </span>
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold leading-tight font-sans ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {catTrans.label}
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 line-clamp-1 font-sans ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {catTrans.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Problem Description Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="problem-description-input"
              className="block text-sm font-bold text-slate-900"
            >
              {t.form.descriptionLabel} <span className="text-rose-500">*</span>
            </label>
            <span
              className={`text-xs font-mono font-medium ${
                formState.description.length < 15
                  ? 'text-slate-400'
                  : 'text-emerald-700'
              }`}
            >
              {formState.description.length} chars
            </span>
          </div>

          {/* Phase 6: Voice Speech-to-Text Input Control */}
          <VoiceInput
            currentDescription={formState.description}
            onTranscriptInsert={handleTranscriptInsert}
            outputLanguage={formState.outputLanguage}
            disabled={isLoading}
          />

          <div className="relative">
            <textarea
              id="problem-description-input"
              rows={5}
              disabled={isLoading}
              value={formState.description}
              onChange={(e) => {
                const val = e.target.value;
                setFormState((prev) => ({ ...prev, description: val }));
                if (errors.description && val.trim().length >= 15) {
                  setErrors((prev) => ({ ...prev, description: undefined }));
                }
              }}
              placeholder={t.form.descriptionPlaceholder}
              className={`w-full p-4 text-sm rounded-xl border font-sans font-normal leading-relaxed transition-all focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 ${
                errors.description
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-400 focus:border-rose-500'
                  : 'border-slate-300 bg-white focus:ring-teal-500 focus:border-teal-500 shadow-2xs'
              }`}
              aria-invalid={Boolean(errors.description)}
              aria-describedby="description-hint"
              required
            />
          </div>

          <div id="description-hint" className="flex items-start justify-between text-xs text-slate-500 px-1 font-sans">
            <span>{t.form.descriptionHelp}</span>
            <span className="text-slate-400 font-mono text-[11px]">{t.form.minCharsNotice}</span>
          </div>

          {errors.description && (
            <p className="text-xs font-semibold text-rose-600 flex items-center space-x-1 font-sans">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Step 3: Location Section */}
        <div className="space-y-2">
          <LocationInput
            location={formState.location}
            gpsCoordinates={formState.gpsCoordinates}
            gpsStatus={formState.gpsStatus}
            onLocationChange={(loc) => {
              setFormState((prev) => ({ ...prev, location: loc }));
              if (errors.wardOrArea && loc.district.trim()) {
                setErrors((prev) => ({ ...prev, wardOrArea: undefined }));
              }
            }}
            onGpsCoordinatesChange={(coords) =>
              setFormState((prev) => ({ ...prev, gpsCoordinates: coords }))
            }
            onGpsStatusChange={(status) =>
              setFormState((prev) => ({ ...prev, gpsStatus: status }))
            }
            disabled={isLoading}
          />
          {errors.wardOrArea && (
            <p className="text-xs font-semibold text-rose-600 flex items-center space-x-1 pl-1 font-sans">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.wardOrArea}</span>
            </p>
          )}
        </div>

        {/* Step 4: Multi-Photo Evidence Upload */}
        <div className="space-y-2">
          <PhotoUpload
            photoEntries={formState.photoEntries}
            onEntriesChange={(entries) =>
              setFormState((prev) => ({ ...prev, photoEntries: entries }))
            }
            disabled={isLoading}
          />
        </div>

        {/* Step 5: Output Language Selection */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-sans">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.nav.draftLanguageLabel}</span>
            </label>
            <span className="text-[11px] text-slate-500 font-sans">{t.nav.languageMenuNote}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = formState.outputLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setFormState((prev) => ({ ...prev, outputLanguage: lang.id }));
                    setLanguage(lang.id);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-900 text-teal-100 border-teal-800 shadow-xs'
                      : 'bg-white hover:bg-slate-100 border-slate-250 text-slate-700'
                  }`}
                >
                  <div className="font-sans">{lang.label}</div>
                  <div className="text-[10px] font-normal opacity-80 font-serif">
                    {lang.nativeLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prominent Action Button with Loading and Duplicate Prevention */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto min-w-[280px] px-8 py-4 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-3 text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50 cursor-pointer ${
              isLoading
                ? 'bg-slate-700 cursor-not-allowed opacity-90'
                : 'bg-gradient-to-r from-slate-900 via-slate-850 to-teal-900 shadow-slate-900/20 hover:shadow-xl hover:from-slate-850 hover:to-teal-800'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
                <span>{t.form.submittingButton}</span>
              </>
            ) : (
              <>
                <span>{t.form.submitButton}</span>
                <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <p className="text-xs text-slate-500 mt-2 font-sans">
            {t.results.idleSubtitle}
          </p>
        </div>
      </form>
    </section>
  );
};
