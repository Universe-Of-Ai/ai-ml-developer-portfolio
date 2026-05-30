'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { experiences } from '@/lib/portfolio-data';

const colorMap: Record<string, { dot: string; glow: string }> = {
  'accent-cyan': {
    dot: 'bg-accent-cyan',
    glow: 'shadow-accent-cyan/40',
  },
  'accent-blue': {
    dot: 'bg-accent-blue',
    glow: 'shadow-accent-blue/40',
  },
  'accent-violet': {
    dot: 'bg-accent-violet',
    glow: 'shadow-accent-violet/40',
  },
  'emerald-500': {
    dot: 'bg-emerald-500',
    glow: 'shadow-emerald-500/40',
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-accent-violet/[0.02] dark:to-transparent bg-gradient-to-b from-transparent via-accent-violet/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block dark:text-accent-violet text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Career Path
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Center Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Gradient timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div className="w-full h-full bg-gradient-to-b from-accent-cyan via-accent-blue via-accent-violet to-emerald-500 opacity-30" />
          </div>
          {/* Mobile timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px md:hidden">
            <div className="w-full h-full bg-gradient-to-b from-accent-cyan via-accent-blue via-accent-violet to-emerald-500 opacity-30" />
          </div>

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, i) => {
              const colors = colorMap[exp.color] || colorMap['accent-cyan'];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={exp.role + exp.company}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className={`relative md:flex md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot - Desktop center */}
                  <div className="absolute left-1/2 top-6 -translate-x-1/2 hidden md:block z-10">
                    <div
                      className={`w-4 h-4 rounded-full ${colors.dot} shadow-lg ${colors.glow} ring-4 ring-background`}
                    />
                  </div>

                  {/* Timeline dot - Mobile left */}
                  <div className="absolute left-2.5 top-6 md:hidden z-10">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${colors.dot} shadow-lg ${colors.glow} ring-4 ring-background`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div className="group relative overflow-hidden rounded-2xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-5 sm:p-6 dark:hover:border-white/10 hover:border-gray-300 transition-all duration-300 while-hover:shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold dark:text-white text-gray-900 dark:group-hover:text-accent-cyan group-hover:text-accent-blue transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-sm dark:text-white/50 text-gray-500 flex items-center gap-1.5">
                            <Briefcase className="size-3.5" />
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs font-medium dark:text-white/30 text-gray-400 dark:bg-white/5 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap self-start">
                          {exp.date}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {exp.description.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm dark:text-white/40 text-gray-500"
                          >
                            <span
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
