import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, authorId, body: commentBody, parentCommentId, isAnonymous } = body;

    if (!postId || !commentBody) {
      return NextResponse.json({ success: false, error: "পোস্ট ও মন্তব্য প্রয়োজন" }, { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        postId,
        authorId: authorId || "demo_user_001",
        body: commentBody,
        parentCommentId: parentCommentId || null,
        isAnonymous: isAnonymous || false,
        anonAuthorId: isAnonymous ? (authorId || "demo_user_001") : null,
      },
    });

    await db.post.update({
      where: { id: postId },
      data: { commentsCount: { increment: 1 } },
    });

    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ success: false, error: "postId প্রয়োজন" }, { status: 400 });
    }

    const comments = await db.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
          select: { id: true, username: true, displayName: true, avatar: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: comments });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
