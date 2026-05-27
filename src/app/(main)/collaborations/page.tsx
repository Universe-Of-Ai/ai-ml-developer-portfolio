"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Eye, Check, X, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";

interface OpenPoem {
  id: string;
  title: string | null;
  body: string;
  collaborationMode: string;
  author: { id: string; username: string; displayName: string; avatar: string | null };
  collaborations: { id: string; status: string }[];
  _count: { collaborations: number };
  createdAt: string;
}

interface Collaboration {
  id: string;
  poemId: string;
  stanzaBody: string;
  status: string;
  isAnonymous: boolean;
  createdAt: string;
  post: { id: string; title: string | null; body: string };
}

export default function CollaborationsPage() {
  const [poems, setPoems] = useState<OpenPoem[]>([]);
  const [recentCollabs, setRecentCollabs] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedPoem, setSelectedPoem] = useState<OpenPoem | null>(null);
  const [poemCollabs, setPoemCollabs] = useState<Collaboration[]>([]);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [stanza, setStanza] = useState("");
  const [isAnon, setIsAnon] = useState(false);

  useEffect(() => {
    fetchOpenPoems();
    fetchRecentCollabs();
  }, []);

  const fetchOpenPoems = async () => {
    try {
      const res = await fetch("/api/collaborations?mode=open");
      const data = await res.json();
      if (data.success) setPoems(data.data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  const fetchRecentCollabs = async () => {
    try {
      const res = await fetch("/api/collaborations");
      const data = await res.json();
      if (data.success) setRecentCollabs(data.data);
    } catch { /* silent */ }
  };

  const viewPoemCollabs = async (poem: OpenPoem) => {
    setSelectedPoem(poem);
    try {
      const res = await fetch(`/api/collaborations?poemId=${poem.id}`);
      const data = await res.json();
      if (data.success) setPoemCollabs(data.data);
    } catch { setPoemCollabs([]); }
  };

  const submitStanza = async () => {
    if (!stanza.trim() || !selectedPoem) return;
    try {
      const res = await fetch("/api/collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          poemId: selectedPoem.id,
          stanzaBody: stanza,
          contributorId: "demo_user_001",
          isAnonymous: isAnon,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.data.status === "APPROVED" ? "স্তবক যোগ হয়েছে!" : "স্তবক জমা হয়েছে! অনুমোদনের অপেক্ষায়।");
        setStanza("");
        setSubmitOpen(false);
        viewPoemCollabs(selectedPoem);
        fetchOpenPoems();
      }
    } catch { toast.error("সমস্যা হয়েছে"); }
  };

  const approveCollab = async (collabId: string) => {
    try {
      await fetch("/api/collaborations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collaborationId: collabId, status: "APPROVED" }),
      });
      toast.success("অনুমোদিত!");
      if (selectedPoem) viewPoemCollabs(selectedPoem);
      fetchRecentCollabs();
    } catch { toast.error("সমস্যা হয়েছে"); }
  };

  const rejectCollab = async (collabId: string) => {
    try {
      await fetch("/api/collaborations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collaborationId: collabId, status: "REJECTED" }),
      });
      toast.success("বাতিল হয়েছে");
      if (selectedPoem) viewPoemCollabs(selectedPoem);
      fetchRecentCollabs();
    } catch { toast.error("সমস্যা হয়েছে"); }
  };

  const statusLabels: Record<string, string> = {
    PENDING: "অপেক্ষমান",
    APPROVED: "অনুমোদিত",
    REJECTED: "বাতিল",
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  if (selectedPoem) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedPoem(null)} className="p-1.5 rounded-lg hover:bg-muted">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate">{selectedPoem.title || "শিরোনামহীন"}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                  {selectedPoem.author.displayName?.[0] || "ক"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{selectedPoem.author.displayName}</span>
              <Badge className="text-[10px] bg-blue-50 text-blue-700">
                {selectedPoem.collaborationMode === "OPEN" ? "খোলা" : "পর্যালোচিত"}
              </Badge>
            </div>
          </div>
          <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-1" /> স্তবক যোগ করুন
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন স্তবক জমা দিন</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <textarea
                  className="w-full min-h-[120px] p-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="আপনার স্তবক লিখুন..."
                  value={stanza}
                  onChange={(e) => setStanza(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <label className="text-sm cursor-pointer flex items-center gap-2">
                    <Switch checked={isAnon} onCheckedChange={setIsAnon} />
                    অজ্ঞাতনামা
                  </label>
                  <Button onClick={submitStanza} disabled={!stanza.trim()} className="bg-primary hover:bg-primary/90">
                    জমা দিন
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
            {selectedPoem.body.replace(/<[^>]*>/g, "")}
          </p>
        </div>

        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          সহযোগিতার স্তবক ({poemCollabs.filter(c => c.status === "APPROVED").length} অনুমোদিত)
        </h3>

        {poemCollabs.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">এখনো কোনো স্তবক জমা হয়নি</p>
          </div>
        ) : (
          <div className="space-y-2">
            {poemCollabs.filter(c => c.status === "APPROVED").map((collab) => (
              <Card key={collab.id} className="border-border/50 border-l-4 border-l-green-400">
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed whitespace-pre-line">{collab.stanzaBody}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">
                      {collab.isAnonymous ? "অজানা লেখক" : "সহযোগী"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(collab.createdAt).toLocaleDateString("bn-BD")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {poemCollabs.filter(c => c.status === "PENDING").map((collab) => (
              <Card key={collab.id} className="border-border/50 border-l-4 border-l-yellow-400 bg-yellow-50/30">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`text-[10px] ${statusColors[collab.status]}`}>
                      {statusLabels[collab.status]}
                    </Badge>
                    <div className="flex gap-1">
                      <button onClick={() => approveCollab(collab.id)} className="p-1 rounded hover:bg-green-100">
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                      <button onClick={() => rejectCollab(collab.id)} className="p-1 rounded hover:bg-red-100">
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{collab.stanzaBody}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-bold">সহযোগিতা</h1>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("open")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "open" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          খোলা কবিতা
        </button>
        <button
          onClick={() => setActiveTab("recent")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "recent" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          সাম্প্রতিক
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />)}</div>
      ) : activeTab === "open" ? (
        poems.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">কোনো খোলা কবিতা নেই</p>
            <p className="text-xs text-muted-foreground mt-1">কবিতা লেখার সময় সহযোগিতা মোড খুলুন</p>
          </div>
        ) : (
          <div className="space-y-3">
            {poems.map((poem) => (
              <Card key={poem.id} className="border-border/50 hover:shadow-sm transition-shadow cursor-pointer" onClick={() => viewPoemCollabs(poem)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                          {poem.author.displayName?.[0] || "ক"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{poem.author.displayName}</p>
                        <p className="text-[10px] text-muted-foreground">@{poem.author.username}</p>
                      </div>
                    </div>
                    <Badge className={`text-[10px] ${
                      poem.collaborationMode === "OPEN" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                    }`}>
                      {poem.collaborationMode === "OPEN" ? "খোলা" : "পর্যালোচিত"}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold mb-1">{poem.title || "শিরোনামহীন"}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {poem.body.replace(/<[^>]*>/g, "").substring(0, 120)}...
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {poem._count.collaborations} স্তবক</span>
                    <span>{new Date(poem.createdAt).toLocaleDateString("bn-BD")}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : (
        recentCollabs.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">কোনো সাম্প্রতিক সহযোগিতা নেই</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentCollabs.map((collab) => (
              <Card key={collab.id} className="border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Link href={`/profile`} className="text-xs font-medium text-primary hover:underline">
                      {collab.post.title || "কবিতা"}
                    </Link>
                    <Badge className={`text-[10px] ${statusColors[collab.status] || ""}`}>
                      {statusLabels[collab.status] || collab.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{collab.stanzaBody}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}
    </div>
  );
}
