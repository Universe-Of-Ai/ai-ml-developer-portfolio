import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo_user_001";

    // Get all threads for this user
    const sent = await db.message.findMany({
      where: { senderId: userId },
      select: { threadId: true, recipientId: true, isAnonymous: true },
      distinct: ["threadId"],
      orderBy: { createdAt: "desc" },
    });

    const received = await db.message.findMany({
      where: { recipientId: userId },
      select: { threadId: true, senderId: true, isAnonymous: true },
      distinct: ["threadId"],
      orderBy: { createdAt: "desc" },
    });

    // Combine and deduplicate threads
    const threadMap = new Map<string, { otherId: string; isAnonymous: boolean; lastMsg: string; lastTime: string }>();
    for (const m of sent) {
      if (!threadMap.has(m.threadId)) {
        threadMap.set(m.threadId, { otherId: m.recipientId, isAnonymous: m.isAnonymous, lastMsg: "", lastTime: "" });
      }
    }
    for (const m of received) {
      if (!threadMap.has(m.threadId)) {
        threadMap.set(m.threadId, { otherId: m.senderId, isAnonymous: m.isAnonymous, lastMsg: "", lastTime: "" });
      }
    }

    // Get last message for each thread
    const threads = await Promise.all(
      Array.from(threadMap.keys()).map(async (threadId) => {
        const lastMsg = await db.message.findFirst({
          where: { threadId },
          orderBy: { createdAt: "desc" },
        });
        return {
          threadId,
          ...threadMap.get(threadId)!,
          lastMsg: lastMsg?.body || "",
          lastTime: lastMsg?.createdAt || "",
        };
      })
    );

    threads.sort((a, b) => new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime());

    return NextResponse.json({ success: true, data: threads });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderId, recipientId, threadId, content, isAnonymous } = body;

    if (!recipientId || !content) {
      return NextResponse.json({ success: false, error: "প্রাপক ও বার্তা প্রয়োজন" }, { status: 400 });
    }

    const thread = threadId || `${[senderId, recipientId].sort().join("_")}`;

    const message = await db.message.create({
      data: {
        threadId: thread,
        senderId: senderId || "demo_user_001",
        recipientId,
        anonSenderId: isAnonymous ? (senderId || "demo_user_001") : null,
        isAnonymous: isAnonymous || false,
        body: content,
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId: recipientId,
        actorId: isAnonymous ? null : (senderId || "demo_user_001"),
        type: "message",
        message: "আপনার একটি নতুন বার্তা এসেছে",
      },
    });

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
