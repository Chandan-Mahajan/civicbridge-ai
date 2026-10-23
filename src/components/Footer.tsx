import React from 'react';
import { ShieldCheck, AlertTriangle, Building2, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-850">
          {/* Identity & Scope */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                CivicBridge <span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-slate-300 font-medium font-sans">
              “{t.common.tagline}”
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
              {t.footer.description}
            </p>
            <div className="flex items-center space-x-1.5 text-[11px] text-teal-400 pt-1 font-sans">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.footer.pilotNotice}</span>
            </div>
          </div>

          {/* Privacy Principles */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm font-sans">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{t.hero.zeroLogin}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              {t.footer.disclaimer}
            </p>
          </div>

          {/* AI Limitations Notice */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm font-sans">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{t.results.limitationsTitle}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              {t.howItWorks.disclaimerDesc}
            </p>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-3">
          <p className="font-sans">
            © {CURRENT_YEAR} {t.footer.rightsReserved}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">English • मराठी • हिंदी</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">Gemini 2.5 Flash</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">Maharashtra RTS 2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
