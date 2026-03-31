'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import TagInput from './TagInput';
import HoursGrid from './HoursGrid';

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

const inputCls =
  'w-full bg-[#1A1A1A] border border-white/10 focus:border-[#1E3D8F] focus:shadow-[0_0_0_3px_rgba(30,61,143,0.15)] text-white placeholder-[#4A4A4A] p-[14px_16px] text-base rounded-lg outline-none transition-all duration-200';
const labelCls = 'block text-xs uppercase tracking-wider text-[#6B6B6B] mb-1.5';
const errorCls = 'mt-1 text-xs text-red-400';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ContactStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-white">Where can customers find you?</h2>
      </motion.div>

      {/* Phone */}
      <motion.div variants={item}>
        <label className={labelCls}>Phone Number</label>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{
            pattern: {
              value: /^\(\d{3}\) \d{3}-\d{4}$/,
              message: 'Enter a valid phone number',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              inputMode="numeric"
              placeholder="(313) 555-0000"
              onChange={(e) => field.onChange(formatPhone(e.target.value))}
              className={inputCls}
            />
          )}
        />
        {errors.phone && <p className={errorCls}>{String(errors.phone.message)}</p>}
      </motion.div>

      {/* Email */}
      <motion.div variants={item}>
        <label className={labelCls}>Email Address</label>
        <input
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          type="email"
          placeholder="hello@yourbusiness.com"
          className={inputCls}
        />
        {errors.email && <p className={errorCls}>{String(errors.email.message)}</p>}
      </motion.div>

      {/* Street Address */}
      <motion.div variants={item}>
        <label className={labelCls}>Street Address</label>
        <input
          {...register('streetAddress')}
          type="text"
          placeholder="123 Main Street"
          className={inputCls}
        />
      </motion.div>

      {/* Suite / Unit */}
      <motion.div variants={item}>
        <label className={labelCls}>
          Suite / Unit{' '}
          <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
            (optional)
          </span>
        </label>
        <input
          {...register('suite')}
          type="text"
          placeholder="Suite 200, Unit B, etc."
          className={inputCls}
        />
      </motion.div>

      {/* City + State */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className={labelCls}>City</label>
          <input
            {...register('city')}
            type="text"
            placeholder="Detroit"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>State</label>
          <div className="relative">
            <select
              {...register('state')}
              defaultValue="MI"
              className={`${inputCls} appearance-none cursor-pointer pr-9`}
            >
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code} className="bg-[#1A1A1A]">
                  {s.code}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#6B6B6B" strokeWidth="1.5">
                <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ZIP */}
      <motion.div variants={item}>
        <label className={labelCls}>ZIP Code</label>
        <input
          {...register('zip', {
            pattern: {
              value: /^\d{5}(-\d{4})?$/,
              message: 'Enter a valid ZIP code',
            },
          })}
          type="text"
          inputMode="numeric"
          placeholder="48201"
          maxLength={10}
          className={inputCls}
        />
        {errors.zip && <p className={errorCls}>{String(errors.zip.message)}</p>}
      </motion.div>

      {/* Service Area — TagInput */}
      <motion.div variants={item}>
        <TagInput name="serviceArea" label="Service Area" />
      </motion.div>

      {/* Hours of Operation */}
      <motion.div variants={item}>
        <HoursGrid />
      </motion.div>
    </motion.div>
  );
}
