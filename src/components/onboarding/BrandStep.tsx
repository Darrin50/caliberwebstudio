'use client';

import { useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import ColorPicker from './ColorPicker';
import StyleSelector from './StyleSelector';

const inputCls =
  'w-full bg-[#1A1A1A] border border-white/10 focus:border-[#1E3D8F] focus:shadow-[0_0_0_3px_rgba(30,61,143,0.15)] text-white placeholder-[#4A4A4A] p-[14px_16px] text-base rounded-lg outline-none transition-all duration-200';
const labelCls = 'block text-xs uppercase tracking-wider text-[#6B6B6B] mb-1.5';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const MAX_LOGO_SIZE = 10 * 1024 * 1024; // 10 MB

export default function BrandStep() {
  const { control, setValue } = useFormContext();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoError(null);

    if (file.size > MAX_LOGO_SIZE) {
      setLogoError('File is too large. Max size is 10 MB.');
      return;
    }

    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    setValue('logo', file, { shouldDirty: true });

    // Reset so same file can be re-uploaded
    e.target.value = '';
  };

  const removeLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview(null);
    setValue('logo', null);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-white">Make it yours.</h2>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          Choose a look and feel that matches your brand.
        </p>
      </motion.div>

      {/* Color preference toggle */}
      <motion.div variants={item} className="space-y-4">
        <label className={labelCls}>Brand Colors</label>
        <Controller
          name="hasExactColors"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <div className="flex gap-3">
              {[
                { value: true,  label: 'Yes, I have exact colors' },
                { value: false, label: 'No, pick something that fits' },
              ].map(({ value, label }) => (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => field.onChange(value)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 text-center ${
                    field.value === value
                      ? 'border-[#1E3D8F] bg-[#1E3D8F]/10 text-white shadow-[0_0_0_1px_rgba(30,61,143,0.4)]'
                      : 'border-white/10 bg-[#141414] text-[#6B6B6B] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        />

        {/* Conditional panels */}
        <Controller
          name="hasExactColors"
          control={control}
          defaultValue={false}
          render={({ field: { value: hasColors } }) => (
            <AnimatePresence mode="wait">
              {hasColors ? (
                <motion.div
                  key="color-pickers"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 pt-2"
                >
                  <ColorPicker
                    name="primaryColor"
                    label="Primary Color"
                    required
                  />
                  <ColorPicker
                    name="secondaryColor"
                    label="Secondary Color"
                    required={false}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="style-selector"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="pt-2"
                >
                  <StyleSelector />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        />
      </motion.div>

      {/* Logo upload */}
      <motion.div variants={item} className="space-y-2">
        <label className={labelCls}>
          Logo{' '}
          <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
            (optional)
          </span>
        </label>

        <div
          className={`relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer ${
            logoPreview
              ? 'border-white/10 bg-[#141414]'
              : 'border-white/10 bg-[#141414] hover:border-white/20 hover:bg-[#181818]'
          }`}
          onClick={() => !logoPreview && logoInputRef.current?.click()}
        >
          <input
            ref={logoInputRef}
            type="file"
            accept=".png,.svg,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={handleLogoUpload}
          />

          <AnimatePresence mode="wait">
            {logoPreview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="p-6 flex flex-col items-center gap-4"
              >
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="max-h-28 max-w-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      logoInputRef.current?.click();
                    }}
                    className="text-xs text-[#6B6B6B] hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLogo();
                    }}
                    className="text-xs text-[#6B6B6B] hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-400/30"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-8 flex flex-col items-center gap-3 text-center"
              >
                {/* Upload icon */}
                <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A4A4A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    Drop your logo or click to browse
                  </p>
                  <p className="text-[#4A4A4A] text-xs mt-1">
                    PNG, SVG, JPG, WebP · Max 10 MB
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {logoError && <p className="text-xs text-red-400">{logoError}</p>}
      </motion.div>

      {/* Font preference */}
      <motion.div variants={item} className="space-y-2">
        <label className={labelCls}>
          Tagline or Slogan{' '}
          <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
            (optional)
          </span>
        </label>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. Built Different. Proven Results."
          {...{ name: 'brandTagline' }}
          onChange={(e) => setValue('brandTagline', e.target.value)}
        />
        <p className="text-xs text-[#4A4A4A]">
          This will appear below your business name on your site.
        </p>
      </motion.div>
    </motion.div>
  );
}
