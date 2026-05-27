'use client';

import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3">
              Contact
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#f5f5f5]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Get in Touch
            </h1>
            <p className="text-[#888] mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Drop me a message
              and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <FadeIn>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors duration-300 rounded-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors duration-300 rounded-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors duration-300 rounded-none appearance-none"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="commercial">Commercial Project</option>
                  <option value="event">Event Coverage</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#888] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5f5f5] px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors duration-300 rounded-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.12em] bg-[#d4af37] text-[#0a0a0a] font-medium hover:bg-[#e8c94a] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-none"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-sm text-center">
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={200}>
            <div className="lg:pt-4">
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.15em] text-[#888] mb-1">
                      Email
                    </h4>
                    <p className="text-[#f5f5f5] text-sm">hello@marcusphoto.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.15em] text-[#888] mb-1">
                      Phone
                    </h4>
                    <p className="text-[#f5f5f5] text-sm">+1 (212) 555-0147</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.15em] text-[#888] mb-1">
                      Studio
                    </h4>
                    <p className="text-[#f5f5f5] text-sm leading-relaxed">
                      245 West 29th Street, 3rd Floor
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-[#1f1f1f]">
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#888] mb-6">
                  Follow Along
                </h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#888] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#888] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#888] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300"
                    aria-label="YouTube"
                  >
                    <Youtube size={18} />
                  </a>
                </div>
              </div>

              {/* Availability note */}
              <div className="mt-12 bg-[#1a1a1a] border-l-2 border-[#d4af37] p-6">
                <h4 className="text-[#f5f5f5] text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Current Availability
                </h4>
                <p className="text-[#888] text-sm leading-relaxed">
                  Currently booking for 2025. For weddings and large events, please inquire
                  at least 3 months in advance. Portrait sessions can typically be scheduled
                  within 2-3 weeks.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
