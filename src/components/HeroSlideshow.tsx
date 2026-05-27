'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { HERO_IMAGES } from '@/lib/data';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSlideshow() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          horizontal: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {HERO_IMAGES.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover ken-burns`}
                style={{ animationDelay: `${index * 0}s` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
              {/* Text content */}
              <div className="absolute inset-0 flex items-center justify-center text-center z-10">
                <div className="px-6">
                  <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-4 font-medium">
                    Marcus Photography
                  </p>
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-medium leading-tight mb-4"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {image.title}
                  </h1>
                  <p className="text-white/70 text-lg md:text-xl font-light max-w-md mx-auto">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
