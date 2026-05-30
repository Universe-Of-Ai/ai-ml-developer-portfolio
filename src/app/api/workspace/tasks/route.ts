import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const tasks = await db.workspaceTask.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, status, priority, assignee, dueDate } = body;

    const maxOrder = await db.workspaceTask.findFirst({
      where: { status: status || 'backlog' },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const task = await db.workspaceTask.create({
      data: {
        title,
        description,
        status: status || 'backlog',
        priority: priority || 'medium',
        assignee: assignee || 'vexis',
        dueDate: dueDate ? new Date(dueDate) : null,
        order: (maxOrder?.order ?? -1) + 1,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
