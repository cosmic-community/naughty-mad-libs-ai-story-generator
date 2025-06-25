'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart } from 'lucide-react';

interface HeroProps {
  title?: string;
  description?: string;
}

export default function Hero({ title, description }: HeroProps) {
  const defaultTitle = "Naughty Mad Libs - AI Story Generator";
  const defaultDescription = "Create hilarious, adult-themed stories with AI! Fill in the blanks and watch as artificial intelligence crafts personalized, playful tales just for you.";

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-400/20 rounded-full blur-xl" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                🔞 18+ Adult Content • AI-Powered Stories
              </span>
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight"
          >
            {title || defaultTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            {description || defaultDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#templates"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 group"
            >
              <span>Start Creating Stories</span>
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  😍
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  😂
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  🔥
                </div>
              </div>
              <span>Join thousands having fun!</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">AI-Powered</h3>
              <p className="text-sm text-gray-600">Advanced AI creates unique stories every time</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Adult Humor</h3>
              <p className="text-sm text-gray-600">Playful, spicy content for mature audiences</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Instant Fun</h3>
              <p className="text-sm text-gray-600">Create and share stories in seconds</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}