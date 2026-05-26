"use client";

import { useState, useEffect } from "react";
import { Shield, Users, FileText, Flag, Eye, Trash2, Check, X, Ban, UserCheck, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface ReportData {
  id: string;
  reporterId: string;
  targetType: string;
  targetId: string;
  category: string;
  reason: string | null;
  status: string;
  createdAt: string;
}

interface UserData {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar: string | null;
  bio: string | null;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
  _count: { posts: number };
}

interface PostData {
  id: string;
  type: string;
  title: string | null;
  body: string;
  visibility: string;
  isAnonymous: boolean;
  reactionsCount: number;
  commentsCount: number;
  createdAt: string;
  author: { id: string; username: string; displayName: string; avatar: string | null } | null;
}

export default function AdminPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    Promise.all([fetchReports(), fetchUsers(), fetchPosts()]).then(() => setLoading(false));
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      if (data.success) setReports(data.data);
    } catch { /* silent */ }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch { /* silent */ }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?limit=50");
      const data = await res.json();
      if (data.success) setPosts(data.data);
    } catch { /* silent */ }
  };

  const resolveReport = async (reportId: string) => {
    try {
      await fetch("/api/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, status: "resolved" }),
      });
      toast.success("রিপোর্ট সমাধান হয়েছে");
      fetchReports();
    } catch { toast.error("সমস্যা হয়েছে"); }
  };

  const dismissReport = async (reportId: string) => {
    try {
      await fetch("/api/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, status: "dismissed" }),
      });
      toast.success("রিপোর্ট বাতিল হয়েছে");
      fetchReports();
    } catch { toast.error("সমস্যা হয়েছে"); }
  };

  const deleteReport = async (reportId: string) => {
    try {
      await fetch(`/api/reports?id=${reportId}`, { method: "DELETE" });
      toast.success("রিপোর্ট মুছে ফেলা হয়েছে");
      fetchReports();
    } catch { toast.error("সমস্যা হয়েছে"); }
  };

  const deletePost = async (postId: string) => {
    try {
      await fetch(`/api/posts`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      toast.success("পোস্ট মুছে ফেলা হয়েছে");
      fetchPosts();
    } catch { toast.error("সমস্যা হয়েছে"); }
  };

  const pendingReports = reports.filter((r) => r.status === "pending");
  const categories: Record<string, string> = {
    SPAM: "স্প্যাম", INAPPROPRIATE: "অনুচিত", HARASSMENT: "হয়রাসন", PLAGIARISM: "চুরি", OTHER: "অন্যান্য",
  };

  const typeLabels: Record<string, string> = {
    POEM: "কবিতা", STORY: "গল্প", DIARY: "ভাবনা", RECITATION: "আবৃত্তি",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <Shield className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
        <TabsList className="w-full bg-muted/50 p-1 gap-0.5 overflow-x-auto">
          <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-xs">
            <BarChart3 className="w-3.5 h-3.5 mr-1" /> ওভারভিউ
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-xs">
            রিপোর্ট ({pendingReports.length})
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-xs">
            <Users className="w-3.5 h-3.5 mr-1" /> ব্যবহারকারী
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-xs">
            <FileText className="w-3.5 h-3.5 mr-1" /> পোস্ট
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />)}</div>
      ) : (
        <>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-xs text-muted-foreground">মোট ব্যবহারকারী</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{posts.length}</p>
                  <p className="text-xs text-muted-foreground">মোট পোস্ট</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <Flag className="w-8 h-8 text-destructive mx-auto mb-2" />
                  <p className="text-2xl font-bold">{pendingReports.length}</p>
                  <p className="text-xs text-muted-foreground">অমীমাংসিত রিপোর্ট</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{users.filter(u => u.isVerified).length}</p>
                  <p className="text-xs text-muted-foreground">যাচাইকৃত ব্যবহারকারী</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            reports.length === 0 ? (
              <div className="text-center py-16">
                <Flag className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">কোনো রিপোর্ট নেই</p>
              </div>
            ) : (
              <div className="space-y-2">
                {reports.map((report) => (
                  <Card key={report.id} className="border-border/50">
                    <CardContent className="flex items-center gap-3 p-3">
                      <Badge
                        variant={report.status === "pending" ? "destructive" : "secondary"}
                        className="text-[10px] shrink-0"
                      >
                        {report.status === "pending" ? "নতুন" : report.status === "resolved" ? "সমাধান" : "বাতিল"}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium">{report.targetType === "post" ? "পোস্ট" : report.targetType} #{report.targetId.substring(0, 8)}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {categories[report.category] || report.category} · {report.reason || "কারণ উল্লেখ নেই"}
                        </p>
                      </div>
                      {report.status === "pending" && (
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => resolveReport(report.id)} title="সমাধান">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => dismissReport(report.id)} title="বাতিল">
                            <Ban className="w-3.5 h-3.5 text-amber-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => deleteReport(report.id)} title="মুছুন">
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            users.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">কোনো ব্যবহারকারী নেই</p>
              </div>
            ) : (
              <div className="space-y-2">
                {users.map((user) => (
                  <Card key={user.id} className="border-border/50">
                    <CardContent className="flex items-center gap-3 p-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {user.displayName?.[0] || "ক"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium truncate">{user.displayName}</p>
                          {user.isVerified && <Badge className="text-[9px] bg-blue-50 text-blue-700 px-1.5">যাচাইকৃত</Badge>}
                          {user.isAdmin && <Badge className="text-[9px] bg-purple-50 text-purple-700 px-1.5">অ্যাডমিন</Badge>}
                        </div>
                        <p className="text-[11px] text-muted-foreground">@{user.username} · {user._count?.posts || 0} পোস্ট</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {new Date(user.createdAt).toLocaleDateString("bn-BD")}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}

          {/* Posts Tab */}
          {activeTab === "posts" && (
            posts.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">কোনো পোস্ট নেই</p>
              </div>
            ) : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <Card key={post.id} className="border-border/50">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Badge className="text-[9px] bg-muted text-muted-foreground">{typeLabels[post.type] || post.type}</Badge>
                            {post.isAnonymous && <Badge className="text-[9px] bg-amber-50 text-amber-700">অজ্ঞাত</Badge>}
                            <Badge className="text-[9px] bg-muted text-muted-foreground">{post.visibility}</Badge>
                          </div>
                          <p className="text-sm font-medium truncate">{post.title || "শিরোনামহীন"}</p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">{post.body.replace(/<[^>]*>/g, "").substring(0, 80)}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs h-7 shrink-0 text-destructive" onClick={() => deletePost(post.id)} title="মুছুন">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-muted-foreground">
                          {post.author ? post.author.displayName : "অজ্ঞাত"} · {post.reactionsCount} ❤️ · {post.commentsCount} 💬
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString("bn-BD")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
