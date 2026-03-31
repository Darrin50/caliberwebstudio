'use client';

import { useRef, useState, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface ColorPickerProps {
  name: string;
  label: string;
  required?: boolean;
}

const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export default function ColorPicker({ name, label, required = false }: ColorPickerProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: '',
    rules: {
      ...(required && { required: 'This color is required' }),
      validate: (val: string) => {
        if (!val) return true;
        return HEX_REGEX.test(val) || 'Enter a valid hex color (e.g. #1E3D8F)';
      },
    },
  });

  const [localValue, setLocalValue] = useState<string>(field.value || '');
  const colorInputRef = useRef<HTMLInputElement>(null);

  const isValid = HEX_REGEX.test(localValue);

  // Sync if form resets
  useEffect(() => {
    setLocalValue(field.value || '');
  }, [field.value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Auto-prepend # if user starts typing a hex digit
    if (val.length === 1 && /[0-9A-Fa-f]/.test(val)) {
      val = '#' + val;
    }
    // Enforce max length
    val = val.slice(0, 7);
    setLocalValue(val);
    field.onChange(val);
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setLocalValue(val);
    field.onChange(val);
  };

  // Expand 3-char hex to 6-char on blur
  const handleBlur = () => {
    if (/^#([0-9A-Fa-f]{3})$/.test(localValue)) {
      const expanded =
        '#' +
        localValue[1] + localValue[1] +
        localValue[2] + localValue[2] +
        localValue[3] + localValue[3];
      setLocalValue(expanded.toUpperCase());
      field.onChange(expanded.toUpperCase());
    }
    field.onBlur();
  };

  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="flex items-center gap-3">
        {/* Color swatch — opens native color picker */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => colorInputRef.current?.click()}
            className="w-11 h-11 rounded-lg border border-white/20 overflow-hidden transition-all duration-200 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]/50"
            style={{ backgroundColor: isValid ? localValue : '#2A2A2A' }}
            aria-label="Open color picker"
          >
            {!isValid && (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="#4A4A4A"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 1 7.07 17.07" />
                  <path d="M12 2a10 10 0 0 0-7.07 17.07" />
                </svg>
              </div>
            )}
          </button>
          <input
            ref={colorInputRef}
            type="color"
            value={isValid ? localValue : '#1A1A1A'}
            onChange={handleColorPickerChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            tabIndex={-1}
          />
        </div>

        {/* Hex text input */}
        <input
          type="text"
          value={localValue}
          onChange={handleTextChange}
          onBlur={handleBlur}
          placeholder="#1E3D8F"
          maxLength={7}
          spellCheck={false}
          className="flex-1 bg-[#1A1A1A] border border-white/10 focus:border-[#1E3D8F] focus:shadow-[0_0_0_3px_rgba(30,61,143,0.15)] text-white placeholder-[#4A4A4A] p-[14px_16px] text-base rounded-lg outline-none transition-all duration-200 font-mono tracking-widest uppercase"
        />

        {/* Live preview circle */}
        {isValid && (
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-white/10 shadow-md transition-all duration-200"
            style={{ backgroundColor: localValue }}
          />
        )}
      </div>

      {fieldState.error && (
        <p className="mt-1 text-xs text-red-400">{fieldState.error.message}</p>
      )}
    </div>
  );
}
