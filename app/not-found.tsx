import type { Metadata, Viewport } from 'next'
import NotFoundContent from '@/components/NotFoundContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '404 - Page Not Found - Naughty Mad Libs',
    description: 'The page you are looking for could not be found.',
    robots: 'noindex, nofollow',
  }
}

export async function generateViewport(): Promise<Viewport> {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#e11d48',
  }
}

export default function NotFound() {
  return <NotFoundContent />;
}