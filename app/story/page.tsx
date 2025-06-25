import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import StoryPageContent from '@/components/StoryPageContent'
import LoadingSpinner from '@/components/LoadingSpinner'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Your Generated Story - Naughty Mad Libs',
    description: 'Read your personalized AI-generated story',
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

export default function StoryPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="large" />
          </div>
        }>
          <StoryPageContent />
        </Suspense>
      </div>
    </div>
  );
}