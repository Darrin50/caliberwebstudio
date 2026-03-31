'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import PhotoUploader from './PhotoUploader';

const inputCls =
  'w-full bg-[#1A1A1A] border border-white/10 focus:border-[#1E3D8F] focus:shadow-[0_0_0_3px_rgba(30,61,143,0.15)] text-white placeholder-[#4A4A4A] p-[14px_16px] text-base rounded-lg outline-none transition-all duration-200';
const labelCls = 'block text-xs uppercase tracking-wider text-[#6B6B6B] mb-1.5';

const SOCIAL_FIELDS = [
  {
    name: 'instagram',
    label: 'Instagram Handle',
    placeholder: '@yourbusiness',
    prefix: '@',
    type: 'text',
  },
  {
    name: 'facebook',
    label: 'Facebook URL',
    placeholder: 'facebook.com/yourbusiness',
    type: 'url',
  },
  {
    name: 'googleBusiness',
    label: 'Google Business URL',
    placeholder: 'g.page/yourbusiness',
    type: 'url',
  },
  {
    name: 'yelp',
    label: 'Yelp URL',
    placeholder: 'yelp.com/biz/yourbusiness',
    type: 'url',
  },
  {
    name: 'tiktok',
    label: 'TikTok Handle',
    placeholder: '@yourbusiness',
    prefix: '@',
    type: 'text',
  },
  {
    name: 'youtube',
    label: 'YouTube URL',
    placeholder: 'youtube.com/@yourchannel',
    type: 'url',
  },
  {
    name: 'existingWebsite',
    label: 'Existing Website URL',
    placeholder: 'yourbusiness.com',
    type: 'url',
  },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function PhotosStep() {
  const { register } = useFormContext();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-white">Show off your work.</h2>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          Upload photos that showcase your business. Great photos build trust.
        </p>
      </motion.div>

      {/* Photo uploader */}
      <motion.div variants={item}>
        <PhotoUploader />
      </motion.div>

      {/* Divider */}
      <motion.div variants={item} className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-xs uppercase tracking-widest text-[#4A4A4A]">
          Social &amp; Web Presence
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </motion.div>

      {/* Social fields — 2-col on sm+ */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5"
      >
        {SOCIAL_FIELDS.map((field) => (
          <div key={field.name}>
            <label className={labelCls}>
              {field.label}{' '}
              <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
                (optional)
              </span>
            </label>
            {field.type === 'url' ? (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-base select-none pointer-events-none">
                  https://
                </span>
                <input
                  {...register(`social.${field.name}`)}
                  type="text"
                  placeholder={field.placeholder}
                  inputMode="url"
                  className={`${inputCls} pl-[84px]`}
                />
              </div>
            ) : (
              <input
                {...register(`social.${field.name}`)}
                type="text"
                placeholder={field.placeholder}
                className={inputCls}
              />
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
