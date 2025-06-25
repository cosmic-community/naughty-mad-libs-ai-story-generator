'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ContentWarningProps {
  message?: string;
}

export default function ContentWarning({ message }: ContentWarningProps) {
  const defaultMessage = `
    <div class="content-warning">
      🔞 <strong>18+ Only:</strong> This site generates adult-themed humorous content. Please use responsibly.
    </div>
  `;

  if (!message && !defaultMessage) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="sticky top-0 z-40 bg-red-50 border-b border-red-200"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div 
            className="text-center"
            dangerouslySetInnerHTML={{ 
              __html: message || defaultMessage 
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}