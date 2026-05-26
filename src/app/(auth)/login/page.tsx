"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("সকল ক্ষেত্র পূরণ করুন");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast.error(error.message === "Invalid login credentials"
          ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়"
          : error.message);
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে!");
      router.push("/");
    } catch {
      toast.error("লগইনে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <PenSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">কবিতার আঙিনা</h1>
          <p className="text-sm text-muted-foreground mt-1">
            সৃজনশীল লেখালেখির প্ল্যাটফর্মে স্বাগতম
          </p>
        </div>

        <Card className="border-border/60 shadow-soft">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-bold text-center">লগইন করুন</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">ইমেইল</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  autoComplete="current-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-teal-dark"
                disabled={loading}
              >
                {loading ? "লগইন হচ্ছে..." : "লগইন"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              একাউন্ট নেই?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                একাউন্ট তৈরি করুন
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
