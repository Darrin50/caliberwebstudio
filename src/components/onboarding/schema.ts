import { z } from 'zod'

export const dayHoursSchema = z.object({
  open: z.string().default('9:00 AM'),
  close: z.string().default('5:00 PM'),
  closed: z.boolean().default(false),
})

export const serviceItemSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(100),
  description: z.string().max(500).optional().or(z.literal('')),
  price: z.string().max(100).optional().or(z.literal('')),
})

export const photoItemSchema = z.object({
  url: z.string().min(1),
  fileName: z.string().min(1),
  fileSize: z.number().optional(),
  caption: z.string().max(200).optional().or(z.literal('')),
  category: z
    .enum(['hero', 'team', 'products', 'services', 'gallery', 'other'])
    .optional(),
})

export const onboardingSchema = z.object({
  business: z.object({
    name: z.string().min(2, 'Business name must be at least 2 characters').max(100),
    tagline: z.string().max(200).optional().or(z.literal('')),
    industry: z.string().min(1, 'Please select an industry').max(100),
    yearsInBusiness: z.string().max(50).optional().or(z.literal('')),
    currentWebsite: z.string().max(200).optional().or(z.literal('')),
  }),

  contact: z.object({
    ownerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().max(20).optional().or(z.literal('')),
    address: z.string().max(200).optional().or(z.literal('')),
    city: z.string().max(100).optional().or(z.literal('')),
    state: z.string().max(50).optional().or(z.literal('')),
    zip: z.string().max(20).optional().or(z.literal('')),
    hours: z
      .object({
        monday: dayHoursSchema.optional(),
        tuesday: dayHoursSchema.optional(),
        wednesday: dayHoursSchema.optional(),
        thursday: dayHoursSchema.optional(),
        friday: dayHoursSchema.optional(),
        saturday: dayHoursSchema.optional(),
        sunday: dayHoursSchema.optional(),
      })
      .optional(),
    social: z
      .object({
        facebook: z.string().max(200).optional().or(z.literal('')),
        instagram: z.string().max(200).optional().or(z.literal('')),
        twitter: z.string().max(200).optional().or(z.literal('')),
        linkedin: z.string().max(200).optional().or(z.literal('')),
        yelp: z.string().max(200).optional().or(z.literal('')),
        google: z.string().max(200).optional().or(z.literal('')),
      })
      .optional(),
  }),

  services: z.object({
    items: z
      .array(serviceItemSchema)
      .min(1, 'Please add at least one service')
      .max(20),
  }),

  brand: z.object({
    primaryColor: z.string().min(1, 'Primary color is required'),
    secondaryColor: z.string().optional().or(z.literal('')),
    accentColor: z.string().optional().or(z.literal('')),
    stylePreference: z.enum(
      ['modern-minimal', 'bold-dynamic', 'classic-professional', 'playful-creative'],
      { error: 'Please select a style preference' }
    ),
    logoUrl: z.string().optional().or(z.literal('')),
    logoFileName: z.string().optional().or(z.literal('')),
    notes: z.string().max(500).optional().or(z.literal('')),
  }),

  photos: z.object({
    items: z.array(photoItemSchema).max(20).optional(),
  }),

  story: z.object({
    yourStory: z
      .string()
      .min(50, 'Please write at least 50 characters about your story')
      .max(2000, 'Story must be under 2000 characters'),
    whatMakesDifferent: z
      .string()
      .min(30, 'Please write at least 30 characters')
      .max(1000, 'Must be under 1000 characters'),
    targetCustomers: z
      .string()
      .max(500, 'Must be under 500 characters')
      .optional()
      .or(z.literal('')),
    anythingElse: z
      .string()
      .max(1000, 'Must be under 1000 characters')
      .optional()
      .or(z.literal('')),
  }),

  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to continue',
  }),
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>

// Fields to validate at each step
export const STEP_VALIDATE_FIELDS: Record<number, string[]> = {
  1: ['business.name', 'business.industry'],
  2: ['contact.ownerName', 'contact.email'],
  3: ['services.items'],
  4: ['brand.primaryColor', 'brand.stylePreference'],
  5: [],
  6: ['story.yourStory', 'story.whatMakesDifferent'],
  7: ['agreement'],
}

export const STEP_TITLES = [
  'Business Basics',
  'Contact & Location',
  'Services',
  'Brand & Colors',
  'Photos & Media',
  'Your Story',
  'Review & Submit',
]
