/**
 * LocationInput — Phase 5: Multilingual Maharashtra Location Capture
 */
import React, { useState, useId } from 'react';
import {
  MapPin,
  Loader2,
  Check,
  AlertTriangle,
  X,
  Info,
  Navigation,
  RefreshCcw,
  Building2,
} from 'lucide-react';
import type { GpsLocation, GpsStatus, LocationDetails } from '../types';
import {
  MAHARASHTRA_STATE,
  MAHARASHTRA_DISTRICTS,
  CITIES_BY_DISTRICT,
  PUNE_AREAS,
  suggestAuthorityForCity,
} from '../data/locationData';
import { useLanguage } from '../i18n/LanguageContext';

// ─── Props ────────────────────────────────────────────────────────────────────
interface LocationInputProps {
  location: LocationDetails;
  gpsCoordinates: GpsLocation | null;
  gpsStatus: GpsStatus;
  onLocationChange: (location: LocationDetails) => void;
  onGpsCoordinatesChange: (coords: GpsLocation | null) => void;
  onGpsStatusChange: (status: GpsStatus) => void;
  disabled?: boolean;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  location,
  gpsCoordinates,
  gpsStatus,
  onLocationChange,
  onGpsCoordinatesChange,
  onGpsStatusChange,
  disabled = false,
}) => {
  const { t } = useLanguage();
  const [secureDeny, setSecureDeny] = useState(false);
  const zoneId = useId();

  // ── Helper: update a single location field ────────────────────────────────
  const patch = (partial: Partial<LocationDetails>) => {
    onLocationChange({ ...location, ...partial });
  };

  // ── District change: reset downstream city field ──────────────────────────
  const handleDistrictChange = (district: string) => {
    const cities = CITIES_BY_DISTRICT[district] ?? [];
    const city = cities[0] ?? '';
    const suggestedAuthority = city ? (suggestAuthorityForCity(city) ?? '') : '';
    onLocationChange({
      ...location,
      district,
      city,
      suggestedAuthority,
      area: '', // reset area when district changes
    });
  };

  // ── City change: update suggested authority ────────────────────────────────
  const handleCityChange = (city: string) => {
    patch({ city, suggestedAuthority: suggestAuthorityForCity(city) ?? '' });
  };

  // ── GPS capture ────────────────────────────────────────────────────────────
  const handleDetectGps = () => {
    setSecureDeny(false);

    // Unsupported browser
    if (!('geolocation' in navigator)) {
      onGpsStatusChange('unsupported');
      return;
    }

    // Insecure context (http:// in production)
    if (
      typeof window !== 'undefined' &&
      window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      setSecureDeny(true);
      return;
    }

    onGpsStatusChange('loading');
    onGpsCoordinatesChange(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onGpsCoordinatesChange({
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          accuracyMeters: Math.round(position.coords.accuracy),
          timestamp: position.timestamp,
        });
        onGpsStatusChange('success');
      },
      (error) => {
        onGpsCoordinatesChange(null);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            onGpsStatusChange('denied');
            break;
          case error.POSITION_UNAVAILABLE:
            onGpsStatusChange('unavailable');
            break;
          case error.TIMEOUT:
            onGpsStatusChange('timeout');
            break;
          default:
            onGpsStatusChange('unavailable');
        }
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  const handleClearGps = () => {
    onGpsCoordinatesChange(null);
    onGpsStatusChange('idle');
    setSecureDeny(false);
  };

  const citiesForDistrict: string[] = location.district
    ? (CITIES_BY_DISTRICT[location.district] ?? [])
    : [];

  const getGpsErrorMessage = (): string | null => {
    if (gpsStatus === 'idle' || gpsStatus === 'loading' || gpsStatus === 'success') {
      return null;
    }
    return t.location.gpsStatus[gpsStatus] || t.location.gpsStatus.unavailable;
  };

  const gpsErrorMessage = getGpsErrorMessage();
  const isPuneDistrict = location.district === 'Pune';

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
      aria-labelledby={`location-section-${zoneId}`}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-teal-700" aria-hidden="true" />
          </div>
          <div>
            <h3
              id={`location-section-${zoneId}`}
              className="text-sm font-bold text-slate-900 font-sans"
            >
              {t.location.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              {t.location.subtitle}
            </p>
          </div>
        </div>

        {/* GPS button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {gpsStatus !== 'success' && gpsStatus !== 'loading' ? (
            <button
              type="button"
              onClick={handleDetectGps}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-sans"
              aria-label={t.location.gpsButton}
            >
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              {t.location.gpsButton}
            </button>
          ) : gpsStatus === 'loading' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 font-sans">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
              {t.location.gpsDetecting}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* ── Privacy note ─────────────────────────────────────────────────── */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-sans">
          <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            {t.footer.disclaimer}
          </span>
        </div>

        {/* ── GPS result / error states ─────────────────────────────────────── */}
        {gpsStatus === 'success' && gpsCoordinates && (
          <div className="flex items-start justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 gap-3">
            <div className="flex items-start gap-2 text-xs text-emerald-900 min-w-0">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold font-sans">{t.location.gpsSuccessBadge}</p>
                <p className="mt-0.5 font-mono text-emerald-800">
                  {gpsCoordinates.latitude}° N, {gpsCoordinates.longitude}° E
                  {gpsCoordinates.accuracyMeters
                    ? ` (${t.location.gpsAccuracy(gpsCoordinates.accuracyMeters)})`
                    : ''}
                </p>
                <p className="mt-1 text-emerald-700 font-sans">
                  {t.location.subtitle}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleDetectGps}
                className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                aria-label="Retry GPS"
                title="Retry"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleClearGps}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
                aria-label={t.location.clearGps}
                title={t.location.clearGps}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* GPS error state */}
        {gpsErrorMessage && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 font-sans"
          >
            <div className="flex items-start gap-2 text-xs text-amber-900 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>{gpsErrorMessage}</p>
            </div>
            <button
              type="button"
              onClick={handleClearGps}
              className="flex-shrink-0 p-1 rounded text-amber-700 hover:bg-amber-100 transition cursor-pointer"
              aria-label="Dismiss GPS error"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Secure context deny */}
        {secureDeny && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-sans"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              {t.location.gpsStatus.denied}
            </p>
          </div>
        )}

        {/* ── State (fixed to Maharashtra) ─────────────────────────────────── */}
        <div>
          <label
            htmlFor={`state-select-${zoneId}`}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-sans"
          >
            {t.location.stateLabel}
          </label>
          <input
            id={`state-select-${zoneId}`}
            type="text"
            value={MAHARASHTRA_STATE}
            readOnly
            disabled
            className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed font-sans"
            aria-label="State: Maharashtra (fixed)"
          />
          <p className="text-[11px] text-slate-500 mt-1 font-sans">
            {t.footer.pilotNotice}
          </p>
        </div>

        {/* ── District + City row ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* District */}
          <div>
            <label
              htmlFor={`district-select-${zoneId}`}
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-sans"
            >
              {t.location.districtLabel}
            </label>
            <select
              id={`district-select-${zoneId}`}
              value={location.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={disabled}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer font-sans"
              aria-required="true"
            >
              <option value="">— {t.location.districtPlaceholder} —</option>
              {MAHARASHTRA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* City / Municipality */}
          <div>
            <label
              htmlFor={`city-select-${zoneId}`}
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-sans"
            >
              {t.location.cityLabel}
            </label>
            {citiesForDistrict.length > 0 ? (
              <select
                id={`city-select-${zoneId}`}
                value={location.city}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={disabled || !location.district}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer font-sans"
              >
                <option value="">— {t.location.cityPlaceholder} —</option>
                {citiesForDistrict.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`city-select-${zoneId}`}
                type="text"
                value={location.city}
                onChange={(e) => handleCityChange(e.target.value)}
                placeholder={location.district ? t.location.cityPlaceholder : t.location.districtPlaceholder}
                disabled={disabled || !location.district}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition disabled:opacity-60 disabled:cursor-not-allowed font-sans"
              />
            )}
          </div>
        </div>

        {/* Suggested authority hint */}
        {location.suggestedAuthority && (
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-900 font-sans">
            <Building2 className="w-3.5 h-3.5 text-violet-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>{t.location.suggestedAuthorityLabel}</strong> {location.suggestedAuthority} —{' '}
              <em>
                {t.location.suggestedAuthorityHint}
              </em>
            </span>
          </div>
        )}

        {/* ── Area / Locality ───────────────────────────────────────────────── */}
        <div>
          <label
            htmlFor={`area-input-${zoneId}`}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-sans"
          >
            {t.location.areaLabel}
          </label>
          <input
            id={`area-input-${zoneId}`}
            type="text"
            list={isPuneDistrict ? `pune-areas-list-${zoneId}` : undefined}
            value={location.area}
            onChange={(e) => patch({ area: e.target.value })}
            placeholder={t.location.areaPlaceholder}
            disabled={disabled}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition disabled:opacity-60 disabled:cursor-not-allowed font-sans"
            aria-describedby={`area-hint-${zoneId}`}
          />
          {isPuneDistrict && (
            <datalist id={`pune-areas-list-${zoneId}`}>
              {PUNE_AREAS.map((a) => (
                <option key={a} value={a} />
              ))}
            </datalist>
          )}
          <p id={`area-hint-${zoneId}`} className="text-[11px] text-slate-500 mt-1 font-sans">
            {t.location.areaDatalistHint}
          </p>
        </div>

        {/* ── Street / Landmark ─────────────────────────────────────────────── */}
        <div>
          <label
            htmlFor={`street-input-${zoneId}`}
            className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-sans"
          >
            <span>{t.location.streetLabel}</span>
          </label>
          <input
            id={`street-input-${zoneId}`}
            type="text"
            value={location.streetLandmark}
            onChange={(e) => patch({ streetLandmark: e.target.value })}
            placeholder={t.location.streetPlaceholder}
            disabled={disabled}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition disabled:opacity-60 disabled:cursor-not-allowed font-sans"
            aria-describedby={`street-hint-${zoneId}`}
          />
        </div>

        {/* ── Pincode ───────────────────────────────────────────────────────── */}
        <div className="max-w-[180px]">
          <label
            htmlFor={`pincode-input-${zoneId}`}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-sans"
          >
            {t.location.pincodeLabel}
          </label>
          <input
            id={`pincode-input-${zoneId}`}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={location.pincode}
            onChange={(e) => patch({ pincode: e.target.value.replace(/\D/g, '') })}
            placeholder={t.location.pincodePlaceholder}
            disabled={disabled}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition disabled:opacity-60 disabled:cursor-not-allowed font-mono"
          />
        </div>

        {/* ── Clear location ────────────────────────────────────────────────── */}
        {(location.district || location.area || location.streetLandmark || location.pincode) && (
          <button
            type="button"
            onClick={() =>
              onLocationChange({
                state: MAHARASHTRA_STATE,
                district: '',
                city: '',
                area: '',
                streetLandmark: '',
                pincode: '',
                suggestedAuthority: '',
              })
            }
            disabled={disabled}
            className="text-xs text-slate-500 hover:text-rose-700 underline underline-offset-2 flex items-center gap-1 transition disabled:opacity-50 cursor-pointer font-sans"
          >
            <X className="w-3 h-3" />
            {t.location.clearGps}
          </button>
        )}
      </div>
    </div>
  );
};
