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
  BookOpen,
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

const mockStory = {
  id: "1",
  title: "পুরনো বাড়ির গল্প",
  author: "করিমা বেগম",
  authorUsername: "karima-begum",
  date: "১৫ ফেব্রুয়ারি, ২০২৫",
  readingTime: "৮ মিনিট",
  views: 518,
  likes: 89,
  genre: "রহস্য",
  paragraphs: [
    "দূর থেকে দেখলে বাড়িটা ঠিক অন্য সব পুরনো বাড়ির মতোই—ক্ষয়প্রাপ্ত দেয়াল, জরাজীর্ণ জানালা, আর একটা ঝুলে থাকা কাঠের দরজা যার পাল্লা একটু হেলে আছে। কিন্তু কাছে গেলেই বোঝা যায়—এই বাড়ির গল্প অন্যরকম।",
    "আমি প্রথম গেছিলাম ওই বাড়িতে দাদুর মৃত্যুর পর। দাদুর উইলে বাড়িটা আমার নামে লেখা ছিল। বাবা চাইতেন বাড়ি বিক্রি করে দিই, কিন্তু কিছু একটা আমাকে টানতে লাগল।",
    "প্রথম রাতেই আমি বুঝতে পারলাম কেন। গভীর রাতে যখন সবাই ঘুমিয়ে পড়ে, ঠিক তখনই শুরু হয় ওই শব্দ। একটা মিহি, সুরেলা শব্দ—যেন কেউ দূর থেকে গান গাইছে। প্রথম রাতে আমি ভয় পেয়েছিলাম। দ্বিতীয় রাতে কৌতূহলী হলাম। তৃতীয় রাতে—আমি উঠে পড়লাম।",
    "আস্তে আস্তে নিচে নেমে গেলাম। বাড়ির নিচতলায় একটা পুরনো ঘর আছে, যার তালা দাদুর সময় থেকেই ঝুলে আছে। আমি সেই তালার দিকে এগিয়ে গেলাম। গানের শব্দটা স্পষ্ট হচ্ছিল—একটা পুরনো রবীন্দ্রসংগীত। \"আমার সোনার বাংলা, আমি তোমায় ভালবাসি।\"",
    "তালাটা এমনিতেই ভঙ্গুর। হালকা ধাক্কায় খুলে গেল। ভেতরে ঢুকেই আমি থমকে দাঁড়ালাম। ঘরটা কিছুই পুরনো নয়। সব সাজানো—একটা ছোট্ট টেবিল, দুটো চেয়ার, আর দেয়ালজুড়ে ছবি। ছবিগুলোতে মুখ চেনা যায় না, কিন্তু চোখগুলো—চোখগুলো যেন জীবন্ত।",
    "টেবিলের ওপর একটা ডায়েরি পড়ে ছিল। পাতা উল্টাতেই আমার চোখ জলে ভরে গেল। সেখানে দাদুর হাতে লেখা—\"আমার আদরের নাতনি, তুমি একদিন ঠিক আসবে। এই ঘরটা আমি তোমার জন্যই সাজিয়েছি। এখানে আমার সব গল্প আছে, সব স্মৃতি। শোনো, রাতে যখন গান শুনবে—জানবে আমি আছি।\"",
    "আমি বুঝতে পারলাম—গানটা কোনো ভূতের নয়। ওটা দাদুর গ্রামোফোন—যেটা দাদু মরণান্তকালে চালু করে গেছিলেন, ঠিক যেন আমি আসব। ঘড়িটা সেট করা ছিল দশ বছর পরের জন্য।",
    "সেদিন থেকে আমি বাড়ি বিক্রি করিনি। প্রতি রাতে ওই গান শুনি, দাদুর ডায়েরি পড়ি। আর জানি—কেউ যখন তোমাকে ভালবাসে, সেই ভালবাসা সময়কেও হারায় না।",
  ],
};

const mockComments: Comment[] = [
  {
    id: "c1",
    user: "সুমন দাস",
    avatar: "সু",
    text: "অসাধারণ গল্প! শেষের বাক্যটি আমার চোখে জল এনেছে। দাদুর ভালবাসার কথা এভাবে বলা সত্যিই অসাধারণ।",
    time: "৩ ঘন্টা আগে",
    likes: 12,
  },
  {
    id: "c2",
    user: "আনিসুর রহমান",
    avatar: "আ",
    text: "রহস্য ও আবেগের চমৎকার মিশ্রণ। পড়া শুরু করলে থামা যায় না।",
    time: "৬ ঘন্টা আগে",
    likes: 8,
  },
  {
    id: "c3",
    user: "মাহমুদা আক্তার",
    avatar: "মা",
    text: "এরকম গল্প আরও লিখুন। আপনার লেখার ভাষা খুব সুন্দর।",
    time: "১ দিন আগে",
    likes: 5,
  },
  {
    id: "c4",
    user: "ফারহানা ইয়াসমিন",
    avatar: "ফা",
    text: "দাদুর ডায়েরির অংশটা পড়ে আমিও কেঁদে ফেলেছি। চমৎকার উপসংহার।",
    time: "২ দিন আগে",
    likes: 4,
  },
];

export default function StoryDetailPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(mockStory.likes);
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
          গল্প
        </Badge>
        <Badge
          variant="outline"
          className="text-xs border-secondary/30 text-secondary"
        >
          {mockStory.genre}
        </Badge>
      </motion.div>

      {/* Story Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <h1
          className="text-2xl sm:text-3xl font-bold leading-snug"
          style={{ fontFamily: "'Noto Sans Bengali', serif" }}
        >
          {mockStory.title}
        </h1>
      </motion.div>

      {/* Author Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-3 mb-8"
      >
        <Avatar className="w-11 h-11">
          <AvatarFallback className="bg-secondary/10 text-secondary font-semibold">
            {mockStory.author.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Link
            href={`/profile/${mockStory.authorUsername}`}
            className="font-semibold text-sm hover:text-secondary transition-colors"
          >
            {mockStory.author}
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
            <span>{mockStory.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {mockStory.readingTime}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {mockStory.views} বার পঠিত
            </span>
          </div>
        </div>
      </motion.div>

      {/* Story Content */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="mb-6"
      >
        <Card className="border-border/50 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            {/* Hero image placeholder */}
            <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-primary/5 via-muted/50 to-secondary/10 rounded-xl mb-8 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary/20" />
            </div>

            {/* Story body */}
            <div className="space-y-5">
              {mockStory.paragraphs.map((para, index) => (
                <p
                  key={index}
                  className="text-[15px] sm:text-base leading-[2] text-foreground/85 text-justify"
                  style={{ fontFamily: "'Noto Sans Bengali', serif" }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* End decoration */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <div className="w-8 h-px bg-secondary/30" />
              <div className="w-1 h-1 rounded-full bg-secondary/50" />
              <span
                className="text-muted-foreground/50 text-xs mx-2"
                style={{ fontFamily: "'Noto Sans Bengali', serif" }}
              >
                সমাপ্ত
              </span>
              <div className="w-1 h-1 rounded-full bg-secondary/50" />
              <div className="w-8 h-px bg-secondary/30" />
            </div>
          </CardContent>
        </Card>
      </motion.article>

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
            className="gap-1.5 text-xs text-muted-foreground hover:text-secondary"
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
                ? "text-amber hover:text-amber"
                : "text-muted-foreground hover:text-amber"
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
                <AvatarFallback className="bg-secondary/10 text-secondary text-xs">
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
                      <AvatarFallback className="bg-secondary/10 text-secondary text-xs">
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
