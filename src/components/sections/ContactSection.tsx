'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0F172A] py-24 lg:py-32 overflow-hidden"
    >
      {/* Transition gradient from light to dark */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F1F5F9] to-[#0F172A] pointer-events-none" />

      {/* Background subtle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
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
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Let&apos;s Work{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Together
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Have a project in mind? We&apos;d love to hear about it. Send us a
            message and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="
              relative p-8 lg:p-10 rounded-2xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-2xl
            "
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-500/5 rounded-2xl" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="
                      w-full pl-11 pr-4 py-3.5 rounded-xl
                      bg-white/5 border border-white/10
                      text-white placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                      transition-all duration-300
                    "
                  />
                </div>
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="
                      w-full pl-11 pr-4 py-3.5 rounded-xl
                      bg-white/5 border border-white/10
                      text-white placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                      transition-all duration-300
                    "
                  />
                </div>
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Tell us about your project..."
                    className="
                      w-full pl-11 pr-4 py-3.5 rounded-xl resize-none
                      bg-white/5 border border-white/10
                      text-white placeholder-slate-500
                      focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                      transition-all duration-300
                    "
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full py-3.5 rounded-xl
                  bg-gradient-to-r from-violet-600 to-cyan-500
                  text-white font-semibold text-base
                  hover:shadow-lg hover:shadow-violet-500/25
                  active:scale-[0.98]
                  transition-all duration-300
                  disabled:opacity-70 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
