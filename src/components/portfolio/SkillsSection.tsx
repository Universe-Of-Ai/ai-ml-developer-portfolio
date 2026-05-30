'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillGroups } from '@/lib/portfolio-data';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const gradientMap: Record<number, string> = {
  0: 'linear-gradient(90deg, #00D4FF, #4F7FFF)',
  1: 'linear-gradient(90deg, #8B5CF6, #A855F7)',
  2: 'linear-gradient(90deg, #34D399, #22C55E)',
  3: 'linear-gradient(90deg, #F472B6, #F43F5E)',
  4: 'linear-gradient(90deg, #FBBF24, #F97316)',
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-24 sm:py-32">
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
            Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            My <span className="gradient-text">Skill Set</span>
          </h2>
          <p className="mt-4 dark:text-white/40 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            A comprehensive toolkit spanning the full AI/ML development lifecycle
            — from research and prototyping to production deployment.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <div className="space-y-8 sm:space-y-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              custom={gi}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="rounded-2xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-5 sm:p-6"
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br shadow-lg"
                  style={{ backgroundImage: gradientMap[gi] || gradientMap[0] }}
                >
                  <group.icon className="size-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                  {group.title}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium dark:text-white/70 text-gray-600">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono dark:text-white/40 text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full dark:bg-white/5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          delay: 0.3 + gi * 0.15 + si * 0.08,
                          ease: 'easeOut',
                        }}
                        className="h-full rounded-full"
                        style={{
                          backgroundImage: gradientMap[gi] || gradientMap[0],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
