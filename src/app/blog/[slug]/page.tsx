import { BLOG_POSTS } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Marcus Photography`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen text-center">
        <h1 className="text-2xl text-[#f5f5f5]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Post Not Found
        </h1>
        <Link href="/blog" className="text-[#d4af37] mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Cover Image */}
      <div className="relative h-[50vh] md:h-[60vh] mt-20">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[700px] mx-auto px-6 pb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em]">
                {post.category}
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-[#f5f5f5] leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <article className="max-w-[700px] mx-auto px-6 py-12">
        {/* Meta info */}
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2 text-[#888] text-sm">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#888] text-sm">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose-photographer"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#1f1f1f]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#888] text-xs uppercase tracking-[0.15em] hover:text-[#d4af37] transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
