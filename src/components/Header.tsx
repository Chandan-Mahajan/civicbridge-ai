import React, { useState } from 'react';
import {
  Building2,
  Globe,
  HelpCircle,
  PhoneCall,
  Menu,
  X,
  Check,
} from 'lucide-react';
import type { OutputLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/civicData';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  outputLanguage: OutputLanguage;
  onLanguageChange: (lang: OutputLanguage) => void;
  onOpenHowItWorks: () => void;
  onScrollToAuthorities: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  outputLanguage,
  onLanguageChange,
  onOpenHowItWorks,
  onScrollToAuthorities,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const activeLang =
    SUPPORTED_LANGUAGES.find((l) => l.id === outputLanguage) ||
    SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (langId: OutputLanguage) => {
    onLanguageChange(langId);
    setShowLanguageMenu(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-900/40 border border-teal-400/30">
              <Building2 className="w-6 h-6 text-white" aria-hidden="true" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  CivicBridge <span className="text-teal-400 font-bold">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-950 text-teal-300 border border-teal-800/80">
                  {t.common.phaseBadge}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium tracking-wide">
                {t.common.tagline}
              </p>
            </div>
          </div>

          {/* Pilot Region Indicator (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">{t.common.pilotRegionLabel}</span>
            <span className="text-teal-300 font-semibold">{t.common.pilotRegionValue}</span>
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLanguageMenu((prev) => !prev)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
                aria-label={t.nav.selectLanguage}
                title={t.nav.selectLanguage}
              >
                <Globe className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                <span>{activeLang.label}</span>
                <span className="text-[10px] text-teal-300 font-mono px-1 rounded bg-teal-950 border border-teal-800">
                  {activeLang.nativeLabel}
                </span>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-64 p-2 bg-slate-850 rounded-xl shadow-2xl border border-slate-700 text-xs text-slate-200 z-50">
                  <div className="p-2 border-b border-slate-700/80 mb-1 flex items-center justify-between">
                    <span className="font-bold text-teal-300">{t.nav.languageMenuTitle}</span>
                    <button
                      onClick={() => setShowLanguageMenu(false)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                      aria-label={t.nav.closeMenu}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = lang.id === outputLanguage;
                      return (
                        <button
                          key={lang.id}
                          type="button"
                          onClick={() => handleSelectLanguage(lang.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer ${
                            isSelected
                              ? 'bg-teal-950 text-teal-300 border border-teal-800 font-bold'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div>
                            <span className="font-medium">{lang.label}</span>
                            <span className="text-slate-400 text-[11px] ml-2 font-serif">
                              ({lang.nativeLabel})
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-400" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="p-2 text-[10px] text-slate-400 leading-tight">
                    {t.nav.languageMenuNote}
                  </p>
                </div>
              )}
            </div>

            {/* How It Works Button */}
            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>{t.nav.howItWorks}</span>
            </button>

            {/* Civic Authorities Direct Jump */}
            <button
              type="button"
              onClick={onScrollToAuthorities}
              className="flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-teal-300 hover:text-teal-200 hover:bg-teal-950/60 rounded-lg border border-teal-900/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-teal-400" aria-hidden="true" />
              <span>{t.nav.authorities}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5 space-y-3">
          <div className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-teal-300">{t.common.pilotRegionLabel}</span> {t.common.pilotRegionValue}
          </div>

          {/* Mobile Language Selector */}
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 space-y-2">
            <span className="text-xs font-semibold text-teal-300 block">{t.nav.draftLanguageLabel}:</span>
            <div className="flex gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.id)}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition cursor-pointer ${
                    outputLanguage === lang.id
                      ? 'bg-teal-600 text-white font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-650'
                  }`}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => {
                onOpenHowItWorks();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-teal-400" />
              <span>{t.nav.howItWorks}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onScrollToAuthorities();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-medium text-teal-300 hover:bg-slate-800 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-teal-400" />
              <span>{t.nav.authorities}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
