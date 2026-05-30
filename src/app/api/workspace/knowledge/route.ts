import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const docs = await db.knowledgeDoc.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(docs);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch knowledge docs' },
      { status: 500 }
    );
  }
}
