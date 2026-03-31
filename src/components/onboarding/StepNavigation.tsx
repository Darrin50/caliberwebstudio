'use client'

interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  isSubmitting?: boolean
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isSubmitting,
}: StepNavigationProps) {
  const isFirst = currentStep === 1
  const isLast = currentStep === totalSteps

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '24px',
        marginTop: '24px',
        borderTop: '1px solid var(--ob-border)',
      }}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        style={{
          padding: '10px 24px',
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: isFirst ? 'default' : 'pointer',
          opacity: isFirst ? 0 : 1,
          pointerEvents: isFirst ? 'none' : 'auto',
          background: 'var(--ob-surface)',
          border: '1px solid var(--ob-btn-back-border)',
          color: 'var(--ob-btn-back-text)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!isFirst) {
            e.currentTarget.style.color = 'var(--ob-text)'
            e.currentTarget.style.background = 'var(--ob-surface-hover)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--ob-btn-back-text)'
          e.currentTarget.style.background = 'var(--ob-surface)'
        }}
      >
        ← Back
      </button>

      {isLast ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          style={{
            padding: '12px 32px',
            background: isSubmitting ? 'rgba(30,61,143,0.5)' : 'var(--ob-btn-primary-bg)',
            color: 'var(--ob-btn-primary-text)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isSubmitting ? (
            <>
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  border: '2px solid rgba(30,61,143,0.2)',
                  borderTopColor: 'var(--ob-btn-primary-text)',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              Submitting...
            </>
          ) : (
            'Submit →'
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          style={{
            padding: '12px 32px',
            background: 'var(--ob-btn-primary-bg)',
            color: 'var(--ob-btn-primary-text)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Continue →
        </button>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
