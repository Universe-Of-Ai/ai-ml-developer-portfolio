'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { Product } from '@/types';
import { formatPrice, getDiscountPercent } from '@/data/mock';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [wished, setWished] = useState(false);
  const discount = getDiscountPercent(product.price, product.comparePrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `cart-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      comparePrice: product.comparePrice,
      image: product.images[0] || '',
      vendor: product.vendor,
      vendorSlug: product.vendorSlug,
      qty: 1,
    });
    toast.success('Added to cart', { description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="product-card-hover rounded-xl bg-white border border-border overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0] || 'https://picsum.photos/seed/placeholder/600/600'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge className="bg-coral text-white text-xs font-semibold px-2 py-0.5">
                -{discount}%
              </Badge>
            )}
            {product.featured && (
              <Badge className="bg-ocean text-white text-xs font-semibold px-2 py-0.5">
                Featured
              </Badge>
            )}
          </div>
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
          >
            <Heart
              className={`w-4 h-4 ${wished ? 'fill-coral text-coral' : 'text-slate'}`}
            />
          </button>
          {/* Quick add - Desktop */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-ocean hover:bg-ocean-dark text-white rounded-lg shadow-md"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-slate truncate">{product.vendor}</p>
          <h3 className="text-sm font-medium text-charcoal mt-0.5 line-clamp-2 group-hover:text-ocean transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span className="text-xs font-medium text-charcoal">{product.ratingAvg}</span>
            </div>
            <span className="text-xs text-slate">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-base font-bold text-charcoal">{formatPrice(product.price)}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-slate line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
          {/* Mobile add button */}
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full mt-2 bg-ocean hover:bg-ocean-dark text-white rounded-lg md:hidden"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl bg-white border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="flex gap-2 mt-1">
          <div className="h-5 bg-muted rounded w-16" />
          <div className="h-5 bg-muted rounded w-12" />
        </div>
      </div>
    </div>
  );
}
