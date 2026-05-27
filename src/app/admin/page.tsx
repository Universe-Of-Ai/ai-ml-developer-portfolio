'use client';

import { useState } from 'react';
import { DollarSign, Package, Users, ShoppingBag, TrendingUp, CheckCircle, XCircle, Clock, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { vendors, products, sampleOrders, formatPrice } from '@/data/mock';
import { toast } from 'sonner';
import Image from 'next/image';

const pendingVendors = [
  { id: 'pv-1', name: 'Sydney Gadgets Hub', state: 'NSW', date: '2024-12-20', products: 0 },
  { id: 'pv-2', name: 'Perth Beauty Bar', state: 'WA', date: '2024-12-21', products: 0 },
];

const adminOrders = [
  ...sampleOrders,
  { id: 'ord-004', status: 'pending', subtotal: 199.00, shippingAud: 12.99, gstAud: 19.90, totalAud: 231.89, items: [{ id: 'oi-6', name: 'Ergonomic Office Chair', price: 199.00, qty: 1, subtotal: 199.00, image: 'https://picsum.photos/seed/chair1/600/600' }], createdAt: '2024-12-22' },
  { id: 'ord-005', status: 'cancelled', subtotal: 54.00, shippingAud: 0, gstAud: 5.40, totalAud: 59.40, items: [{ id: 'oi-7', name: 'Scented Candle Collection', price: 54.00, qty: 1, subtotal: 54.00, image: 'https://picsum.photos/seed/candles1/600/600' }], createdAt: '2024-12-23' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [vendorDialog, setVendorDialog] = useState<string | null>(null);

  const stats = [
    { label: 'Total Revenue', value: '$28,450', icon: DollarSign, change: '+15.3%', color: 'text-emerald-accent' },
    { label: 'Total Orders', value: '342', icon: ShoppingBag, change: '+22 this week', color: 'text-ocean' },
    { label: 'Active Vendors', value: vendors.length.toString(), icon: Users, change: `${pendingVendors.length} pending`, color: 'text-gold' },
    { label: 'Total Products', value: products.length.toString(), icon: Package, change: '+8 this week', color: 'text-ocean' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate text-sm">Platform management & moderation</p>
        </div>
        <Badge className="bg-ocean/10 text-ocean text-sm px-3 py-1">Admin</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  {stat.change && <p className="text-xs mt-1 text-slate">{stat.change}</p>}
                </div>
                <div className="w-10 h-10 rounded-lg bg-ocean/10 flex items-center justify-center"><stat.icon className="w-5 h-5 text-ocean" /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
          {['overview', 'vendors', 'orders', 'products', 'settings'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="rounded-none border-b-2 border-transparent data-[state=active]:border-ocean data-[state=active]:bg-transparent data-[state=active]:text-ocean data-[state=active]:shadow-none px-4 py-3 text-slate capitalize">{tab}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Pending Vendor Applications</CardTitle></CardHeader>
              <CardContent>
                {pendingVendors.length > 0 ? (
                  <div className="space-y-3">
                    {pendingVendors.map((v) => (
                      <div key={v.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div><p className="text-sm font-medium">{v.name}</p><p className="text-xs text-slate">{v.state} • Applied {v.date}</p></div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-emerald-accent text-white text-xs h-8 rounded-lg" onClick={() => toast.success(`${v.name} approved!`)}><CheckCircle className="w-3 h-3 mr-1"/>Approve</Button>
                          <Button size="sm" variant="outline" className="text-xs h-8 rounded-lg text-coral" onClick={() => toast.success(`${v.name} rejected`)}><XCircle className="w-3 h-3 mr-1"/>Reject</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate text-sm">No pending applications.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Recent Orders</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminOrders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div><p className="text-sm font-medium">#{order.id}</p><p className="text-xs text-slate">{order.createdAt}</p></div>
                      <div className="flex items-center gap-3">
                        <Badge className={`text-xs ${statusColors[order.status]}`}>{order.status}</Badge>
                        <span className="text-sm font-medium">{formatPrice(order.totalAud)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors">
          <h2 className="text-lg font-semibold mb-4">All Vendors ({vendors.length})</h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Vendor</TableHead><TableHead>State</TableHead><TableHead>Products</TableHead><TableHead>Rating</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {[...vendors, ...pendingVendors.map((v) => ({...v, id: v.id, businessName: v.name, ratingAvg: 0, productCount: v.products, status: 'pending' as const, slug: ''}))].map((v) => (
                    <TableRow key={v.id}>
                      <TableCell><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-ocean/10 flex items-center justify-center text-xs font-bold text-ocean">{(v.businessName||v.name).charAt(0)}</div><span className="text-sm font-medium">{v.businessName||v.name}</span></div></TableCell>
                      <TableCell className="text-sm">{v.state}</TableCell>
                      <TableCell className="text-sm">{v.productCount}</TableCell>
                      <TableCell className="text-sm">{v.ratingAvg > 0 ? `⭐ ${v.ratingAvg}` : '—'}</TableCell>
                      <TableCell><Badge className={`text-xs ${statusColors[v.status]}`}>{v.status}</Badge></TableCell>
                      <TableCell>
                        {v.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-emerald-accent" onClick={() => toast.success('Approved!')}><CheckCircle className="w-3 h-3"/></Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-coral" onClick={() => toast.success('Rejected')}><XCircle className="w-3 h-3"/></Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <h2 className="text-lg font-semibold mb-4">All Orders ({adminOrders.length})</h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Date</TableHead><TableHead>Items</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {adminOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-sm">#{order.id}</TableCell>
                      <TableCell className="text-sm text-slate">{order.createdAt}</TableCell>
                      <TableCell className="text-sm">{order.items.length}</TableCell>
                      <TableCell className="text-sm font-medium">{formatPrice(order.totalAud)}</TableCell>
                      <TableCell><Badge className={`text-xs ${statusColors[order.status]}`}>{order.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <h2 className="text-lg font-semibold mb-4">All Products ({products.length})</h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Vendor</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg overflow-hidden bg-muted relative"><Image src={p.images[0]} alt="" fill className="object-cover" sizes="40px"/></div><span className="text-sm font-medium truncate max-w-[200px]">{p.name}</span></div></TableCell>
                      <TableCell className="text-sm">{p.vendor}</TableCell>
                      <TableCell className="text-sm">{formatPrice(p.price)}</TableCell>
                      <TableCell className="text-sm">{p.stockQty}</TableCell>
                      <TableCell><Badge className={`text-xs ${statusColors[p.status]}`}>{p.status}</Badge></TableCell>
                      <TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4"/></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem><Eye className="w-4 h-4 mr-2"/>View</DropdownMenuItem><DropdownMenuItem className="text-coral">Archive</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader><CardTitle className="text-lg">Platform Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Default Commission Rate (%)</Label><Input type="number" defaultValue="10" className="h-11 rounded-lg w-32" /></div>
              <div className="space-y-2"><Label>Free Shipping Threshold (AUD)</Label><Input type="number" defaultValue="99" className="h-11 rounded-lg w-32" /></div>
              <div className="space-y-2"><Label>GST Rate (%)</Label><Input type="number" defaultValue="10" className="h-11 rounded-lg w-32" /></div>
              <Button onClick={() => toast.success('Settings saved!')} className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
