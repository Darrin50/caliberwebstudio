'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import {
  onboardingSchema,
  STEP_TITLES,
  STEP_VALIDATE_FIELDS,
  type OnboardingFormData,
} from '@/components/onboarding/schema'
import ProgressBar from '@/components/onboarding/ProgressBar'
import StepNavigation from '@/components/onboarding/StepNavigation'
import BusinessStep from '@/components/onboarding/BusinessStep'
import ContactStep from '@/components/onboarding/ContactStep'
import ServicesStep from '@/components/onboarding/ServicesStep'
import BrandStep from '@/components/onboarding/BrandStep'
import PhotosStep from '@/components/onboarding/PhotosStep'
import StoryStep from '@/components/onboarding/StoryStep'
import ReviewStep from '@/components/onboarding/ReviewStep'

const TOTAL_STEPS = 7

const DEFAULT_VALUES: OnboardingFormData = {
  business: {
    name: '',
    tagline: '',
    industry: '',
    yearsInBusiness: '',
    currentWebsite: '',
  },
  contact: {
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    hours: undefined,
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      yelp: '',
      google: '',
    },
  },
  services: {
    items: [{ name: '', description: '', price: '' }],
  },
  brand: {
    primaryColor: '#1E3D8F',
    secondaryColor: '#ffffff',
    accentColor: '#00d4ff',
    stylePreference: 'modern-minimal',
    logoUrl: '',
    logoFileName: '',
    notes: '',
  },
  photos: {
    items: [],
  },
  story: {
    yourStory: '',
    whatMakesDifferent: '',
    targetCustomers: '',
    anythingElse: '',
  },
  agreement: false,
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  }),
}

export default function OnboardingPage() {
  const params = useParams()
  const router = useRouter()
  const slug = (params?.slug as string) || 'client'

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'info' | 'error' } | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<OnboardingFormData>({
    // @ts-expect-error — minor type mismatch between rhf v7.72 and @hookform/resolvers v5; runtime behavior is correct
    resolver: zodResolver(onboardingSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  })

  const { watch, reset, trigger, getValues } = methods

  // ── Load saved state ────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`onboarding-${slug}`)
      if (saved) {
        const { data, step: savedStep } = JSON.parse(saved)
        reset({ ...DEFAULT_VALUES, ...data })
        if (savedStep && savedStep >= 1 && savedStep <= TOTAL_STEPS) {
          setStep(savedStep)
        }
        showToast('Welcome back — we saved your progress', 'info')
      }
    } catch {
      // ignore stale/corrupt cache
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  // ── Auto-save ───────────────────────────────────────────────────────────
  useEffect(() => {
    const sub = watch((value) => {
      try {
        localStorage.setItem(
          `onboarding-${slug}`,
          JSON.stringify({ data: value, step })
        )
      } catch {
        // storage quota exceeded — silently ignore
      }
    })
    return () => sub.unsubscribe()
  }, [watch, slug, step])

  // ── Toast helper ────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string, type: 'info' | 'error' = 'info') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4500)
  }, [])

  // ── Navigation ──────────────────────────────────────────────────────────
  const goNext = async () => {
    const fields = STEP_VALIDATE_FIELDS[step] as Parameters<typeof trigger>[0]
    if (fields && fields.length > 0) {
      const valid = await trigger(fields)
      if (!valid) return
    }
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToStep = useCallback(
    (targetStep: number) => {
      setDirection(targetStep > step ? 1 : -1)
      setStep(targetStep)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [step]
  )

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const valid = await trigger('agreement' as Parameters<typeof trigger>[0])
    if (!valid) return

    setIsSubmitting(true)
    try {
      const values = getValues()
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, ...values }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')

      localStorage.removeItem(`onboarding-${slug}`)
      router.push(`/onboarding/${slug}/success`)
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        'error'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Steps ───────────────────────────────────────────────────────────────
  const STEPS = [
    <BusinessStep key="business" />,
    <ContactStep key="contact" />,
    <ServicesStep key="services" />,
    <BrandStep key="brand" />,
    <PhotosStep key="photos" />,
    <StoryStep key="story" />,
    <ReviewStep key="review" onEditStep={goToStep} />,
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--ob-bg)',
        padding: '0',
      }}
    >
      <div
        style={{
          maxWidth: '768px',
          margin: '0 auto',
          padding: '32px 16px 64px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <Image
              src="/logo-mark-nav.png"
              alt="Caliber Web Studio"
              width={32}
              height={32}
              style={{ borderRadius: '8px' }}
            />
            <span
              style={{
                color: 'var(--ob-text-dim)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
              }}
            >
              Caliber Web Studio
            </span>
          </div>

          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Card */}
        <div
          className="ob-main-card"
          style={{
            border: '1px solid var(--ob-border)',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'var(--ob-card)',
          }}
        >
          <FormProvider {...methods}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ padding: '32px 24px 0' }}
              >
                {STEPS[step - 1]}
              </motion.div>
            </AnimatePresence>

            {/* Navigation — outside AnimatePresence so it doesn't animate */}
            <div style={{ padding: '0 24px 28px' }}>
              <StepNavigation
                currentStep={step}
                totalSteps={TOTAL_STEPS}
                onBack={goBack}
                onNext={goNext}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </FormProvider>
        </div>

        {/* Step title below card on mobile */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '16px',
            fontSize: '0.75rem',
            color: 'var(--ob-text-faint)',
            letterSpacing: '0.06em',
          }}
        >
          {step < TOTAL_STEPS
            ? `Next: ${STEP_TITLES[step]}`
            : 'Final step'}
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background:
                toast.type === 'error'
                  ? 'rgba(248,113,113,0.12)'
                  : 'var(--ob-card)',
              border:
                toast.type === 'error'
                  ? '1px solid rgba(248,113,113,0.3)'
                  : '1px solid var(--ob-border)',
              color: toast.type === 'error' ? '#fca5a5' : 'var(--ob-text)',
              fontSize: '0.85rem',
              padding: '12px 20px',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              zIndex: 9999,
              whiteSpace: 'nowrap',
              maxWidth: '90vw',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) {
          /* tablet: tighter padding handled by maxWidth */
        }
        @media (min-width: 1024px) {
          /* desktop: push to max-w-3xl (768px → already set) */
        }
        * { box-sizing: border-box; }
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]::-webkit-color-swatch { border: none; }
      `}</style>
    </div>
  )
}
