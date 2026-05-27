'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Upload, Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { AU_STATES } from '@/data/mock';
import Link from 'next/link';

export default function VendorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    businessName: '',
    abn: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    state: 'NSW',
    logoUrl: '',
    agreeTerms: false,
  });

  const updateForm = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
    toast.success('Application submitted!');
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-accent/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-emerald-accent" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
        <p className="text-slate mb-2">Thank you for applying to become a seller on MarketPlaceAU.</p>
        <p className="text-sm text-slate mb-6">Your application is under review. We&apos;ll email you at <strong>{form.contactEmail}</strong> once it&apos;s approved. This usually takes 1-2 business days.</p>
        <Button onClick={() => router.push('/')} className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-ocean" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Become a Seller</h1>
        <p className="text-slate mt-1">Apply to start selling on MarketPlaceAU</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-ocean text-white' : 'bg-muted text-slate'}`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && <div className={`w-16 h-0.5 ${step > s ? 'bg-ocean' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Business Information</h2>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Business Name *</Label><Input placeholder="e.g., Aussie Tech Co" value={form.businessName} onChange={(e) => updateForm('businessName', e.target.value)} className="h-11 rounded-lg" /></div>
                <div className="space-y-2"><Label>ABN (Australian Business Number)</Label><Input placeholder="12 345 678 901" value={form.abn} onChange={(e) => updateForm('abn', e.target.value)} className="h-11 rounded-lg" /></div>
                <div className="space-y-2"><Label>Store Description *</Label><Textarea placeholder="Tell buyers about your business..." value={form.description} onChange={(e) => updateForm('description', e.target.value)} rows={4} className="rounded-lg" /></div>
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Select value={form.state} onValueChange={(v) => updateForm('state', v)}>
                    <SelectTrigger className="h-11 rounded-lg"><SelectValue /></SelectTrigger>
                    <SelectContent>{AU_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="bg-ocean hover:bg-ocean-dark text-white rounded-lg">Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </div>
          )}

          {/* Step 2: Contact */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Details</h2>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Contact Name *</Label><Input placeholder="Your full name" value={form.contactName} onChange={(e) => updateForm('contactName', e.target.value)} className="h-11 rounded-lg" /></div>
                <div className="space-y-2"><Label>Contact Email *</Label><Input type="email" placeholder="contact@yourbusiness.com" value={form.contactEmail} onChange={(e) => updateForm('contactEmail', e.target.value)} className="h-11 rounded-lg" /></div>
                <div className="space-y-2"><Label>Contact Phone *</Label><Input placeholder="0412 345 678" value={form.contactPhone} onChange={(e) => updateForm('contactPhone', e.target.value)} className="h-11 rounded-lg" /></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-lg"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-ocean hover:bg-ocean-dark text-white rounded-lg">Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Review & Submit</h2>
              <div className="bg-muted/50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate">Business Name</span><span className="font-medium">{form.businessName || '—'}</span></div>
                <div className="flex justify-between"><span className="text-slate">ABN</span><span className="font-medium">{form.abn || '—'}</span></div>
                <div className="flex justify-between"><span className="text-slate">Contact</span><span className="font-medium">{form.contactName} ({form.contactEmail})</span></div>
                <div className="flex justify-between"><span className="text-slate">State</span><span className="font-medium">{form.state}</span></div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox checked={form.agreeTerms} onCheckedChange={(v) => updateForm('agreeTerms', !!v)} className="mt-0.5" />
                <span className="text-sm text-slate">I agree to MarketPlaceAU&apos;s <Link href="#" className="text-ocean hover:underline">Seller Terms & Conditions</Link> and <Link href="#" className="text-ocean hover:underline">Seller Policies</Link>.</span>
              </label>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-lg"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                <Button onClick={handleSubmit} disabled={!form.agreeTerms || loading} className="flex-1 bg-emerald-accent hover:bg-emerald-accent/90 text-white rounded-lg">
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
