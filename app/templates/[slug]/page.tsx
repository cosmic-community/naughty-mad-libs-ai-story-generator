// app/templates/[slug]/page.tsx
import { getMadLibsTemplate, getStoryPromptForTemplate } from '@/lib/cosmic'
import { MadLibsTemplate, StoryPrompt } from '@/types'
import { notFound } from 'next/navigation'
import TemplateForm from '@/components/TemplateForm'
import { Metadata } from 'next'

interface TemplatePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const template = await getMadLibsTemplate(slug);
    
    if (!template) {
      return {
        title: 'Template Not Found',
        description: 'The requested Mad Libs template could not be found.',
      }
    }

    const templateData = template as MadLibsTemplate;
    
    return {
      title: `${templateData.metadata.template_name} - Naughty Mad Libs`,
      description: templateData.metadata.description || `Create a ${templateData.metadata.template_name} story with AI`,
      openGraph: {
        title: `${templateData.metadata.template_name} - Naughty Mad Libs`,
        description: templateData.metadata.description || `Create a ${templateData.metadata.template_name} story with AI`,
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Mad Libs Template',
      description: 'Create your personalized story with AI'
    }
  }
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  
  let template: MadLibsTemplate | null = null;
  let storyPrompt: StoryPrompt | null = null;

  try {
    const templateData = await getMadLibsTemplate(slug);
    
    if (!templateData) {
      notFound();
    }

    template = templateData as MadLibsTemplate;
    
    // Get the associated story prompt
    const storyPromptData = await getStoryPromptForTemplate(template.id);
    storyPrompt = storyPromptData as StoryPrompt;
    
  } catch (error) {
    console.error('Failed to load template:', error);
    notFound();
  }

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <TemplateForm 
          template={template} 
          storyPrompt={storyPrompt}
        />
      </div>
    </div>
  )
}