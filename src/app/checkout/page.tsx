'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Check, CreditCard, Truck, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/store/cart';
import { formatPrice, AU_STATES, sampleAddresses } from '@/data/mock';
import { toast } from 'sonner';
import Image from 'next/image';

const steps = [
  { id: 1, label: 'Shipping', icon: Truck },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Review', icon: ClipboardCheck },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShipping, getGST, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [shipping, setShipping] = useState({
    name: 'Jessie Ablene',
    email: 'jessie@example.com',
    phone: '0412 345 678',
    line1: '42 Harbour View Drive',
    suburb: 'Darling Point',
    state: 'NSW',
    postcode: '2027',
  });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <Button onClick={() => router.push('/shop')}>Go Shopping</Button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    toast.success('Order placed successfully!', { description: 'Order #ORD-20250125-001' });
    clearCart();
    router.push('/account');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, idx) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${step >= s.id ? 'bg-ocean text-white' : 'bg-muted text-slate'}`}>
              {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
            </div>
            {idx < steps.length - 1 && <ChevronRight className="w-4 h-4 text-slate mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Truck className="w-5 h-5" /> Shipping Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2"><Label>Full Name</Label><Input value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} className="h-11 rounded-lg" /></div>
                  <div className="space-y-2"><Label>Email</Label><Input type="email" value={shipping.email} onChange={(e) => setShipping({...shipping, email: e.target.value})} className="h-11 rounded-lg" /></div>
                  <div className="space-y-2"><Label>Phone</Label><Input value={shipping.phone} onChange={(e) => setShipping({...shipping, phone: e.target.value})} className="h-11 rounded-lg" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label>Address</Label><Input value={shipping.line1} onChange={(e) => setShipping({...shipping, line1: e.target.value})} className="h-11 rounded-lg" /></div>
                  <div className="space-y-2"><Label>Suburb</Label><Input value={shipping.suburb} onChange={(e) => setShipping({...shipping, suburb: e.target.value})} className="h-11 rounded-lg" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select value={shipping.state} onValueChange={(v) => setShipping({...shipping, state: v})}>
                        <SelectTrigger className="h-11 rounded-lg"><SelectValue /></SelectTrigger>
                        <SelectContent>{AU_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Postcode</Label><Input value={shipping.postcode} onChange={(e) => setShipping({...shipping, postcode: e.target.value})} className="h-11 rounded-lg" /></div>
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">Continue to Payment</Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment Method</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {[
                    { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex', icons: '💳' },
                    { value: 'afterpay', label: 'Afterpay', desc: '4 interest-free payments', icons: '_afterpay' },
                    { value: 'paypal', label: 'PayPal', desc: 'Pay with your PayPal account', icons: '🅿️' },
                  ].map((m) => (
                    <label key={m.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod===m.value?'border-ocean bg-ocean/5':'border-border hover:border-ocean/30'}`}>
                      <RadioGroupItem value={m.value} />
                      <span className="text-2xl">{m.icons}</span>
                      <div><p className="font-medium text-sm">{m.label}</p><p className="text-xs text-slate">{m.desc}</p></div>
                    </label>
                  ))}
                </RadioGroup>
                {paymentMethod === 'card' && (
                  <div className="space-y-3 mt-4 p-4 bg-muted/50 rounded-xl">
                    <div className="space-y-2"><Label>Card Number</Label><Input placeholder="1234 5678 9012 3456" className="h-11 rounded-lg" /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Expiry</Label><Input placeholder="MM/YY" className="h-11 rounded-lg" /></div>
                      <div className="space-y-2"><Label>CVV</Label><Input placeholder="123" className="h-11 rounded-lg" /></div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="rounded-lg">Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 bg-ocean hover:bg-ocean-dark text-white rounded-lg">Review Order</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Truck className="w-5 h-5" /> Shipping Address</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm">{shipping.name}</p>
                  <p className="text-sm text-slate">{shipping.line1}</p>
                  <p className="text-sm text-slate">{shipping.suburb} {shipping.state} {shipping.postcode}</p>
                  <p className="text-sm text-slate">{shipping.phone}</p>
                  <Button variant="link" className="text-ocean p-0 h-auto text-sm mt-2" onClick={() => setStep(1)}>Edit</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">{paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'afterpay' ? 'Afterpay' : 'PayPal'}</p>
                  {paymentMethod === 'card' && <p className="text-sm text-slate">•••• •••• •••• 3456</p>}
                  <Button variant="link" className="text-ocean p-0 h-auto text-sm mt-2" onClick={() => setStep(2)}>Edit</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Order Items</CardTitle></CardHeader>
                <CardContent>
                  <div className="divide-y divide-border">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 py-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted relative flex-shrink-0"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" /></div>
                        <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{item.name}</p><p className="text-xs text-slate">Qty: {item.qty}{item.variant && ` • ${item.variant}`}</p></div>
                        <span className="text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-lg">Back</Button>
                <Button onClick={handlePlaceOrder} className="flex-1 h-12 bg-emerald-accent hover:bg-emerald-accent/90 text-white rounded-lg text-base font-semibold">Place Order — {formatPrice(getTotal())}</Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28">
            <CardHeader><CardTitle className="text-lg">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate">Subtotal ({items.length} items)</span><span>{formatPrice(getSubtotal())}</span></div>
                <div className="flex justify-between"><span className="text-slate">Shipping</span><span className={getShipping()===0?'text-emerald-accent font-medium':''}>{getShipping()===0?'Free':formatPrice(getShipping())}</span></div>
                <div className="flex justify-between"><span className="text-slate">GST (10%)</span><span>{formatPrice(getGST())}</span></div>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{formatPrice(getTotal())}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
