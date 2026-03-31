'use client';

type StepNavigationProps = {
  onBack: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isNextDisabled: boolean;
  isSubmitting: boolean;
};

export default function StepNavigation({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
  isNextDisabled,
  isSubmitting,
}: StepNavigationProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px 0',
        // Fixed bottom on mobile, static on desktop
      }}
      className="step-navigation"
    >
      {/* Back button */}
      {!isFirstStep && (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          style={{
            flex: '0 0 auto',
            height: '56px',
            padding: '0 24px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.10)',
            backgroundColor: 'transparent',
            color: '#A0A0A0',
            fontSize: '15px',
            fontWeight: 500,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.5 : 1,
            transition: 'background-color 150ms, color 150ms',
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          Back
        </button>
      )}

      {/* Next / Submit button */}
      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        style={{
          flex: 1,
          height: '56px',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: isNextDisabled || isSubmitting ? 'rgba(30,61,143,0.4)' : '#1E3D8F',
          color: '#FFFFFF',
          fontSize: '15px',
          fontWeight: 600,
          cursor: isNextDisabled || isSubmitting ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          transition: 'background-color 150ms',
        }}
        onMouseEnter={(e) => {
          if (!isNextDisabled && !isSubmitting) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2A4FA8';
          }
        }}
        onMouseLeave={(e) => {
          if (!isNextDisabled && !isSubmitting) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1E3D8F';
          }
        }}
      >
        {isSubmitting ? (
          <>
            <Spinner />
            Submitting...
          </>
        ) : isLastStep ? (
          '🚀 Submit & Start My Build'
        ) : (
          'Next'
        )}
      </button>

      <style jsx>{`
        @media (max-width: 640px) {
          .step-navigation {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px 16px;
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
            background: linear-gradient(to top, #0A0A0A 70%, transparent);
            z-index: 40;
          }
        }
      `}</style>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ animation: 'spin 0.7s linear infinite' }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
