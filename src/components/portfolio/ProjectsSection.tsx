'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  projects,
  projectCategories,
  type ProjectCategory,
} from '@/lib/portfolio-data';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-emerald-500/[0.02] dark:to-transparent bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block dark:text-emerald-400 text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            <span className="gradient-text">Projects</span> I&apos;ve Built
          </h2>
          <p className="mt-4 dark:text-white/40 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            A selection of AI/ML projects showcasing end-to-end development from
            research and prototyping to production deployment.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'dark:bg-accent-cyan/15 dark:text-accent-cyan bg-accent-cyan/10 text-accent-blue dark:border-accent-cyan/30 border-accent-blue/30 border shadow-sm'
                  : 'dark:text-white/40 text-gray-500 dark:hover:text-white/70 hover:text-gray-700 dark:border-white/5 border-gray-200 dark:hover:border-white/10 hover:border-gray-300 border'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
              className="group relative overflow-hidden rounded-2xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white backdrop-blur-sm dark:hover:border-white/10 hover:border-gray-300 transition-all duration-300"
            >
              {/* Project image placeholder */}
              <div
                className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                <project.icon
                  className={`relative z-10 size-12 ${project.iconColor} opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300`}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2 dark:group-hover:text-accent-cyan group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm dark:text-white/40 text-gray-500 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Category badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.category.map((cat) => (
                    <Badge
                      key={cat}
                      className="dark:bg-accent-cyan/10 bg-accent-blue/10 dark:text-accent-cyan text-accent-blue text-[10px] px-2 py-0 font-medium border-0"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="dark:border-white/5 border-gray-200 dark:bg-white/5 bg-gray-50 dark:text-white/50 text-gray-500 text-[10px] px-2 py-0 font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 dark:border-t border-t dark:border-white/5 border-gray-200">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs dark:text-white/40 text-gray-500 dark:hover:text-accent-cyan hover:text-accent-blue transition-colors"
                  >
                    <Github className="size-3.5" />
                    <span>Code</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs dark:text-white/40 text-gray-500 dark:hover:text-accent-cyan hover:text-accent-blue transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
