"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  Eye,
  Send,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

const mockPoem = {
  id: "1",
  title: "নদীর কাছে একা",
  author: "তানভীর হাসান",
  authorUsername: "tanvir-hasan",
  date: "১২ জানুয়ারি, ২০২৫",
  readingTime: "৩ মিনিট",
  views: 243,
  likes: 47,
  body: [
    "নদীর ধারে বসে আছি একা,",
    "জলের গল্প শুনছি নীরবে।",
    "ঢেউয়ের ছুঁয়ে যাওয়া ছোঁয়ায়,",
    "কথা বলে বারংবার স্নিগ্ধ হয়ে।",
    "",
    "প্রতিটি রেখায় লুকিয়ে আছে",
    "কোনো অচেনা মুখের হাসি।",
    "জল যেন জানে সব কথা—",
    "আমার এই নিঃসঙ্গ ভাসি।",
    "",
    "পাখিরা ডাকে দূরে কোনোখানে,",
    "মেঘ ভেসে যায় আকাশের গায়ে।",
    "আমি শুধু বসে দেখি চুপচাপ,",
    "নদী বয়ে চলে নিজের মতো করে।",
    "",
    "কখনো তো ভাবি—এই নদীও",
    "কি একা বয়ে চলে পথে পথে?",
    "নাকি তারও আছে কেউ—",
    "যার সাথে সে গল্প করে রাতে?",
  ],
};

const mockComments: Comment[] = [
  {
    id: "c1",
    user: "ফারহানা ইয়াসমিন",
    avatar: "ফা",
    text: "চমৎকার কবিতা! নদীর সাথে নিজের একাকীত্বের তুলনাটি অসাধারণ।",
    time: "২ ঘন্টা আগে",
    likes: 5,
  },
  {
    id: "c2",
    user: "রহিম আহমেদ",
    avatar: "র",
    text: "শেষ চার লাইনটি বারবার পড়লাম। গভীর ভাবনার কবিতা।",
    time: "৫ ঘন্টা আগে",
    likes: 3,
  },
  {
    id: "c3",
    user: "নাসরিন সুলতানা",
    avatar: "না",
    text: "এমন লেখা আরও পড়তে চাই। ধন্যবাদ শেয়ার করার জন্য।",
    time: "১ দিন আগে",
    likes: 2,
  },
];

const poemStanzas = mockPoem.body.reduce<string[][]>(
  (acc, line) => {
    if (line === "") {
      acc.push([]);
    } else {
      if (acc.length === 0 || (acc[acc.length - 1].length > 0 && line === "")) {
        acc.push([]);
      }
      acc[acc.length - 1].push(line);
    }
    return acc;
  },
  [[]]
).filter((stanza) => stanza.length > 0);

export default function PoemDetailPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(mockPoem.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `c${comments.length + 1}`,
      user: "আপনি",
      avatar: "আ",
      text: newComment.trim(),
      time: "এইমাত্র",
      likes: 0,
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Link
          href="/"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <Badge variant="secondary" className="text-xs">
          কবিতা
        </Badge>
      </motion.div>

      {/* Author Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-3 mb-6"
      >
        <Avatar className="w-11 h-11">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {mockPoem.author.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Link
            href={`/profile/${mockPoem.authorUsername}`}
            className="font-semibold text-sm hover:text-primary transition-colors"
          >
            {mockPoem.author}
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
            <span>{mockPoem.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {mockPoem.readingTime}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {mockPoem.views} বার পঠিত
            </span>
          </div>
        </div>
      </motion.div>

      {/* Poem Title & Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border/50 overflow-hidden">
          <CardContent className="p-6 sm:p-10">
            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl font-bold text-center mb-8"
              style={{ fontFamily: "'Noto Serif Bengali', serif" }}
            >
              {mockPoem.title}
            </h1>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-primary/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <div className="w-12 h-px bg-primary/30" />
            </div>

            {/* Poem Body */}
            <div
              className="text-center space-y-6 leading-[2.2] text-[15px] sm:text-base text-foreground/90"
              style={{ fontFamily: "'Noto Serif Bengali', serif" }}
            >
              {poemStanzas.map((stanza, si) => (
                <div key={si} className="space-y-1">
                  {stanza.map((line, li) => (
                    <p key={li}>{line}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-12 h-px bg-primary/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <div className="w-12 h-px bg-primary/30" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mt-4 px-1"
      >
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1.5 text-xs ${
              liked
                ? "text-rose-500 hover:text-rose-600"
                : "text-muted-foreground hover:text-rose-500"
            }`}
            onClick={handleLike}
          >
            <Heart
              className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
            />
            <span>{likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground hover:text-primary"
            onClick={() =>
              document
                .getElementById("comments-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <MessageCircle className="w-4 h-4" />
            <span>{comments.length}</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground hover:text-primary"
          >
            <Share2 className="w-4 h-4" />
            শেয়ার করুন
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`text-xs ${
              bookmarked
                ? "text-secondary hover:text-secondary"
                : "text-muted-foreground hover:text-secondary"
            }`}
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark
              className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
            />
          </Button>
        </div>
      </motion.div>

      <Separator className="my-6 bg-border/50" />

      {/* Comments Section */}
      <motion.div
        id="comments-section"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h2 className="text-lg font-bold mb-4">
          মন্তব্য সমূহ ({comments.length})
        </h2>

        {/* Comment Input */}
        <Card className="border-border/50 mb-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  আ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="আপনার মন্তব্য লিখুন..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] resize-none text-sm"
                  rows={2}
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    className="text-xs gap-1.5"
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="w-3 h-3" />
                    পাঠান
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-3">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {comment.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold">
                          {comment.user}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {comment.text}
                      </p>
                      <button className="flex items-center gap-1 mt-2 text-[11px] text-muted-foreground hover:text-rose-500 transition-colors">
                        <Heart className="w-3 h-3" />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
