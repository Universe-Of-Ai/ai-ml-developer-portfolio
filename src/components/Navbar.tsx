'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  if (pathname !== prevPathname && mobileOpen) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  } else if (pathname !== prevPathname) {
    setPrevPathname(pathname);
  }

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1f1f1f]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span
                className={`font-serif text-2xl tracking-tight transition-colors duration-300 ${
                  scrolled || mobileOpen ? 'text-[#f5f5f5]' : 'text-white'
                }`}
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Marcus
                <span className="text-[#d4af37]">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                    pathname === link.href || pathname?.startsWith(link.href + '/')
                      ? 'text-[#d4af37]'
                      : scrolled
                      ? 'text-[#888] hover:text-[#f5f5f5]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {(pathname === link.href || pathname?.startsWith(link.href + '/')) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#d4af37]" />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center px-6 py-2.5 text-sm uppercase tracking-[0.12em] bg-[#d4af37] text-[#0a0a0a] font-medium rounded-none hover:bg-[#e8c94a] transition-colors duration-300"
              >
                Book a Session
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-white"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl uppercase tracking-[0.2em] text-[#888] hover:text-[#d4af37] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 px-8 py-3 text-sm uppercase tracking-[0.12em] bg-[#d4af37] text-[#0a0a0a] font-medium hover:bg-[#e8c94a] transition-colors duration-300"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </>
  );
}
