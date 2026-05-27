'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, MapPin, Menu, X, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/shop?sort=price_asc' },
  { label: 'Vendors', href: '/vendor/dashboard' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-border'
            : 'bg-white border-b border-border'
        }`}
      >
        {/* Top bar */}
        <div className="bg-ocean text-white text-sm py-1.5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>Free shipping on orders over $99 AUD</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/vendor/register" className="hover:text-gold-light transition-colors flex items-center gap-1">
                <Store className="w-3 h-3" />
                Become a Seller
              </Link>
              <Link href="/login" className="hover:text-gold-light transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="hover:text-gold-light transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-4 border-b">
                  <Link href="/" className="text-xl font-extrabold text-ocean" onClick={() => setMobileOpen(false)}>
                    MarketPlace<span className="text-gold">AU</span>
                  </Link>
                </div>
                <nav className="p-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t pt-3 mt-3 space-y-1">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      Register
                    </Link>
                    <Link
                      href="/vendor/register"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium rounded-lg text-emerald-accent hover:bg-muted transition-colors"
                    >
                      Become a Seller
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl md:text-2xl font-extrabold text-ocean">
                MarketPlace<span className="text-gold">AU</span>
              </span>
            </Link>

            {/* Search bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                <Input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-10 rounded-lg bg-muted border-transparent focus:border-ocean focus:bg-white transition-all"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Mobile search toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </Button>

              <Link href="/account">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-emerald-accent text-white text-xs rounded-full">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="pl-10 h-10 rounded-lg"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block border-t border-border">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block px-4 py-2.5 text-sm font-medium text-slate hover:text-ocean transition-colors rounded-md hover:bg-muted/50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
