'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Star, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sampleOrders, sampleAddresses, formatPrice, AU_STATES, products } from '@/data/mock';
import { toast } from 'sonner';
import Image from 'next/image';

const orderStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const wishlist = products.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl font-bold text-ocean">JA</span>
              </div>
              <h3 className="font-semibold text-charcoal">Jessie Ablene</h3>
              <p className="text-sm text-slate">jessie@example.com</p>
              <Badge className="mt-2 bg-ocean/10 text-ocean">Buyer</Badge>
            </CardContent>
            <Separator />
            <nav className="p-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'addresses', label: 'Addresses', icon: MapPin },
                { id: 'wishlist', label: 'Wishlist', icon: Heart },
                { id: 'reviews', label: 'Reviews', icon: Star },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all ${
                    activeTab === item.id ? 'bg-ocean/10 text-ocean font-medium' : 'text-slate hover:bg-muted'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="Jessie Ablene" className="h-11 rounded-lg" /></div>
                  <div className="space-y-2"><Label>Email</Label><Input defaultValue="jessie@example.com" type="email" className="h-11 rounded-lg" /></div>
                  <div className="space-y-2"><Label>Phone</Label><Input defaultValue="0412 345 678" className="h-11 rounded-lg" /></div>
                </div>
                <Button onClick={() => toast.success('Profile updated!')} className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Order History</h2>
              {sampleOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">#{order.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderStatusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate">
                        <span>{new Date(order.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="font-semibold text-charcoal">{formatPrice(order.totalAud)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="w-14 h-14 rounded-lg overflow-hidden bg-muted relative flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-slate">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                      {order.trackingNumber && (
                        <Button variant="outline" size="sm" className="text-xs h-8 rounded-lg">Track: {order.trackingNumber}</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Addresses</h2>
                <Button size="sm" onClick={() => toast.info('Add address form coming soon')} className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">Add Address</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleAddresses.map((addr) => (
                  <Card key={addr.id} className={addr.isDefault ? 'border-ocean/50' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{addr.label}</span>
                          {addr.isDefault && <Badge className="bg-ocean/10 text-ocean text-xs">Default</Badge>}
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                      </div>
                      <p className="text-sm text-charcoal">{addr.name}</p>
                      <p className="text-sm text-slate">{addr.line1}</p>
                      <p className="text-sm text-slate">{addr.suburb} {addr.state} {addr.postcode}</p>
                      <p className="text-sm text-slate">{addr.phone}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">My Wishlist ({wishlist.length})</h2>
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlist.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl border border-border overflow-hidden group">
                      <div className="relative aspect-square bg-muted">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="200px" />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
                        <p className="text-sm font-bold mt-1">{formatPrice(product.price)}</p>
                        <div className="flex gap-2 mt-2">
                          <Link href={`/product/${product.slug}`} className="flex-1"><Button size="sm" className="w-full bg-ocean text-white text-xs h-8 rounded-lg">View</Button></Link>
                          <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg" onClick={() => toast.success('Added to cart')}>Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12"><p className="text-slate">Your wishlist is empty.</p><Link href="/shop"><Button variant="link" className="text-ocean mt-2">Browse products</Button></Link></div>
              )}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">My Reviews</h2>
              <Card><CardContent className="p-8 text-center"><p className="text-slate">You haven&apos;t written any reviews yet.</p><Link href="/shop"><Button variant="link" className="text-ocean mt-2">Purchase products to review</Button></Link></CardContent></Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
