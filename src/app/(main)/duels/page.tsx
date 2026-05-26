"use client";

import { useState, useEffect } from "react";
import { Swords, Plus, Clock, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";

interface Duet {
  id: string;
  type: string;
  prompt: string | null;
  status: string;
  challengerVotes: number;
  opponentVotes: number;
  winnerId: string | null;
  challengerId: string;
  opponentId: string;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  PENDING: "অপেক্ষমান",
  SUBMISSION: "জমা",
  VOTING: "ভোটিং",
  COMPLETED: "সম্পন্ন",
  CANCELLED: "বাতিল",
  FORFEITED: "পরাজিত",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  SUBMISSION: "bg-blue-100 text-blue-800",
  VOTING: "bg-green-100 text-green-800",
  COMPLETED: "bg-purple-100 text-purple-800",
  CANCELLED: "bg-gray-100 text-gray-600",
  FORFEITED: "bg-red-100 text-red-800",
};

export default function DuelsPage() {
  const [duels, setDuels] = useState<Duet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [form, setForm] = useState({ type: "POEM", prompt: "", acceptDays: "3", votingDays: "5", isAnonymous: false });

  useEffect(() => {
    fetchDuels();
  }, []);

  const fetchDuels = async () => {
    try {
      const res = await fetch("/api/duels");
      const data = await res.json();
      if (data.success) setDuels(data.data);
    } catch { /* silent */ }
    finally {
      setLoading(false);
    }
  };

  const filteredDuels = duels.filter((d) => {
    if (activeTab === "active") return ["VOTING"].includes(d.status);
    if (activeTab === "pending") return ["PENDING", "SUBMISSION"].includes(d.status);
    return ["COMPLETED", "CANCELLED", "FORFEITED"].includes(d.status);
  });

  const createChallenge = async () => {
    try {
      const res = await fetch("/api/duels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengerId: "demo_user_001",
          opponentId: "demo_user_002",
          type: form.type,
          prompt: form.prompt || null,
          acceptDays: parseInt(form.acceptDays),
          votingDays: parseInt(form.votingDays),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("দ্বন্দ্ব তৈরি হয়েছে!");
        setChallengeOpen(false);
        fetchDuels();
      }
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}ঘ আগে`;
    return `${Math.floor(hours / 24)}দিন আগে`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Swords className="w-5 h-5 text-primary" /> দ্বন্দ্ব এরিনা
        </h1>
        <Dialog open={challengeOpen} onOpenChange={setChallengeOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-1" /> নতুন দ্বন্দ্ব
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>দ্বন্দ্বে ডাক</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label>ধরন</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="POEM">কবিতা</SelectItem>
                    <SelectItem value="STORY">গল্প</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>থিম / প্রম্পট (ঐচ্ছিক)</Label>
                <Input placeholder="বিষয় বা প্রম্পট..." value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>গ্রহণের সময় (দিন)</Label>
                  <Input type="number" min={1} max={7} value={form.acceptDays} onChange={(e) => setForm({ ...form, acceptDays: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>ভোটিং সময় (দিন)</Label>
                  <Input type="number" min={1} max={7} value={form.votingDays} onChange={(e) => setForm({ ...form, votingDays: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm cursor-pointer">বেনামী</Label>
                <Switch checked={form.isAnonymous} onCheckedChange={(v) => setForm({ ...form, isAnonymous: v })} />
              </div>
              <Button onClick={createChallenge} className="w-full bg-primary hover:bg-primary/90">
                দ্বন্দ্ব পাঠান
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
        <TabsList className="w-full bg-muted/50 p-1 gap-0.5">
          <TabsTrigger value="active" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">চলমান</TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">অপেক্ষমান</TabsTrigger>
          <TabsTrigger value="past" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">অতীত</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />)}</div>
      ) : filteredDuels.length === 0 ? (
        <div className="text-center py-16">
          <Swords className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">কোনো দ্বন্দ্ব নেই</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDuels.map((duel) => (
            <Card key={duel.id} className="border-border/50 hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-[11px] px-2 py-0 ${statusColors[duel.status] || ""}`}>
                    {statusLabels[duel.status] || duel.status}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">{timeAgo(duel.createdAt)}</span>
                </div>
                {duel.prompt && (
                  <p className="text-sm text-foreground/80 mb-2 bg-muted/50 rounded-lg px-3 py-2">
                    📝 {duel.prompt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{duel.type === "POEM" ? "কবিতা" : "গল্প"}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>🔴 {duel.challengerVotes}</span>
                    <span>🔵 {duel.opponentVotes}</span>
                  </div>
                </div>
                {duel.status === "VOTING" && (
                  <Link href={`/duels/${duel.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                      ভোট দিন →
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
