import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo_user_001";

    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    return NextResponse.json({ success: true, data: { notifications, unreadCount } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, actorId, type, postId, message } = body;

    const notif = await db.notification.create({
      data: {
        userId: userId || "demo_user_001",
        actorId: actorId || null,
        type: type || "reaction",
        postId: postId || null,
        message: message || null,
      },
    });

    return NextResponse.json({ success: true, data: notif }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo_user_001";

    await db.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
