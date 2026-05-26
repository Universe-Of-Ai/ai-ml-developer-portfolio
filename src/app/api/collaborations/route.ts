import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Fetch collaborations (by poemId, or list open poems)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const poemId = searchParams.get("poemId");
    const mode = searchParams.get("mode"); // "open" to list open-for-collab poems

    if (poemId) {
      // Get collaborations for a specific poem
      const collaborations = await db.collaboration.findMany({
        where: { poemId },
        orderBy: { createdAt: "desc" },
        include: {
          post: {
            select: { title: true, body: true },
          },
        },
      });
      return NextResponse.json({ success: true, data: collaborations });
    }

    if (mode === "open") {
      // List poems open for collaboration
      const poems = await db.post.findMany({
        where: {
          collaborationMode: { in: ["OPEN", "MODERATED"] },
          visibility: "PUBLIC",
        },
        orderBy: { createdAt: "desc" },
        take: 30,
        include: {
          author: {
            select: { id: true, username: true, displayName: true, avatar: true },
          },
          collaborations: {
            select: { id: true, status: true },
          },
          _count: {
            select: { collaborations: true },
          },
        },
      });
      return NextResponse.json({ success: true, data: poems });
    }

    // Default: recent collaborations
    const collaborations = await db.collaboration.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        post: {
          select: { id: true, title: true, body: true },
        },
      },
    });
    return NextResponse.json({ success: true, data: collaborations });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { poemId, stanzaBody, contributorId, isAnonymous } = body;

    if (!poemId || !stanzaBody) {
      return NextResponse.json({ success: false, error: "কবিতা ও স্তবক প্রয়োজন" }, { status: 400 });
    }

    // Check poem collaboration mode
    const poem = await db.post.findUnique({ where: { id: poemId } });
    if (!poem) {
      return NextResponse.json({ success: false, error: "কবিতা পাওয়া যায়নি" }, { status: 404 });
    }

    const status = poem.collaborationMode === "OPEN" ? "APPROVED" : "PENDING";

    const collab = await db.collaboration.create({
      data: {
        poemId,
        stanzaBody,
        contributorId: contributorId || "demo_user_001",
        anonContributorId: isAnonymous ? (contributorId || "demo_user_001") : null,
        isAnonymous: isAnonymous || false,
        status,
      },
    });

    return NextResponse.json({ success: true, data: collab }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { collaborationId, status } = body;

    if (!collaborationId || !status) {
      return NextResponse.json({ success: false, error: "আইডি ও স্ট্যাটাস প্রয়োজন" }, { status: 400 });
    }

    await db.collaboration.update({
      where: { id: collaborationId },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
