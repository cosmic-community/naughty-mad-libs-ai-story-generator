'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import StoryResult from '@/components/StoryResult';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MadLibsTemplate } from '@/types';

export default function StoryPage() {
  const searchParams = useSearchParams();
  const [story, setStory] = useState<string>('');
  const [template, setTemplate] = useState<MadLibsTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const storyParam = searchParams.get('story');
    const templateParam = searchParams.get('template');
    
    if (storyParam && templateParam) {
      try {
        setStory(decodeURIComponent(storyParam));
        setTemplate(JSON.parse(decodeURIComponent(templateParam)));
      } catch (err) {
        console.error('Error parsing URL parameters:', err);
        setError('Invalid story data');
      }
    } else {
      setError('No story data found');
    }
    
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !story || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">{error || 'Story not found'}</p>
          <a
            href="/"
            className="btn-primary inline-block"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <StoryResult
          story={story}
          template={template}
          onRegenerate={() => {
            // Redirect back to template with regenerate flag
            window.location.href = `/templates/${template.slug}?regenerate=true`;
          }}
          onTryAgain={() => {
            // Redirect to home
            window.location.href = '/';
          }}
        />
      </div>
    </div>
  );
}