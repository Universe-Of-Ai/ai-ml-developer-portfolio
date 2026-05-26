"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { toast } from "sonner";

export default function WriteStoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [visibility, setVisibility] = useState("PUBLIC");
  const [collabMode, setCollabMode] = useState("CLOSED");

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("গল্পের শিরোনাম দিন");
      return;
    }
    if (!body || body === "<p></p>") {
      toast.error("গল্পের বিষয়বস্তু লিখুন");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "STORY",
          title,
          body,
          bodyText: body.replace(/<[^>]*>/g, ""),
          tags: tags ? JSON.stringify(tags.split(",").map((t) => t.trim())) : "[]",
          isAnonymous,
          visibility,
          collaborationMode: collabMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("গল্প প্রকাশিত হয়েছে!");
        router.push("/");
      } else {
        toast.error(data.error || "প্রকাশে সমস্যা হয়েছে");
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
        <h1 className="text-lg font-bold">গল্প লিখুন</h1>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            placeholder="গল্পের শিরোনাম"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base font-medium border-0 border-b rounded-none px-0 focus-visible:ring-0"
          />
        </div>

        <RichTextEditor
          content={body}
          onChange={setBody}
          placeholder="আপনার গল্প লিখুন..."
          minRows={15}
        />

        <div>
          <Input
            placeholder="ট্যাগ (কমা দিয়ে আলাদা করুন)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            dir="ltr"
            className="text-left text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="flex items-center justify-between">
            <Label htmlFor="story-anon" className="text-sm cursor-pointer">
              নাম প্রকাশ না করা
            </Label>
            <Switch
              id="story-anon"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">দৃশ্যমানতা</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">প্রকাশ্য</SelectItem>
                <SelectItem value="FOLLOWERS">অনুসারী</SelectItem>
                <SelectItem value="PRIVATE">ব্যক্তিগত</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">সহযোগিতা মোড</Label>
            <Select value={collabMode} onValueChange={setCollabMode}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLOSED">বন্ধ</SelectItem>
                <SelectItem value="OPEN">খোলা</SelectItem>
                <SelectItem value="MODERATED">পর্যালোচিত</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary hover:bg-teal-dark py-5 text-base"
        >
          {loading ? "প্রকাশ হচ্ছে..." : "প্রকাশ করুন"}
        </Button>
      </div>
    </div>
  );
}
