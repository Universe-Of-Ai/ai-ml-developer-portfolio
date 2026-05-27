'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Package, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product/product-card';
import { vendors, products, categories, formatPrice } from '@/data/mock';
import { toast } from 'sonner';

export default function VendorStorePage() {
  const params = useParams();
  const slug = params.slug as string;
  const vendor = vendors.find((v) => v.slug === slug);
  const vendorProducts = products.filter((p) => p.vendorSlug === slug);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const vendorCategories = [...new Set(vendorProducts.map((p) => p.category).filter(Boolean))];

  if (!vendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🏪</div>
        <h2 className="text-xl font-semibold mb-2">Store not found</h2>
        <p className="text-slate mb-4">The vendor store you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop"><Button>Back to Shop</Button></Link>
      </div>
    );
  }
  const filteredProducts = selectedCategory
    ? vendorProducts.filter((p) => p.category === selectedCategory)
    : vendorProducts;

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image src={vendor.bannerUrl} alt={vendor.businessName} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Store Info */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-white border-4 border-white shadow-lift">
            <Image src={vendor.logoUrl} alt={vendor.businessName} width={128} height={128} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-charcoal">{vendor.businessName}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="font-medium text-charcoal">{vendor.ratingAvg}</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {vendor.productCount} products</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {vendor.state}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined 2024</span>
            </div>
            <p className="text-sm text-slate mt-2 max-w-2xl">{vendor.description}</p>
          </div>
          <Button variant="outline" className="rounded-lg" onClick={() => toast.info('Contact feature coming soon')}>
            <MessageCircle className="w-4 h-4 mr-2" /> Contact
          </Button>
        </div>

        {/* Category filters */}
        {vendorCategories.length > 1 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${!selectedCategory ? 'bg-ocean text-white' : 'bg-muted text-slate hover:bg-muted/80'}`}
            >
              All Products
            </button>
            {vendorCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat!)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all ${selectedCategory === cat ? 'bg-ocean text-white' : 'bg-muted text-slate hover:bg-muted/80'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products */}
        <div className="pb-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
