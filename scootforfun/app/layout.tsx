import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { business } from '@/lib/constants'
import { localBusinessSchema, tourProductSchema } from '@/lib/schema'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: business.seo.title,
    template: `%s | ${business.name}`,
  },
  description: business.seo.description,
  keywords: [...business.seo.keywords],
  metadataBase: new URL(business.website),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    url: business.website,
    siteName: business.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: business.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${business.name} — Guided Detroit Scooter Tours`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.seo.title,
    description: business.seo.description,
    images: [business.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessSchema(), tourProductSchema()]),
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
