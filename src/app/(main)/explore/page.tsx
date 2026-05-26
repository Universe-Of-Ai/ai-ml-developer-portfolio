"use client";

import { useState } from "react";
import { Search, BookOpen, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const typeLabels: Record<string, string> = {
  POEM: "কবিতা",
  STORY: "গল্প",
  DIARY: "ভাবনা",
};

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ posts: unknown[]; users: unknown[] }>({
    posts: [],
    users: [],
  });
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || query.length < 2) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) setResults(data.data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-4">অনুসন্ধান</h1>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="কবিতা, গল্প, লেখক খুঁজুন..."
          className="pl-9 bg-muted/50 border-border"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {!loading && searched && results.posts.length === 0 && results.users.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">কোনো ফলাফল পাওয়া যায়নি</p>
        </div>
      )}

      {!loading && results.users.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-muted-foreground mb-2">ব্যবহারকারী</h2>
          <div className="space-y-2">
            {results.users.map((u: Record<string, unknown>) => (
              <Card key={u.id as string} className="border-border/50">
                <CardContent className="flex items-center gap-3 p-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={u.avatar as string || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {(u.displayName as string || "?").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{u.displayName as string}</p>
                    <p className="text-xs text-muted-foreground">@{u.username as string}</p>
                  </div>
                  {u.isVerified && (
                    <Badge variant="secondary" className="text-[10px] bg-secondary text-white">যাচাইকৃত</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!loading && results.posts.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-muted-foreground mb-2">লেখা</h2>
          <div className="space-y-2">
            {results.posts.map((p: Record<string, unknown>) => (
              <Card key={p.id as string} className="border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium">{p.title as string || "(শিরোনামহীন)"}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {(p.bodyText as string || "").substring(0, 100)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                      {typeLabels[p.type as string] || p.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
