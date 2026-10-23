import React, { useState } from 'react';
import {
  Building2,
  ExternalLink,
  Phone,
  MessageSquare,
  Clock,
  Shield,
  FileText,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { CIVIC_AUTHORITIES, RTS_SLA_STANDARDS } from '../data/civicData';
import type { AuthorityJurisdiction } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export const AuthorityGuide: React.FC = () => {
  const { t } = useLanguage();
  const [selectedAuthorityId, setSelectedAuthorityId] =
    useState<AuthorityJurisdiction>('PMC');

  const selectedAuthority =
    CIVIC_AUTHORITIES.find((a) => a.id === selectedAuthorityId) ??
    CIVIC_AUTHORITIES[0];

  return (
    <section
      id="authorities-guide"
      aria-labelledby="authorities-guide-title"
      className="space-y-8 pt-4"
    >
      <div className="border-t border-slate-200 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h2
              id="authorities-guide-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans"
            >
              {t.authorities.title}
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 self-start sm:self-center font-sans">
            {t.authorities.verifiedBadge}
          </span>
        </div>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed font-sans">
          {t.authorities.subtitle}
        </p>
      </div>

      {/* Authority Selection Tabs */}
      <div className="bg-white rounded-2xl border border-slate-250 shadow-xs overflow-hidden">
        {/* Tab Buttons */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/60 p-1.5 gap-1.5 scrollbar-thin">
          {CIVIC_AUTHORITIES.map((auth) => {
            const isSelected = auth.id === selectedAuthorityId;
            return (
              <button
                key={auth.id}
                type="button"
                onClick={() => setSelectedAuthorityId(auth.id)}
                className={`flex-shrink-0 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-250'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{auth.acronym}</span>
                <span className="hidden md:inline text-xs font-normal text-slate-500 ml-1.5 font-serif">
                  ({auth.marathiName.split(' ')[0]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Authority Details Card */}
        <div className="p-6 sm:p-7 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-150">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                  {selectedAuthority.name}
                </h3>
                <span className="text-xs font-mono font-medium text-slate-500 px-2 py-0.5 rounded bg-slate-100 font-serif">
                  {selectedAuthority.marathiName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                {selectedAuthority.tagline} • Coverage: {selectedAuthority.coverage}
              </p>
            </div>

            <a
              href={selectedAuthority.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 self-start cursor-pointer font-sans"
            >
              <span>{t.authorities.portalLabel}: {selectedAuthority.acronym}</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-700" />
            </a>
          </div>

          {/* Contact & WhatsApp Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Toll Free Helpline */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold font-sans">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.authorities.helplineLabel}</span>
              </div>
              <p className="text-sm font-bold text-slate-900 font-mono">
                {selectedAuthority.officialHelpline}
              </p>
              <p className="text-[11px] text-slate-500 font-sans">Citizen grievance control room</p>
            </div>

            {/* WhatsApp Grievance Bot */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold font-sans">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.authorities.whatsappLabel}</span>
              </div>
              <p className="text-sm font-bold text-slate-900 font-mono">
                {selectedAuthority.whatsappGrievance ?? 'Available via Web Portal'}
              </p>
              <p className="text-[11px] text-slate-500 font-sans">Fastest channel for photo submissions</p>
            </div>

            {/* Headquarters */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold font-sans">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.authorities.headquartersLabel}</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug font-sans">
                {selectedAuthority.headquarters}
              </p>
              <p className="text-[11px] text-slate-500 font-sans">Administrative jurisdiction</p>
            </div>
          </div>

          {/* Key Departments Handled */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-sans">
              {t.authorities.departmentsTitle} ({selectedAuthority.acronym})
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedAuthority.commonDepartments.map((dept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 font-sans"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statutory RTS SLA Reference Table */}
      <div className="bg-white rounded-2xl border border-slate-250 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900 font-sans">
              {t.authorities.slaTableTitle}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 hidden sm:inline-block font-sans">
            {t.authorities.slaTableSubtitle}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          {t.authorities.rtsCharterNote}
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold font-sans">
              <tr>
                <th className="p-3">{t.authorities.colCategory}</th>
                <th className="p-3">{t.authorities.colTargetHours}</th>
                <th className="p-3">{t.authorities.colTier1}</th>
                <th className="p-3">{t.authorities.colTier2}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
              {RTS_SLA_STANDARDS.map((sla, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="p-3 font-semibold text-slate-900">
                    {sla.categoryName}
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      {sla.targetHours} h
                    </span>
                  </td>
                  <td className="p-3">{sla.escalationTier1}</td>
                  <td className="p-3 text-slate-500">{sla.escalationTier2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Citizen Step-by-Step Submission Guide */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-850 rounded-2xl p-6 sm:p-7 text-white shadow-lg space-y-4 border border-slate-800">
        <div className="flex items-center space-x-2.5">
          <Shield className="w-5 h-5 text-teal-400" />
          <h3 className="text-base sm:text-lg font-bold text-white font-sans">
            {t.howItWorks.modalTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-400/30">
              1
            </div>
            <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5 font-sans">
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              {t.howItWorks.step1Title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.howItWorks.step1Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-400/30">
              2
            </div>
            <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5 font-sans">
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              {t.howItWorks.step2Title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.howItWorks.step2Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-400/30">
              3
            </div>
            <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5 font-sans">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {t.howItWorks.step3Title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.howItWorks.step3Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-400/30">
              4
            </div>
            <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5 font-sans">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {t.howItWorks.step4Title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.howItWorks.step4Desc}
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 pt-1 flex items-center space-x-1.5 font-sans">
          <HelpCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
          <span>{t.howItWorks.disclaimerDesc}</span>
        </div>
      </div>
    </section>
  );
};
