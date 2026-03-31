'use client';

import { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceBlock from './ServiceBlock';

const INITIAL_COUNT = 3;
const MAX_SERVICES = 20;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ServicesStep() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  // Seed with 3 empty slots on first render
  useEffect(() => {
    if (fields.length === 0) {
      for (let i = 0; i < INITIAL_COUNT; i++) {
        append({ name: '', description: '', price: '' }, { shouldFocus: false });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-white">What do you offer?</h2>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          Add the services your customers can book or inquire about.
        </p>
      </motion.div>

      {/* Service blocks */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25 }}
            >
              <ServiceBlock
                index={index}
                onRemove={index > 0 ? () => remove(index) : undefined}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add button */}
      {fields.length < MAX_SERVICES && (
        <motion.div variants={item}>
          <button
            type="button"
            onClick={() => append({ name: '', description: '', price: '' })}
            className="w-full border-2 border-dashed border-white/10 rounded-xl p-5 flex items-center justify-center gap-2.5 text-[#6B6B6B] hover:border-[#1E3D8F]/40 hover:text-white hover:bg-[#1E3D8F]/5 transition-all duration-200 group"
          >
            <div className="w-7 h-7 rounded-full border border-current flex items-center justify-center group-hover:border-[#1E3D8F]/60">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                <path d="M7 2v10M2 7h10" />
              </svg>
            </div>
            <span className="text-sm font-medium">Add Another Service</span>
            <span className="text-xs opacity-60 ml-1">
              ({fields.length}/{MAX_SERVICES})
            </span>
          </button>
        </motion.div>
      )}

      {fields.length >= MAX_SERVICES && (
        <motion.p
          variants={item}
          className="text-center text-xs text-[#6B6B6B]"
        >
          Maximum of {MAX_SERVICES} services reached.
        </motion.p>
      )}
    </motion.div>
  );
}
