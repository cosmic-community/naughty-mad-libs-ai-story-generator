import { getMadLibsTemplates, getSiteSettings } from '@/lib/cosmic'
import { MadLibsTemplate, SiteSettings } from '@/types'
import Hero from '@/components/Hero'
import TemplateGrid from '@/components/TemplateGrid'
import AgeVerificationModal from '@/components/AgeVerificationModal'
import ContentWarning from '@/components/ContentWarning'
import Footer from '@/components/Footer'

export default async function HomePage() {
  let templates: MadLibsTemplate[] = [];
  let siteSettings: SiteSettings | null = null;

  try {
    const [templatesData, settingsData] = await Promise.all([
      getMadLibsTemplates(true), // Get featured templates
      getSiteSettings()
    ]);
    
    templates = templatesData as MadLibsTemplate[];
    siteSettings = settingsData as SiteSettings;
  } catch (error) {
    console.error('Failed to load data:', error);
  }

  return (
    <div className="min-h-screen">
      <AgeVerificationModal 
        message={siteSettings?.metadata?.age_verification_message}
      />
      
      <ContentWarning 
        message={siteSettings?.metadata?.content_warning}
      />
      
      <Hero 
        title={siteSettings?.metadata?.site_title}
        description={siteSettings?.metadata?.site_description}
      />
      
      <TemplateGrid templates={templates} />
      
      <Footer 
        footerText={siteSettings?.metadata?.footer_text}
        analyticsCode={siteSettings?.metadata?.analytics_code}
      />
    </div>
  )
}