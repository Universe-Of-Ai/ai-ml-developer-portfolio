'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { GALLERY_DATA, CATEGORIES } from '@/lib/data';
import LightboxGallery, { useLightbox } from '@/components/LightboxGallery';
import FadeIn from '@/components/FadeIn';
import { ArrowLeft } from 'lucide-react';

export default function GalleryDetailPage() {
  const params = useParams();
  const category = params.category as string;
  const gallery = GALLERY_DATA[category];
  const { open, currentIndex, images, openLightbox, closeLightbox } = useLightbox();

  if (!gallery) {
    return (
      <div className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen text-center">
        <h1 className="text-2xl text-[#f5f5f5]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Category Not Found
        </h1>
        <Link href="/portfolio" className="text-[#d4af37] mt-4 inline-block">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const lightboxImages = gallery.images.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    title: img.title,
  }));

  return (
    <>
      <div className="pt-28 pb-24 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[#888] text-xs uppercase tracking-[0.15em] hover:text-[#d4af37] transition-colors duration-300 mb-8"
            >
              <ArrowLeft size={14} />
              Back to Portfolio
            </Link>
          </FadeIn>

          {/* Category header */}
          <FadeIn>
            <div className="mb-14">
              <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3">
                Collection
              </p>
              <h1
                className="text-4xl md:text-5xl text-[#f5f5f5] mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {category}
              </h1>
              <p className="text-[#888] max-w-xl text-sm leading-relaxed">
                {gallery.description}
              </p>
            </div>
          </FadeIn>

          {/* Waterfall layout */}
          <div className="space-y-6">
            {gallery.images.map((img, index) => (
              <FadeIn key={img.id} delay={index * 80}>
                <div
                  className={`cursor-pointer group ${
                    index % 3 === 0
                      ? 'max-w-full'
                      : index % 3 === 1
                      ? 'max-w-4xl mx-auto'
                      : 'max-w-3xl mx-auto'
                  }`}
                  onClick={() => openLightbox(index, lightboxImages)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <span
                        className="text-white text-lg font-medium"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {img.title}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Category navigation */}
          <FadeIn>
            <div className="mt-20 pt-12 border-t border-[#1f1f1f]">
              <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-6 text-center">
                Explore More
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <Link
                    key={cat}
                    href={`/portfolio/${cat}`}
                    className={`px-5 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 rounded-none ${
                      cat === category
                        ? 'bg-[#d4af37] text-[#0a0a0a] border-[#d4af37] font-medium'
                        : 'bg-transparent text-[#888] border-[#333] hover:border-[#d4af37] hover:text-[#d4af37]'
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
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
