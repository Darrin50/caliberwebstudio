'use client';

import { useFormContext } from 'react-hook-form';

interface ServiceBlockProps {
  index: number;
  onRemove?: () => void;
}

const inputCls =
  'w-full bg-[#1A1A1A] border border-white/10 focus:border-[#1E3D8F] focus:shadow-[0_0_0_3px_rgba(30,61,143,0.15)] text-white placeholder-[#4A4A4A] p-[14px_16px] text-base rounded-lg outline-none transition-all duration-200';
const labelCls = 'block text-xs uppercase tracking-wider text-[#6B6B6B] mb-1.5';
const errorCls = 'mt-1 text-xs text-red-400';

const MAX_DESCRIPTION = 300;

export default function ServiceBlock({ index, onRemove }: ServiceBlockProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const description: string = watch(`services.${index}.description`) ?? '';
  const charCount = description.length;

  // Nested error accessor
  const serviceErrors =
    (errors.services as Record<string, unknown>[] | undefined)?.[index] as
      | Record<string, { message?: string }>
      | undefined;

  return (
    <div className="bg-[#141414] border border-white/[0.06] rounded-xl p-4 sm:p-5 space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">
          Service {index + 1}
        </span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 text-[#4A4A4A] hover:text-red-400 transition-colors text-xs"
            aria-label="Remove service"
          >
            {/* Trash icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
            Remove
          </button>
        )}
      </div>

      {/* Service Name */}
      <div>
        <label className={labelCls}>
          Service Name{index === 0 && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        <input
          {...register(`services.${index}.name`, {
            required: index === 0 ? 'Service name is required' : false,
          })}
          type="text"
          placeholder="e.g. Oil Change, Haircut, Deep Cleaning"
          className={inputCls}
        />
        {serviceErrors?.name && (
          <p className={errorCls}>{String(serviceErrors.name.message)}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelCls}>
          Description{' '}
          <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
            (optional)
          </span>
        </label>
        <div className="relative">
          <textarea
            {...register(`services.${index}.description`, {
              maxLength: { value: MAX_DESCRIPTION, message: `Max ${MAX_DESCRIPTION} characters` },
            })}
            placeholder="Briefly describe what's included in this service..."
            rows={3}
            className={`${inputCls} resize-none`}
          />
          <span
            className={`absolute bottom-3 right-3 text-xs transition-colors ${
              charCount >= MAX_DESCRIPTION ? 'text-red-400' : 'text-[#4A4A4A]'
            }`}
          >
            {charCount}/{MAX_DESCRIPTION}
          </span>
        </div>
        {serviceErrors?.description && (
          <p className={errorCls}>{String(serviceErrors.description.message)}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className={labelCls}>
          Price{' '}
          <span className="text-[#4A4A4A] normal-case tracking-normal text-xs font-normal">
            (optional)
          </span>
        </label>
        <input
          {...register(`services.${index}.price`)}
          type="text"
          placeholder="e.g. $49, Starting at $75, Free estimate"
          className={inputCls}
        />
      </div>
    </div>
  );
}
