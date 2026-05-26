"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Camera, Save } from "lucide-react";

const mockUser = {
  displayName: "কবি সাহিত্য",
  username: "kobi_sahitto",
  bio: "কবিতা আমার শ্বাস, শব্দ আমার জীবন।",
  email: "kobi@example.com",
  avatar: "",
};

export default function SettingsPage() {
  const [form, setForm] = useState({
    displayName: mockUser.displayName,
    bio: mockUser.bio,
    avatar: mockUser.avatar,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("প্রোফাইল আপডেট হয়েছে!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-1">সেটিংস</h1>
      <p className="text-sm text-muted-foreground mb-6">
        আপনার প্রোফাইল ও অ্যাকাউন্ট পরিচালনা করুন
      </p>

      <Card className="border-border/50 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">প্রোফাইল তথ্য</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-border">
                <AvatarImage src={form.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                  কস
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-teal-dark transition-colors">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium">@{mockUser.username}</p>
              <p className="text-xs text-muted-foreground">
                প্রোফাইল ছবি পরিবর্তন করতে ক্যামেরা আইকনে ক্লিক করুন
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-1.5">
            <Label htmlFor="set-displayName">প্রদর্শন নাম</Label>
            <Input
              id="set-displayName"
              value={form.displayName}
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="set-bio">সম্পর্কে (বায়ো)</Label>
            <Textarea
              id="set-bio"
              placeholder="নিজের সম্পর্কে কিছু লিখুন..."
              value={form.bio}
              onChange={(e) =>
                setForm({ ...form, bio: e.target.value })
              }
              rows={3}
              className="resize-none"
            />
            <p className="text-[11px] text-muted-foreground text-right">
              {form.bio.length}/300
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary hover:bg-teal-dark"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">অ্যাকাউন্ট</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">ইমেইল</p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              পরিবর্তন করুন
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">পাসওয়ার্ড</p>
              <p className="text-xs text-muted-foreground">
                শেষ পরিবর্তন: ৩০ দিন আগে
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              পরিবর্তন করুন
            </Button>
          </div>
          <Separator />
          <div className="pt-2">
            <Button variant="destructive" size="sm" className="text-xs">
              একাউন্ট মুছুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
