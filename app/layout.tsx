import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/cosmic'
import { SiteSettings } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  let siteSettings: SiteSettings | null = null;
  
  try {
    const settings = await getSiteSettings();
    if (settings) {
      siteSettings = settings as SiteSettings;
    }
  } catch (error) {
    console.error('Failed to load site settings:', error);
  }

  const title = siteSettings?.metadata?.site_title || 'Naughty Mad Libs - AI Story Generator';
  const description = siteSettings?.metadata?.site_description || 'Create hilarious, adult-themed stories with AI! Fill in the blanks and watch as artificial intelligence crafts personalized tales just for you.';

  return {
    title,
    description,
    keywords: ['mad libs', 'AI stories', 'adult humor', 'story generator', 'fill in the blanks'],
    authors: [{ name: 'Naughty Mad Libs' }],
    creator: 'Naughty Mad Libs',
    publisher: 'Naughty Mad Libs',
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export async function generateViewport(): Promise<Viewport> {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#e11d48',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}