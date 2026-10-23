import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Building,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Info,
} from 'lucide-react';
import type { CivicCategory, LocationDetails } from '../types';
import { findRecommendedAuthority, type AuthorityConfidence } from '../data/authorityDirectory';
import { useLanguage } from '../i18n/LanguageContext';

interface WhereToSubmitSectionProps {
  category: CivicCategory;
  locationDetails?: LocationDetails | null;
  complaintDraft: string;
  hasPhotos: boolean;
}

export const WhereToSubmitSection: React.FC<WhereToSubmitSectionProps> = ({
  category,
  locationDetails,
  complaintDraft,
  hasPhotos,
}) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const recommendation = findRecommendedAuthority(
    category,
    locationDetails,
    hasPhotos,
    Boolean(complaintDraft)
  );

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(complaintDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Localized Authority Title
  const localizedAuthorityName =
    language === 'mr'
      ? recommendation.marathiAuthorityName
      : language === 'hi'
        ? recommendation.hindiAuthorityName
        : recommendation.authorityName;

  // Localized Why Responsible explanation
  const whyResponsibleText =
    recommendation.whyResponsible[language] || recommendation.whyResponsible.en;

  // Localized Caveat
  const caveatText =
    recommendation.submissionCaveat[language] || recommendation.submissionCaveat.en;

  const renderConfidenceBadge = (confidence: AuthorityConfidence) => {
    switch (confidence) {
      case 'LIKELY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.whereToSubmit.confidenceLabels.LIKELY}</span>
          </span>
        );
      case 'POSSIBLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.whereToSubmit.confidenceLabels.POSSIBLE}</span>
          </span>
        );
      case 'UNCONFIRMED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.whereToSubmit.confidenceLabels.UNCONFIRMED}</span>
          </span>
        );
    }
  };

  return (
    <section
      id="where-to-submit-section"
      aria-labelledby="where-to-submit-title"
      className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white border border-slate-800 shadow-lg space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 flex-shrink-0">
            <Building className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <h3
              id="where-to-submit-title"
              className="text-base sm:text-lg font-extrabold text-white font-sans"
            >
              {t.whereToSubmit.sectionTitle}
            </h3>
            <p className="text-xs text-slate-300 font-sans mt-0.5">
              {t.whereToSubmit.sectionSubtitle}
            </p>
          </div>
        </div>

        <div className="self-start sm:self-center">
          {renderConfidenceBadge(recommendation.confidence)}
        </div>
      </div>

      {/* Main Recommendation Card */}
      <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/80 space-y-4">
        {/* Recommended Authority */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
            {t.whereToSubmit.recommendedAuthorityHeading}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1 font-sans">
            {localizedAuthorityName}
          </h4>
        </div>

        {/* Why Responsible */}
        <div className="pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {t.whereToSubmit.whyResponsibleHeading}
          </span>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed font-sans">
            {whyResponsibleText}
          </p>
        </div>

        {/* Official Source Link & Verification Notice */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-400" />
                <span>{t.whereToSubmit.officialSourceLabel}</span>
              </span>
              <p className="font-semibold text-slate-200 mt-0.5 font-sans">
                {recommendation.officialSource.name}
              </p>
            </div>
            <a
              href={recommendation.officialSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600/30 hover:bg-teal-600/50 text-teal-300 border border-teal-500/40 text-[11px] font-bold transition flex-shrink-0 cursor-pointer"
            >
              <span>{recommendation.officialSource.url.replace(/^https?:\/\//, '').split('/')[0]}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-[11px] text-amber-300/90 italic font-sans leading-relaxed">
            {t.whereToSubmit.sourceStatusNotice}
          </p>

          <p className="text-[11px] text-slate-300 border-t border-slate-800 pt-1.5 font-sans">
            <strong>Caveat:</strong> {caveatText}
          </p>
        </div>
      </div>

      {/* Submission Instructions & Evidence Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step-by-Step Instructions */}
        <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/70 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.whereToSubmit.submissionInstructionsHeading}</span>
          </span>
          <div className="space-y-2 text-xs text-slate-300 font-sans">
            <p className="leading-snug">{t.whereToSubmit.step1}</p>
            <p className="leading-snug">{t.whereToSubmit.step2}</p>
            <p className="leading-snug">{t.whereToSubmit.step3}</p>
            <p className="leading-snug">{t.whereToSubmit.step4}</p>
          </div>
        </div>

        {/* Evidence Checklist */}
        <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/70 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.whereToSubmit.evidenceChecklistHeading}</span>
          </span>
          <ul className="space-y-2 text-xs text-slate-300 font-sans">
            <li className="flex items-start gap-2">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  hasPhotos
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'
                    : 'bg-slate-700 text-slate-400 border border-slate-600'
                }`}
              >
                {hasPhotos ? <Check className="w-3 h-3" /> : '•'}
              </span>
              <span className={hasPhotos ? 'text-slate-100 font-medium' : 'text-slate-400'}>
                {hasPhotos
                  ? t.whereToSubmit.checklistPhotos
                  : t.whereToSubmit.checklistPhotosMissing}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </span>
              <span className="text-slate-100 font-medium">
                {t.whereToSubmit.checklistLocation}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </span>
              <span className="text-slate-100 font-medium">
                {t.whereToSubmit.checklistDescription}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-700 text-teal-300 border border-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                !
              </span>
              <span className="text-slate-300">
                {t.whereToSubmit.checklistContact}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons: Copy Complaint & Open Official Portal */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleCopyDraft}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-teal-400 hover:bg-teal-300 transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-950" />
              <span>{t.whereToSubmit.copiedComplaintButton}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-900" />
              <span>{t.whereToSubmit.copyComplaintButton}</span>
            </>
          )}
        </button>

        <a
          href={recommendation.officialSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
        >
          <span>{t.whereToSubmit.openPortalButton}</span>
          <ExternalLink className="w-4 h-4 text-indigo-200" />
        </a>
      </div>

      {/* Safety & Non-Submission Disclaimers */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1 font-sans">
        <p className="flex items-start gap-1.5 text-amber-300/90 font-medium">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <span>{t.whereToSubmit.portalDisclaimerNotice}</span>
        </p>
        <p className="pl-5 text-slate-400">
          {t.whereToSubmit.notOfficiallyConfirmedDisclaimer}
        </p>
      </div>
    </section>
  );
};
