import { getMadLibsTemplates, getSiteSettings } from '@/lib/cosmic'
import { MadLibsTemplate, SiteSettings } from '@/types'
import TemplateGrid from '@/components/TemplateGrid'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Templates - Naughty Mad Libs',
  description: 'Browse all available Mad Libs templates and create your personalized AI-generated stories',
  openGraph: {
    title: 'All Templates - Naughty Mad Libs',
    description: 'Browse all available Mad Libs templates and create your personalized AI-generated stories',
  }
}

export default async function TemplatesPage() {
  let templates: MadLibsTemplate[] = [];
  let siteSettings: SiteSettings | null = null;

  try {
    const [templatesData, settingsData] = await Promise.all([
      getMadLibsTemplates(), // Get all active templates
      getSiteSettings()
    ]);
    
    templates = templatesData as MadLibsTemplate[];
    siteSettings = settingsData as SiteSettings;
  } catch (error) {
    console.error('Failed to load templates:', error);
  }

  // Group templates by theme
  const groupedTemplates = templates.reduce((acc, template) => {
    const theme = template.metadata.theme.value;
    if (!acc[theme]) {
      acc[theme] = [];
    }
    acc[theme].push(template);
    return acc;
  }, {} as Record<string, MadLibsTemplate[]>);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            All Story Templates
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our complete collection of playful templates and let AI create your personalized story
          </p>

          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-600">
            <span className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
              📚 {templates.length} Templates Available
            </span>
            <span className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
              🔞 18+ Content
            </span>
            <span className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
              🤖 AI-Powered
            </span>
          </div>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                No templates available at the moment.
              </p>
              <p className="text-sm text-gray-500">
                Check back soon for exciting new story templates!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Templates */}
            {templates.some(t => t.metadata.featured) && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <span>⭐</span>
                  <span>Featured Templates</span>
                </h2>
                <TemplateGrid templates={templates.filter(t => t.metadata.featured)} />
              </div>
            )}

            {/* Templates by Theme */}
            {Object.entries(groupedTemplates).map(([theme, themeTemplates]) => {
              const featuredInTheme = themeTemplates.filter(t => t.metadata.featured);
              const nonFeaturedInTheme = themeTemplates.filter(t => !t.metadata.featured);
              
              // Only show non-featured templates in themed sections
              if (nonFeaturedInTheme.length === 0) return null;

              return (
                <div key={theme}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <span>{theme === 'Romantic' ? '💕' : theme === 'Adventure' ? '🌟' : theme === 'Comedy' ? '😂' : theme === 'Fantasy' ? '🔮' : '🌙'}</span>
                    <span>{theme} Stories</span>
                    <span className="text-sm font-normal text-gray-500">({nonFeaturedInTheme.length})</span>
                  </h2>
                  <TemplateGrid templates={nonFeaturedInTheme} />
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Create Your Story?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Pick a template above and let our AI craft a personalized, hilarious story just for you!
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>🚀 Instant generation</span>
            <span>•</span>
            <span>💯 Unique every time</span>
            <span>•</span>
            <span>📱 Easy to share</span>
          </div>
        </div>
      </div>
    </div>
  )
}