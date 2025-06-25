'use client';

import { motion } from 'framer-motion';
import { Heart, Zap, Shield } from 'lucide-react';

interface FooterProps {
  footerText?: string;
  analyticsCode?: string;
}

export default function Footer({ footerText, analyticsCode }: FooterProps) {
  const defaultFooterText = `
    <p>© 2024 Naughty Mad Libs. All rights reserved.</p>
    <p><small>This site uses AI to generate humorous content. Content is generated automatically and may vary in appropriateness. Use discretion when sharing. Must be 18+ to use this service.</small></p>
  `;

  return (
    <>
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Logo/Brand */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Naughty Mad Libs
              </h3>
              <p className="text-gray-600">AI-Powered Adult Story Generator</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">AI-Powered</h4>
                <p className="text-sm text-gray-600">Advanced artificial intelligence creates unique stories</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Adult Humor</h4>
                <p className="text-sm text-gray-600">Playful, spicy content for mature audiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Safe & Secure</h4>
                <p className="text-sm text-gray-600">Responsible content generation with privacy focus</p>
              </div>
            </div>

            {/* Legal/Footer Text */}
            <div className="border-t border-gray-200 pt-8">
              <div 
                className="text-sm text-gray-600 space-y-2"
                dangerouslySetInnerHTML={{ 
                  __html: footerText || defaultFooterText 
                }}
              />
            </div>

            {/* Additional Links */}
            <div className="mt-6 flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-500">
              <span>🔞 18+ Only</span>
              <span>•</span>
              <span>🤖 AI-Generated Content</span>
              <span>•</span>
              <span>💖 Made with Love</span>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Analytics Code */}
      {analyticsCode && (
        <div dangerouslySetInnerHTML={{ __html: analyticsCode }} />
      )}
    </>
  );
}