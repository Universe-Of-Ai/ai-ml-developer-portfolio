import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const messages = await db.crossCommMessage.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sender, content } = body;

    if (!sender || !content) {
      return NextResponse.json(
        { error: 'Sender and content are required' },
        { status: 400 }
      );
    }

    const message = await db.crossCommMessage.create({
      data: { sender, content },
    });

    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
