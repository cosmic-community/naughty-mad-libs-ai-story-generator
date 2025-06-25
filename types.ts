// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Mad Libs Template interface
export interface MadLibsTemplate extends CosmicObject {
  type_slug: 'mad-libs-templates';
  metadata: {
    template_name: string;
    description?: string;
    theme: {
      key: string;
      value: ThemeType;
    };
    questions: Question[];
    difficulty_level?: {
      key: string;
      value: DifficultyLevel;
    };
    active?: boolean;
    featured?: boolean;
  };
}

// Story Prompt interface
export interface StoryPrompt extends CosmicObject {
  type_slug: 'story-prompts';
  metadata: {
    prompt_name: string;
    template: MadLibsTemplate;
    ai_prompt_template: string;
    max_tokens?: number;
    style_instructions?: string;
    content_guidelines?: string;
  };
}

// Site Settings interface
export interface SiteSettings extends CosmicObject {
  type_slug: 'site-settings';
  metadata: {
    site_title?: string;
    site_description?: string;
    age_verification_message?: string;
    content_warning?: string;
    social_sharing_enabled?: boolean;
    social_share_text?: string;
    footer_text?: string;
    analytics_code?: string;
  };
}

// Form question interface
export interface Question {
  id: string;
  prompt: string;
  type: 'text' | 'select' | 'textarea';
  placeholder?: string;
  options?: string[];
}

// Type literals for select values
export type ThemeType = 'Romantic' | 'Adventure' | 'Comedy' | 'Fantasy' | 'Nightlife';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Spicy';

// Form data interface
export interface FormData {
  [key: string]: string;
}

// AI response interface
export interface AIStoryResponse {
  text: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

// API response interfaces
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Component prop interfaces
export interface TemplateCardProps {
  template: MadLibsTemplate;
  onClick: () => void;
}

export interface QuestionFormProps {
  template: MadLibsTemplate;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export interface StoryResultProps {
  story: string;
  template: MadLibsTemplate;
  onRegenerate: () => void;
  onTryAgain: () => void;
}

export interface AgeVerificationProps {
  isOpen: boolean;
  onConfirm: () => void;
  message?: string;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Type guards for runtime validation
export function isMadLibsTemplate(obj: CosmicObject): obj is MadLibsTemplate {
  return obj.type_slug === 'mad-libs-templates';
}

export function isStoryPrompt(obj: CosmicObject): obj is StoryPrompt {
  return obj.type_slug === 'story-prompts';
}

export function isSiteSettings(obj: CosmicObject): obj is SiteSettings {
  return obj.type_slug === 'site-settings';
}

// Utility types
export type CreateStoryData = Omit<StoryPrompt, 'id' | 'created_at' | 'modified_at'>;
export type TemplateFormData = Pick<MadLibsTemplate, 'metadata'>;