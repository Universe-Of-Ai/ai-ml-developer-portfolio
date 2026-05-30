'use client';

import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroTextOverlay from './HeroTextOverlay';
import HeroMobileFallback from './HeroMobileFallback';

const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]">
      <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0a0a0f]">
      {/* Background gradient mesh (always visible) */}
      <div className="absolute inset-0 animate-gradient-mesh opacity-40 pointer-events-none" />

      {/* 3D scene or mobile fallback */}
      {isMobile ? <HeroMobileFallback /> : <Hero3DScene />}

      {/* Text overlay on top */}
      <HeroTextOverlay />

      {/* Bottom gradient fade (always) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-20" />
    </section>
  );
}
