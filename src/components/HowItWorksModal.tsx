import React, { useEffect } from 'react';
import {
  X,
  FileText,
  Cpu,
  SendHorizontal,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-it-works-title"
    >
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="how-it-works-title" className="text-lg font-bold text-white font-sans">
                {t.howItWorks.modalTitle}
              </h2>
              <p className="text-xs text-slate-300 font-sans">
                {t.howItWorks.modalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            aria-label={t.howItWorks.closeButton}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Steps */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-700">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-250">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base flex items-center gap-1.5 font-sans">
                    <FileText className="w-4 h-4 text-teal-600" />
                    {t.howItWorks.step1Title}
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {t.howItWorks.step1Tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                  {t.howItWorks.step1Desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base flex items-center gap-1.5 font-sans">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    {t.howItWorks.step2Title}
                  </h3>
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {t.howItWorks.step2Tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                  {t.howItWorks.step2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base flex items-center gap-1.5 font-sans">
                    <SendHorizontal className="w-4 h-4 text-teal-700" />
                    {t.howItWorks.step3Title}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                    {t.howItWorks.step3Tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                  {t.howItWorks.step3Desc}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base flex items-center gap-1.5 font-sans">
                    <Clock className="w-4 h-4 text-slate-700" />
                    {t.howItWorks.step4Title}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                    {t.howItWorks.step4Tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                  {t.howItWorks.step4Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Ethics / Trust Note */}
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200/80 text-xs text-teal-900 space-y-1.5">
            <div className="flex items-center space-x-2 font-bold text-teal-950 font-sans">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>{t.howItWorks.disclaimerTitle}</span>
            </div>
            <p className="font-sans">
              {t.howItWorks.disclaimerDesc}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-4 flex justify-end border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm cursor-pointer font-sans"
          >
            {t.howItWorks.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
