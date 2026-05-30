'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Brain,
  Cpu,
  MessageSquare,
  Eye,
  Database,
  Cloud,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    icon: Brain,
    title: 'Machine Learning',
    color: 'from-cyan-500 to-cyan-600',
    shadowColor: 'shadow-cyan-500/20',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'],
  },
  {
    icon: Cpu,
    title: 'Deep Learning',
    color: 'from-violet-500 to-violet-600',
    shadowColor: 'shadow-violet-500/20',
    skills: ['CNN', 'RNN', 'Transformers', 'GANs'],
  },
  {
    icon: MessageSquare,
    title: 'NLP',
    color: 'from-emerald-500 to-emerald-600',
    shadowColor: 'shadow-emerald-500/20',
    skills: ['BERT', 'GPT', 'spaCy', 'NLTK'],
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    color: 'from-pink-500 to-pink-600',
    shadowColor: 'shadow-pink-500/20',
    skills: ['OpenCV', 'YOLO', 'ResNet', 'GANs'],
  },
  {
    icon: Database,
    title: 'Data & Tools',
    color: 'from-amber-500 to-amber-600',
    shadowColor: 'shadow-amber-500/20',
    skills: ['Python', 'Pandas', 'NumPy', 'SQL'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Deploy',
    color: 'from-red-500 to-red-600',
    shadowColor: 'shadow-red-500/20',
    skills: ['AWS', 'Docker', 'FastAPI', 'Streamlit'],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            My{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Skill Set
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-sm sm:text-base">
            A comprehensive toolkit spanning the full AI/ML development lifecycle
            — from research and prototyping to production deployment.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 hover:border-white/10 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

              <div className="relative">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} shadow-lg ${category.shadowColor}`}>
                    <category.icon className="size-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 text-xs px-2.5 py-0.5 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Animated progress bar */}
                <div className="mt-5">
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${75 + Math.random() * 25}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
