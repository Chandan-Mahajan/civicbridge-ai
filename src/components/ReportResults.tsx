import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  Building,
  MapPin,
  Clock,
  ShieldAlert,
  FileText,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Edit3,
  Loader2,
  RefreshCw,
  Download,
  Printer,
  Globe,
} from 'lucide-react';
import type { AnalysisState, PriorityLevel, OutputLanguage, LocationDetails } from '../types';
import { CIVIC_CATEGORIES, RTS_SLA_STANDARDS } from '../data/civicData';
import { useLanguage } from '../i18n/LanguageContext';
import { WhereToSubmitSection } from './WhereToSubmitSection';

interface ReportResultsProps {
  analysisState: AnalysisState;
  onRetry: () => void;
  onEditInputs: () => void;
  onRegenerateInLanguage?: (newLang: OutputLanguage) => void;
  locationDetails?: LocationDetails | null;
  hasPhotos?: boolean;
}

export const ReportResults: React.FC<ReportResultsProps> = ({
  analysisState,
  onRetry,
  onEditInputs,
  onRegenerateInLanguage,
  locationDetails,
  hasPhotos,
}) => {
  const { language, t, getLanguageLabel } = useLanguage();
  const { status, data, error } = analysisState;

  // Local editable draft state
  const [editedDraft, setEditedDraft] = useState<string>('');
  const [prevOriginalDraft, setPrevOriginalDraft] = useState<string>('');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isDraftModified, setIsDraftModified] = useState(false);
  const [dismissMismatch, setDismissMismatch] = useState(false);

  // Adjust state during render when new analysis arrives
  if (data?.complaintDraft && data.complaintDraft !== prevOriginalDraft) {
    setPrevOriginalDraft(data.complaintDraft);
    setEditedDraft(data.complaintDraft);
    setIsDraftModified(false);
    setDismissMismatch(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(editedDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleResetDraft = () => {
    if (data?.complaintDraft) {
      setEditedDraft(data.complaintDraft);
      setIsDraftModified(false);
    }
  };

  const handleDownload = () => {
    if (!data) return;
    const reportLangLabel = getLanguageLabel(data.outputLanguage || 'en').name;
    const content = [
      '====================================================================',
      'CIVICBRIDGE AI — OFFICIAL CIVIC GRIEVANCE PETITION',
      'Under Maharashtra Right to Public Services Act (RTS 2015)',
      '====================================================================',
      `Date & Time       : ${new Date(data.analyzedAt).toLocaleString()}`,
      `Category          : ${data.category}`,
      `Target Authority  : ${data.location.jurisdiction || 'Municipal Corporation'}`,
      `Ward / Area       : ${data.location.wardOrArea || 'N/A'}`,
      `Street / Landmark : ${data.location.streetLandmark || 'N/A'}`,
      `PIN Code          : ${data.location.pincode || 'N/A'}`,
      `Priority          : ${data.priority} (${data.priorityReason})`,
      `Report Language   : ${reportLangLabel}`,
      `AI Engine         : ${data.modelUsed}`,
      '',
      '--------------------------------------------------------------------',
      'OFFICIAL PETITION DRAFT',
      '--------------------------------------------------------------------',
      editedDraft,
      '',
      '--------------------------------------------------------------------',
      'OBJECTIVE INCIDENT SUMMARY',
      '--------------------------------------------------------------------',
      data.incidentSummary,
      '',
      '--------------------------------------------------------------------',
      'PRESERVED CITIZEN FACTS',
      '--------------------------------------------------------------------',
      ...data.userProvidedFacts.map((f, i) => `${i + 1}. ${f}`),
      '',
      '--------------------------------------------------------------------',
      'RECOMMENDED NEXT STEP & HELPLINE',
      '--------------------------------------------------------------------',
      data.recommendedNextStep,
      '',
      '--------------------------------------------------------------------',
      'DISCLAIMER & LIMITATIONS',
      '--------------------------------------------------------------------',
      ...data.limitations.map((l, i) => `${i + 1}. ${l}`),
      '====================================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `civicbridge-${data.category}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-600" />
            {t.results.priorityLabels.CRITICAL}
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-700" />
            {t.results.priorityLabels.HIGH}
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
            {t.results.priorityLabels.MEDIUM}
          </span>
        );
      case 'LOW':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            {t.results.priorityLabels.LOW}
          </span>
        );
    }
  };

  // 1. Idle State (Before Submission)
  if (status === 'idle') {
    return (
      <div className="bg-white rounded-3xl border border-slate-250 p-6 sm:p-8 shadow-xs text-center flex flex-col items-center justify-center min-h-[460px]">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mb-4 shadow-2xs">
          <Sparkles className="w-8 h-8 text-teal-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1.5">
          {t.results.idleTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed mb-6">
          {t.results.idleSubtitle}
        </p>

        {/* Pipeline Architecture Spec */}
        <div className="w-full max-w-md bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.results.pipelineHeading}</span>
          </p>
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start space-x-2.5">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                1
              </span>
              <span><strong>{t.results.step1Title}</strong> {t.results.step1Desc}</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                2
              </span>
              <span><strong>{t.results.step2Title}</strong> {t.results.step2Desc}</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                3
              </span>
              <span><strong>{t.results.step3Title}</strong> {t.results.step3Desc}</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                4
              </span>
              <span><strong>{t.results.step4Title}</strong> {t.results.step4Desc}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Loading State
  if (status === 'loading') {
    return (
      <div className="bg-white rounded-3xl border border-slate-250 p-8 sm:p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[460px] space-y-5 animate-pulse">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-300 flex items-center justify-center text-teal-600">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="space-y-1.5 max-w-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {t.results.loadingTitle}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t.results.loadingSubtitle}
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2 pt-2">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full w-2/3 animate-pulse"></div>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">{t.results.loadingProgress}</p>
        </div>
      </div>
    );
  }

  // 3. Error State
  if (status === 'error') {
    const isMissingKey = error?.code === 'MISSING_API_KEY';
    return (
      <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center space-x-3 text-rose-700">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="font-bold text-base text-rose-900">
              {isMissingKey ? t.results.apiKeyRequiredTitle : t.results.errorTitle}
            </h3>
            <p className="text-xs text-rose-700">
              {error?.code ?? 'SERVER_ERROR'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900 space-y-2">
          <p className="font-semibold text-rose-950">
            {error?.message || 'Unable to connect to the CivicBridge backend service.'}
          </p>
          {isMissingKey && (
            <div className="p-3 bg-white rounded-xl border border-rose-200 font-mono text-[11px] text-slate-700 space-y-1">
              <p className="font-bold text-rose-800 font-sans">{t.results.apiKeyInstruction1}</p>
              <p className="text-indigo-900 font-bold bg-slate-50 p-1 rounded">server/.env</p>
              <p>{t.results.apiKeyInstruction2}</p>
              <p className="text-emerald-700 font-bold bg-slate-50 p-1 rounded">GEMINI_API_KEY=AIzaSy...</p>
              <p className="font-sans text-slate-500 pt-1">
                {t.results.apiKeyNote}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.results.retryButton}</span>
          </button>
          <button
            type="button"
            onClick={onEditInputs}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          >
            <span>{t.results.reviewInputsButton}</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. Success State (Real Gemini Structured Output)
  if (!data) return null;

  const categoryDetail = CIVIC_CATEGORIES.find((c) => c.id === data.category);
  const slaDetail = RTS_SLA_STANDARDS.find((s) =>
    s.categoryName.toLowerCase().includes(data.category.replace('_', ' '))
  );

  const reportLanguageCode = data.outputLanguage || 'en';
  const reportLangMeta = getLanguageLabel(reportLanguageCode);
  const currentLangMeta = getLanguageLabel(language);
  const hasLanguageMismatch = reportLanguageCode !== language;

  return (
    <div className="bg-white rounded-3xl border border-slate-250 shadow-md overflow-hidden transition-all space-y-0 print:border-none print:shadow-none">
      {/* Top Banner with Model, Language & Priority */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-5 sm:p-6 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base sm:text-lg text-white">
                {t.results.cardHeaderTitle}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-teal-950 text-teal-300 border border-teal-800">
                {data.modelUsed}
              </span>
              {/* Readable Report Language Tag */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-teal-300 border border-slate-700">
                <Globe className="w-3 h-3 text-teal-400" />
                <span>{t.results.reportLanguageLabel} {reportLangMeta.nativeName} ({reportLangMeta.name})</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {t.results.targetAuthorityLabel}: {data.location.jurisdiction || 'Maharashtra Municipal Authority'} • {t.results.wardLabel}: {data.location.wardOrArea || 'All Ward Area'}
            </p>
          </div>

          <div className="self-start sm:self-center">
            {getPriorityBadge(data.priority)}
          </div>
        </div>
      </div>

      {/* Language Mismatch Warning & Quick Regeneration */}
      {hasLanguageMismatch && !dismissMismatch && (
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 print:hidden">
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900">
                {t.results.languageMismatchNotice(reportLangMeta.name, currentLangMeta.name)}
              </p>
              <p className="text-amber-800 text-[11px] mt-0.5">
                The grievance draft remains in {reportLangMeta.name}. You can regenerate it in {currentLangMeta.name} or keep it.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {onRegenerateInLanguage && (
              <button
                type="button"
                onClick={() => onRegenerateInLanguage(language)}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                {t.results.regenerateInCurrentLang(currentLangMeta.name)}
              </button>
            )}
            <button
              type="button"
              onClick={() => setDismissMismatch(true)}
              className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium text-xs transition cursor-pointer"
            >
              {t.results.keepExistingReport}
            </button>
          </div>
        </div>
      )}

      <div className="p-5 sm:p-7 space-y-6">
        {/* Incident Summary & Priority Justification */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.results.incidentSummaryTitle}
            </span>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {t.results.slaPrefix} {slaDetail?.targetHours ?? 48}{t.results.rtsActSuffix}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-900 leading-relaxed font-sans">
            {data.incidentSummary}
          </p>
          <p className="text-xs text-slate-600 leading-normal border-t border-slate-200/80 pt-2 font-sans">
            <strong className="text-slate-800">{t.results.triageJustification}</strong> {data.priorityReason}
          </p>
        </div>

        {/* Facts vs Observations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User-provided Facts */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.results.factsTitle(data.userProvidedFacts.length)}</span>
            </span>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside font-sans">
              {data.userProvidedFacts.map((fact, i) => (
                <li key={i} className="leading-snug">
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Physical Observations */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.results.observationsTitle}</span>
            </span>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside font-sans">
              {data.visualObservations.length > 0 ? (
                data.visualObservations.map((obs, i) => (
                  <li key={i} className="leading-snug">
                    {obs}
                  </li>
                ))
              ) : (
                <li className="text-slate-400 italic">{t.results.noObservations}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Missing Information & Safety Considerations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Missing Information */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.results.missingInfoTitle}</span>
            </span>
            <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside font-sans">
              {data.missingInformation.length > 0 ? (
                data.missingInformation.map((info, i) => (
                  <li key={i} className="leading-snug">
                    {info}
                  </li>
                ))
              ) : (
                <li className="text-emerald-700 font-semibold">{t.results.allInfoProvided}</li>
              )}
            </ul>
          </div>

          {/* Safety Considerations */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
              <span>{t.results.safetyHazardsTitle}</span>
            </span>
            <ul className="text-xs text-rose-900 space-y-1.5 list-disc list-inside font-sans">
              {data.safetyConsiderations.length > 0 ? (
                data.safetyConsiderations.map((safety, i) => (
                  <li key={i} className="leading-snug">
                    {safety}
                  </li>
                ))
              ) : (
                <li className="text-slate-500">{t.results.noHazards}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Editable Official Complaint Draft */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-teal-600" />
              <label
                htmlFor="editable-complaint-draft"
                className="text-sm font-bold text-slate-900"
              >
                {t.results.draftTitle}
              </label>
              {isDraftModified && (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                  {t.results.citizenEditedBadge}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {isDraftModified && (
                <button
                  type="button"
                  onClick={handleResetDraft}
                  className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
                  title={t.results.restoreOriginalDraft}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.results.restoreOriginalDraft}</span>
                </button>
              )}
              <span className="text-xs font-mono text-slate-400">
                {t.results.charCount(editedDraft.length)}
              </span>
            </div>
          </div>

          <textarea
            id="editable-complaint-draft"
            rows={8}
            value={editedDraft}
            onChange={(e) => {
              setEditedDraft(e.target.value);
              setIsDraftModified(true);
            }}
            className="w-full p-4 text-xs sm:text-sm font-sans leading-relaxed text-slate-900 bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 shadow-inner"
            aria-label={t.results.draftTitle}
          />

          {/* Action Row: Copy, Download, Print */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-slate-900 via-slate-850 to-teal-950 hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
              >
                {copiedDraft ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{t.results.copiedButton}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-teal-300" />
                    <span>{t.results.copyButton}</span>
                  </>
                )}
              </button>

              {/* Download .txt Button */}
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-250 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
                title={t.results.downloadButton}
              >
                <Download className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.results.downloadButton}</span>
              </button>

              {/* Print Button */}
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-250 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
                title={t.results.printButton}
              >
                <Printer className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.results.printButton}</span>
              </button>
            </div>

            <span className="text-xs text-slate-500">
              {t.results.pasteInstruction}
            </span>
          </div>
        </div>

        {/* Phase 7: Rapid Authority Finder "Where to Submit" Section */}
        <WhereToSubmitSection
          category={data.category}
          locationDetails={
            locationDetails || {
              state: 'Maharashtra',
              district: '',
              city: '',
              area: data.location.wardOrArea || '',
              streetLandmark: data.location.streetLandmark || '',
              pincode: data.location.pincode || '',
              suggestedAuthority: data.location.jurisdiction || '',
            }
          }
          complaintDraft={editedDraft}
          hasPhotos={Boolean(hasPhotos)}
        />

        {/* Recommended Next Step */}
        <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200/90 text-xs text-teal-950 space-y-1.5">
          <span className="font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-teal-700" />
            <span>{t.results.nextStepTitle}</span>
          </span>
          <p className="leading-relaxed text-teal-900 font-medium font-sans">
            {data.recommendedNextStep}
          </p>
        </div>

        {/* Legal & Technical Limitations */}
        <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <span className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.results.limitationsTitle}</span>
          </span>
          <ul className="space-y-1 list-disc list-inside text-slate-600 text-[11px] font-sans">
            {data.limitations.map((limit, i) => (
              <li key={i}>{limit}</li>
            ))}
          </ul>
        </div>

        {/* Location & Metadata Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-t border-slate-200 gap-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {categoryDetail?.label} • {data.location.wardOrArea}
              {data.location.streetLandmark ? `, ${data.location.streetLandmark}` : ''}
            </span>
          </div>
          <span>{t.results.analyzedAt(new Date(data.analyzedAt).toLocaleTimeString())}</span>
        </div>
      </div>
    </div>
  );
};
