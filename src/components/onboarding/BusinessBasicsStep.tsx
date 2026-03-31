'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

const INDUSTRIES = [
  'Barbershop',
  'Salon/Spa',
  'Restaurant/Bar',
  'Plumbing',
  'HVAC',
  'Electrical',
  'Auto Repair',
  'Law Firm',
  'Dental/Medical',
  'Real Estate',
  'Fitness/Gym',
  'Cleaning Service',
  'Landscaping',
  'Contractor/Construction',
  'Retail Store',
  'Pet Services',
  'Accounting/Finance',
  'Insurance',
  'Photography',
  'Other',
];

const inputCls =
  'w-full bg-[#1A1A1A] border border-white/10 focus:border-[#1E3D8F] focus:shadow-[0_0_0_3px_rgba(30,61,143,0.15)] text-white placeholder-[#4A4A4A] p-[14px_16px] text-base rounded-lg outline-none transition-all duration-200';
const labelCls = 'block text-xs uppercase tracking-wider text-[#6B6B6B] mb-1.5';
const errorCls = 'mt-1 text-xs text-red-400';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function BusinessBasicsStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const industry = watch('industry');

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-white">Let&apos;s start with the foundation.</h2>
        <p className="mt-1 text-[#6B6B6B] text-sm">Tell us about your business.</p>
      </motion.div>

      {/* Business Name */}
      <motion.div variants={item}>
        <label className={labelCls}>
          Business Name <span className="text-red-400">*</span>
        </label>
        <input
          {...register('businessName', { required: 'Business name is required' })}
          type="text"
          placeholder="e.g. Caliber Auto Repair"
          className={inputCls}
        />
        {errors.businessName && (
          <p className={errorCls}>{String(errors.businessName.message)}</p>
        )}
      </motion.div>

      {/* Tagline */}
      <motion.div variants={item}>
        <label className={labelCls}>
          Tagline{' '}
          <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
            (optional)
          </span>
        </label>
        <input
          {...register('tagline', {
            maxLength: { value: 100, message: 'Max 100 characters' },
          })}
          type="text"
          placeholder="e.g. Quality you can trust, every time"
          className={inputCls}
        />
        {errors.tagline && <p className={errorCls}>{String(errors.tagline.message)}</p>}
      </motion.div>

      {/* Industry */}
      <motion.div variants={item}>
        <label className={labelCls}>
          Industry <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <select
            {...register('industry', { required: 'Please select your industry' })}
            defaultValue=""
            className={`${inputCls} appearance-none cursor-pointer pr-10`}
          >
            <option value="" disabled className="bg-[#1A1A1A] text-[#4A4A4A]">
              Select your industry
            </option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind} className="bg-[#1A1A1A] text-white">
                {ind}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#6B6B6B" strokeWidth="1.5">
              <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {errors.industry && <p className={errorCls}>{String(errors.industry.message)}</p>}
      </motion.div>

      {/* Other — conditional */}
      {industry === 'Other' && (
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          key="industry-other"
        >
          <label className={labelCls}>
            Describe Your Industry <span className="text-red-400">*</span>
          </label>
          <input
            {...register('industryOther', {
              required: 'Please describe your industry',
            })}
            type="text"
            placeholder="e.g. Mobile Notary Services"
            className={inputCls}
            autoFocus
          />
          {errors.industryOther && (
            <p className={errorCls}>{String(errors.industryOther.message)}</p>
          )}
        </motion.div>
      )}

      {/* Year Established + Owner Name */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>
            Year Established{' '}
            <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
              (optional)
            </span>
          </label>
          <input
            {...register('yearEstablished', {
              pattern: {
                value: /^(19|20)\d{2}$/,
                message: 'Enter a valid year (e.g. 2005)',
              },
            })}
            type="text"
            inputMode="numeric"
            placeholder="e.g. 2005"
            className={inputCls}
          />
          {errors.yearEstablished && (
            <p className={errorCls}>{String(errors.yearEstablished.message)}</p>
          )}
        </div>

        <div>
          <label className={labelCls}>
            Owner Name <span className="text-red-400">*</span>
          </label>
          <input
            {...register('ownerName', { required: 'Owner name is required' })}
            type="text"
            placeholder="e.g. Marcus Johnson"
            className={inputCls}
          />
          {errors.ownerName && (
            <p className={errorCls}>{String(errors.ownerName.message)}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
