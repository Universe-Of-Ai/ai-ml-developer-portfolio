"use client";

import { useState, useEffect } from "react";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: string;
  actorId: string | null;
  message: string | null;
  read: boolean;
  createdAt: string;
}

const typeIcons: Record<string, string> = {
  follow: "অনুসরণ করেছেন",
  reaction: "আপনার লেখায় প্রতিক্রিয়া দিয়েছেন",
  comment: "মন্তব্য করেছেন",
  message: "নতুন বার্তা এসেছে",
  duel: "দ্বন্দ্বে ডাক দিয়েছেন",
};

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) fetchNotifs();
  }, [open]);

  const fetchNotifs = async () => {
    try {
      const res = await fetch("/api/notifications?userId=demo_user_001");
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data.notifications);
        setUnreadCount(data.data.unreadCount);
      }
    } catch { /* silent */ }
  };

  const markAllRead = async () => {
    await fetch("/api/notifications?userId=demo_user_001", { method: "PATCH" });
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "৯+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 max-h-96 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <h3 className="text-sm font-bold">বিজ্ঞপ্তি</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllRead}>
              <Check className="w-3 h-3 mr-1" /> সব পড়া
            </Button>
          )}
        </div>
        <div className="overflow-y-auto max-h-72">
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">কোনো বিজ্ঞপ্তি নেই</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notif.read ? "bg-primary/5" : ""
                }`}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {notif.actorId ? "ক" : "অ"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-relaxed">
                    {notif.actorId ? (
                      <>
                        <span className="font-medium">{notif.actorId === "demo_user_001" ? "ডেমো কবি" : "কেউ একজন"}</span>{" "}
                        {typeIcons[notif.type] || "একটি কাজ করেছেন"}
                      </>
                    ) : (
                      <span className="font-medium">{notif.message || typeIcons[notif.type]}</span>
                    )}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
