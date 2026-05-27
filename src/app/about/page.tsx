'use client';

import FadeIn from '@/components/FadeIn';
import { EQUIPMENT } from '@/lib/data';
import {
  Camera,
  Aperture,
  ZoomIn,
  Telescope,
  Lightbulb,
  Triangle,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Camera,
  Aperture,
  ZoomIn,
  Telescope,
  Lightbulb,
  Triangle,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-[#0a0a0a] min-h-screen">
      {/* About Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3">
              About
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#f5f5f5]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              The Photographer
            </h1>
          </div>
        </FadeIn>

        {/* Split Layout: Photo + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Portrait Photo */}
          <FadeIn>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://picsum.photos/seed/photographer-portrait/800/1100"
                  alt="Marcus — Photographer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold accent border */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#d4af37] hidden lg:block" />
            </div>
          </FadeIn>

          {/* Bio Text */}
          <FadeIn delay={200}>
            <div className="lg:pt-8">
              <div className="space-y-6">
                <div>
                  <h2
                    className="text-2xl md:text-3xl text-[#f5f5f5] mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Marcus Rivera
                  </h2>
                  <p className="text-[#d4af37] text-sm uppercase tracking-[0.15em]">
                    Fine Art & Commercial Photographer
                  </p>
                </div>

                <div className="w-12 h-[1px] bg-[#d4af37]" />

                <p className="text-[#ccc] text-sm leading-relaxed">
                  With over 15 years behind the lens, I&apos;ve dedicated my career to capturing the
                  extraordinary in the ordinary. My work spans fine art portraiture, sweeping
                  landscapes, intimate event documentation, and premium commercial campaigns.
                </p>

                <p className="text-[#ccc] text-sm leading-relaxed">
                  Based in New York City, I draw inspiration from the interplay of light and shadow
                  that defines urban life. My philosophy is simple: every photograph should evoke an
                  emotion, tell a story, and stand the test of time.
                </p>

                <p className="text-[#ccc] text-sm leading-relaxed">
                  When I&apos;m not shooting, you&apos;ll find me exploring distant landscapes, studying
                  the work of the masters, or teaching the next generation of photographers the
                  art and craft of visual storytelling.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1f1f1f]">
                  <div>
                    <p className="text-3xl text-[#d4af37] font-light" style={{ fontFamily: 'var(--font-playfair)' }}>15+</p>
                    <p className="text-[#888] text-xs uppercase tracking-[0.1em] mt-1">
                      Years Experience
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl text-[#d4af37] font-light" style={{ fontFamily: 'var(--font-playfair)' }}>500+</p>
                    <p className="text-[#888] text-xs uppercase tracking-[0.1em] mt-1">
                      Projects Completed
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl text-[#d4af37] font-light" style={{ fontFamily: 'var(--font-playfair)' }}>20+</p>
                    <p className="text-[#888] text-xs uppercase tracking-[0.1em] mt-1">
                      Awards Won
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Equipment Section */}
        <div className="mt-32">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3">
                Gear
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#f5f5f5]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                My Equipment
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {EQUIPMENT.map((item, index) => {
              const IconComponent = ICON_MAP[item.icon] || Camera;
              return (
                <FadeIn key={item.name} delay={index * 80}>
                  <div className="bg-[#1a1a1a] border border-[#1f1f1f] p-6 text-center hover:border-[#d4af37]/30 transition-colors duration-500 group">
                    <div className="w-12 h-12 mx-auto mb-4 text-[#888] group-hover:text-[#d4af37] transition-colors duration-300">
                      <IconComponent size={28} />
                    </div>
                    <h4 className="text-[#f5f5f5] text-sm font-medium mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[#888] text-xs">{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Philosophy Quote */}
        <FadeIn>
          <div className="mt-32 text-center max-w-3xl mx-auto">
            <div className="w-8 h-[1px] bg-[#d4af37] mx-auto mb-8" />
            <blockquote
              className="text-2xl md:text-3xl text-[#f5f5f5] italic leading-relaxed"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              &ldquo;The camera is an instrument that teaches people how to see
              without a camera.&rdquo;
            </blockquote>
            <p className="text-[#888] text-sm mt-4 uppercase tracking-[0.15em]">
              — Dorothea Lange
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
