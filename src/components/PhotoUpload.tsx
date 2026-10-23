import React, { useRef, useState, useCallback, useId } from 'react';
import {
  Camera,
  ImagePlus,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  X,
  Upload,
} from 'lucide-react';
import type { PhotoEntry } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

// ─── Config ──────────────────────────────────────────────────────────────────
const MAX_PHOTOS = 5;
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB per file
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'] as const;
const ALLOWED_MIME_LABEL = 'JPG, PNG, or WebP';

// ─── Types ────────────────────────────────────────────────────────────────────
interface PhotoUploadProps {
  photoEntries: PhotoEntry[];
  onEntriesChange: (entries: PhotoEntry[]) => void;
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photoEntries,
  onEntriesChange,
  disabled = false,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [previewEntry, setPreviewEntry] = useState<PhotoEntry | null>(null);
  const uploadZoneId = useId();

  const slotsRemaining = MAX_PHOTOS - photoEntries.length;
  const isFull = slotsRemaining <= 0;

  // ── Process incoming File objects ─────────────────────────────────────────
  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      const files = Array.from(incoming);
      const errs: string[] = [];
      const newEntries: PhotoEntry[] = [];

      const canAccept = slotsRemaining;
      if (files.length > canAccept) {
        errs.push(t.photos.limitError(canAccept, files.length - canAccept));
      }

      const filesToProcess = files.slice(0, canAccept);

      for (const file of filesToProcess) {
        if (!ALLOWED_MIME.includes(file.type as (typeof ALLOWED_MIME)[number])) {
          errs.push(t.photos.formatError(file.name, ALLOWED_MIME_LABEL));
          continue;
        }
        if (file.size > MAX_BYTES) {
          errs.push(t.photos.sizeError(file.name, formatBytes(file.size), formatBytes(MAX_BYTES)));
          continue;
        }
        const previewUrl = URL.createObjectURL(file);
        const id = `photo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        newEntries.push({ file, previewUrl, id });
      }

      setValidationErrors(errs);

      if (newEntries.length > 0) {
        onEntriesChange([...photoEntries, ...newEntries]);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [photoEntries, onEntriesChange, slotsRemaining, t]
  );

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isFull) return;
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled || isFull) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (id: string) => {
    const entry = photoEntries.find((p) => p.id === id);
    if (entry) URL.revokeObjectURL(entry.previewUrl);
    onEntriesChange(photoEntries.filter((p) => p.id !== id));
    setValidationErrors([]);
  };

  const handleClearErrors = () => setValidationErrors([]);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={`photo-upload-input-${uploadZoneId}`}
          className="flex items-center gap-2 text-sm font-semibold text-slate-800 font-sans"
        >
          <Camera className="w-4 h-4 text-teal-600" aria-hidden="true" />
          <span>{t.photos.title}</span>
        </label>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200">
          <Eye className="w-3 h-3" />
          Gemini Vision
        </span>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id={`photo-upload-input-${uploadZoneId}`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="sr-only"
        disabled={disabled || isFull}
        aria-describedby={`photo-upload-hint-${uploadZoneId}`}
      />

      {/* Drop zone (always visible if not full) */}
      {!isFull && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!disabled) fileInputRef.current?.click();
            }
          }}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label={t.photos.dragDropText}
          aria-disabled={disabled}
          className={[
            'border-2 border-dashed rounded-xl py-5 px-4 text-center transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
            disabled
              ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50'
              : dragActive
                ? 'border-violet-500 bg-violet-50/50 scale-[1.005] cursor-copy'
                : 'border-slate-300 hover:border-teal-400 bg-slate-50/70 hover:bg-teal-50/30 cursor-pointer',
          ].join(' ')}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              {dragActive ? (
                <Upload className="w-5 h-5 text-violet-600" />
              ) : (
                <ImagePlus className="w-5 h-5 text-teal-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 font-sans">
                <span className="text-teal-700 font-semibold underline decoration-teal-400 underline-offset-2">
                  {dragActive ? t.photos.dragDropText : t.photos.browseButton}
                </span>{' '}
                {!dragActive && t.photos.dragDropText}
              </p>
              <p
                id={`photo-upload-hint-${uploadZoneId}`}
                className="text-xs text-slate-500 mt-0.5 font-sans"
              >
                {t.photos.dragDropSubtext} · {t.photos.slotsRemaining(slotsRemaining)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Full indicator */}
      {isFull && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">
            {t.photos.maxLimitNotice}
          </span>
        </div>
      )}

      {/* Validation error list */}
      {validationErrors.length > 0 && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1 font-sans"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t.common.error}</span>
            </div>
            <button
              type="button"
              onClick={handleClearErrors}
              className="text-amber-600 hover:text-amber-900 focus:outline-none cursor-pointer"
              aria-label="Dismiss errors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <ul className="list-disc list-inside text-xs text-amber-700 space-y-0.5 pl-1">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Thumbnails grid */}
      {photoEntries.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {photoEntries.map((entry) => (
            <div
              key={entry.id}
              className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs aspect-square flex flex-col justify-end"
            >
              <img
                src={entry.previewUrl}
                alt={t.photos.previewAria(entry.file.name)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  type="button"
                  onClick={() => setPreviewEntry(entry)}
                  className="p-1 rounded-md bg-white/90 text-slate-800 hover:bg-white text-xs shadow-xs transition cursor-pointer"
                  aria-label={t.photos.previewAria(entry.file.name)}
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(entry.id)}
                  disabled={disabled}
                  className="p-1 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs shadow-xs transition disabled:opacity-50 cursor-pointer"
                  aria-label={t.photos.removePhotoAria(entry.file.name)}
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative p-1.5 bg-slate-900/60 backdrop-blur-xs text-[10px] text-white truncate font-mono">
                {entry.file.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Full preview modal */}
      {previewEntry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewEntry(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-800 text-white">
              <span className="text-xs font-mono truncate max-w-md">
                {previewEntry.file.name} ({formatBytes(previewEntry.file.size)})
              </span>
              <button
                type="button"
                onClick={() => setPreviewEntry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                aria-label={t.photos.closePreview}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={previewEntry.previewUrl}
              alt={previewEntry.file.name}
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
