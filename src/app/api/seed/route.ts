import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "seed") {
      const existing = await db.user.findFirst({
        where: { username: "demo_kobi" },
      });
      if (existing) {
        return NextResponse.json({ success: true, message: "ডেমো ডেটা আছে" });
      }

      await db.user.create({
        data: {
          id: "demo_user_001",
          email: "demo@bangla.kobi",
          username: "demo_kobi",
          displayName: "ডেমো কবি",
          bio: "কবিতার আঙিনার ডেমো ব্যবহারকারী।",
          isVerified: true,
        },
      });

      const posts = [
        {
          type: "POEM",
          title: "নদীর কাছে",
          body: "<p>নদীর ধারে একা বসে আছি,</p><p>জলের গান শুনছি নীরবে।</p><p>ঢেউয়ের মতো মন আমার,</p><p>খেলা করে অবিরত।</p>",
          bodyText: "নদীর ধারে একা বসে আছি, জলের গান শুনছি নীরবে।",
          tags: JSON.stringify(["নদী", "প্রকৃতি", "একাকীত্ব"]),
          visibility: "PUBLIC",
          authorId: "demo_user_001",
        },
        {
          type: "POEM",
          title: null,
          body: "<p>আকাশ জুড়ে মেঘের ছুটো,</p><p>বৃষ্টি আসবে কবে ভাবি?</p><p>মাটির গন্ধ মনে পড়ে,</p><p>ছেলেবেলার সেই বারি।</p>",
          bodyText: "আকাশ জুড়ে মেঘের ছুটো, বৃষ্টি আসবে কবে ভাবি?",
          tags: JSON.stringify(["বৃষ্টি", "স্মৃতি"]),
          visibility: "PUBLIC",
          authorId: "demo_user_001",
          isAnonymous: true,
          anonAuthorId: "demo_user_001",
        },
        {
          type: "STORY",
          title: "পুরোনো ডায়েরি",
          body: "<p>দাদুর আলমারি থেকে একটা পুরোনো ডায়েরি পেলাম। হলদেটে পাতাগুলো ভাঁজ হয়ে আছে।</p><p>প্রথম পাতায় লেখা — \"১৯৭১, মার্চ। আজ আকাশটা অন্যরকম লাগছে...\"</p>",
          bodyText: "দাদুর আলমারি থেকে একটা পুরোনো ডায়েরি পেলাম।",
          tags: JSON.stringify(["গল্প", "স্মৃতি", "১৯৭১"]),
          visibility: "PUBLIC",
          authorId: "demo_user_001",
        },
      ];

      for (const post of posts) {
        await db.post.create({ data: post });
      }

      return NextResponse.json({ success: true, message: "ডেমো তৈরি হয়েছে" });
    }

    return NextResponse.json({ success: false, error: "অবৈধ অ্যাকশন" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "সার্ভার সমস্যা";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
