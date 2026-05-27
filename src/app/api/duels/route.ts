import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { challengerId, opponentId, type, prompt, acceptDays, votingDays } = body;

    if (!challengerId || !opponentId) {
      return NextResponse.json({ success: false, error: "উভয় পক্ষ প্রয়োজন" }, { status: 400 });
    }

    const now = new Date();
    const acceptDeadline = new Date(now.getTime() + (parseInt(acceptDays) || 3) * 86400000);
    const submissionDeadline = new Date(acceptDeadline.getTime() + 3 * 86400000);
    const votingDeadline = new Date(submissionDeadline.getTime() + (parseInt(votingDays) || 5) * 86400000);

    const duel = await db.duetChallenge.create({
      data: {
        challengerId,
        opponentId,
        type: type || "POEM",
        prompt: prompt || null,
        acceptDeadline,
        submissionDeadline,
        votingDeadline,
        status: "PENDING",
      },
    });

    await db.notification.create({
      data: {
        userId: opponentId,
        actorId: challengerId,
        type: "duel",
        message: "আপনাকে একটি দ্বন্দ্বে ডাক দেওয়া হয়েছে!",
      },
    });

    return NextResponse.json({ success: true, data: duel }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    const duels = await db.duetChallenge.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json({ success: true, data: duels });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
