'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Palette, Paintbrush, Star } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'High-performance websites and web applications built with cutting-edge technologies. From responsive frontends to robust backends.',
    gradient: 'from-violet-600/20 to-cyan-500/20',
    borderColor: 'hover:border-violet-500/50',
    iconColor: 'text-violet-400',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Intuitive, user-centered design that transforms complex problems into seamless digital experiences people love to use.',
    gradient: 'from-cyan-500/20 to-violet-600/20',
    borderColor: 'hover:border-cyan-500/50',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Paintbrush,
    title: 'Graphic Design',
    description:
      'Stunning visual assets that capture attention and communicate your brand story. From print to digital, every pixel counts.',
    gradient: 'from-pink-500/20 to-violet-600/20',
    borderColor: 'hover:border-pink-500/50',
    iconColor: 'text-pink-400',
  },
  {
    icon: Star,
    title: 'Branding',
    description:
      'Comprehensive brand identity systems that resonate with your audience. Logo design, brand guides, and visual strategy.',
    gradient: 'from-violet-600/20 to-pink-500/20',
    borderColor: 'hover:border-violet-500/50',
    iconColor: 'text-violet-400',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className={`
          relative group rounded-2xl p-6
          bg-gradient-to-br ${service.gradient}
          bg-white/5 backdrop-blur-xl
          border border-white/10 ${service.borderColor}
          transition-all duration-300
          cursor-pointer h-full
        `}
      >
        {/* Subtle glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at 50% 50%, rgba(124, 58, 237, 0.08), transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center mb-4
              bg-white/5 border border-white/10
              group-hover:scale-110 transition-transform duration-300
            `}
          >
            <Icon className={`w-6 h-6 ${service.iconColor}`} />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#0F172A] py-24 lg:py-32 overflow-hidden"
    >
      {/* Background subtle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-widest uppercase text-cyan-400 mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Services That{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Deliver Results
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            We craft digital experiences that elevate brands, engage audiences,
            and drive measurable business outcomes.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
