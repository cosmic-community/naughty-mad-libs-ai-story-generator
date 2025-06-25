'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgeVerificationProps } from '@/types';
import { getFromLocalStorage, setToLocalStorage } from '@/lib/utils';
import { Shield, X } from 'lucide-react';

interface AgeVerificationModalProps {
  message?: string;
}

export default function AgeVerificationModal({ message }: AgeVerificationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user has already verified their age
    const ageVerified = getFromLocalStorage('age-verified');
    if (!ageVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    setToLocalStorage('age-verified', 'true');
    setIsOpen(false);
  };

  const handleDeny = () => {
    // Redirect to a safe page or show warning
    window.location.href = 'https://www.google.com';
  };

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  const defaultMessage = `
    <h3>⚠️ Adult Content Warning</h3>
    <p>This site contains adult-themed humor and content intended for users 18 years and older.</p>
    <p><strong>By entering, you confirm that you are 18+ and agree to our terms of use.</strong></p>
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 age-verification-backdrop"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              
              <div 
                className="text-gray-800"
                dangerouslySetInnerHTML={{ 
                  __html: message || defaultMessage 
                }}
              />
            </div>

            {/* Content Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-red-500 text-xl">🔞</div>
                <div>
                  <h4 className="font-semibold text-red-800 text-sm mb-1">
                    18+ Content Only
                  </h4>
                  <p className="text-red-700 text-xs leading-relaxed">
                    This website generates adult-themed humorous content using AI. 
                    All content is intended for mature audiences only.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={handleConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                ✅ I am 18+ and agree to enter
              </motion.button>

              <motion.button
                onClick={handleDeny}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200"
              >
                ❌ I am under 18 / Do not agree
              </motion.button>
            </div>

            {/* Legal Text */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By clicking "I am 18+ and agree to enter", you acknowledge that you are at least 18 years old 
                and consent to viewing adult-themed content. This site uses AI to generate humorous stories 
                and content may vary in appropriateness.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}