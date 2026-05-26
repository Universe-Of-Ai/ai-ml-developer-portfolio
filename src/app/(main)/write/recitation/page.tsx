"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function WriteRecitationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [linkedPost, setLinkedPost] = useState("");
  const [caption, setCaption] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [visibility, setVisibility] = useState("PUBLIC");

  const handleSubmit = async () => {
    if (!videoFile && !caption) {
      toast.error("ভিডিও বা ক্যাপশন দিন");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "RECITATION",
          title: caption || null,
          body: `<p>${caption || "আবৃত্তি ভিডিও"}</p>`,
          bodyText: caption || "আবৃত্তি ভিডিও",
          tags: "[]",
          isAnonymous,
          visibility,
          collaborationMode: "CLOSED",
          videoUrl: videoFile ? URL.createObjectURL(videoFile) : null,
          thumbnailUrl: null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("আবৃত্তি প্রকাশিত হয়েছে!");
        router.push("/recitations");
      } else {
        toast.error(data.error || "প্রকাশে সমস্যা");
      }
    } catch {
      toast.error("সার্ভার সমস্যা");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/write" className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="text-lg font-bold">আবৃত্তি আপলোড করুন</h1>
      </div>

      <div className="space-y-4">
        {/* Video Upload Zone */}
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Upload className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">ভিডিও নির্বাচন করুন</p>
          <p className="text-[11px] text-muted-foreground mt-1">mp4, webm, mov — সর্বোচ্চ ১০০MB</p>
          <Input
            type="file"
            accept="video/mp4,video/webm,video/mov"
            className="hidden"
            id="video-upload"
            onChange={(e) => e.target.files?.[0] && setVideoFile(e.target.files[0])}
          />
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => document.getElementById("video-upload")?.click()}
          >
            ফাইল নির্বাচন করুন
          </Button>
          {videoFile && (
            <p className="text-xs text-primary mt-2 font-medium">{videoFile.name}</p>
          )}
        </div>

        {/* Caption */}
        <div>
          <Input
            placeholder="ক্যাপশন বা বিবরণ..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* Linked Post */}
        <div className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="সংযুক্ত কবিতা/গল্প খুঁজুন (ঐচ্ছিক)"
            value={linkedPost}
            onChange={(e) => setLinkedPost(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="flex items-center justify-between">
            <Label htmlFor="rec-anon" className="text-sm cursor-pointer">নাম প্রকাশ না করা</Label>
            <Switch id="rec-anon" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">দৃশ্যমানতা</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">প্রকাশ্য</SelectItem>
                <SelectItem value="FOLLOWERS">অনুসারী</SelectItem>
                <SelectItem value="PRIVATE">ব্যক্তিগত</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 py-5 text-base"
        >
          {loading ? "আপলোড হচ্ছে..." : "প্রকাশ করুন"}
        </Button>
      </div>
    </div>
  );
}
