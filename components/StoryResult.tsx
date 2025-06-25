'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StoryResultProps } from '@/types';
import { formatTheme, getThemeColor, generateShareText } from '@/lib/utils';
import SocialShareButtons from '@/components/SocialShareButtons';
import { RotateCcw, Home, Copy, Check, Sparkles } from 'lucide-react';

export default function StoryResult({ story, template, onRegenerate, onTryAgain }: StoryResultProps) {
  const [copied, setCopied] = useState(false);
  const themeColor = getThemeColor(template.metadata.theme.value);

  const handleCopyStory = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy story:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${themeColor} text-white text-sm font-medium mb-4`}>
          {formatTheme(template.metadata.theme.value)} Story
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Your AI-Generated Story! 🎉
        </h1>
        
        <p className="text-lg text-gray-600">
          Based on the "{template.metadata.template_name}" template
        </p>
      </motion.div>

      {/* Story Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="story-reveal"
      >
        <div className="card relative">
          {/* Copy button */}
          <button
            onClick={handleCopyStory}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            title="Copy story to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-800">Your Story</h2>
            </div>
            
            <div className="story-text prose prose-lg max-w-none">
              {story.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium"
            >
              Copied to clipboard!
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Social Sharing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Love your story? Share it with friends! 💕
        </h3>
        <SocialShareButtons 
          story={story}
          templateName={template.metadata.template_name}
          shareText={generateShareText("Naughty Mad Libs")}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.button
          onClick={onRegenerate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Regenerate Story</span>
        </motion.button>

        <motion.button
          onClick={onTryAgain}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary inline-flex items-center space-x-2"
        >
          <Home className="w-5 h-5" />
          <span>Try Another Template</span>
        </motion.button>
      </motion.div>

      {/* Story Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center space-x-6 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="font-medium">Words:</span>
            <span>{story.split(' ').length}</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center space-x-1">
            <span className="font-medium">Characters:</span>
            <span>{story.length}</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center space-x-1">
            <span className="font-medium">Reading time:</span>
            <span>~{Math.ceil(story.split(' ').length / 200)} min</span>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Stories are generated by AI and may vary in content and appropriateness. 
          This content is intended for adult audiences (18+) and should be shared responsibly. 
          Have fun and enjoy your creative story! ✨
        </p>
      </motion.div>
    </div>
  );
}