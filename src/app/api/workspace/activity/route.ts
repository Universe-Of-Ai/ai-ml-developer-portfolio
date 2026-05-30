import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const logs = await db.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json(logs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch activity logs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent, action, details } = body;

    if (!agent || !action) {
      return NextResponse.json(
        { error: 'Agent and action are required' },
        { status: 400 }
      );
    }

    const log = await db.activityLog.create({
      data: { agent, action, details },
    });

    return NextResponse.json(log, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create activity log' }, { status: 500 });
  }
}
