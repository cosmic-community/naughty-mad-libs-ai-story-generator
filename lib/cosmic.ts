import { createBucketClient } from '@cosmicjs/sdk';

if (!process.env.COSMIC_BUCKET_SLUG) {
  throw new Error('COSMIC_BUCKET_SLUG environment variable is required');
}

if (!process.env.COSMIC_READ_KEY) {
  throw new Error('COSMIC_READ_KEY environment variable is required');
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Helper functions for common queries
export async function getMadLibsTemplates(featured?: boolean) {
  try {
    const query: Record<string, any> = { 
      type: 'mad-libs-templates',
      'metadata.active': true 
    };
    
    if (featured) {
      query['metadata.featured'] = true;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch Mad Libs templates');
  }
}

export async function getMadLibsTemplate(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'mad-libs-templates',
      slug
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch Mad Libs template');
  }
}

export async function getStoryPromptForTemplate(templateId: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'story-prompts',
      'metadata.template': templateId
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch story prompt');
  }
}

export async function getSiteSettings() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'site-settings'
    }).props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch site settings');
  }
}

export async function generateAIStory(prompt: string, maxTokens: number = 300) {
  try {
    const response = await cosmic.ai.generateText({
      prompt,
      max_tokens: maxTokens
    });
    
    return {
      text: response.text,
      usage: response.usage
    };
  } catch (error) {
    console.error('Error generating AI story:', error);
    throw new Error('Failed to generate story');
  }
}