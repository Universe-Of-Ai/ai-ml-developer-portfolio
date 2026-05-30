'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Text Scramble Hook — clean, no visual glitch layers                */
/* ------------------------------------------------------------------ */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function useTextScramble(text: string, delay = 0, duration = 1.2) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const chars = text.split('');

      const animate = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        const result = chars.map((char, i) => {
          const charDelay = (i / chars.length) * 0.5;
          const charProgress = Math.max(0, Math.min(1, (progress - charDelay) / 0.5));
          if (charProgress >= 1) return char;
          if (charProgress <= 0) return CHARS[Math.floor(Math.random() * CHARS.length)];
          return Math.random() < charProgress ? char : CHARS[Math.floor(Math.random() * CHARS.length)];
        });

        setDisplay(result.join(''));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Shimmer Title                                                      */
/* ------------------------------------------------------------------ */
function ShimmerText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <h1
      className={`inline-block ${className}`}
      style={{
        background:
          'linear-gradient(90deg, #ffffff 0%, #c084fc 30%, #22d3ee 50%, #f472b6 70%, #ffffff 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 6s linear infinite',
      }}
    >
      {text}
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Scramble Reveal Text                                               */
/* ------------------------------------------------------------------ */
function ScrambleReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const scrambled = useTextScramble(text, delay, 1.2);
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay }}
    >
      {scrambled}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Clean CTA Button                                                   */
/* ------------------------------------------------------------------ */
function CTAButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}) {
  const base =
    'relative inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer select-none';

  const colors =
    variant === 'primary'
      ? 'bg-white/[0.07] text-white border border-white/[0.12] hover:bg-white/[0.12] hover:border-violet-500/40'
      : 'bg-transparent text-white/60 border border-white/[0.08] hover:text-white hover:border-white/20';

  return (
    <motion.button
      className={`${base} ${colors} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Text Overlay — clean, spacious, professional                   */
/* ------------------------------------------------------------------ */
export default function HeroTextOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
      {/* Agency name — massive shimmer */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <ShimmerText
          text="NEXUS"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
        />
      </motion.div>

      {/* Subtitle — clean scramble reveal */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="mt-2 md:mt-3"
      >
        <ScrambleReveal
          text="UNIVERSE OF AI"
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] text-white/60"
          delay={0.8}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        className="mt-5 md:mt-6 max-w-md md:max-w-lg text-sm md:text-[15px] text-white/40 font-light leading-relaxed"
      >
        Where creativity meets intelligence. We craft immersive digital
        experiences that push boundaries.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
        className="mt-8 md:mt-10 flex items-center gap-4 pointer-events-auto"
      >
        <CTAButton variant="primary">
          <span>Explore Our Work</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </CTAButton>
        <CTAButton variant="secondary">Get in Touch</CTAButton>
      </motion.div>

      {/* Scroll indicator — minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/20 font-light">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/[0.12] flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-0.5 h-1.5 rounded-full bg-white/40"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
