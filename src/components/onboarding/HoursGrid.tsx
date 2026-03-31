'use client';

import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

type Day = (typeof DAYS)[number];

const DAY_LABELS: Record<Day, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 5; h <= 23; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 23 && m === 30) break;
      const period = h < 12 ? 'AM' : 'PM';
      const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const displayM = m === 0 ? '00' : '30';
      slots.push(`${displayH}:${displayM} ${period}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

const DEFAULTS: Record<Day, { open: string; close: string; closed: boolean }> = {
  monday:    { open: '9:00 AM',  close: '7:00 PM', closed: false },
  tuesday:   { open: '9:00 AM',  close: '7:00 PM', closed: false },
  wednesday: { open: '9:00 AM',  close: '7:00 PM', closed: false },
  thursday:  { open: '9:00 AM',  close: '7:00 PM', closed: false },
  friday:    { open: '9:00 AM',  close: '7:00 PM', closed: false },
  saturday:  { open: '10:00 AM', close: '5:00 PM', closed: false },
  sunday:    { open: '9:00 AM',  close: '5:00 PM', closed: true  },
};

const selectCls = (disabled: boolean) =>
  `flex-1 min-w-0 bg-[#1A1A1A] border rounded-lg px-2 py-2.5 text-base outline-none transition-all duration-200 appearance-none cursor-pointer ${
    disabled
      ? 'border-white/5 text-[#4A4A4A] cursor-not-allowed opacity-40'
      : 'border-white/10 text-white focus:border-[#1E3D8F]'
  }`;

export default function HoursGrid() {
  const { register, control, watch, setValue } = useFormContext();

  useEffect(() => {
    DAYS.forEach((day) => {
      const current = watch(`hours.${day}.open`);
      if (!current) {
        setValue(`hours.${day}.open`, DEFAULTS[day].open, { shouldDirty: false });
        setValue(`hours.${day}.close`, DEFAULTS[day].close, { shouldDirty: false });
        setValue(`hours.${day}.closed`, DEFAULTS[day].closed, { shouldDirty: false });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-3">Hours of Operation</p>
      <div className="bg-[#141414] border border-white/[0.06] rounded-xl overflow-hidden divide-y divide-white/[0.04]">
        {DAYS.map((day) => {
          const isClosed = watch(`hours.${day}.closed`);
          return (
            <div
              key={day}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3"
            >
              {/* Day label */}
              <span className="w-8 flex-shrink-0 text-sm text-[#6B6B6B] font-medium">
                {DAY_LABELS[day]}
              </span>

              {/* Open time */}
              <select
                {...register(`hours.${day}.open`)}
                disabled={isClosed}
                className={selectCls(isClosed)}
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t} className="bg-[#1A1A1A]">
                    {t}
                  </option>
                ))}
              </select>

              <span className="flex-shrink-0 text-[#4A4A4A] text-xs">–</span>

              {/* Close time */}
              <select
                {...register(`hours.${day}.close`)}
                disabled={isClosed}
                className={selectCls(isClosed)}
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t} className="bg-[#1A1A1A]">
                    {t}
                  </option>
                ))}
              </select>

              {/* Closed toggle */}
              <Controller
                name={`hours.${day}.closed`}
                control={control}
                defaultValue={DEFAULTS[day].closed}
                render={({ field }) => (
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 whitespace-nowrap ${
                      field.value
                        ? 'bg-[#1E3D8F]/20 border-[#1E3D8F]/40 text-[#4E73EF]'
                        : 'bg-transparent border-white/10 text-[#4A4A4A] hover:border-white/20 hover:text-white/60'
                    }`}
                  >
                    {field.value ? 'Closed' : 'Closed?'}
                  </button>
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
