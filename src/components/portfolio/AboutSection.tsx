'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { stats, techStack } from '@/lib/portfolio-data';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-accent-cyan/[0.02] dark:to-transparent bg-gradient-to-b from-transparent via-accent-cyan/[0.03] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block dark:text-accent-cyan text-accent-blue text-sm font-semibold uppercase tracking-widest mb-3">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            Passionate About{' '}
            <span className="gradient-text">AI Innovation</span>
          </h2>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Avatar + Tech Stack */}
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-md">
              {/* Avatar placeholder */}
              <div className="relative mb-8 flex justify-center">
                <div className="relative">
                  {/* Glow ring */}
                  <div className="absolute -inset-4 dark:bg-gradient-to-br dark:from-accent-cyan/20 dark:via-accent-violet/20 dark:to-accent-blue/20 bg-gradient-to-br from-accent-cyan/10 via-accent-violet/10 to-accent-blue/10 rounded-3xl blur-xl" />
                  {/* Avatar */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl dark:bg-gradient-to-br dark:from-accent-cyan/10 dark:to-accent-violet/10 bg-gradient-to-br from-accent-cyan/5 to-accent-violet/5 dark:border-white/10 border-gray-200 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-accent-cyan/10 dark:via-transparent dark:to-accent-violet/10 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-violet/5" />
                    <span className="relative text-6xl sm:text-7xl font-black gradient-text">
                      ZI
                    </span>
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                  </div>
                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-4 -right-4 px-3 py-1.5 dark:bg-accent-cyan/10 bg-accent-cyan/5 dark:border-accent-cyan/20 border-accent-cyan/30 rounded-full backdrop-blur-sm"
                  >
                    <span className="text-xs font-semibold dark:text-accent-cyan text-accent-blue">
                      AI Engineer
                    </span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                    className="absolute -bottom-4 -left-4 px-3 py-1.5 dark:bg-accent-violet/10 bg-accent-violet/5 dark:border-accent-violet/20 border-accent-violet/30 rounded-full backdrop-blur-sm"
                  >
                    <span className="text-xs font-semibold dark:text-accent-violet text-accent-violet">
                      ML Researcher
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="rounded-2xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-5 sm:p-6">
                <h3 className="text-sm font-semibold dark:text-white/80 text-gray-800 mb-4 uppercase tracking-wider">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="dark:border-white/10 border-gray-200 dark:bg-white/5 bg-gray-50 dark:text-white/60 text-gray-600 dark:hover:bg-white/10 hover:bg-gray-100 text-xs px-2.5 py-0.5 font-medium transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            <p className="dark:text-white/70 text-gray-600 text-base sm:text-lg leading-relaxed">
              I&apos;m{' '}
              <span className="dark:text-accent-cyan text-accent-blue font-semibold">
                Zahidul Islam
              </span>
              , an AI &amp; Machine Learning Developer with a passion for
              building intelligent systems that solve real-world problems. With
              expertise spanning deep learning, natural language processing, and
              computer vision, I transform complex data into actionable insights.
            </p>
            <p className="dark:text-white/50 text-gray-500 text-sm sm:text-base leading-relaxed">
              My journey in AI began with a fascination for neural networks and
              has evolved into a career building production-grade ML systems. I
              thrive on the intersection of research and engineering — turning
              cutting-edge algorithms into scalable, reliable solutions that drive
              business value and push the boundaries of what&apos;s possible
              with AI.
            </p>
            <p className="dark:text-white/50 text-gray-500 text-sm sm:text-base leading-relaxed">
              When I&apos;m not training models or writing papers, you&apos;ll
              find me contributing to open-source projects, participating in
              Kaggle competitions, and mentoring aspiring AI developers in the
              community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i + 2}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-4 text-center dark:hover:border-white/10 hover:border-gray-300 transition-colors"
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} mb-2 shadow-lg`}
                  >
                    <stat.icon className="size-4 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs dark:text-white/40 text-gray-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
