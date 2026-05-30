'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const socials = [
  { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
  { icon: Twitter, label: 'Twitter / X', href: '#', color: 'hover:text-white' },
  { icon: Mail, label: 'Email', href: 'mailto:zahidul@example.com', color: 'hover:text-cyan-400' },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to discuss AI/ML opportunities? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Email */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/20">
                  <Mail className="size-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/30">Email me at</p>
                  <a href="mailto:zahidul@example.com" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                    zahidul@example.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Find me on</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 transition-all text-white/50 text-sm group"
                  >
                    <social.icon className={`size-4 ${social.color} transition-colors`} />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick note */}
            <div className="rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] p-6">
              <p className="text-sm text-white/40 leading-relaxed">
                💡 I&apos;m currently open to <span className="text-violet-400 font-medium">AI/ML engineering roles</span>, 
                <span className="text-violet-400 font-medium"> research collaborations</span>, and 
                <span className="text-violet-400 font-medium"> freelance AI projects</span>.
                Let&apos;s build something amazing together.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/60 text-sm">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/60 text-sm">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/60 text-sm">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white border-0 shadow-lg shadow-cyan-500/25 h-12 text-base font-semibold rounded-xl"
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
