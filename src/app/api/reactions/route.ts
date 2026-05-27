import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, userId, type, isAnonymous } = body;

    if (!postId || !type) {
      return NextResponse.json({ success: false, error: "পোস্ট ও প্রতিক্রিয়ার ধরন প্রয়োজন" }, { status: 400 });
    }

    // Check if reaction already exists
    const existing = await db.reaction.findFirst({
      where: { postId, userId: userId || "anonymous", type },
    });

    if (existing) {
      // Remove reaction
      await db.reaction.delete({ where: { id: existing.id } });
      await db.post.update({
        where: { id: postId },
        data: { reactionsCount: { decrement: 1 } },
      });
      return NextResponse.json({ success: true, action: "removed" });
    } else {
      // Add reaction
      await db.reaction.create({
        data: {
          postId,
          userId: userId || "anonymous",
          type,
          isAnonymous: isAnonymous || false,
        },
      });
      await db.post.update({
        where: { id: postId },
        data: { reactionsCount: { increment: 1 } },
      });
      return NextResponse.json({ success: true, action: "added" });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
