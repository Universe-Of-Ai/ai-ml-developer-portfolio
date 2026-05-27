'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, ShieldCheck, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product/product-card';
import { products, vendors, sampleReviews, formatPrice, getDiscountPercent } from '@/data/mock';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-semibold mb-2">Product not found</h2>
        <p className="text-slate mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop"><Button>Back to Shop</Button></Link>
      </div>
    );
  }

  const discount = getDiscountPercent(product.price, product.comparePrice);
  const vendor = vendors.find((v) => v.slug === product.vendorSlug);
  const relatedProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const reviews = sampleReviews.filter((r) => r.productId === product.id);

  const handleAddToCart = () => {
    addItem({
      id: `cart-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      comparePrice: product.comparePrice,
      image: product.images[0] || '',
      vendor: product.vendor,
      vendorSlug: product.vendorSlug,
      qty,
      variant: selectedColor || selectedSize || undefined,
    });
    toast.success('Added to cart', { description: `${product.name} × ${qty}` });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-1 text-sm text-slate mb-6 flex-wrap">
        <Link href="/" className="hover:text-ocean">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-ocean">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category?.toLowerCase()}`} className="hover:text-ocean">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <Image src={product.images[selectedImage] || product.images[0]} alt={product.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
            {discount > 0 && <Badge className="absolute top-4 left-4 bg-coral text-white text-sm font-bold px-3 py-1">-{discount}%</Badge>}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button key={idx} onClick={() => setSelectedImage(idx)} className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${selectedImage === idx ? 'border-ocean' : 'border-border hover:border-ocean/30'}`}>
                <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate">{product.vendor}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-charcoal mt-1">{product.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.ratingAvg) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.ratingAvg}</span>
            <span className="text-sm text-slate">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <>
                <span className="text-xl text-slate line-through">{formatPrice(product.comparePrice)}</span>
                <Badge className="bg-emerald-accent/10 text-emerald-accent font-semibold">Save {formatPrice(product.comparePrice - product.price)}</Badge>
              </>
            )}
          </div>
          <p className="text-sm text-slate">GST included. Free shipping over $99.</p>
          <Separator />

          <div>
            <span className="text-sm font-medium">Colour</span>
            <div className="flex gap-2 mt-2">
              {['Black','White','Navy','Green'].map((c) => (
                <button key={c} onClick={() => setSelectedColor(selectedColor===c?null:c)} className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${selectedColor===c?'border-ocean bg-ocean/10 text-ocean font-medium':'border-border text-slate hover:border-ocean/30'}`}>{c}</button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium">Size</span>
            <div className="flex gap-2 mt-2">
              {['S','M','L','XL'].map((s) => (
                <button key={s} onClick={() => setSelectedSize(selectedSize===s?null:s)} className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${selectedSize===s?'border-ocean bg-ocean text-white':'border-border text-slate hover:border-ocean/30'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={() => setQty(Math.max(1,qty-1))}><Minus className="w-4 h-4"/></Button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={() => setQty(qty+1)}><Plus className="w-4 h-4"/></Button>
              </div>
              <span className="text-sm text-slate">{product.stockQty} in stock</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleAddToCart} className="flex-1 h-12 bg-ocean hover:bg-ocean-dark text-white rounded-lg text-base font-semibold"><ShoppingCart className="w-5 h-5 mr-2"/>Add to Cart</Button>
            <Button onClick={handleBuyNow} variant="outline" className="flex-1 h-12 rounded-lg text-base font-semibold border-ocean text-ocean hover:bg-ocean/5">Buy Now</Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg" onClick={() => {setWished(!wished);toast.success(wished?'Removed from wishlist':'Added to wishlist');}}><Heart className={`w-5 h-5 ${wished?'fill-coral text-coral':''}`}/></Button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4">
            {[{icon:Truck,title:'Free Shipping',sub:'Over $99'},{icon:RotateCcw,title:'30-Day Returns',sub:'Easy returns'},{icon:ShieldCheck,title:'Buyer Protect',sub:'Guaranteed'}].map((i)=>(
              <div key={i.title} className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
                <i.icon className="w-5 h-5 text-ocean mb-1"/>
                <span className="text-xs font-medium">{i.title}</span>
                <span className="text-xs text-slate">{i.sub}</span>
              </div>
            ))}
          </div>

          {vendor && (
            <Link href={`/store/${vendor.slug}`} className="block mt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border hover:shadow-lift transition-all">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0"><Image src={vendor.logoUrl} alt={vendor.businessName} width={48} height={48} className="object-cover w-full h-full"/></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold">{vendor.businessName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate"><span>⭐ {vendor.ratingAvg}</span><span>•</span><span>{vendor.productCount} products</span><span>•</span><span>{vendor.state}</span></div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate"/>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            {['description','reviews','specs'].map((tab)=>(
              <TabsTrigger key={tab} value={tab} className="rounded-none border-b-2 border-transparent data-[state=active]:border-ocean data-[state=active]:bg-transparent data-[state=active]:text-ocean data-[state=active]:shadow-none px-4 py-3 text-slate capitalize">{tab}{tab==='reviews'&&` (${product.reviewCount})`}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="description" className="pt-6"><div className="prose prose-sm max-w-none text-slate leading-relaxed whitespace-pre-line">{product.description}</div></TabsContent>
          <TabsContent value="reviews" className="pt-6">
            {reviews.length>0?(
              <div className="space-y-4">{reviews.map((r)=>(
                <div key={r.id} className="bg-white rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-ocean/10 flex items-center justify-center text-ocean font-semibold text-sm">{r.buyerName.charAt(0)}</div><span className="text-sm font-medium">{r.buyerName}</span></div><span className="text-xs text-slate">{r.createdAt}</span></div>
                  <div className="flex items-center gap-0.5 mt-2">{[1,2,3,4,5].map((s)=>(<Star key={s} className={`w-3.5 h-3.5 ${s<=r.rating?'fill-gold text-gold':'text-gray-300'}`}/>))}</div>
                  <h4 className="text-sm font-semibold mt-2">{r.title}</h4>
                  <p className="text-sm text-slate mt-1">{r.comment}</p>
                </div>
              ))}</div>
            ):(<p className="text-slate text-center py-8">No reviews yet. Be the first to review this product!</p>)}
          </TabsContent>
          <TabsContent value="specs" className="pt-6">
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border"><td className="px-4 py-3 text-slate bg-muted/50 w-40">Category</td><td className="px-4 py-3">{product.category}</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 text-slate bg-muted/50">Availability</td><td className="px-4 py-3">{product.stockQty>0?`In Stock (${product.stockQty})`:'Out of Stock'}</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 text-slate bg-muted/50">Seller</td><td className="px-4 py-3">{product.vendor}</td></tr>
                  <tr><td className="px-4 py-3 text-slate bg-muted/50">Shipping</td><td className="px-4 py-3">Free shipping on orders over $99</td></tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length>0 && (
        <section className="mt-12 mb-8">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">{relatedProducts.map((p)=>(<ProductCard key={p.id} product={p}/>))}</div>
        </section>
      )}
    </div>
  );
}
