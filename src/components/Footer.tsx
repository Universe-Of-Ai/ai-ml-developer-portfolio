import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f]">
      {/* Gold accent line */}
      <div className="gold-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Name + Tagline */}
          <div>
            <h3
              className="text-2xl text-[#f5f5f5] mb-3"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Marcus<span className="text-[#d4af37]">.</span>
            </h3>
            <p className="text-[#888] text-sm leading-relaxed max-w-xs">
              Fine art & commercial photography based in New York. Capturing
              authentic moments with an editorial eye.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#888] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666] hover:text-[#d4af37] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#888] mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#888] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1a] text-center">
          <p className="text-xs text-[#555] tracking-wide">
            &copy; {new Date().getFullYear()} Marcus Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
