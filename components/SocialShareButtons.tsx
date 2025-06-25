'use client';

import { motion } from 'framer-motion';
import { Twitter, Facebook, MessageCircle, Link2 } from 'lucide-react';

interface SocialShareButtonsProps {
  story: string;
  templateName: string;
  shareText?: string;
}

export default function SocialShareButtons({ story, templateName, shareText }: SocialShareButtonsProps) {
  const baseShareText = shareText || "I just created a hilarious AI-generated story!";
  const url = typeof window !== 'undefined' ? window.location.href : '';
  
  // Truncate story for sharing (social media character limits)
  const shortStory = story.length > 200 ? story.substring(0, 200) + '...' : story;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${baseShareText} "${shortStory}" #NaughtyMadLibs #AIStory`)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`${baseShareText} Check out this ${templateName} story I created!`)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${baseShareText}\n\n"${shortStory}"\n\nCreate your own at: ${url}`)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const socialButtons = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: shareUrls.twitter,
      className: 'social-btn twitter',
      color: 'hover:bg-blue-500'
    },
    {
      name: 'Facebook', 
      icon: Facebook,
      url: shareUrls.facebook,
      className: 'social-btn facebook',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: shareUrls.whatsapp,
      className: 'social-btn whatsapp',
      color: 'hover:bg-green-500'
    }
  ];

  return (
    <div className="flex items-center justify-center space-x-4">
      {socialButtons.map((button, index) => (
        <motion.a
          key={button.name}
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${button.className} ${button.color}`}
          title={`Share on ${button.name}`}
        >
          <button.icon className="w-5 h-5" />
        </motion.a>
      ))}
      
      <motion.button
        onClick={handleCopyLink}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="social-btn bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500"
        title="Copy link"
      >
        <Link2 className="w-5 h-5" />
      </motion.button>
    </div>
  );
}