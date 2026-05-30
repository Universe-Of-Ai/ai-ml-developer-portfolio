'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="text-2xl font-black bg-gradient-to-br from-cyan-400 to-violet-500 bg-clip-text text-transparent"
          >
            ZI
          </a>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/5 bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-white/30 flex items-center justify-center gap-1.5">
              © {new Date().getFullYear()} Zahidul Islam. Built with
              <Heart className="size-3 text-red-400 fill-red-400" />
              and AI.
            </p>
            <p className="text-xs text-white/15">
              Powered by Next.js, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-4" />
      </motion.button>
    </footer>
  );
}
