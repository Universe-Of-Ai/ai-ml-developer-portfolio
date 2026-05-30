'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Text Scramble Hook                                                */
/* ------------------------------------------------------------------ */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

function useTextScramble(text: string, delay = 0, duration = 1.5) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      started.current = true;
      const startTime = performance.now();
      const chars = text.split('');

      const animate = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        const result = chars.map((char, i) => {
          const charDelay = (i / chars.length) * 0.6;
          const charProgress = Math.max(0, Math.min(1, (progress - charDelay) / 0.4));
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
/*  Glitch Text Component                                              */
/* ------------------------------------------------------------------ */
function GlitchText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const scrambled = useTextScramble(text, delay, 1.8);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay }}
    >
      {scrambled}
      {/* glitch layers */}
      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          color: '#06b6d4',
          clipPath: 'inset(10% 0 60% 0)',
          transform: 'translate(-2px, 0)',
          opacity: 0.7,
          filter: 'blur(0.5px)',
        }}
      >
        {scrambled}
      </span>
      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          color: '#ec4899',
          clipPath: 'inset(60% 0 10% 0)',
          transform: 'translate(2px, 0)',
          opacity: 0.7,
          filter: 'blur(0.5px)',
        }}
      >
        {scrambled}
      </span>
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Neon CTA Button                                                    */
/* ------------------------------------------------------------------ */
function NeonButton({
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
    'relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer select-none';
  const colors =
    variant === 'primary'
      ? 'bg-white/5 text-white border border-violet-500/50 hover:border-cyan-400/80 hover:bg-white/10'
      : 'bg-transparent text-white/70 border border-white/15 hover:border-violet-400/50 hover:text-white hover:bg-white/5';

  return (
    <button className={`${base} ${colors} ${className}`} onClick={onClick}>
      {/* neon glow border - animated */}
      <span
        className="absolute inset-[-1px] rounded-full opacity-60 pointer-events-none"
        aria-hidden
        style={{
          background:
            variant === 'primary'
              ? 'conic-gradient(from var(--neon-angle, 0deg), #8b5cf6, #06b6d4, #ec4899, #8b5cf6)'
              : 'conic-gradient(from var(--neon-angle, 0deg), transparent, rgba(139,92,246,0.4), transparent)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          animation: 'neon-spin 3s linear infinite',
        }}
      />
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Shimmer Text                                                       */
/* ------------------------------------------------------------------ */
function ShimmerText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <h1
      className={`inline-block ${className}`}
      style={{
        background:
          'linear-gradient(90deg, #ffffff 0%, #c084fc 25%, #22d3ee 50%, #f472b6 75%, #ffffff 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 4s linear infinite',
      }}
    >
      {text}
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Text Overlay                                                  */
/* ------------------------------------------------------------------ */
export default function HeroTextOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
      {/* Agency name — massive shimmer */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <ShimmerText
          text="NEXUS"
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none"
        />
      </motion.div>

      {/* Subtitle — text scramble glitch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="mt-3 md:mt-5"
      >
        <GlitchText
          text="UNIVERSE OF AI"
          className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-[0.35em] text-white/80"
          delay={0.5}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
        className="mt-4 md:mt-6 max-w-md md:max-w-lg text-sm md:text-base text-white/50 font-light leading-relaxed"
      >
        Where creativity meets intelligence. We craft immersive digital experiences that push the boundaries of what&apos;s possible.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
        className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
      >
        <NeonButton variant="primary">
          <span>Explore Our Work</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NeonButton>
        <NeonButton variant="secondary">Get in Touch</NeonButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
