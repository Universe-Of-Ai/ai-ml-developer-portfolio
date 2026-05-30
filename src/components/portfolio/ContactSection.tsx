'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    href: '#',
    color: 'dark:hover:text-white hover:text-gray-900',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: '#',
    color: 'dark:hover:text-accent-blue hover:text-accent-blue',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    href: '#',
    color: 'dark:hover:text-white hover:text-gray-900',
  },
  {
    icon: GraduationCap,
    label: 'Google Scholar',
    href: '#',
    color: 'dark:hover:text-accent-violet hover:text-accent-violet',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:zahidul@example.com',
    color: 'dark:hover:text-accent-cyan hover:text-accent-blue',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-accent-cyan/[0.02] dark:to-transparent bg-gradient-to-b from-transparent via-accent-cyan/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block dark:text-accent-cyan text-accent-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 dark:text-white/40 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to discuss AI/ML opportunities?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* 2-col layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Social links panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Email card */}
            <div className="rounded-2xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue shadow-lg shadow-accent-cyan/20">
                  <Mail className="size-4 text-white" />
                </div>
                <div>
                  <p className="text-sm dark:text-white/30 text-gray-400">
                    Email me at
                  </p>
                  <a
                    href="mailto:zahidul@example.com"
                    className="text-sm dark:text-accent-cyan text-accent-blue dark:hover:text-accent-cyan/80 hover:text-accent-blue/80 transition-colors"
                  >
                    zahidul@example.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-6">
              <h3 className="text-sm font-semibold dark:text-white/80 text-gray-800 mb-4">
                Find me on
              </h3>
              <div className="space-y-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-gray-50 dark:hover:bg-white/5 hover:bg-gray-100 dark:hover:border-white/10 hover:border-gray-300 transition-all dark:text-white/50 text-gray-600 text-sm group ${social.color}`}
                  >
                    <social.icon className="size-4 shrink-0" />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick note */}
            <div className="rounded-2xl dark:border-accent-violet/10 border-accent-violet/20 dark:bg-accent-violet/[0.03] bg-accent-violet/[0.05] p-6">
              <p className="text-sm dark:text-white/40 text-gray-600 leading-relaxed">
                I&apos;m currently open to{' '}
                <span className="dark:text-accent-violet text-accent-violet font-medium">
                  AI/ML engineering roles
                </span>
                ,{' '}
                <span className="dark:text-accent-violet text-accent-violet font-medium">
                  research collaborations
                </span>
                , and{' '}
                <span className="dark:text-accent-violet text-accent-violet font-medium">
                  freelance AI projects
                </span>
                . Let&apos;s build something amazing together.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl dark:border-white/5 border-gray-200 dark:bg-white/[0.02] bg-white p-6 sm:p-8 space-y-5"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="dark:text-white/60 text-gray-600 text-sm"
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="dark:bg-white/5 bg-gray-50 dark:border-white/10 border-gray-200 dark:text-white text-gray-900 dark:placeholder:text-white/20 placeholder:text-gray-400 dark:focus:border-accent-cyan/50 focus:border-accent-blue dark:focus:ring-accent-cyan/20 focus:ring-accent-blue/20"
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="dark:text-white/60 text-gray-600 text-sm"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="dark:bg-white/5 bg-gray-50 dark:border-white/10 border-gray-200 dark:text-white text-gray-900 dark:placeholder:text-white/20 placeholder:text-gray-400 dark:focus:border-accent-cyan/50 focus:border-accent-blue dark:focus:ring-accent-cyan/20 focus:ring-accent-blue/20"
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="dark:text-white/60 text-gray-600 text-sm"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="dark:bg-white/5 bg-gray-50 dark:border-white/10 border-gray-200 dark:text-white text-gray-900 dark:placeholder:text-white/20 placeholder:text-gray-400 dark:focus:border-accent-cyan/50 focus:border-accent-blue dark:focus:ring-accent-cyan/20 focus:ring-accent-blue/20 resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-accent-cyan to-accent-blue hover:from-accent-cyan/90 hover:to-accent-blue/90 text-white border-0 shadow-lg shadow-accent-cyan/25 h-12 text-base font-semibold rounded-xl"
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      ✓
                    </motion.span>
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="size-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
