import { FormData, Question } from '@/types';

// Utility function to combine CSS classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Format difficulty level for display
export function formatDifficultyLevel(level: string): string {
  switch (level.toLowerCase()) {
    case 'easy':
      return '🟢 Easy';
    case 'medium':
      return '🟡 Medium';
    case 'spicy':
      return '🔥 Spicy';
    default:
      return level;
  }
}

// Format theme for display with emoji
export function formatTheme(theme: string): string {
  switch (theme.toLowerCase()) {
    case 'romantic':
      return '💕 Romantic';
    case 'adventure':
      return '🌟 Adventure';
    case 'comedy':
      return '😂 Comedy';
    case 'fantasy':
      return '🦄 Fantasy';
    case 'nightlife':
      return '🍸 Nightlife';
    default:
      return theme;
  }
}

// Populate AI prompt template with user answers
export function populatePromptTemplate(template: string, answers: FormData): string {
  let populatedPrompt = template;
  
  // Replace all placeholders like {name}, {adjective}, etc.
  Object.entries(answers).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    populatedPrompt = populatedPrompt.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return populatedPrompt;
}

// Validate form data against questions
export function validateFormData(data: FormData, questions: Question[]): string[] {
  const errors: string[] = [];
  
  questions.forEach(question => {
    const value = data[question.id];
    if (!value || value.trim() === '') {
      errors.push(`${question.prompt} is required`);
    }
  });
  
  return errors;
}

// Generate shareable text for social media
export function generateShareText(siteTitle: string, customText?: string): string {
  const defaultText = "I just created a hilarious AI-generated story! 😂 Try making your own at";
  const shareText = customText || defaultText;
  return `${shareText} ${siteTitle}`;
}

// Truncate text for display
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Get theme color for UI elements
export function getThemeColor(theme: string): string {
  switch (theme.toLowerCase()) {
    case 'romantic':
      return 'from-pink-500 to-rose-500';
    case 'adventure':
      return 'from-blue-500 to-teal-500';
    case 'comedy':
      return 'from-yellow-500 to-orange-500';
    case 'fantasy':
      return 'from-purple-500 to-indigo-500';
    case 'nightlife':
      return 'from-purple-600 to-pink-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
}

// Get difficulty color for UI elements
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'spicy':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Local storage helpers
export function getFromLocalStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setToLocalStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Silently fail if storage is not available
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Silently fail if storage is not available
  }
}