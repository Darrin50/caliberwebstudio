'use client';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
};

export default function ProgressBar({ currentStep, totalSteps, stepTitle }: ProgressBarProps) {
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        paddingTop: '60px', // below the header
      }}
    >
      {/* Track */}
      <div
        style={{
          height: '3px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            backgroundColor: '#1E3D8F',
            width: `${percent}%`,
            transition: 'width 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {/* Step label */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#6B6B6B',
          fontWeight: 500,
        }}
      >
        Step {currentStep} of {totalSteps} &mdash; {stepTitle}
      </div>
    </div>
  );
}
