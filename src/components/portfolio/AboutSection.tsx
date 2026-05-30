'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, FileText, Layers, Award } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: '3+', label: 'Years Experience', color: 'from-cyan-500 to-cyan-600' },
  { icon: Layers, value: '15+', label: 'Projects Completed', color: 'from-violet-500 to-violet-600' },
  { icon: FileText, value: '5+', label: 'Research Papers', color: 'from-emerald-500 to-emerald-600' },
  { icon: Award, value: '10+', label: 'ML Models Deployed', color: 'from-pink-500 to-pink-600' },
];

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
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Passionate About{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              AI Innovation
            </span>
          </h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Avatar */}
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-emerald-500/20 rounded-3xl blur-xl" />
              {/* Avatar placeholder */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-transparent to-violet-600/20" />
                <span className="relative text-7xl font-black bg-gradient-to-br from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  ZI
                </span>
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm"
              >
                <span className="text-xs font-semibold text-cyan-400">AI Engineer</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full backdrop-blur-sm"
              >
                <span className="text-xs font-semibold text-violet-400">ML Researcher</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="space-y-5">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                I&apos;m <span className="text-cyan-400 font-semibold">Zahidul Islam</span>, an AI &amp; Machine
                Learning Developer with a passion for building intelligent systems that solve real-world
                problems. With expertise spanning deep learning, natural language processing, and computer
                vision, I transform complex data into actionable insights.
              </p>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                My journey in AI began with a fascination for neural networks and has evolved into a
                career building production-grade ML systems. I thrive on the intersection of research
                and engineering — turning cutting-edge algorithms into scalable, reliable solutions
                that drive business value and push the boundaries of what&apos;s possible with AI.
              </p>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                When I&apos;m not training models or writing papers, you&apos;ll find me contributing to
                open-source projects, participating in Kaggle competitions, and mentoring aspiring
                AI developers in the community.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i + 2}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 text-center hover:border-white/10 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}>
                  <stat.icon className="size-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
