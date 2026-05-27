import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  about: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  customer: [
    { label: 'Help Centre', href: '#' },
    { label: 'Returns & Refunds', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  sellers: [
    { label: 'Start Selling', href: '/vendor/register' },
    { label: 'Seller Centre', href: '/vendor/dashboard' },
    { label: 'Seller Policies', href: '#' },
    { label: 'Seller Success', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
};

const paymentIcons = ['Visa', 'Mastercard', 'Amex', 'Afterpay', 'PayPal'];

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      {/* Trust bar */}
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $99' },
              { icon: '↩️', title: '30-Day Returns', desc: 'Hassle-free returns' },
              { icon: '🛡️', title: 'Buyer Protection', desc: '100% purchase protection' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-semibold text-charcoal">{item.title}</span>
                <span className="text-xs text-slate">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-extrabold text-ocean">
                MarketPlace<span className="text-gold">AU</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate leading-relaxed">
              Australia&apos;s premier multivendor marketplace. Discover unique products from local sellers across the country.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Link href="#" className="text-slate hover:text-ocean transition-colors">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-slate hover:text-ocean transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-slate hover:text-ocean transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-slate hover:text-ocean transition-colors">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate hover:text-ocean transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3">Customer Service</h4>
            <ul className="space-y-2">
              {footerLinks.customer.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate hover:text-ocean transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sellers */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3">Sellers</h4>
            <ul className="space-y-2">
              {footerLinks.sellers.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate hover:text-ocean transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate hover:text-ocean transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate">
            © 2025 MarketPlaceAU. All rights reserved. ABN 12 345 678 901
          </p>
          <div className="flex items-center gap-2">
            {paymentIcons.map((name) => (
              <div
                key={name}
                className="px-2 py-1 bg-muted rounded text-xs font-medium text-slate"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
