'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, DollarSign, Star, TrendingUp, Plus, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { products, vendors, formatPrice } from '@/data/mock';
import { toast } from 'sonner';

const vendorProducts = products.filter((p) => p.vendorSlug === 'aussie-tech-co');

const vendorOrders = [
  { id: 'VO-001', buyer: 'Sarah M.', total: 289.94, status: 'delivered', date: '2024-12-18', items: 2 },
  { id: 'VO-002', buyer: 'James K.', total: 518.99, status: 'shipped', date: '2024-12-20', items: 1 },
  { id: 'VO-003', buyer: 'Emma L.', total: 69.95, status: 'processing', date: '2024-12-22', items: 1 },
  { id: 'VO-004', buyer: 'Chloe T.', total: 449.00, status: 'pending', date: '2024-12-23', items: 1 },
];

const vendorEarnings = [
  { month: 'Dec 2024', amount: 4520.50, orders: 38 },
  { month: 'Nov 2024', amount: 3890.00, orders: 32 },
  { month: 'Oct 2024', amount: 5200.75, orders: 45 },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  active: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-800',
};

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '$13,611.25', icon: DollarSign, change: '+12.5%', color: 'text-emerald-accent' },
    { label: 'Orders', value: '115', icon: Package, change: '+8.2%', color: 'text-ocean' },
    { label: 'Products', value: '45', icon: TrendingUp, change: '+3', color: 'text-gold' },
    { label: 'Avg Rating', value: '4.7', icon: Star, change: '', color: 'text-gold' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-slate text-sm">Welcome back, Aussie Tech Co</p>
        </div>
        <Link href="/store/aussie-tech-co">
          <Button variant="outline" className="rounded-lg"><Eye className="w-4 h-4 mr-2" /> View Store</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  {stat.change && <p className={`text-xs mt-1 ${stat.color}`}>{stat.change} from last month</p>}
                </div>
                <div className="w-10 h-10 rounded-lg bg-ocean/10 flex items-center justify-center"><stat.icon className="w-5 h-5 text-ocean" /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
          {['overview', 'products', 'orders', 'earnings', 'settings'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="rounded-none border-b-2 border-transparent data-[state=active]:border-ocean data-[state=active]:bg-transparent data-[state=active]:text-ocean data-[state=active]:shadow-none px-4 py-3 text-slate capitalize">{tab}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Recent Orders</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Buyer</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {vendorOrders.slice(0, 5).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-sm">#{order.id}</TableCell>
                        <TableCell className="text-sm">{order.buyer}</TableCell>
                        <TableCell className="text-sm">{formatPrice(order.total)}</TableCell>
                        <TableCell><Badge className={`text-xs ${statusColors[order.status]}`}>{order.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Earnings Overview</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorEarnings.map((e) => (
                    <div key={e.month} className="flex items-center justify-between">
                      <div><p className="text-sm font-medium">{e.month}</p><p className="text-xs text-slate">{e.orders} orders</p></div>
                      <span className="font-semibold">{formatPrice(e.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Products ({vendorProducts.length})</h2>
            <Dialog>
              <DialogTrigger asChild><Button className="bg-ocean hover:bg-ocean-dark text-white rounded-lg"><Plus className="w-4 h-4 mr-2" /> Add Product</Button></DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2"><Label>Product Name</Label><Input placeholder="Enter product name" className="h-11 rounded-lg" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Price (AUD)</Label><Input type="number" placeholder="0.00" className="h-11 rounded-lg" /></div>
                    <div className="space-y-2"><Label>Compare Price</Label><Input type="number" placeholder="0.00" className="h-11 rounded-lg" /></div>
                  </div>
                  <div className="space-y-2"><Label>Description</Label><textarea placeholder="Product description..." rows={3} className="w-full rounded-lg border border-border p-3 text-sm" /></div>
                  <div className="space-y-2"><Label>Category</Label><Select><SelectTrigger className="h-11 rounded-lg"><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent><SelectItem value="electronics">Electronics</SelectItem><SelectItem value="fashion">Fashion</SelectItem><SelectItem value="home">Home & Garden</SelectItem></SelectContent></Select></div>
                  <Button className="w-full bg-ocean hover:bg-ocean-dark text-white rounded-lg" onClick={() => toast.success('Product created!')}>Create Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Rating</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {vendorProducts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg overflow-hidden bg-muted relative"><Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" /></div><span className="text-sm font-medium truncate max-w-[200px]">{p.name}</span></div></TableCell>
                      <TableCell className="text-sm">{formatPrice(p.price)}</TableCell>
                      <TableCell className="text-sm">{p.stockQty}</TableCell>
                      <TableCell className="text-sm">⭐ {p.ratingAvg}</TableCell>
                      <TableCell><Badge className={`text-xs ${statusColors[p.status]}`}>{p.status}</Badge></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4"/></Button></DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem><Edit className="w-4 h-4 mr-2"/>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-coral"><Trash2 className="w-4 h-4 mr-2"/>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Buyer</TableHead><TableHead>Items</TableHead><TableHead>Total</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {vendorOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-sm">#{order.id}</TableCell>
                      <TableCell className="text-sm">{order.buyer}</TableCell>
                      <TableCell className="text-sm">{order.items}</TableCell>
                      <TableCell className="text-sm font-medium">{formatPrice(order.total)}</TableCell>
                      <TableCell className="text-sm text-slate">{order.date}</TableCell>
                      <TableCell><Badge className={`text-xs ${statusColors[order.status]}`}>{order.status}</Badge></TableCell>
                      <TableCell><Select defaultValue={order.status} onValueChange={(v) => toast.success(`Order ${order.id} → ${v}`)}><SelectTrigger className="h-8 w-[130px] text-xs rounded-lg"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="processing">Processing</SelectItem><SelectItem value="shipped">Shipped</SelectItem><SelectItem value="delivered">Delivered</SelectItem></SelectContent></Select></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card><CardContent className="p-6 text-center"><p className="text-sm text-slate">Available Balance</p><p className="text-3xl font-bold text-emerald-accent mt-1">$3,240.50</p><Button className="mt-3 bg-emerald-accent hover:bg-emerald-accent/90 text-white rounded-lg" onClick={() => toast.success('Payout requested!')}>Request Payout</Button></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><p className="text-sm text-slate">Total Earned</p><p className="text-3xl font-bold mt-1">$13,611.25</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><p className="text-sm text-slate">Commission Rate</p><p className="text-3xl font-bold mt-1">10%</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-lg">Earnings History</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Period</TableHead><TableHead>Orders</TableHead><TableHead>Gross</TableHead><TableHead>Commission</TableHead><TableHead>Net</TableHead></TableRow></TableHeader>
                <TableBody>
                  {vendorEarnings.map((e) => (
                    <TableRow key={e.month}>
                      <TableCell className="font-medium text-sm">{e.month}</TableCell>
                      <TableCell className="text-sm">{e.orders}</TableCell>
                      <TableCell className="text-sm">{formatPrice(e.amount)}</TableCell>
                      <TableCell className="text-sm text-coral">{formatPrice(e.amount * 0.1)}</TableCell>
                      <TableCell className="text-sm font-medium text-emerald-accent">{formatPrice(e.amount * 0.9)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader><CardTitle className="text-lg">Store Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Business Name</Label><Input defaultValue="Aussie Tech Co" className="h-11 rounded-lg" /></div>
              <div className="space-y-2"><Label>Description</Label><textarea defaultValue="Premium Australian technology and electronics retailer." rows={3} className="w-full rounded-lg border border-border p-3 text-sm" /></div>
              <div className="space-y-2"><Label>ABN</Label><Input defaultValue="51234567890" className="h-11 rounded-lg" /></div>
              <Button onClick={() => toast.success('Settings saved!')} className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
