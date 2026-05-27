'use client';

import PortfolioGrid from '@/components/PortfolioGrid';
import FadeIn from '@/components/FadeIn';

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-24 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3">
              Portfolio
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#f5f5f5]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              My Work
            </h1>
            <p className="text-[#888] mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              A curated collection of my finest work across multiple genres.
              Each image is a story waiting to be told.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <PortfolioGrid />
        </FadeIn>
      </div>
    </div>
  );
}
