"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Heart, Video } from "lucide-react";

const writeOptions = [
  {
    href: "/write/poem",
    title: "কবিতা",
    desc: "আপনার অন্তরের কথা কবিতায় প্রকাশ করুন",
    icon: BookOpen,
    color: "bg-teal-50 text-teal",
    hoverBg: "hover:bg-teal/5",
  },
  {
    href: "/write/story",
    title: "গল্প",
    desc: "কাল্পনিক বা বাস্তব গল্প লিখুন",
    icon: FileText,
    color: "bg-amber-50 text-amber",
    hoverBg: "hover:bg-amber/5",
  },
  {
    href: "/write/diary",
    title: "ভাবনা / ডায়েরি",
    desc: "দৈনন্দিন চিন্তা ও অনুভূতি লিখুন",
    icon: Heart,
    color: "bg-rose-50 text-rose-500",
    hoverBg: "hover:bg-rose-500/5",
  },
  {
    href: "/write/recitation",
    title: "আবৃত্তি",
    desc: "কবিতা আবৃত্তি ভিডিও আপলোড করুন",
    icon: Video,
    color: "bg-purple-50 text-purple-500",
    hoverBg: "hover:bg-purple-500/5",
  },
];

export default function WriteHub() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">নতুন লিখুন</h1>
        <p className="text-sm text-muted-foreground mt-1">
          আপনার সৃজনশীলতা প্রকাশ করুন
        </p>
      </div>

      <div className="space-y-3">
        {writeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link key={option.href} href={option.href}>
              <Card className={`border-border/50 transition-all hover:shadow-md ${option.hoverBg} active:scale-[0.98]`}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${option.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-sm">{option.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
                  </div>
                  <span className="text-muted-foreground text-lg">←</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
