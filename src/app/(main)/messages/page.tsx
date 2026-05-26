"use client";

import { useState, useEffect } from "react";
import { Send, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Thread {
  threadId: string;
  otherId: string;
  isAnonymous: boolean;
  lastMsg: string;
  lastTime: string;
}

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ body: string; senderId: string; isAnonymous: boolean; createdAt: string }[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const res = await fetch("/api/messages?userId=demo_user_001");
      const data = await res.json();
      if (data.success) setThreads(data.data);
    } catch { /* silent */ }
    finally {
      setLoading(false);
    }
  };

  const openThread = async (thread: Thread) => {
    setActiveThread(thread.threadId);
    try {
      const res = await fetch(`/api/messages?threadId=${thread.threadId}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch { /* silent */ }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !activeThread) return;

    const thread = threads.find((t) => t.threadId === activeThread);
    if (!thread) return;

    setMessages((prev) => [
      ...prev,
      { body: newMsg, senderId: "demo_user_001", isAnonymous: isAnon, createdAt: new Date().toISOString() },
    ]);

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: "demo_user_001",
          recipientId: thread.otherId,
          threadId: activeThread,
          content: newMsg,
          isAnonymous: isAnon,
        }),
      });
    } catch { /* silent */ }

    setNewMsg("");
  };

  const timeAgo = (dateStr: string) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}ম`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}ঘ`;
    return `${Math.floor(hours / 24)}দিন`;
  };

  if (activeThread) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <button onClick={() => setActiveThread(null)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {threads.find((t) => t.threadId === activeThread)?.isAnonymous ? "অ" : "ক"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              {threads.find((t) => t.threadId === activeThread)?.isAnonymous ? "অজানা কেউ" : "ব্যবহারকারী"}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-thin">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">এখনো কোনো বার্তা নেই। প্রথম বার্তা পাঠান!</p>
            </div>
          )}
          {messages.map((msg, i) => {
            const isMine = msg.senderId === "demo_user_001";
            return (
              <div key={i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    isMine
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  <p>{msg.body}</p>
                  {msg.isAnonymous && !isMine && (
                    <p className="text-[10px] opacity-70 mt-0.5">অজানা প্রেরক</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <Switch checked={isAnon} onCheckedChange={setIsAnon} />
            <span className="text-xs text-muted-foreground">অজ্ঞাতনামা</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="বার্তা লিখুন..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button size="icon" onClick={sendMessage} className="bg-primary hover:bg-primary/90 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-4">বার্তা</h1>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />)}</div>
      ) : threads.length === 0 ? (
        <div className="text-center py-16">
          <Send className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">কোনো বার্তা নেই</p>
          <p className="text-xs text-muted-foreground mt-1">প্রোফাইল থেকে কাউকে বার্তা পাঠান</p>
        </div>
      ) : (
        <div className="space-y-2">
          {threads.map((thread) => (
            <Card
              key={thread.threadId}
              className="border-border/50 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => openThread(thread)}
            >
              <CardContent className="flex items-center gap-3 p-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {thread.isAnonymous ? "অ" : "ক"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {thread.isAnonymous ? "অজানা কেউ" : "ব্যবহারকারী"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{thread.lastMsg}</p>
                </div>
                {thread.isAnonymous && (
                  <Badge variant="secondary" className="text-[10px] bg-secondary/20 text-secondary shrink-0">অজানা</Badge>
                )}
                <span className="text-[10px] text-muted-foreground">{timeAgo(thread.lastTime)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
