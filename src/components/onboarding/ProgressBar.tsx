'use client'

import { STEP_TITLES } from './schema'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-3">
        <span
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ob-label)',
            fontWeight: 600,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Step {currentStep} of {totalSteps}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--ob-label)' }}>
          {STEP_TITLES[currentStep - 1]}
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          width: '100%',
          height: '2px',
          background: 'var(--ob-progress-track)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--ob-navy)',
            borderRadius: '9999px',
            transition: 'width 0.5s ease-out',
          }}
        />
      </div>

      {/* Step dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        {STEP_TITLES.map((_, i) => {
          const stepNum = i + 1
          const isComplete = stepNum < currentStep
          const isCurrent = stepNum === currentStep
          return (
            <div
              key={stepNum}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isComplete
                  ? 'var(--ob-navy)'
                  : isCurrent
                  ? 'var(--ob-text)'
                  : 'var(--ob-dot-inactive)',
                transform: isCurrent ? 'scale(1.4)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
