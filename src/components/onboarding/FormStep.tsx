'use client';

import { Children, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormStepProps = {
  heading: string;
  subheading?: string;
  children: ReactNode;
  /** Used as the AnimatePresence key so enter/exit transitions fire on step change */
  stepKey: string | number;
};

const containerVariants = {
  enter: {
    x: 40,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: -40,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
};

const childVariants = {
  enter: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0 },
};

export default function FormStep({ heading, subheading, children, stepKey }: FormStepProps) {
  const childArray = Children.toArray(children);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        variants={containerVariants}
        initial="enter"
        animate="visible"
        exit="exit"
        style={{
          backgroundColor: '#141414',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          padding: '24px',
        }}
        className="form-step-card"
      >
        {/* Heading block */}
        <motion.div variants={childVariants} style={{ marginBottom: '28px' }}>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {heading}
          </h2>
          {subheading && (
            <p
              style={{
                fontSize: '14px',
                color: '#A0A0A0',
                margin: '8px 0 0',
                lineHeight: 1.5,
              }}
            >
              {subheading}
            </p>
          )}
        </motion.div>

        {/* Staggered children */}
        {childArray.map((child, i) => (
          <motion.div key={i} variants={childVariants}>
            {child}
          </motion.div>
        ))}

        <style jsx>{`
          @media (min-width: 768px) {
            .form-step-card {
              padding: 32px !important;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
