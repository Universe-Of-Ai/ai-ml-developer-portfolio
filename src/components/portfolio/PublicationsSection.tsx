'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { publications } from '@/lib/portfolio-data';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const venueColorMap: Record<string, string> = {
  NeurIPS: 'dark:bg-accent-cyan/10 bg-accent-cyan/10 dark:text-accent-cyan text-accent-blue border-0',
  ACL: 'dark:bg-accent-blue/10 bg-accent-blue/10 dark:text-accent-blue text-accent-blue border-0',
  'IEEE TMI': 'dark:bg-accent-violet/10 bg-accent-violet/10 dark:text-accent-violet text-accent-violet border-0',
  CVPR: 'dark:bg-pink-500/10 bg-pink-500/10 dark:text-pink-400 text-pink-600 border-0',
  EMNLP: 'dark:bg-emerald-500/10 bg-emerald-500/10 dark:text-emerald-400 text-emerald-600 border-0',
};

export default function PublicationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="publications" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-accent-blue/[0.02] dark:to-transparent bg-gradient-to-b from-transparent via-accent-blue/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block dark:text-accent-blue text-accent-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Research
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            <span className="gradient-text">Publications</span>
          </h2>
          <p className="mt-4 dark:text-white/40 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Selected research contributions at top-tier AI/ML conferences and journals.
          </p>
        </motion.div>

        {/* Publications list */}
        <div className="max-w-3xl mx-auto space-y-4">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -2 }}
              className="group relative overflow-hidden rounded-xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-5 sm:p-6 dark:hover:border-white/10 hover:border-gray-300 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="size-4 dark:text-white/30 text-gray-400 shrink-0" />
                    <h3 className="text-sm sm:text-base font-semibold dark:text-white text-gray-900 dark:group-hover:text-accent-cyan group-hover:text-accent-blue transition-colors line-clamp-2">
                      {pub.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm dark:text-white/40 text-gray-500 mb-3">
                    {pub.authors}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={
                        venueColorMap[pub.venue] ||
                        'dark:bg-white/5 bg-gray-100 dark:text-white/50 text-gray-500 border-0'
                      }
                    >
                      {pub.venue}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="dark:border-white/5 border-gray-200 dark:text-white/40 text-gray-400 text-[10px]"
                    >
                      {pub.year}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="dark:border-white/5 border-gray-200 dark:text-white/40 text-gray-400 text-[10px]"
                    >
                      {pub.type}
                    </Badge>
                  </div>
                </div>
                {pub.link && (
                  <a
                    href={pub.link}
                    className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg dark:bg-white/5 bg-gray-100 dark:text-white/40 text-gray-500 dark:hover:text-accent-cyan hover:text-accent-blue dark:hover:bg-white/10 hover:bg-gray-200 transition-all"
                    aria-label={`Read ${pub.title}`}
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
