"use client";

import { useEffect, useState } from "react";
import { PenSquare, Feather } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  type: string;
  title: string | null;
  body: string;
  tags: string;
  isAnonymous: boolean;
  visibility: string;
  reactionsCount: number;
  commentsCount: number;
  createdAt: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar: string | null;
  };
}

const typeLabels: Record<string, string> = {
  POEM: "কবিতা",
  STORY: "গল্প",
  DIARY: "ভাবনা",
  RECITATION: "আবৃত্তি",
};

const typeColors: Record<string, string> = {
  POEM: "bg-teal-50 text-teal",
  STORY: "bg-amber-50 text-amber",
  DIARY: "bg-rose-50 text-rose-500",
  RECITATION: "bg-purple-50 text-purple-500",
};

export default function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    fetchPosts(activeFilter);
  }, [activeFilter]);

  const fetchPosts = async (type: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts${type !== "ALL" ? `?type=${type}` : ""}`
      );
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} মিনিট আগে`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} ঘণ্টা আগে`;
    const days = Math.floor(hours / 24);
    return `${days} দিন আগে`;
  };

  const parseTags = (tagsStr: string): string[] => {
    try {
      return JSON.parse(tagsStr);
    } catch {
      return [];
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full mb-4">
        <TabsList className="w-full h-auto flex-wrap bg-muted/50 p-1 gap-0.5">
          {[
            { key: "ALL", label: "সব" },
            { key: "POEM", label: "কবিতা" },
            { key: "STORY", label: "গল্প" },
            { key: "DIARY", label: "ভাবনা" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="flex-1 min-w-[70px] text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Posts */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-2 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted rounded animate-pulse" />
                  <div className="h-3 w-4/5 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-3/5 bg-muted rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Feather className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            এখনো কোনো বিষয়বস্তু নেই
          </h2>
          <p className="text-muted-foreground text-center mb-6 max-w-sm">
            প্রথম লিখুন! কবিতা, গল্প বা ভাবনা শেয়ার করুন এবং সম্প্রদায়ের সাথে যুক্ত হন।
          </p>
          <Link
            href="/write"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-teal-dark transition-colors shadow-md active:scale-95"
          >
            <PenSquare className="w-4 h-4" />
            প্রথম লিখুন
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border-border/50 hover:shadow-sm transition-shadow"
            >
              <CardContent className="p-4 sm:p-5">
                {/* Author Row */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={post.isAnonymous ? "" : post.author?.avatar || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {post.isAnonymous ? "অ" : "ক"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {post.isAnonymous
                        ? "অজানা কবি"
                        : post.author?.displayName || "বেনামী"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {post.isAnonymous
                        ? "বেনামী লেখক"
                        : `@${post.author?.username || "user"}`}{" "}
                      · {timeAgo(post.createdAt)}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-2 py-0 ${typeColors[post.type] || ""}`}
                  >
                    {typeLabels[post.type] || post.type}
                  </Badge>
                </div>

                {/* Content */}
                {post.title && (
                  <h3 className="font-bold text-base mb-2">{post.title}</h3>
                )}
                <div
                  className="text-sm text-foreground/80 leading-relaxed prose-sm max-h-32 overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html:
                      stripHtml(post.body).length > 200
                        ? `${stripHtml(post.body).substring(0, 200)}...`
                        : post.body,
                  }}
                />

                {/* Tags */}
                {parseTags(post.tags).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {parseTags(post.tags).map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-[10px] font-normal"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-rose-500 transition-colors text-xs">
                    <Heart className="w-4 h-4" />
                    <span>{post.reactionsCount || 0}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount || 0}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
