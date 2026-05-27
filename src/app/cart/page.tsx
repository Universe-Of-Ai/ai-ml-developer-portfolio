'use client';

import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/data/mock';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, removeItem, updateQty, getSubtotal, getShipping, getGST, getTotal, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
      toast.success('Promo code applied! 10% discount');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const groupedItems = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.vendorSlug]) acc[item.vendorSlug] = [];
    acc[item.vendorSlug].push(item);
    return acc;
  }, {});

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-slate mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link href="/shop">
          <Button size="lg" className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">
            <ShoppingBag className="w-4 h-4 mr-2" /> Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(groupedItems).map(([vendorSlug, vendorItems]) => (
            <div key={vendorSlug}>
              <div className="flex items-center gap-2 mb-3">
                <Link href={`/store/${vendorSlug}`} className="text-sm font-semibold text-ocean hover:underline">
                  {vendorItems[0].vendor}
                </Link>
                <span className="text-xs text-slate">({vendorItems.length} item{vendorItems.length > 1 ? 's' : ''})</span>
              </div>
              <Card>
                <CardContent className="p-0 divide-y divide-border">
                  {vendorItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.productId}`} className="text-sm font-medium text-charcoal hover:text-ocean line-clamp-2">
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-slate mt-0.5">Variant: {item.variant}</p>
                        )}
                        <p className="text-xs text-slate mt-0.5">Sold by {item.vendor}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"><Minus className="w-3 h-3"/></button>
                            <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"><Plus className="w-3 h-3"/></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-charcoal">{formatPrice(item.price * item.qty)}</span>
                            {item.comparePrice && <span className="text-xs text-slate line-through">{formatPrice(item.comparePrice * item.qty)}</span>}
                            <button onClick={() => { removeItem(item.id); toast.success('Item removed'); }} className="text-slate hover:text-coral transition-colors"><Trash2 className="w-4 h-4"/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
          <Button variant="ghost" onClick={clearCart} className="text-coral hover:text-coral/80 text-sm">
            <Trash2 className="w-4 h-4 mr-1" /> Clear cart
          </Button>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate">Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
                <div className="flex justify-between"><span className="text-slate">Shipping</span><span className={getShipping() === 0 ? 'text-emerald-accent font-medium' : ''}>{getShipping() === 0 ? 'Free' : formatPrice(getShipping())}</span></div>
                <div className="flex justify-between"><span className="text-slate">GST (10%)</span><span>{formatPrice(getGST())}</span></div>
                {promoApplied && <div className="flex justify-between text-emerald-accent"><span>Promo (WELCOME10)</span><span>-{formatPrice(getSubtotal() * 0.1)}</span></div>}
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{promoApplied ? formatPrice(getTotal() - getSubtotal() * 0.1) : formatPrice(getTotal())}</span></div>

              {/* Promo code */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                    <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="pl-9 h-10 rounded-lg" />
                  </div>
                  <Button variant="outline" onClick={handleApplyPromo} className="h-10 rounded-lg" disabled={promoApplied}>Apply</Button>
                </div>
                {promoApplied && <p className="text-xs text-emerald-accent">✓ WELCOME10 applied — 10% off</p>}
              </div>

              {getShipping() > 0 && (
                <div className="flex items-center gap-2 bg-muted rounded-lg p-3 text-xs text-slate">
                  <Truck className="w-4 h-4 flex-shrink-0" />
                  <span>Add {formatPrice(99 - getSubtotal())} more for free shipping!</span>
                </div>
              )}

              <Link href="/checkout" className="block">
                <Button className="w-full h-12 bg-emerald-accent hover:bg-emerald-accent/90 text-white rounded-lg text-base font-semibold">
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/shop" className="block text-center text-sm text-ocean hover:underline">Continue Shopping</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
