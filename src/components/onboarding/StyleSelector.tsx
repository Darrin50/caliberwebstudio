'use client';

import { useController, useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'bold-dark',
    name: 'Bold & Dark',
    description: 'Strong, confident, modern',
    preview: (
      <div className="h-16 rounded-lg bg-[#0D0D0D] flex items-center px-4 gap-2.5 overflow-hidden">
        <div className="w-14 h-7 rounded bg-[#FF3B30]" />
        <div className="w-10 h-7 rounded bg-white/[0.07]" />
        <div className="w-7 h-7 rounded-full bg-[#FF3B30]/50" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 rounded-full bg-white/10 w-full" />
          <div className="h-2 rounded-full bg-white/5 w-2/3" />
        </div>
      </div>
    ),
  },
  {
    id: 'clean-light',
    name: 'Clean & Light',
    description: 'Professional, trustworthy, clean',
    preview: (
      <div className="h-16 rounded-lg bg-[#F0F4FF] flex items-center px-4 gap-2.5 overflow-hidden">
        <div className="w-14 h-7 rounded bg-[#1E3D8F]" />
        <div className="w-10 h-7 rounded bg-[#1E3D8F]/15" />
        <div className="w-7 h-7 rounded-full bg-[#1E3D8F]/30" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 rounded-full bg-[#1E3D8F]/20 w-full" />
          <div className="h-2 rounded-full bg-[#1E3D8F]/10 w-2/3" />
        </div>
      </div>
    ),
  },
  {
    id: 'warm-inviting',
    name: 'Warm & Inviting',
    description: 'Welcoming, premium, personal',
    preview: (
      <div className="h-16 rounded-lg bg-[#FAF7F0] flex items-center px-4 gap-2.5 overflow-hidden">
        <div className="w-14 h-7 rounded bg-[#B8860B]" />
        <div className="w-10 h-7 rounded bg-[#8B4513]/20" />
        <div className="w-7 h-7 rounded-full bg-[#C9A84C]/60" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 rounded-full bg-[#8B4513]/15 w-full" />
          <div className="h-2 rounded-full bg-[#8B4513]/08 w-2/3" />
        </div>
      </div>
    ),
  },
  {
    id: 'vibrant-energetic',
    name: 'Vibrant & Energetic',
    description: 'Fun, youthful, high-energy',
    preview: (
      <div className="h-16 rounded-lg bg-gradient-to-br from-[#FF6B35] via-[#E9176F] to-[#7B2FFF] flex items-center px-4 gap-2.5 overflow-hidden">
        <div className="w-14 h-7 rounded bg-white/30" />
        <div className="w-10 h-7 rounded bg-white/20" />
        <div className="w-7 h-7 rounded-full bg-white/40" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 rounded-full bg-white/25 w-full" />
          <div className="h-2 rounded-full bg-white/15 w-2/3" />
        </div>
      </div>
    ),
  },
];

export default function StyleSelector() {
  const { control } = useFormContext();
  const { field } = useController({
    name: 'stylePreset',
    control,
    defaultValue: '',
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {STYLE_OPTIONS.map((style, i) => {
        const selected = field.value === style.id;
        return (
          <motion.button
            key={style.id}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            onClick={() => field.onChange(style.id)}
            className={`text-left p-4 rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3D8F]/50 ${
              selected
                ? 'border-[#1E3D8F] shadow-[0_0_0_1px_rgba(30,61,143,0.4),0_0_24px_rgba(30,61,143,0.12)] bg-[#1E3D8F]/10'
                : 'border-white/[0.08] bg-[#141414] hover:border-white/20 hover:bg-[#181818]'
            }`}
          >
            {style.preview}
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">{style.name}</p>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{style.description}</p>
              </div>
              {/* Checkmark */}
              <div
                className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  selected
                    ? 'bg-[#1E3D8F] border-[#1E3D8F]'
                    : 'border-white/20 bg-transparent'
                }`}
              >
                {selected && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 5l2 2 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
