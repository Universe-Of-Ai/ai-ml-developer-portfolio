import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const createUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  username: z.string().regex(/^[a-zA-Z0-9_]{3,20}$/),
  displayName: z.string().min(2).max(50),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "অবৈধ তথ্য। সকল ক্ষেত্র সঠিকভাবে পূরণ করুন।" },
        { status: 400 }
      );
    }

    const { id, email, username, displayName } = parsed.data;

    // Check if username already exists
    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "এই ব্যবহারকারীর নামটি ইতিমধ্যে নেওয়া হয়েছে।" },
        { status: 409 }
      );
    }

    const user = await db.user.create({
      data: { id, email, username, displayName },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভারে সমস্যা হয়েছে";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (username) {
      const user = await db.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
          bio: true,
          isVerified: true,
          followersCount: true,
          followingCount: true,
          duelsWon: true,
          createdAt: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: "ব্যবহারকারী পাওয়া যায়নি" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: user });
    }

    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        displayName: true,
        avatar: true,
        isVerified: true,
      },
      take: 20,
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভারে সমস্যা হয়েছে";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
