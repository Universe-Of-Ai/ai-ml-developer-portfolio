'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Smart Chat Assistant',
    description: 'GPT-based conversational AI with RAG pipeline for context-aware responses, multi-turn dialogue management, and seamless API integration.',
    tags: ['GPT-4', 'LangChain', 'RAG', 'FastAPI', 'Redis'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderHover: 'hover:border-cyan-500/30',
    iconGradient: 'from-cyan-500 to-blue-500',
    emoji: '💬',
  },
  {
    title: 'Image Classification System',
    description: 'CNN model for medical image analysis achieving 98.5% accuracy. Designed for early disease detection with real-time inference capabilities.',
    tags: ['PyTorch', 'CNN', 'OpenCV', 'Docker', 'Gradio'],
    gradient: 'from-violet-500/20 to-purple-500/20',
    borderHover: 'hover:border-violet-500/30',
    iconGradient: 'from-violet-500 to-purple-500',
    emoji: '🔬',
  },
  {
    title: 'Sentiment Analyzer',
    description: 'NLP model for real-time social media sentiment detection with multi-language support and emotion classification.',
    tags: ['BERT', 'Transformers', 'spaCy', 'Streamlit', 'HuggingFace'],
    gradient: 'from-emerald-500/20 to-green-500/20',
    borderHover: 'hover:border-emerald-500/30',
    iconGradient: 'from-emerald-500 to-green-500',
    emoji: '📊',
  },
  {
    title: 'Autonomous Navigation',
    description: 'Computer vision system for drone navigation using YOLO object detection, depth estimation, and real-time path planning.',
    tags: ['YOLO', 'OpenCV', 'ROS', 'TensorRT', 'CUDA'],
    gradient: 'from-pink-500/20 to-rose-500/20',
    borderHover: 'hover:border-pink-500/30',
    iconGradient: 'from-pink-500 to-rose-500',
    emoji: '🚁',
  },
  {
    title: 'Recommendation Engine',
    description: 'Collaborative filtering ML system with hybrid approach combining content-based and user-behavior for personalized recommendations.',
    tags: ['Scikit-learn', 'Pandas', 'FastAPI', 'PostgreSQL', 'Redis'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderHover: 'hover:border-amber-500/30',
    iconGradient: 'from-amber-500 to-orange-500',
    emoji: '🎯',
  },
  {
    title: 'AI Voice Synthesizer',
    description: 'Text-to-speech system with emotion detection, voice cloning, and natural prosody generation using diffusion models.',
    tags: ['PyTorch', 'Diffusion', 'Librosa', 'FastAPI', 'WebRTC'],
    gradient: 'from-red-500/20 to-orange-500/20',
    borderHover: 'hover:border-red-500/30',
    iconGradient: 'from-red-500 to-orange-500',
    emoji: '🎙️',
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

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
           {' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>{' '}
            I&apos;ve Built
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-sm sm:text-base">
            A selection of AI/ML projects showcasing end-to-end development
            from research and prototyping to production deployment.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all duration-300 ${project.borderHover}`}
            >
              {/* Project image placeholder */}
              <div className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }} />
                <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {project.emoji}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="border-white/5 bg-white/5 text-white/50 text-[10px] px-2 py-0.5 font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="size-3.5" />
                    <span>Code</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-cyan-400 transition-colors"
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
