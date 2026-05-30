'use client';

import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Mobile-only CSS Hero (no Three.js)                                  */
/* ------------------------------------------------------------------ */
export default function HeroMobileFallback() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 animate-gradient-mesh opacity-60" />

      {/* Central gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64">
          {/* Outer glow */}
          <div
            className="absolute inset-[-40%] rounded-full animate-orb-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.15) 40%, transparent 70%)',
            }}
          />
          {/* Main orb */}
          <div
            className="absolute inset-0 rounded-full animate-orb-rotate"
            style={{
              background:
                'conic-gradient(from 0deg, #8b5cf6, #06b6d4, #ec4899, #c084fc, #22d3ee, #8b5cf6)',
              filter: 'blur(20px)',
              opacity: 0.7,
            }}
          />
          {/* Inner bright core */}
          <div
            className="absolute inset-[25%] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(192,132,252,0.2) 50%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* Floating shapes */}
      <FloatingShape
        size={12}
        className="top-[15%] left-[10%]"
        color="rgba(139,92,246,0.4)"
        animation="float-1"
      />
      <FloatingShape
        size={8}
        className="top-[20%] right-[15%]"
        color="rgba(6,182,212,0.35)"
        animation="float-2"
      />
      <FloatingShape
        size={16}
        className="bottom-[25%] left-[20%]"
        color="rgba(236,72,153,0.3)"
        animation="float-3"
      />
      <FloatingShape
        size={6}
        className="top-[45%] right-[8%]"
        color="rgba(192,132,252,0.5)"
        animation="float-4"
      />
      <FloatingShape
        size={10}
        className="bottom-[15%] right-[25%]"
        color="rgba(6,182,212,0.3)"
        animation="float-5"
      />
      <FloatingShape
        size={14}
        className="top-[60%] left-[5%]"
        color="rgba(139,92,246,0.25)"
        animation="float-6"
      />
      <FloatingShape
        size={7}
        className="top-[10%] left-[50%]"
        color="rgba(236,72,153,0.4)"
        animation="float-7"
      />
      <FloatingShape
        size={9}
        className="bottom-[40%] left-[60%]"
        color="rgba(6,182,212,0.35)"
        animation="float-8"
      />

      {/* Ring shape */}
      <div
        className="absolute top-[30%] right-[12%] w-16 h-16 rounded-full border border-violet-500/20 animate-float-9"
      />
      <div
        className="absolute bottom-[30%] left-[12%] w-20 h-20 rounded-full border border-cyan-500/15 animate-float-10"
      />

      {/* Particle dots (CSS) */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 3 === 0
                  ? 'rgba(139,92,246,0.6)'
                  : i % 3 === 1
                    ? 'rgba(6,182,212,0.5)'
                    : 'rgba(236,72,153,0.5)',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual floating shape                                          */
/* ------------------------------------------------------------------ */
function FloatingShape({
  size,
  className,
  color,
  animation,
}: {
  size: number;
  className: string;
  color: string;
  animation: string;
}) {
  const shapes = ['circle', 'square', 'diamond'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  return (
    <div className={`absolute ${className}`} style={{ animation: `${animation} ${6 + Math.random() * 4}s ease-in-out infinite` }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: shape === 'circle' ? '50%' : shape === 'diamond' ? '2px' : '3px',
          background: color,
          filter: `blur(${shape === 'circle' ? 0 : 1}px)`,
          transform: shape === 'diamond' ? 'rotate(45deg)' : undefined,
        }}
      />
    </div>
  );
}
