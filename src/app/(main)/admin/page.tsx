"use client";

import { useState, useEffect } from "react";
import { Shield, Users, FileText, Flag, Eye, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function AdminPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("reports");

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      if (data.success) setReports(data.data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  const pendingReports = reports.filter((r) => r.status === "pending");
  const categories: Record<string, string> = {
    SPAM: "স্প্যাম", INAPPROPRIATE: "অনুচিত", HARASSMENT: "হয়রাসন", PLAGIARISM: "চুরি", OTHER: "অন্যান্য",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <Shield className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
        <TabsList className="w-full bg-muted/50 p-1 gap-0.5">
          <TabsTrigger value="reports" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
            রিপোর্ট ({pendingReports.length})
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
            <Users className="w-4 h-4 mr-1" /> ব্যবহারকারী
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
            <FileText className="w-4 h-4 mr-1" /> পোস্ট
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "reports" && (
        loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />)}</div>
        ) : reports.length === 0 ? (
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
                    {report.status === "pending" ? "নতুন" : report.status === "resolved" ? "সমাধান" : "পর্যালোচিত"}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{report.targetType === "post" ? "পোস্ট" : report.targetType} #{report.targetId.substring(0, 8)}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {categories[report.category] || report.category} · {report.reason || "কারণ উল্লেখ নেই"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs"><Eye className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="sm" className="text-xs text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}

      {activeTab === "users" && (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">ব্যবহারকারী তালিকা এখানে দেখাবে</p>
        </div>
      )}

      {activeTab === "posts" && (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">সকল পোস্ট তালিকা এখানে দেখাবে</p>
        </div>
      )}
    </div>
  );
}
