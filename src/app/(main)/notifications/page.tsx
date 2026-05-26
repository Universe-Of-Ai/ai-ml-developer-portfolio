"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  UserPlus,
  Heart,
  MessageCircle,
  AtSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Notification {
  id: string;
  type: "follow" | "like" | "comment" | "mention";
  user: string;
  message: string;
  time: string;
  read: boolean;
  href: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "follow",
    user: "রহিম আহমেদ",
    message: "আপনাকে ফলো করেছেন",
    time: "৫ মিনিট আগে",
    read: false,
    href: "/profile/rahamin-ahmed",
  },
  {
    id: "2",
    type: "like",
    user: "করিমা বেগম",
    message: "আপনার কবিতায় প্রতিক্রিয়া জানিয়েছেন",
    time: "১৫ মিনিট আগে",
    read: false,
    href: "/poem/demo-poem-1",
  },
  {
    id: "3",
    type: "comment",
    user: "সুমন দাস",
    message: "আপনার গল্পে মন্তব্য করেছেন",
    time: "১ ঘন্টা আগে",
    read: false,
    href: "/story/demo-story-1",
  },
  {
    id: "4",
    type: "follow",
    user: "নাসরিন সুলতানা",
    message: "আপনাকে ফলো করেছেন",
    time: "২ ঘন্টা আগে",
    read: true,
    href: "/profile/nasrin-sultana",
  },
  {
    id: "5",
    type: "like",
    user: "আনিসুর রহমান",
    message: "আপনার পোস্টে প্রতিক্রিয়া জানিয়েছেন",
    time: "৩ ঘন্টা আগে",
    read: true,
    href: "/poem/demo-poem-2",
  },
  {
    id: "6",
    type: "mention",
    user: "ফারহানা ইয়াসমিন",
    message: "আপনাকে একটি মন্তব্যে উল্লেখ করেছেন",
    time: "৫ ঘন্টা আগে",
    read: true,
    href: "/poem/demo-poem-3",
  },
  {
    id: "7",
    type: "comment",
    user: "তানভীর হাসান",
    message: "আপনার ভাবনায় মন্তব্য করেছেন",
    time: "৮ ঘন্টা আগে",
    read: true,
    href: "/story/demo-story-2",
  },
  {
    id: "8",
    type: "like",
    user: "মাহমুদা আক্তার",
    message: "আপনার আবৃত্তিতে প্রতিক্রিয়া জানিয়েছেন",
    time: "১ দিন আগে",
    read: true,
    href: "/recitations",
  },
];

const typeConfig: Record<
  Notification["type"],
  { icon: typeof Bell; color: string; bg: string; label: string }
> = {
  follow: {
    icon: UserPlus,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "ফলো",
  },
  like: {
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50",
    label: "পছন্দ",
  },
  comment: {
    icon: MessageCircle,
    color: "text-secondary",
    bg: "bg-secondary/10",
    label: "মন্তব্য",
  },
  mention: {
    icon: AtSign,
    color: "text-purple-500",
    bg: "bg-purple-50",
    label: "উল্লেখ",
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markOneRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">বিজ্ঞপ্তি</h1>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount}টি নতুন বিজ্ঞপ্তি`
                : "সব বিজ্ঞপ্তি পড়া হয়েছে"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
            onClick={markAllRead}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            সব পড়া হয়েছে
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          className="text-xs"
          onClick={() => setFilter("all")}
        >
          সব ({notifications.length})
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          size="sm"
          className="text-xs"
          onClick={() => setFilter("unread")}
        >
          অপঠিত
          {unreadCount > 0 && (
            <Badge className="ml-1.5 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notification List */}
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                কোনো বিজ্ঞপ্তি নেই
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                নতুন কার্যকলাপ হলে এখানে দেখাবে
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {filtered.map((notif, index) => {
                const config = typeConfig[notif.type];
                const Icon = config.icon;
                const initials = notif.user.slice(0, 2);

                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    <Link href={notif.href} onClick={() => markOneRead(notif.id)}>
                      <Card
                        className={`border-border/50 hover:shadow-sm transition-all cursor-pointer ${
                          !notif.read
                            ? "bg-primary/[0.03] border-primary/20"
                            : "hover:bg-muted/30"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback
                                  className={`${config.bg} ${config.color} text-sm font-medium`}
                                >
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full ${config.bg} flex items-center justify-center`}
                              >
                                <Icon className={`w-3 h-3 ${config.color}`} />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm leading-relaxed">
                                    <span className="font-semibold">
                                      {notif.user}
                                    </span>{" "}
                                    <span className="text-muted-foreground">
                                      {notif.message}
                                    </span>
                                  </p>
                                  <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                                    {notif.time}
                                  </p>
                                </div>
                                {/* Unread indicator */}
                                {!notif.read && (
                                  <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-1.5" />
                                )}
                              </div>
                            </div>

                            {/* Action badge */}
                            <Badge
                              variant="secondary"
                              className={`text-[10px] shrink-0 ${config.bg} ${config.color} border-0`}
                            >
                              {config.label}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}
