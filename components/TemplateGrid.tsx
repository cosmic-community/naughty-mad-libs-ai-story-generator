'use client';

import { motion } from 'framer-motion';
import { MadLibsTemplate } from '@/types';
import TemplateCard from '@/components/TemplateCard';

interface TemplateGridProps {
  templates: MadLibsTemplate[];
}

export default function TemplateGrid({ templates }: TemplateGridProps) {
  if (!templates || templates.length === 0) {
    return (
      <section id="templates" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Choose Your Story Template
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-gray-600 mb-4">
              No templates available at the moment.
            </p>
            <p className="text-sm text-gray-500">
              Check back soon for exciting new story templates!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="templates" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Story Template
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our collection of playful templates and let AI create your personalized story
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TemplateCard
                template={template}
                onClick={() => {
                  window.location.href = `/templates/${template.slug}`;
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {templates.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 text-lg">
              More templates coming soon! 🚀
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}