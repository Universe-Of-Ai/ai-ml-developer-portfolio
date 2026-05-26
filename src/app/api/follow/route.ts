import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { followerId, followingId } = body;

    if (!followerId || !followingId) {
      return NextResponse.json({ success: false, error: "উভয় আইডি প্রয়োজন" }, { status: 400 });
    }

    if (followerId === followingId) {
      return NextResponse.json({ success: false, error: "নিজেকে অনুসরণ করা যায় না" }, { status: 400 });
    }

    const existing = await db.follow.findFirst({
      where: { followerId, followingId },
    });

    if (existing) {
      await db.follow.delete({ where: { id: existing.id } });
      await db.user.update({
        where: { id: followerId },
        data: { followingCount: { decrement: 1 } },
      });
      await db.user.update({
        where: { id: followingId },
        data: { followersCount: { decrement: 1 } },
      });
      return NextResponse.json({ success: true, action: "unfollowed" });
    } else {
      await db.follow.create({
        data: { followerId, followingId },
      });
      await db.user.update({
        where: { id: followerId },
        data: { followingCount: { increment: 1 } },
      });
      await db.user.update({
        where: { id: followingId },
        data: { followersCount: { increment: 1 } },
      });
      return NextResponse.json({ success: true, action: "followed" });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
