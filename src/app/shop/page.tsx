'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard, ProductCardSkeleton } from '@/components/product/product-card';
import { products, categories, formatPrice } from '@/data/mock';
import { Product } from '@/types';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Best Selling' },
];

const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 – $50', min: 25, max: 50 },
  { label: '$50 – $100', min: 50, max: 100 },
  { label: '$100 – $250', min: 100, max: 250 },
  { label: 'Over $250', min: 250, max: 10000 },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : []);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 10000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState(sortParam || 'relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange([0, 10000]);
    setSelectedRating(0);
  };

  const activeFilterCount = selectedCategories.length + (selectedRating > 0 ? 1 : 0) + (selectedPriceRange[0] > 0 || selectedPriceRange[1] < 10000 ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category?.toLowerCase() || ''));
    }

    // Price filter
    result = result.filter((p) => p.price >= selectedPriceRange[0] && p.price <= selectedPriceRange[1]);

    // Rating filter
    if (selectedRating > 0) {
      result = result.filter((p) => p.ratingAvg >= selectedRating);
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [selectedCategories, selectedPriceRange, selectedRating, sortBy]);

  const renderFiltersPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.slice(0, 8).map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={selectedCategories.includes(cat.slug)}
                onCheckedChange={() => toggleCategory(cat.slug)}
                className="rounded"
              />
              <span className="text-sm text-slate group-hover:text-charcoal transition-colors">
                {cat.icon} {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal mb-3">Price Range (AUD)</h3>
        <div className="space-y-3">
          <Slider
            value={selectedPriceRange}
            onValueChange={setSelectedPriceRange}
            min={0}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center gap-2 text-sm text-slate">
            <span>{formatPrice(selectedPriceRange[0])}</span>
            <span>—</span>
            <span>{formatPrice(selectedPriceRange[1])}</span>
          </div>
        </div>
        <div className="space-y-1.5 mt-3">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedPriceRange([range.min, range.max])}
              className="block text-sm text-slate hover:text-ocean transition-colors"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
              className={`flex items-center gap-1.5 w-full text-sm px-2 py-1 rounded-lg transition-colors ${
                selectedRating === rating ? 'bg-ocean/10 text-ocean' : 'text-slate hover:text-charcoal'
              }`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= rating ? 'text-gold' : 'text-gray-300'}>★</span>
              ))}
              <span className="ml-1">& up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" onClick={clearFilters} className="w-full text-sm text-coral hover:text-coral/80">
          <X className="w-4 h-4 mr-1" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          {categoryParam && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-charcoal font-medium capitalize">{categoryParam.replace('-', ' ')}</span>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-charcoal">
            {categoryParam ? categories.find((c) => c.slug === categoryParam)?.name || 'Shop' : 'All Products'}
          </h1>
          <p className="text-sm text-slate mt-1">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile filter trigger */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2 bg-ocean text-white text-xs">{activeFilterCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto max-h-[50vh]">
                <renderFiltersPanel />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="hidden md:flex items-center border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-none h-9 w-9"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-none h-9 w-9"
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-28 bg-white rounded-xl border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-charcoal flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h2>
              {activeFilterCount > 0 && (
                <Badge className="bg-ocean text-white text-xs">{activeFilterCount}</Badge>
              )}
            </div>
            <renderFiltersPanel />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-slate">Active filters:</span>
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="outline" className="cursor-pointer" onClick={() => toggleCategory(cat)}>
                  {categories.find((c) => c.slug === cat)?.name || cat}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {selectedRating > 0 && (
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedRating(0)}>
                  {selectedRating}+ stars
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ListProductItem key={product.id} product={product} />
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">No products found</h3>
              <p className="text-slate mb-4">Try adjusting your filters or search criteria.</p>
              <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListProductItem({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="flex gap-4 bg-white rounded-xl border border-border p-4 hover:shadow-lift transition-all">
        <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted relative">
          <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate">{product.vendor}</p>
          <h3 className="text-sm font-semibold text-charcoal mt-0.5 group-hover:text-ocean transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-slate mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-base font-bold text-charcoal">{formatPrice(product.price)}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-slate line-through">{formatPrice(product.comparePrice)}</span>
            )}
            <span className="text-xs text-slate">⭐ {product.ratingAvg} ({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
