'use client';

import { useState, useMemo } from 'react';
import { PORTFOLIO_IMAGES, CATEGORIES } from '@/lib/data';
import LightboxGallery, { useLightbox } from './LightboxGallery';

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { open, currentIndex, images, openLightbox, closeLightbox } = useLightbox();

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_IMAGES;
    return PORTFOLIO_IMAGES.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const lightboxImages = filteredImages.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    title: img.title,
  }));

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 rounded-none ${
              activeCategory === cat
                ? 'bg-[#d4af37] text-[#0a0a0a] border-[#d4af37] font-medium'
                : 'bg-transparent text-[#888] border-[#333] hover:border-[#d4af37] hover:text-[#d4af37]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {filteredImages.map((img, index) => (
          <div key={img.id} className="masonry-grid-item group">
            <div
              className="img-overlay relative cursor-pointer overflow-hidden"
              onClick={() => openLightbox(index, lightboxImages)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Hover overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em] mb-1 block">
                  {img.category}
                </span>
                <span className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {img.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <LightboxGallery
          images={images}
          open={open}
          currentIndex={currentIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
