'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 80, suffix: '+', label: 'Happy Clients' },
  { value: 25, suffix: '+', label: 'Awards' },
  { value: 8, suffix: '+', label: 'Years Experience' },
];

const team = [
  {
    name: 'Alex Rivera',
    role: 'Creative Director',
    gradient: 'from-violet-500 to-purple-600',
    initials: 'AR',
  },
  {
    name: 'Maya Chen',
    role: 'Lead Designer',
    gradient: 'from-cyan-500 to-teal-500',
    initials: 'MC',
  },
  {
    name: 'Jordan Blake',
    role: 'Tech Lead',
    gradient: 'from-pink-500 to-rose-500',
    initials: 'JB',
  },
  {
    name: 'Sam Nakamura',
    role: 'Brand Strategist',
    gradient: 'from-amber-400 to-orange-500',
    initials: 'SN',
  },
];

function CounterStat({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative p-6 rounded-2xl
        bg-white/70 backdrop-blur-sm
        border border-white/30
        shadow-sm
        text-center
      `}
    >
      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent mb-2">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
    </motion.div>
  );
}

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-64 sm:w-auto"
    >
      <div
        className="
          group p-6 rounded-2xl
          bg-white/70 backdrop-blur-sm
          border border-white/30
          shadow-sm hover:shadow-lg
          transition-all duration-300 hover:-translate-y-1
          text-center
        "
      >
        {/* Gradient avatar placeholder */}
        <div
          className={`
            w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${member.gradient}
            flex items-center justify-center mb-4
            group-hover:scale-110 transition-transform duration-300
            shadow-lg
          `}
        >
          <span className="text-white font-bold text-xl">{member.initials}</span>
        </div>

        <h4 className="text-base font-semibold text-slate-800">
          {member.name}
        </h4>
        <p className="text-sm text-slate-500 mt-1">{member.role}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#F1F5F9] py-24 lg:py-32 overflow-hidden"
    >
      {/* Background subtle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-widest uppercase text-violet-600 mb-4"
          >
            About Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            Who We{' '}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
              Are
            </span>
          </motion.h2>
        </div>

        {/* Split layout: Text left, Stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 lg:mb-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-6">
              Crafting digital excellence since {new Date().getFullYear() - 8}
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              We&apos;re a passionate team of designers, developers, and
              strategists who believe in the power of exceptional digital
              experiences. Our approach combines creative thinking with technical
              expertise to deliver solutions that not only look stunning but also
              drive real business results.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              From startups to enterprises, we partner with ambitious brands to
              build digital products that people love. Every project we take on is
              an opportunity to push boundaries and set new standards.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 lg:gap-5"
          >
            {stats.map((stat, index) => (
              <CounterStat key={stat.label} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Team section */}
        <div className="mb-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl lg:text-3xl font-bold text-slate-800 text-center mb-12"
          >
            Meet the Team
          </motion.h3>
        </div>

        {/* Team cards - horizontal scroll on mobile */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin sm:overflow-x-visible sm:justify-center sm:flex-wrap">
          {team.map((member, index) => (
            <div key={member.name} className="snap-center">
              <TeamCard member={member} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
