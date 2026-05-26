"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DuetData {
  id: string;
  type: string;
  prompt: string | null;
  status: string;
  challengerVotes: number;
  opponentVotes: number;
  winnerId: string | null;
  createdAt: string;
  challenger: { id: string; username: string; displayName: string; avatar: string | null };
  opponent: { id: string; username: string; displayName: string; avatar: string | null };
}

export default function DuetPage({ params }: { params: Promise<{ id: string }> }) {
  const [duel, setDuel] = useState<DuetData | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetchDuel(p.id);
    });
  }, [params]);

  const fetchDuel = async (duelId: string) => {
    try {
      const res = await fetch(`/api/duels/${duelId}`);
      const data = await res.json();
      if (data.success) setDuel(data.data);
    } catch { /* silent */ }
    finally {
      setLoading(false);
    }
  };

  const handleVote = async (choice: string) => {
    if (hasVoted) return;
    try {
      const res = await fetch(`/api/duels/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duelId: id, action: "vote", userId: "voter_001", choice }),
      });
      const data = await res.json();
      if (data.success) {
        setHasVoted(true);
        toast.success("ভোট দেওয়া হয়েছে!");
        fetchDuel(id);
      } else {
        toast.error(data.error || "ভোটে সমস্যা");
      }
    } catch {
      toast.error("সমস্যা হয়েছে");
    }
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!duel) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">দ্বন্দ্ব পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/duels" className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="text-lg font-bold">
          {duel.type === "POEM" ? "কবিতা দ্বন্দ্ব" : "গল্প দ্বন্দ্ব"}
        </h1>
      </div>

      {duel.prompt && (
        <Card className="border-border/50 mb-4">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">প্রম্পট</p>
            <p className="text-sm font-medium">{duel.prompt}</p>
          </CardContent>
        </Card>
      )}

      {/* Voting Cards - Side by Side on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Challenger Side */}
        <Card
          className={`border-2 transition-all cursor-pointer ${
            hasVoted ? "" : "border-border hover:border-primary hover:shadow-md"
          } ${hasVoted ? "border-muted/30 opacity-70" : ""}`}
          onClick={() => !hasVoted && handleVote("challenger")}
        >
          <CardContent className="p-5">
            <div className="text-center mb-3">
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">পক্ষ ১</span>
            </div>
            <div className="text-center min-h-[120px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">প্রতিযোগিতার কাজ এখানে দেখাবে</p>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">{duel.challenger?.displayName}</p>
              <p className="text-lg font-bold text-primary">{duel.challengerVotes}</p>
            </div>
          </CardContent>
        </Card>

        {/* VS */}
        <div className="hidden md:flex items-center justify-center">
          <Badge variant="outline" className="text-lg font-bold px-4 py-2">VS</Badge>
        </div>

        {/* Opponent Side */}
        <Card
          className={`border-2 transition-all cursor-pointer ${
            hasVoted ? "" : "border-border hover:border-amber hover:shadow-md"
          } ${hasVoted ? "border-muted/30 opacity-70" : ""}`}
          onClick={() => !hasVoted && handleVote("opponent")}
        >
          <CardContent className="p-5">
            <div className="text-center mb-3">
              <span className="text-xs bg-amber-50 text-amber px-3 py-1 rounded-full font-medium">পক্ষ ২</span>
            </div>
            <div className="text-center min-h-[120px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">প্রতিপক্ষের কাজ এখানে দেখাবে</p>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">{duel.opponent?.displayName}</p>
              <p className="text-lg font-bold text-amber">{duel.opponentVotes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vote Button for Mobile */}
      <div className="md:hidden flex gap-3 mb-4">
        <Button
          variant="outline"
          className="flex-1 border-primary text-primary"
          disabled={hasVoted}
          onClick={() => handleVote("challenger")}
        >
          পক্ষ ১ ({duel.challengerVotes})
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-amber text-amber"
          disabled={hasVoted}
          onClick={() => handleVote("opponent")}
        >
          পক্ষ ২ ({duel.opponentVotes})
        </Button>
      </div>

      {hasVoted && (
        <div className="text-center text-sm text-muted-foreground">
          ✅ আপনার ভোট দেওয়া হয়েছে
        </div>
      )}

      {duel.status === "COMPLETED" && duel.winnerId && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="font-bold text-primary text-sm">বিজয়ী!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
