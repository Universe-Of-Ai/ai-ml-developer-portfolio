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

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    displayName: "",
  });

  const validate = () => {
    if (!form.email || !form.password || !form.username || !form.displayName) {
      toast.error("সকল ক্ষেত্র পূরণ করুন");
      return false;
    }
    if (form.username.length < 3 || form.username.length > 20) {
      toast.error("ব্যবহারকারীর নাম ৩-২০ অক্ষর হতে হবে");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      toast.error("ব্যবহারকারীর নামে শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা ও আন্ডারস্কোর");
      return false;
    }
    if (form.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে");
      return false;
    }
    if (form.displayName.length < 2 || form.displayName.length > 50) {
      toast.error("প্রদর্শন নাম ২-৫০ অক্ষর হতে হবে");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // 1. Create Supabase Auth user
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });

      if (authError) {
        if (authError.message.includes("already registered")) {
          toast.error("এই ইমেইল দিয়ে আগেই একাউন্ট আছে");
        } else {
          toast.error(authError.message);
        }
        return;
      }

      // 2. Create User record in Prisma DB
      const userId = authData.user?.id;
      if (userId) {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userId,
            email: form.email,
            username: form.username,
            displayName: form.displayName,
          }),
        });
      }

      toast.success("একাউন্ট তৈরি হয়েছে! লগইন করুন।");
      router.push("/login");
    } catch {
      toast.error("একাউন্ট তৈরিতে সমস্যা হয়েছে");
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
            নতুন একাউন্ট তৈরি করুন
          </p>
        </div>

        <Card className="border-border/60 shadow-soft">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-bold text-center">
              একাউন্ট তৈরি করুন
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="displayName">প্রদর্শন নাম</Label>
                <Input
                  id="displayName"
                  placeholder="আপনার নাম"
                  value={form.displayName}
                  onChange={(e) =>
                    setForm({ ...form, displayName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username">ব্যবহারকারীর নাম</Label>
                <Input
                  id="username"
                  placeholder="username_123"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  dir="ltr"
                  className="text-left"
                />
                <p className="text-[11px] text-muted-foreground">
                  ৩-২০ অক্ষর, ইংরেজি অক্ষর, সংখ্যা ও আন্ডারস্কোর
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-email">ইমেইল</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  dir="ltr"
                  className="text-left"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-password">পাসওয়ার্ড</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  dir="ltr"
                  className="text-left"
                />
                <p className="text-[11px] text-muted-foreground">
                  কমপক্ষে ৮ অক্ষর
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-teal-dark"
                disabled={loading}
              >
                {loading
                  ? "তৈরি হচ্ছে..."
                  : "একাউন্ট তৈরি করুন"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              একাউন্ট আছে?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                লগইন করুন
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
