import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const createPostSchema = z.object({
  type: z.enum(["POEM", "STORY", "DIARY", "RECITATION"]),
  title: z.string().nullable(),
  body: z.string().min(1),
  bodyText: z.string().nullable(),
  tags: z.string().default("[]"),
  coverImage: z.string().nullable().optional(),
  videoUrl: z.string().nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  isAnonymous: z.boolean().default(false),
  visibility: z.enum(["PUBLIC", "FOLLOWERS", "PRIVATE"]).default("PUBLIC"),
  collaborationMode: z.enum(["CLOSED", "OPEN", "MODERATED"]).default("CLOSED"),
  anonAuthorId: z.string().nullable().optional(),
  authorId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "অবৈধ তথ্য" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    // Use provided authorId or a mock user ID for demo
    const authorId = data.authorId || "demo_user_001";

    const post = await db.post.create({
      data: {
        type: data.type,
        title: data.title,
        body: data.body,
        bodyText: data.bodyText,
        tags: data.tags,
        coverImage: data.coverImage || null,
        videoUrl: data.videoUrl || null,
        thumbnailUrl: data.thumbnailUrl || null,
        isAnonymous: data.isAnonymous,
        visibility: data.visibility,
        collaborationMode: data.collaborationMode,
        anonAuthorId: data.isAnonymous ? authorId : null,
        authorId: data.isAnonymous ? "anonymous" : authorId,
      },
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভারে সমস্যা হয়েছে";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {
      visibility: "PUBLIC",
    };

    if (type && type !== "ALL") {
      where.type = type;
    }

    const posts = await db.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভারে সমস্যা হয়েছে";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ success: false, error: "পোস্ট আইডি প্রয়োজন" }, { status: 400 });
    }

    // Delete related records first
    await db.reaction.deleteMany({ where: { postId } });
    await db.comment.deleteMany({ where: { postId } });
    await db.collaboration.deleteMany({ where: { poemId: postId } });
    await db.post.delete({ where: { id: postId } });

    return NextResponse.json({ success: true, message: "পোস্ট মুছে ফেলা হয়েছে" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভারে সমস্যা হয়েছে";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
