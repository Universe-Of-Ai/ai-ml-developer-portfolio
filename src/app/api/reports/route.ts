import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reporterId, targetType, targetId, category, reason } = body;

    if (!targetType || !targetId) {
      return NextResponse.json({ success: false, error: "টার্গেট প্রয়োজন" }, { status: 400 });
    }

    const report = await db.report.create({
      data: {
        reporterId: reporterId || "demo_user_001",
        targetType: targetType || "post",
        targetId,
        category: category || "OTHER",
        reason: reason || null,
      },
    });

    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reports = await db.report.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, data: reports });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
