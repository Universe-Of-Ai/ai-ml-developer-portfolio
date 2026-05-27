'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ProductCard } from '@/components/product/product-card';
import { products, categories, formatPrice } from '@/data/mock';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
          }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
          <Input
            type="text"
            placeholder="Search products, brands, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 text-lg rounded-2xl border-ocean/20 focus:border-ocean shadow-soft"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-5 h-5 text-slate hover:text-charcoal" />
            </button>
          )}
        </form>
      </div>

      {/* Results */}
      {query.trim() ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;<strong className="text-charcoal">{query}</strong>&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm"><SlidersHorizontal className="w-4 h-4 mr-1" /> Filters</Button>
                </SheetTrigger>
                <SheetContent side="right"><SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader></SheetContent>
              </Sheet>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-slate mb-4">Try searching with different keywords or browse our categories.</p>
              <Link href="/shop"><Button className="bg-ocean text-white rounded-lg">Browse All Products</Button></Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛍️</div>
          <h3 className="text-lg font-semibold mb-2">Start searching</h3>
          <p className="text-slate">Type to search across all products, vendors, and categories.</p>
          <div className="flex flex-wrap gap-2 justify-center mt-6 max-w-lg mx-auto">
            {['Headphones', 'Fashion', 'Organic', 'Speakers', 'Skincare'].map((suggestion) => (
              <button key={suggestion} onClick={() => setQuery(suggestion)} className="px-3 py-1.5 bg-muted rounded-full text-sm text-slate hover:text-ocean hover:bg-ocean/10 transition-colors">
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center"><p className="text-slate">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
