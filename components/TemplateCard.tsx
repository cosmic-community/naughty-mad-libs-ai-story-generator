'use client';

import { motion } from 'framer-motion';
import { TemplateCardProps } from '@/types';
import { formatTheme, formatDifficultyLevel, getThemeColor, getDifficultyColor } from '@/lib/utils';
import { Clock, Users, Zap } from 'lucide-react';

export default function TemplateCard({ template, onClick }: TemplateCardProps) {
  const themeColor = getThemeColor(template.metadata.theme.value);
  const difficultyColor = getDifficultyColor(template.metadata.difficulty_level?.value || 'Medium');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="template-card card cursor-pointer relative overflow-hidden group h-full"
      onClick={onClick}
    >
      {/* Theme gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${themeColor} opacity-5`} />
      
      {/* Featured badge */}
      {template.metadata.featured && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Zap className="w-3 h-3" />
          <span>Featured</span>
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">
              {formatTheme(template.metadata.theme.value)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
              {formatDifficultyLevel(template.metadata.difficulty_level?.value || 'Medium')}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
            {template.metadata.template_name}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {template.metadata.description || 'Create an exciting personalized story with this template.'}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{template.metadata.questions?.length || 0} questions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>~2 min</span>
          </div>
        </div>

        {/* Questions preview */}
        {template.metadata.questions && template.metadata.questions.length > 0 && (
          <div className="mb-6 flex-grow">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sample questions:</h4>
            <div className="space-y-1">
              {template.metadata.questions.slice(0, 3).map((question, index) => (
                <div key={question.id} className="text-xs text-gray-600 flex items-center">
                  <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                    {index + 1}
                  </span>
                  <span className="truncate">{question.prompt}</span>
                </div>
              ))}
              {template.metadata.questions.length > 3 && (
                <div className="text-xs text-gray-500 pl-6">
                  +{template.metadata.questions.length - 3} more...
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${themeColor} shadow-lg hover:shadow-xl transition-all duration-200`}
        >
          Create Story ✨
        </motion.button>
      </div>
    </motion.div>
  );
}