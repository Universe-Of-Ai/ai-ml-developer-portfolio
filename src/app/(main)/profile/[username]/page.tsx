"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserPlus,
  UserMinus,
  MapPin,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const mockUser = {
  username: "kobi_sahitto",
  displayName: "কবি সাহিত্য",
  bio: "কবিতা আমার শ্বাস, শব্দ আমার জীবন। বাংলা সাহিত্যের একটি ক্ষুদ্র সেবক।",
  avatar: "",
  isVerified: true,
  followersCount: 342,
  followingCount: 128,
  postsCount: 56,
  duelsWon: 3,
  joinedDate: "২০২৬ জানুয়ারি",
};

const tabs = [
  { key: "poems", label: "কবিতা" },
  { key: "stories", label: "গল্প" },
  { key: "recitations", label: "আবৃত্তি" },
  { key: "diary", label: "ভাবনা" },
  { key: "collabs", label: "সহযোগিতা" },
];

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Header Card */}
      <Card className="border-border/50 mb-4">
        <CardContent className="p-5">
          {/* Cover placeholder */}
          <div className="h-28 -mx-5 -mt-5 mb-4 bg-gradient-to-r from-primary via-secondary to-chart-3 rounded-t-xl" />

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 relative z-10">
            <Avatar className="w-20 h-20 border-4 border-white shadow-md">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                কস
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">
                  {mockUser.displayName}
                </h1>
                {mockUser.isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-white text-[10px] px-1.5 py-0"
                  >
                    যাচাইকৃত
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{mockUser.username}</p>
            </div>
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              className={
                isFollowing
                  ? ""
                  : "bg-primary hover:bg-primary/90"
              }
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? (
                <>
                  <UserMinus className="w-3.5 h-3.5 mr-1" />
                  অনুসরণ করছেন
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 mr-1" />
                  অনুসরণ করুন
                </>
              )}
            </Button>
          </div>

          {/* Bio */}
          <p className="text-sm text-foreground/80 mt-4 leading-relaxed">
            {mockUser.bio}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              যোগদান: {mockUser.joinedDate}
            </span>
            {mockUser.duelsWon > 0 && (
              <span className="flex items-center gap-1 text-secondary">
                <Award className="w-3.5 h-3.5" />
                {mockUser.duelsWon} দ্বন্দ্ব জয়
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {mockUser.postsCount}
              </p>
              <p className="text-[11px] text-muted-foreground">লেখা</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {mockUser.followersCount}
              </p>
              <p className="text-[11px] text-muted-foreground">অনুসারী</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {mockUser.followingCount}
              </p>
              <p className="text-[11px] text-muted-foreground">অনুসরণ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="poems" className="w-full">
        <TabsList className="w-full h-auto flex-wrap bg-muted/50 p-1 gap-0.5">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="flex-1 min-w-[80px] text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-12 text-center">
                <BookOpen className="w-10 h-10 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  এখনো কোনো {tab.label.toLowerCase()} নেই
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
