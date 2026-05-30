'use client';

import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Mobile-only CSS Hero (clean, minimal)                              */
/* ------------------------------------------------------------------ */
export default function HeroMobileFallback() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Solid dark background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 animate-gradient-mesh opacity-40" />

      {/* Central gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%]">
        <div className="relative w-40 h-40 sm:w-52 sm:h-52">
          {/* Outer glow */}
          <div
            className="absolute inset-[-30%] rounded-full animate-orb-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)',
            }}
          />
          {/* Main orb */}
          <div
            className="absolute inset-0 rounded-full animate-orb-rotate"
            style={{
              background:
                'conic-gradient(from 0deg, #8b5cf6, #06b6d4, #ec4899, #c084fc, #8b5cf6)',
              filter: 'blur(24px)',
              opacity: 0.5,
            }}
          />
          {/* Inner core */}
          <div
            className="absolute inset-[30%] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(192,132,252,0.1) 60%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* Just 4 subtle floating shapes */}
      <FloatingShape
        size={8}
        className="top-[18%] left-[12%]"
        color="rgba(139,92,246,0.25)"
        animation="float-1"
      />
      <FloatingShape
        size={6}
        className="top-[22%] right-[18%]"
        color="rgba(6,182,212,0.2)"
        animation="float-2"
      />
      <FloatingShape
        size={10}
        className="bottom-[28%] left-[22%]"
        color="rgba(236,72,153,0.18)"
        animation="float-3"
      />
      <FloatingShape
        size={5}
        className="top-[55%] right-[10%]"
        color="rgba(192,132,252,0.3)"
        animation="float-4"
      />

      {/* Minimal particle dots */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2,
              height: 2,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              background:
                i % 3 === 0
                  ? 'rgba(139,92,246,0.4)'
                  : i % 3 === 1
                    ? 'rgba(6,182,212,0.35)'
                    : 'rgba(236,72,153,0.3)',
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
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
  return (
    <div
      className={`absolute ${className}`}
      style={{ animation: `${animation} ${8 + size}s ease-in-out infinite` }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
}
