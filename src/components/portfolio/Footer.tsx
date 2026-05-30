'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, ArrowUp, GraduationCap } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/zahidul-islam', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/zahidul-islam', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/zahidul_ai', label: 'Twitter' },
  { icon: GraduationCap, href: 'https://scholar.google.com/citations?user=zahidul', label: 'Google Scholar' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative dark:border-t dark:border-white/5 border-t border-gray-200 dark:bg-[#0A0A0F] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="text-2xl font-black gradient-text"
          >
            ZI
          </a>

          {/* Nav links */}
          <div className="flex items-center gap-6 text-sm">
            {['About', 'Projects', 'Skills', 'Experience', 'Publications', 'Contact'].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(link.toLowerCase())
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="dark:text-white/40 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-gray-50 dark:text-white/40 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/5 hover:bg-gray-100 dark:hover:border-white/10 hover:border-gray-300 transition-all"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm dark:text-white/30 text-gray-400 flex items-center justify-center gap-1.5">
              © 2025 Zahidul Islam. Built with
              <Heart className="size-3 text-red-400 fill-red-400" />
              and AI.
            </p>
            <p className="text-xs dark:text-white/15 text-gray-300">
              Powered by Next.js, Tailwind CSS &amp; Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-xl dark:bg-white/5 bg-gray-100 dark:border-white/10 border-gray-200 dark:text-white/40 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/10 hover:bg-gray-200 backdrop-blur-sm transition-all shadow-lg safe-bottom"
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-4" />
      </motion.button>
    </footer>
  );
}
