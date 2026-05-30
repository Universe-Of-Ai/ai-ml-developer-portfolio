'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Web', 'UI/UX', 'Branding'] as const;

type Category = (typeof categories)[number];

interface PortfolioItem {
  title: string;
  category: Category;
  gradient: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Lumina Dashboard',
    category: 'Web',
    gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    description: 'Analytics platform redesign with real-time data visualization',
  },
  {
    title: 'Horizon Brand Identity',
    category: 'Branding',
    gradient: 'from-cyan-500 via-teal-400 to-emerald-500',
    description: 'Complete brand system for a fintech startup',
  },
  {
    title: 'Pulse Mobile App',
    category: 'UI/UX',
    gradient: 'from-pink-500 via-rose-400 to-orange-400',
    description: 'Health & wellness app with gamified tracking',
  },
  {
    title: 'Vertex E-Commerce',
    category: 'Web',
    gradient: 'from-violet-500 via-indigo-400 to-blue-500',
    description: 'High-performance storefront with 3D product previews',
  },
  {
    title: 'Nova Design System',
    category: 'UI/UX',
    gradient: 'from-cyan-400 via-sky-500 to-violet-500',
    description: 'Scalable design system for enterprise applications',
  },
  {
    title: 'Aether Brand Launch',
    category: 'Branding',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    description: 'Luxury brand launch with immersive web experience',
  },
];

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group cursor-pointer break-inside-avoid mb-6"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-white/70 backdrop-blur-sm
          border border-white/30
          shadow-sm hover:shadow-xl
          transition-all duration-300 hover:-translate-y-1
        `}
      >
        {/* Gradient placeholder image */}
        <div
          className={`
            w-full aspect-[4/3] bg-gradient-to-br ${item.gradient}
            group-hover:scale-105 transition-transform duration-500
          `}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              View Project
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {item.category}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-violet-100 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-base font-semibold text-slate-800 group-hover:text-violet-700 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<Category>('All');

  const filteredItems =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-[#F1F5F9] py-24 lg:py-32 overflow-hidden"
    >
      {/* Background subtle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0F172A] to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-widest uppercase text-violet-600 mb-4"
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg"
          >
            A curated selection of our latest work across web, design, and
            branding.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white text-slate-600 hover:text-violet-600 hover:bg-violet-50 border border-slate-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio grid - masonry style */}
        <AnimatePresence mode="popLayout">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-0">
            {filteredItems.map((item, index) => (
              <PortfolioCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
