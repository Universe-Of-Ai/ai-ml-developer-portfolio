'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    date: '2023 — Present',
    role: 'ML Engineer',
    company: 'TechAI Solutions',
    description: [
      'Architected and deployed production ML pipelines serving 100K+ daily predictions',
      'Fine-tuned transformer models for domain-specific NLP tasks, improving accuracy by 23%',
      'Led a team of 4 ML engineers in building a real-time recommendation engine',
      'Implemented MLOps practices with CI/CD pipelines, model versioning, and monitoring',
    ],
    color: 'cyan',
  },
  {
    date: '2022 — 2023',
    role: 'AI Research Intern',
    company: 'DeepMind Research Lab',
    description: [
      'Conducted research on novel attention mechanisms for document understanding',
      'Published 2 papers on efficient transformer architectures in top-tier conferences',
      'Developed benchmarking frameworks for evaluating large language models',
      'Collaborated with cross-functional teams to integrate research into products',
    ],
    color: 'violet',
  },
  {
    date: '2021 — 2022',
    role: 'Freelance AI Developer',
    company: 'Self-Employed',
    description: [
      'Delivered 10+ client projects spanning NLP, computer vision, and recommendation systems',
      'Built custom ML solutions for startups in healthcare, fintech, and e-commerce domains',
      'Developed automated data annotation tools reducing labeling time by 60%',
      'Maintained a 100% client satisfaction rate with consistent on-time delivery',
    ],
    color: 'emerald',
  },
  {
    date: '2020 — 2021',
    role: 'Data Science Intern',
    company: 'DataVista Analytics',
    description: [
      'Analyzed large-scale datasets using Python, Pandas, and SQL to drive business insights',
      'Built predictive models for customer churn with 89% recall using ensemble methods',
      'Created interactive dashboards and data visualizations for stakeholder reporting',
      'Automated ETL workflows processing 500K+ records daily',
    ],
    color: 'pink',
  },
];

const colorMap: Record<string, { dot: string; glow: string; line: string }> = {
  cyan: {
    dot: 'bg-cyan-500',
    glow: 'shadow-cyan-500/40',
    line: 'bg-gradient-to-b from-cyan-500/50 to-violet-500/50',
  },
  violet: {
    dot: 'bg-violet-500',
    glow: 'shadow-violet-500/40',
    line: 'bg-gradient-to-b from-violet-500/50 to-emerald-500/50',
  },
  emerald: {
    dot: 'bg-emerald-500',
    glow: 'shadow-emerald-500/40',
    line: 'bg-gradient-to-b from-emerald-500/50 to-pink-500/50',
  },
  pink: {
    dot: 'bg-pink-500',
    glow: 'shadow-pink-500/40',
    line: 'bg-gradient-to-b from-pink-500/50 to-transparent',
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-pink-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Career Path
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Work{' '}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-violet-500/30 to-emerald-500/30" />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, i) => {
              const colors = colorMap[exp.color];
              return (
                <motion.div
                  key={exp.role + exp.company}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="relative pl-12 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 sm:left-6 top-1.5">
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${colors.dot} shadow-lg ${colors.glow} ring-4 ring-[#0a0a0f]`}
                    />
                  </div>

                  {/* Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:border-white/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-white/50 flex items-center gap-1.5">
                          <Briefcase className="size-3.5" />
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-white/30 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap self-start">
                        {exp.date}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/40">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
