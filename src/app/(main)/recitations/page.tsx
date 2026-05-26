"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, Play, Pause, Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RecitationPost {
  id: string;
  type: string;
  title: string | null;
  body: string;
  isAnonymous: boolean;
  videoUrl: string | null;
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

export default function RecitationFeedPage() {
  const [posts, setPosts] = useState<RecitationPost[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  useEffect(() => {
    fetchRecitations();
  }, []);

  const fetchRecitations = async () => {
    try {
      const res = await fetch("/api/posts?type=RECITATION");
      const data = await res.json();
      if (data.success) setPosts(data.data);
    } catch { /* silent */ }
    finally {
      setLoading(false);
    }
  };

  // Handle video play/pause on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRefs.current.get(entries.indexOf(entry.target));
          if (video) {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [posts]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <Play className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">কোনো আবৃত্তি নেই</h2>
        <p className="text-sm text-muted-foreground">প্রথম আবৃত্তি আপলোড করুন!</p>
      </div>
    );
  }

  const toggleMute = () => {
    const video = videoRefs.current.get(activeIndex);
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-8rem)] overflow-y-scroll snap-y-mandatory snap-always scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="h-full snap-start relative bg-black flex items-center justify-center"
          onClick={() => setActiveIndex(index)}
        >
          {/* Video Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {post.videoUrl ? (
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(index, el);
                }}
                src={post.videoUrl}
                className="max-h-full max-w-full object-contain"
                loop
                muted={true}
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white/40">
                <Play className="w-16 h-16 mb-3" />
                <p className="text-sm">ভিডিও লোড হচ্ছে...</p>
              </div>
            )}
          </div>

          {/* Overlay UI */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center gap-2 pointer-events-auto">
                <Avatar className="w-9 h-9 border border-white/30">
                  <AvatarImage src={post.isAnonymous ? "" : post.author?.avatar || ""} />
                  <AvatarFallback className="bg-white/20 text-white text-xs">
                    {post.isAnonymous ? "অ" : "ক"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">
                    {post.isAnonymous ? "অজানা কবি" : post.author?.displayName}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-auto">
              {post.title && (
                <h3 className="text-white font-bold text-base mb-2">{post.title}</h3>
              )}
              {post.body && (
                <p className="text-white/80 text-sm mb-3 line-clamp-2">{post.body.replace(/<[^>]*>/g, "")}</p>
              )}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                  <Heart className="w-6 h-6" />
                  <span className="text-xs">{post.reactionsCount}</span>
                </button>
                <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs">{post.commentsCount}</span>
                </button>
                <button className="text-white/80 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="ml-auto text-white/80 hover:text-white transition-colors"
                >
                  {isMuted ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
