'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0F172A] pt-16 pb-8 overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12"
        >
          {/* Logo */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              NEXUS
            </span>
            <p className="text-slate-500 text-sm max-w-xs text-center lg:text-left">
              Crafting digital experiences that elevate brands and drive results.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      text-sm text-slate-400 hover:text-white
                      transition-colors duration-300
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="
                    w-10 h-10 rounded-xl flex items-center justify-center
                    bg-white/5 border border-white/10
                    text-slate-400 hover:text-white
                    hover:bg-violet-600/20 hover:border-violet-500/30
                    transition-all duration-300
                  "
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} NEXUS. All rights reserved. Built with passion
            and precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
