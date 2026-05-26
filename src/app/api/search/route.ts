import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.length < 2) {
      return NextResponse.json({ success: true, data: { posts: [], users: [] } });
    }

    const query = q.toLowerCase();

    // Search posts
    const posts = await db.post.findMany({
      where: {
        visibility: "PUBLIC",
        OR: [
          { title: { contains: q } },
          { bodyText: { contains: q } },
          { tags: { contains: q } },
        ],
      },
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        type: true,
        title: true,
        bodyText: true,
        createdAt: true,
        reactionsCount: true,
        commentsCount: true,
      },
    });

    // Search users
    const users = await db.user.findMany({
      where: {
        OR: [
          { username: { contains: q } },
          { displayName: { contains: q } },
        ],
      },
      take: 10,
      select: {
        id: true,
        username: true,
        displayName: true,
        avatar: true,
        isVerified: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: { posts, users },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
