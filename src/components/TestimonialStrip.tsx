'use client';

import { useRef } from 'react';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-[#0a0a0a] overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3 text-center">
          Testimonials
        </p>
        <h2
          className="text-3xl md:text-4xl text-[#f5f5f5] text-center"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          What Clients Say
        </h2>
      </div>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 lg:px-8 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex-shrink-0 w-[350px] md:w-[420px] bg-[#1a1a1a] border border-[#1f1f1f] p-8 snap-start group hover:border-[#d4af37]/30 transition-colors duration-500"
          >
            {/* Gold top accent */}
            <div className="w-8 h-[1px] bg-[#d4af37] mb-6" />
            <p className="text-[#ccc] text-sm leading-relaxed mb-8 italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-[#f5f5f5] text-sm font-medium">
                  {testimonial.name}
                </p>
                <p className="text-[#888] text-xs">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
