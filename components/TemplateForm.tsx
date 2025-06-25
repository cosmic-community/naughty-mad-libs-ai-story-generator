'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MadLibsTemplate, StoryPrompt, FormData } from '@/types';
import { validateFormData, formatTheme, formatDifficultyLevel, getThemeColor } from '@/lib/utils';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowLeft, Sparkles, Send } from 'lucide-react';

interface TemplateFormProps {
  template: MadLibsTemplate;
  storyPrompt: StoryPrompt | null;
}

export default function TemplateForm({ template, storyPrompt }: TemplateFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const themeColor = getThemeColor(template.metadata.theme.value);

  const onSubmit = async (data: FormData) => {
    setError('');
    setIsGenerating(true);

    try {
      // Validate form data
      const validationErrors = validateFormData(data, template.metadata.questions);
      if (validationErrors.length > 0) {
        setError(validationErrors[0] || 'Validation error occurred');
        setIsGenerating(false);
        return;
      }

      if (!storyPrompt) {
        setError('Story prompt not available for this template');
        setIsGenerating(false);
        return;
      }

      // Generate story via API
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptTemplate: storyPrompt.metadata.ai_prompt_template,
          answers: data,
          maxTokens: storyPrompt.metadata.max_tokens || 300,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate story');
      }

      const result = await response.json();

      // Redirect to story page with results
      const storyParam = encodeURIComponent(result.story);
      const templateParam = encodeURIComponent(JSON.stringify(template));
      
      window.location.href = `/story?story=${storyParam}&template=${templateParam}`;

    } catch (err) {
      console.error('Error generating story:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Templates</span>
        </button>

        <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${themeColor} text-white text-sm font-medium mb-4`}>
          {formatTheme(template.metadata.theme.value)} • {formatDifficultyLevel(template.metadata.difficulty_level?.value || 'medium')}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {template.metadata.template_name}
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          {template.metadata.description}
        </p>

        {/* Style Instructions */}
        {storyPrompt?.metadata.style_instructions && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Story Style:</strong> {storyPrompt.metadata.style_instructions}
            </p>
          </div>
        )}
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>Fill in the Blanks</span>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </h2>
            <p className="text-gray-600">
              Answer these {template.metadata.questions.length} questions to create your personalized story
            </p>
          </div>

          {template.metadata.questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="space-y-2"
            >
              <label className="form-label">
                <span className="inline-flex items-center space-x-2">
                  <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span>{question.prompt}</span>
                </span>
              </label>
              
              {question.type === 'textarea' ? (
                <textarea
                  {...register(question.id, { required: true })}
                  placeholder={question.placeholder || `Enter your ${question.prompt.toLowerCase()}`}
                  className="input-field resize-none"
                  rows={3}
                />
              ) : (
                <input
                  {...register(question.id, { required: true })}
                  type="text"
                  placeholder={question.placeholder || `Enter your ${question.prompt.toLowerCase()}`}
                  className="input-field"
                />
              )}
              
              {errors[question.id] && (
                <p className="error-message">This field is required</p>
              )}
            </motion.div>
          ))}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isGenerating}
            whileHover={{ scale: isGenerating ? 1 : 1.02 }}
            whileTap={{ scale: isGenerating ? 1 : 0.98 }}
            className={`w-full py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 ${
              isGenerating
                ? 'bg-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${themeColor} hover:shadow-xl`
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center space-x-3">
                <LoadingSpinner size="small" />
                <span>Creating Your Story</span>
                <span className="loading-dots"></span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Generate My Story! ✨</span>
              </span>
            )}
          </motion.button>
        </form>

        {/* Content Guidelines */}
        {storyPrompt?.metadata.content_guidelines && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <details className="text-sm">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium">
                Content Guidelines
              </summary>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {storyPrompt.metadata.content_guidelines}
              </p>
            </details>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}