import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
