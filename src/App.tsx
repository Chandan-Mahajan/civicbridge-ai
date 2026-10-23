import { useState } from 'react';
import { Header } from './components/Header';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ReportingForm } from './components/ReportingForm';
import { ReportResults } from './components/ReportResults';
import { AuthorityGuide } from './components/AuthorityGuide';
import { Footer } from './components/Footer';
import type {
  ReportingFormState,
  AiBridgePayload,
  AnalysisState,
  OutputLanguage,
} from './types';
import { Shield, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const { language, setLanguage, t } = useLanguage();
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  // Analysis workflow state (idle | loading | success | error)
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    status: 'idle',
    data: null,
    error: null,
  });

  // Form state preserved in parent for resilience
  const [formState, setFormState] = useState<ReportingFormState>({
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

  const handleGenerateComplaint = async (payload: AiBridgePayload) => {
    setAnalysisState({
      status: 'loading',
      data: null,
      error: null,
    });

    // Smooth scroll to generated results on mobile/tablets
    const resultsElement = document.getElementById('results-workspace');
    if (resultsElement && window.innerWidth < 1024) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      // Build FormData for multipart upload
      const formData = new FormData();
      formData.append('description', payload.description);
      formData.append('category', payload.category);
      formData.append('outputLanguage', payload.outputLanguage);

      // Phase 4: location fields (send only non-empty values)
      formData.append('state', payload.location.state);
      if (payload.location.district) formData.append('district', payload.location.district);
      if (payload.location.city) formData.append('city', payload.location.city);
      if (payload.location.area) formData.append('area', payload.location.area);
      if (payload.location.streetLandmark) formData.append('streetLandmark', payload.location.streetLandmark);
      if (payload.location.pincode) formData.append('pincode', payload.location.pincode);
      if (payload.location.suggestedAuthority) formData.append('suggestedAuthority', payload.location.suggestedAuthority);

      // Phase 3+4: GPS coordinates
      if (payload.gpsCoordinates) {
        formData.append('gpsLatitude', String(payload.gpsCoordinates.latitude));
        formData.append('gpsLongitude', String(payload.gpsCoordinates.longitude));
        if (payload.gpsCoordinates.accuracyMeters != null) {
          formData.append('gpsAccuracyMeters', String(payload.gpsCoordinates.accuracyMeters));
        }
      }

      // Attach images (field name 'photos', backend accepts up to 5)
      for (const entry of payload.photoEntries) {
        formData.append('photos', entry.file, entry.file.name);
      }

      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      const responseJson = await response.json();

      if (!response.ok || !responseJson.success) {
        setAnalysisState({
          status: 'error',
          data: null,
          error: {
            code: responseJson.error?.code || `HTTP_${response.status}`,
            message:
              responseJson.error?.message ||
              'The server was unable to complete the Gemini complaint analysis.',
            details: responseJson.error?.details,
          },
        });
        return;
      }

      setAnalysisState({
        status: 'success',
        data: responseJson.data,
        error: null,
      });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Network error';
      setAnalysisState({
        status: 'error',
        data: null,
        error: {
          code: 'NETWORK_ERROR',
          message: `Unable to connect to the CivicBridge backend at http://localhost:5001. Please ensure the backend server is running. (${errMessage})`,
        },
      });
    }
  };

  const handleRetry = () => {
    if (formState.description.trim().length >= 10) {
      handleGenerateComplaint({
        category: formState.category,
        description: formState.description.trim(),
        outputLanguage: formState.outputLanguage || language,
        location: formState.location,
        photoEntries: formState.photoEntries,
        gpsCoordinates: formState.gpsCoordinates,
        submittedAt: new Date().toISOString(),
        clientVersion: '5.0.0-multilingual',
      });
    }
  };

  const handleLanguageChange = (lang: OutputLanguage) => {
    setLanguage(lang);
    setFormState((prev) => ({ ...prev, outputLanguage: lang }));
  };

  const handleRegenerateInLanguage = (newLang: OutputLanguage) => {
    setLanguage(newLang);
    setFormState((prev) => {
      const updated = { ...prev, outputLanguage: newLang };
      if (updated.description.trim().length >= 10) {
        handleGenerateComplaint({
          category: updated.category,
          description: updated.description.trim(),
          outputLanguage: newLang,
          location: updated.location,
          photoEntries: updated.photoEntries,
          gpsCoordinates: updated.gpsCoordinates,
          submittedAt: new Date().toISOString(),
          clientVersion: '5.0.0-multilingual',
        });
      }
      return updated;
    });
  };

  const handleScrollToAuthorities = () => {
    const el = document.getElementById('authorities-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header with active Language Switcher */}
      <Header
        outputLanguage={formState.outputLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenHowItWorks={() => setHowItWorksOpen(true)}
        onScrollToAuthorities={handleScrollToAuthorities}
      />

      {/* How It Works Accessible Modal */}
      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden">
          {/* Subtle civic pattern accent */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute right-12 top-6 hidden lg:block opacity-20 pointer-events-none">
            <Shield className="w-64 h-64 text-teal-300" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-xs font-semibold text-teal-300">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-sans">{t.hero.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              {t.hero.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              {t.hero.subtitle}
            </p>

            {/* Micro value props */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300 font-medium font-sans">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t.hero.zeroLogin}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{t.hero.antiHallucination}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>{t.hero.wardMapping}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dual-Column Workspace: Reporting Form & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Reporting Workspace (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-250 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2
                id="reporting-workspace-title"
                className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-sans"
              >
                {t.form.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
                {t.form.subtitle}
              </p>
            </div>

            <ReportingForm
              onGenerateComplaint={handleGenerateComplaint}
              formState={formState}
              setFormState={setFormState}
              isLoading={analysisState.status === 'loading'}
            />
          </div>

          {/* Right Column: Generated Results & AI Bridge (5 cols) */}
          <div id="results-workspace" className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base font-bold text-slate-900 font-sans">
                {t.results.title}
              </h2>
              <span className="text-xs font-semibold text-slate-500 font-sans">
                {analysisState.status === 'success'
                  ? t.results.statusReady
                  : analysisState.status === 'loading'
                    ? t.results.statusAnalyzing
                    : analysisState.status === 'error'
                      ? t.results.statusError
                      : t.results.statusAwaiting}
              </span>
            </div>

            <ReportResults
              analysisState={analysisState}
              onRetry={handleRetry}
              onEditInputs={() => {
                const formEl = document.getElementById('reporting-workspace-title');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onRegenerateInLanguage={handleRegenerateInLanguage}
              locationDetails={formState.location}
              hasPhotos={formState.photoEntries.length > 0}
            />
          </div>
        </div>

        {/* Civic Authority & Submission Guide */}
        <AuthorityGuide />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
