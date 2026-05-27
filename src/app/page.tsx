'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, ShieldCheck, RotateCcw, Clock, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product/product-card';
import { products, categories, vendors, formatPrice } from '@/data/mock';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 5, minutes: 23, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {[
        { val: time.hours, label: 'hrs' },
        { val: time.minutes, label: 'min' },
        { val: time.seconds, label: 'sec' },
      ].map((t) => (
        <div key={t.label} className="flex items-center gap-1">
          <span className="bg-ocean text-white font-bold text-lg px-2.5 py-1 rounded-lg min-w-[40px] text-center">
            {String(t.val).padStart(2, '0')}
          </span>
          <span className="text-xs text-slate">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const trendingProducts = products.slice(0, 12);
  const topVendors = vendors.slice(0, 5);
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Subscribed!', { description: 'You\'ll receive our latest deals.' });
    setEmail('');
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-ocean min-h-[500px] md:min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/auhero/1920/800"
            alt="Australian lifestyle"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-sm text-white/90 font-medium">New arrivals every day</span>
            </div>
            <h1 className="hero-text text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Shop Australia&apos;s<br />
              <span className="text-gold">Best Marketplace</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
              Discover thousands of unique products from trusted local vendors. Free shipping on orders over $99.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop">
                <Button size="lg" className="bg-emerald-accent hover:bg-emerald-accent/90 text-white rounded-lg h-12 px-8 text-base font-semibold">
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-lg h-12 px-8 text-base">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-charcoal">Shop by Category</h2>
            <p className="text-slate text-sm mt-1">Browse our most popular categories</p>
          </div>
          <Link href="/shop" className="text-ocean text-sm font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin -mx-4 px-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="flex-shrink-0 group"
            >
              <Card className="w-32 md:w-40 border-border hover:border-ocean/30 transition-all hover:shadow-lift overflow-hidden">
                <CardContent className="p-4 text-center">
                  <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-sm font-medium text-charcoal group-hover:text-ocean transition-colors">
                    {cat.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="bg-gradient-to-r from-ocean/5 to-gold/5 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-charcoal flex items-center gap-2">
                  <Zap className="w-6 h-6 text-coral" /> Flash Deals
                </h2>
                <p className="text-slate text-sm mt-1">Limited time offers — hurry!</p>
              </div>
              <CountdownTimer />
            </div>
            <Link href="/shop?sort=price_asc" className="text-ocean text-sm font-medium hover:underline flex items-center gap-1 hidden md:flex">
              See all deals <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.filter((p) => p.comparePrice).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-charcoal">Trending Now</h2>
            <p className="text-slate text-sm mt-1">Most popular products this week</p>
          </div>
          <Link href="/shop" className="text-ocean text-sm font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Vendors */}
      <section className="bg-white py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal">Top Vendors</h2>
              <p className="text-slate text-sm mt-1">Trusted sellers with top ratings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topVendors.map((vendor) => (
              <Link key={vendor.id} href={`/store/${vendor.slug}`}>
                <Card className="hover:shadow-lift transition-all border-border hover:border-ocean/30 group">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-muted mb-3">
                      <Image
                        src={vendor.logoUrl}
                        alt={vendor.businessName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-charcoal group-hover:text-ocean transition-colors">
                      {vendor.businessName}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span className="text-xs font-medium">{vendor.ratingAvg}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate">
                      <span>{vendor.productCount} products</span>
                      <span>{vendor.state}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold to-gold-light p-8 md:p-12">
          <div className="relative z-10 max-w-lg">
            <h2 className="hero-text text-3xl md:text-4xl font-bold text-ocean-dark mb-3">
              New here? Get 10% off
            </h2>
            <p className="text-ocean-dark/80 mb-6">
              Use code <span className="font-bold">WELCOME10</span> on your first order. T&Cs apply.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
          <Image
            src="https://picsum.photos/seed/promo/600/300"
            alt="Promo"
            width={400}
            height={250}
            className="absolute right-0 bottom-0 hidden md:block opacity-30 rounded-xl"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-ocean py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay in the Loop</h2>
          <p className="text-white/70 mb-6">Get the latest deals and new arrivals delivered to your inbox.</p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-lg bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button type="submit" className="h-11 bg-emerald-accent hover:bg-emerald-accent/90 text-white rounded-lg px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
