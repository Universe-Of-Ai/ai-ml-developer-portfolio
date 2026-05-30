'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NeuralCanvas from './NeuralCanvas';
import { terminalPhrases } from '@/lib/portfolio-data';

const TYPING_SPEED = 60; // ms per character
const CURSOR_BLINK_PAUSE = 800; // ms pause between phrases
const DELETE_SPEED = 30; // ms per character delete

function useTerminalTyping() {
  const [displayText, setDisplayText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function tick() {
      const currentPhrase = terminalPhrases[phraseIndexRef.current];

      if (isDeletingRef.current) {
        // Deleting
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplayText(currentPhrase.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          isDeletingRef.current = false;
          phraseIndexRef.current =
            (phraseIndexRef.current + 1) % terminalPhrases.length;
          timeoutRef.current = setTimeout(tick, 300);
        }
      } else {
        // Typing
        if (charIndexRef.current < currentPhrase.length) {
          charIndexRef.current += 1;
          setDisplayText(currentPhrase.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(tick, TYPING_SPEED);
        } else {
          // Finished typing, pause
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            isDeletingRef.current = true;
            tick();
          }, CURSOR_BLINK_PAUSE);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { displayText, isPaused };
}

export default function HeroSection() {
  const { displayText, isPaused } = useTerminalTyping();

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
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-[#0A0A0F]/30 dark:via-transparent dark:to-[#0A0A0F] bg-gradient-to-b from-white/30 via-transparent to-white" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 dark:bg-accent-cyan/10 bg-accent-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 dark:bg-accent-violet/10 bg-accent-violet/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:border-accent-cyan/20 border-accent-cyan/30 dark:bg-accent-cyan/5 bg-accent-cyan/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm dark:text-accent-cyan/80 text-accent-cyan font-medium">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[2.5rem] sm:text-6xl md:text-[4.5rem] font-black tracking-tight mb-4 leading-tight"
        >
          <span className="gradient-text animate-shimmer">
            Zahidul Islam
          </span>
        </motion.h1>

        {/* Terminal Typing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="dark:bg-[#12121A] bg-gray-100 rounded-xl dark:border-white/5 border-gray-200 px-5 py-3 inline-flex items-center gap-2 font-mono text-sm sm:text-base shadow-lg">
            <span className="dark:text-accent-cyan text-accent-blue">$</span>
            <span className="dark:text-white/80 text-gray-800">
              {displayText}
            </span>
            <span
              className={`dark:text-accent-cyan text-accent-blue ${
                isPaused ? 'animate-cursor-blink' : 'opacity-0'
              }`}
            >
              ▊
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm sm:text-base dark:text-white/30 text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
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
            className="bg-gradient-to-r from-accent-cyan to-accent-blue hover:from-accent-cyan/90 hover:to-accent-blue/90 text-white border-0 shadow-lg shadow-accent-cyan/25 h-12 px-8 text-base rounded-xl font-semibold"
          >
            <Eye className="size-4 mr-2" />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="dark:border-white/10 border-gray-300 dark:hover:border-accent-cyan/30 hover:border-accent-cyan dark:text-white/80 text-gray-700 dark:hover:text-white hover:text-gray-900 dark:hover:bg-accent-cyan/5 hover:bg-accent-cyan/10 h-12 px-8 text-base rounded-xl font-semibold"
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
          <span className="text-xs dark:text-white/30 text-gray-400 uppercase tracking-widest">
            Scroll
          </span>
          <ArrowDown className="size-4 dark:text-white/30 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
