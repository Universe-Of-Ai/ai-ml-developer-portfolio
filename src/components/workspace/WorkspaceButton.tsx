'use client';

import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

interface WorkspaceButtonProps {
  onClick: () => void;
}

export default function WorkspaceButton({ onClick }: WorkspaceButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
    >
      <Layers className="w-6 h-6 text-white" />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
          filter: 'blur(12px)',
          opacity: 0.4,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
}
