'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const ACCEPTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'heic'];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const MAX_FILES = 50;

const CATEGORIES = [
  'Storefront/Exterior',
  'Interior/Space',
  'Team/Staff',
  'Work Samples/Portfolio',
  'Products',
  'Other',
];

interface PhotoEntry {
  id: string;
  file: File;
  preview: string;
  caption: string;
  category: string;
  progress: number;
  done: boolean;
  error: string | null;
}

function simulateProgress(
  id: string,
  setPhotos: React.Dispatch<React.SetStateAction<PhotoEntry[]>>,
) {
  let prog = 0;
  const tick = () => {
    prog += Math.random() * 35 + 15;
    if (prog >= 100) {
      prog = 100;
      setPhotos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, progress: 100, done: true } : p)),
      );
    } else {
      setPhotos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, progress: prog } : p)),
      );
      setTimeout(tick, 120 + Math.random() * 80);
    }
  };
  setTimeout(tick, 80);
}

export default function PhotoUploader() {
  const { setValue } = useFormContext();
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [dragging, setDragging] = useState(false);
  const [rejectedCount, setRejectedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync to form
  useEffect(() => {
    setValue(
      'photos',
      photos.map((p) => ({
        name: p.file.name,
        size: p.file.size,
        caption: p.caption,
        category: p.category,
      })),
      { shouldDirty: true },
    );
  }, [photos, setValue]);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files);
      let rejected = 0;

      const valid = arr.filter((f) => {
        const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
        if (!ACCEPTED_EXTENSIONS.includes(ext) || f.size > MAX_FILE_SIZE) {
          rejected++;
          return false;
        }
        return true;
      });

      setRejectedCount(rejected);
      if (rejected > 0) setTimeout(() => setRejectedCount(0), 4000);

      const remaining = MAX_FILES - photos.length;
      const toAdd = valid.slice(0, remaining);

      const newEntries: PhotoEntry[] = toAdd.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        caption: '',
        category: 'Other',
        progress: 0,
        done: false,
        error: null,
      }));

      setPhotos((prev) => [...prev, ...newEntries]);
      newEntries.forEach((entry) => simulateProgress(entry.id, setPhotos));
    },
    [photos.length],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const p = prev.find((ph) => ph.id === id);
      if (p) URL.revokeObjectURL(p.preview);
      return prev.filter((ph) => ph.id !== id);
    });
  };

  const updatePhoto = (id: string, updates: Partial<Pick<PhotoEntry, 'caption' | 'category'>>) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDragEnd={() => setDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 select-none ${
          dragging
            ? 'border-[#1E3D8F] bg-[#1E3D8F]/10 shadow-[0_0_0_3px_rgba(30,61,143,0.15)]'
            : 'border-white/[0.08] bg-[#141414] hover:border-white/20 hover:bg-[#181818]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.heic"
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />

        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 ${dragging ? 'bg-[#1E3D8F]/20' : 'bg-white/[0.04]'}`}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dragging ? '#4E73EF' : '#4A4A4A'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div>
            <p className={`text-sm font-medium transition-colors duration-200 ${dragging ? 'text-[#4E73EF]' : 'text-white'}`}>
              {dragging ? 'Drop to upload' : 'Drag photos here or click to browse'}
            </p>
            <p className="text-[#4A4A4A] text-xs mt-1">
              JPG, PNG, WebP, HEIC · Max 20 MB per file · Up to {MAX_FILES} photos
            </p>
          </div>
          {photos.length > 0 && (
            <p className="text-[#6B6B6B] text-xs">
              {photos.length}/{MAX_FILES} photo{photos.length !== 1 ? 's' : ''} added
            </p>
          )}
        </div>
      </div>

      {/* Rejection notice */}
      <AnimatePresence>
        {rejectedCount > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2.5"
          >
            {rejectedCount} file{rejectedCount > 1 ? 's were' : ' was'} skipped — must be JPG, PNG, WebP, or HEIC and under 20 MB.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Thumbnail grid */}
      <AnimatePresence initial={false}>
        {photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-[#141414] border border-white/[0.06] rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.preview}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  {/* Progress overlay */}
                  <AnimatePresence>
                    {!photo.done && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 px-4"
                      >
                        <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-[#1E3D8F] rounded-full"
                            animate={{ width: `${photo.progress}%` }}
                            transition={{ ease: 'linear', duration: 0.1 }}
                          />
                        </div>
                        <p className="text-white text-xs">{Math.round(photo.progress)}%</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/80 transition-colors"
                    aria-label="Remove photo"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round">
                      <path d="M1 1l6 6M7 1L1 7" />
                    </svg>
                  </button>
                </div>

                {/* Caption + category */}
                <div className="p-2 space-y-1.5">
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) =>
                      updatePhoto(photo.id, { caption: e.target.value.slice(0, 100) })
                    }
                    placeholder="Caption..."
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white placeholder-[#4A4A4A] outline-none focus:border-[#1E3D8F] transition-colors"
                  />
                  <select
                    value={photo.category}
                    onChange={(e) => updatePhoto(photo.id, { category: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#1E3D8F] transition-colors cursor-pointer appearance-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#1A1A1A]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
