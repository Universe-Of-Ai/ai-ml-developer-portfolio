import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const duelId = searchParams.get("duelId");

    if (!duelId) {
      return NextResponse.json({ success: false, error: "duelId প্রয়োজন" }, { status: 400 });
    }

    const duel = await db.duetChallenge.findUnique({
      where: { id: duelId },
      include: {
        challenger: { select: { id: true, username: true, displayName: true, avatar: true } },
        opponent: { select: { id: true, username: true, displayName: true, avatar: true } },
      },
    });

    if (!duel) {
      return NextResponse.json({ success: false, error: "দ্বন্দ্ব পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: duel });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { duelId, action, userId } = body;

    if (!duelId) {
      return NextResponse.json({ success: false, error: "duelId প্রয়োজন" }, { status: 400 });
    }

    const duel = await db.duetChallenge.findUnique({ where: { id: duelId } });
    if (!duel) {
      return NextResponse.json({ success: false, error: "দ্বন্দ্ব পাওয়া যায়নি" }, { status: 404 });
    }

    if (action === "accept") {
      await db.duetChallenge.update({ where: { id: duelId }, data: { status: "SUBMISSION" } });
      return NextResponse.json({ success: true, message: "দ্বন্দ্ব গৃহীত!" });
    }
    if (action === "decline") {
      await db.duetChallenge.update({ where: { id: duelId }, data: { status: "CANCELLED" } });
      return NextResponse.json({ success: true, message: "দ্বন্দ্ব বাতিল" });
    }
    if (action === "vote") {
      const { choice } = body;
      if (!choice || !userId) {
        return NextResponse.json({ success: false, error: "ভোট ও ভোটার প্রয়োজন" }, { status: 400 });
      }
      const existing = await db.duetVote.findFirst({ where: { duelId, voterId: userId } });
      if (existing) {
        return NextResponse.json({ success: false, error: "ইতিমধ্যে ভোট দিয়েছেন" });
      }
      await db.duetVote.create({ data: { duelId, voterId: userId, choice } });
      if (choice === "challenger") {
        await db.duetChallenge.update({ where: { id: duelId }, data: { challengerVotes: { increment: 1 } } });
      } else {
        await db.duetChallenge.update({ where: { id: duelId }, data: { opponentVotes: { increment: 1 } } });
      }
      return NextResponse.json({ success: true, message: "ভোট দেওয়া হয়েছে!" });
    }

    return NextResponse.json({ success: false, error: "অবৈধ অ্যাকশন" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
