"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { toast } from "sonner";

export default function WriteDiaryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSubmit = async () => {
    if (!body || body === "<p></p>") {
      toast.error("আপনার ভাবনা লিখুন");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DIARY",
          title: null,
          body,
          bodyText: body.replace(/<[^>]*>/g, ""),
          tags: "[]",
          isAnonymous,
          visibility: "PRIVATE", // Diary always private
          collaborationMode: "CLOSED",
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("ভাবনা সংরক্ষিত হয়েছে!");
        router.push("/");
      } else {
        toast.error(data.error || "সংরক্ষণে সমস্যা হয়েছে");
      }
    } catch {
      toast.error("সার্ভারে সমস্যা হয়েছে");
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
        <h1 className="text-lg font-bold">ভাবনা / ডায়েরি</h1>
      </div>

      {/* Date display */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Calendar className="w-4 h-4" />
        <span>{today}</span>
      </div>

      <div className="space-y-4">
        <RichTextEditor
          content={body}
          onChange={setBody}
          placeholder="আজ কী ভাবছেন? লিখে ফেলুন..."
          minRows={12}
        />

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
          <Label htmlFor="diary-anon" className="text-sm cursor-pointer">
            নাম প্রকাশ না করা
          </Label>
          <Switch
            id="diary-anon"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
        </div>

        <p className="text-[11px] text-muted-foreground">
          ডায়েরি সবসময় ব্যক্তিগত হিসেবে সংরক্ষিত হয়
        </p>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-teal-dark py-5 text-base"
        >
          {loading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
        </Button>
      </div>
    </div>
  );
}
