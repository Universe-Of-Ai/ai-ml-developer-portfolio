'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NeuralCanvas from './NeuralCanvas';

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Neural Network Background */}
      <NeuralCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/30 via-transparent to-[#0a0a0f]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-cyan-300/80 font-medium">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
        >
          <span
            className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% auto',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            Zahidul Islam
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/50 font-light mb-6"
        >
          AI &amp; Machine Learning Developer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm sm:text-base text-white/30 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building intelligent systems that transform data into actionable insights.
          Specializing in deep learning, NLP, and computer vision solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white border-0 shadow-lg shadow-cyan-500/25 h-12 px-8 text-base rounded-xl font-semibold"
          >
            <Eye className="size-4 mr-2" />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-white/80 hover:text-white h-12 px-8 text-base rounded-xl font-semibold"
          >
            <Download className="size-4 mr-2" />
            Download CV
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
          <ArrowDown className="size-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
