import { z } from 'zod';

// ─── Helpers ────────────────────────────────────────────────────────────────

const hexColor = z
  .string()
  .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Must be a valid hex color (e.g. #1E3D8F)');

const usPhone = z
  .string()
  .transform((val) => val.replace(/\D/g, ''))
  .pipe(z.string().length(10, 'Phone must be 10 digits'));

const usStates = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
  'DC',
] as const;

const industries = [
  'Barbershop',
  'Salon/Spa',
  'Restaurant/Bar',
  'Plumbing',
  'HVAC',
  'Electrical',
  'Auto Repair',
  'Law Firm',
  'Dental/Medical',
  'Real Estate',
  'Fitness/Gym',
  'Cleaning Service',
  'Landscaping',
  'Contractor/Construction',
  'Retail Store',
  'Pet Services',
  'Accounting/Finance',
  'Insurance',
  'Photography',
  'Other',
] as const;

export type Industry = (typeof industries)[number];
export type USState = (typeof usStates)[number];

// ─── Step 1 — Business Basics ────────────────────────────────────────────────

export const step1Schema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  tagline: z.string().max(100, 'Tagline must be 100 characters or fewer').optional(),
  industry: z.enum(industries, { error: 'Please select an industry' }),
  yearEstablished: z
    .string()
    .regex(/^\d{4}$/, 'Must be a 4-digit year')
    .optional()
    .or(z.literal('')),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
});

export type Step1Data = z.infer<typeof step1Schema>;

// ─── Step 2 — Contact & Location ────────────────────────────────────────────

const dayHoursSchema = z.object({
  open: z.string().optional(),
  close: z.string().optional(),
  closed: z.boolean(),
});

export const step2Schema = z.object({
  phone: usPhone,
  email: z.string().email('Please enter a valid email address'),
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  suite: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.enum(usStates, { error: 'Please select a state' }),
  zip: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  serviceArea: z.array(z.string()).optional(),
  hours: z.object({
    monday: dayHoursSchema,
    tuesday: dayHoursSchema,
    wednesday: dayHoursSchema,
    thursday: dayHoursSchema,
    friday: dayHoursSchema,
    saturday: dayHoursSchema,
    sunday: dayHoursSchema,
  }),
});

export type Step2Data = z.infer<typeof step2Schema>;
export type DayHours = z.infer<typeof dayHoursSchema>;

// ─── Step 3 — Services ──────────────────────────────────────────────────────

const serviceItemSchema = z.object({
  name: z.string().min(2, 'Service name must be at least 2 characters'),
  description: z.string().max(300, 'Description must be 300 characters or fewer').optional(),
  price: z.string().optional(),
  order: z.number().int().nonnegative(),
});

export const step3Schema = z.object({
  services: z
    .array(serviceItemSchema)
    .min(1, 'Please add at least one service'),
});

export type Step3Data = z.infer<typeof step3Schema>;
export type ServiceItem = z.infer<typeof serviceItemSchema>;

// ─── Step 4 — Brand ─────────────────────────────────────────────────────────

export const step4Schema = z
  .object({
    hasExactColors: z.boolean(),
    primaryColor: hexColor.optional(),
    secondaryColor: hexColor.optional(),
    stylePreference: z
      .enum(['bold-dark', 'clean-light', 'warm-inviting', 'vibrant-energetic'])
      .optional(),
    logoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.hasExactColors && !data.primaryColor) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Primary color is required when you have exact colors',
        path: ['primaryColor'],
      });
    }
    if (!data.hasExactColors && !data.stylePreference) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a style preference',
        path: ['stylePreference'],
      });
    }
  });

export type Step4Data = z.infer<typeof step4Schema>;
export type StylePreference = 'bold-dark' | 'clean-light' | 'warm-inviting' | 'vibrant-energetic';

// ─── Step 5 — Photos & Social ────────────────────────────────────────────────

const photoCategories = ['storefront', 'interior', 'team', 'work', 'products', 'other'] as const;
export type PhotoCategory = (typeof photoCategories)[number];

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20MB

const photoItemSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  caption: z.string().max(100, 'Caption must be 100 characters or fewer').optional(),
  category: z.enum(photoCategories),
  fileName: z.string(),
  fileSize: z.number().max(MAX_FILE_SIZE_BYTES, 'File must be 20MB or smaller'),
});

export const step5Schema = z.object({
  photos: z.array(photoItemSchema).max(50, 'Maximum 50 photos allowed').optional(),
  social: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    google: z.string().optional(),
    yelp: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    existingWebsite: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  }),
});

export type Step5Data = z.infer<typeof step5Schema>;
export type PhotoItem = z.infer<typeof photoItemSchema>;

// ─── Step 6 — Story ──────────────────────────────────────────────────────────

export const step6Schema = z.object({
  yourStory: z
    .string()
    .min(50, 'Your story must be at least 50 characters')
    .max(2000, 'Your story must be 2000 characters or fewer'),
  differentiators: z
    .string()
    .min(30, 'Differentiators must be at least 30 characters')
    .max(1000, 'Differentiators must be 1000 characters or fewer'),
  targetCustomers: z.string().max(500, 'Must be 500 characters or fewer').optional(),
  additionalNotes: z.string().max(1000, 'Must be 1000 characters or fewer').optional(),
});

export type Step6Data = z.infer<typeof step6Schema>;

// ─── Step 7 — Agreement ──────────────────────────────────────────────────────

export const step7Schema = z.object({
  agreementAccepted: z.literal(true, {
    error: 'You must accept the agreement to continue',
  }),
});

export type Step7Data = z.infer<typeof step7Schema>;

// ─── Full Combined Schema ────────────────────────────────────────────────────

export const onboardingSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema);

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

// ─── Per-step schema map (useful for react-hook-form per-step validation) ───

export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: step5Schema,
  6: step6Schema,
  7: step7Schema,
} as const;

export type StepNumber = keyof typeof stepSchemas;

// ─── Webhook Payload ─────────────────────────────────────────────────────────

export type WebhookPayload = {
  slug: string;
  submittedAt: string; // ISO 8601
  business: {
    businessName: string;
    tagline?: string;
    industry: Industry;
    yearEstablished?: string;
    ownerName: string;
  };
  contact: {
    phone: string;
    email: string;
    street: string;
    suite?: string;
    city: string;
    state: USState;
    zip: string;
    serviceArea?: string[];
    hours: Step2Data['hours'];
  };
  services: ServiceItem[];
  brand: {
    hasExactColors: boolean;
    primaryColor?: string;
    secondaryColor?: string;
    stylePreference?: StylePreference;
    logoUrl?: string;
  };
  photos: PhotoItem[];
  social: {
    instagram?: string;
    facebook?: string;
    google?: string;
    yelp?: string;
    tiktok?: string;
    youtube?: string;
    existingWebsite?: string;
  };
  story: {
    yourStory: string;
    differentiators: string;
    targetCustomers?: string;
    additionalNotes?: string;
  };
};

// ─── Helper: map form data → webhook payload ─────────────────────────────────

export function toWebhookPayload(data: OnboardingFormData, slug: string): WebhookPayload {
  return {
    slug,
    submittedAt: new Date().toISOString(),
    business: {
      businessName: data.businessName,
      tagline: data.tagline,
      industry: data.industry,
      yearEstablished: data.yearEstablished || undefined,
      ownerName: data.ownerName,
    },
    contact: {
      phone: data.phone,
      email: data.email,
      street: data.street,
      suite: data.suite,
      city: data.city,
      state: data.state,
      zip: data.zip,
      serviceArea: data.serviceArea,
      hours: data.hours,
    },
    services: data.services,
    brand: {
      hasExactColors: data.hasExactColors,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      stylePreference: data.stylePreference,
      logoUrl: data.logoUrl || undefined,
    },
    photos: data.photos ?? [],
    social: data.social,
    story: {
      yourStory: data.yourStory,
      differentiators: data.differentiators,
      targetCustomers: data.targetCustomers,
      additionalNotes: data.additionalNotes,
    },
  };
}
