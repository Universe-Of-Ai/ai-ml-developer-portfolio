'use client';

import { BLOG_POSTS } from '@/lib/data';
import BlogCard from '@/components/BlogCard';
import FadeIn from '@/components/FadeIn';

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const otherPosts = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="pt-28 pb-24 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3">
              Blog
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#f5f5f5]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Stories & Insights
            </h1>
            <p className="text-[#888] mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              Thoughts on photography, creative process, and the art of seeing.
            </p>
          </div>
        </FadeIn>

        {/* Featured Post */}
        {featuredPost && (
          <FadeIn>
            <section className="mb-16">
              <BlogCard {...featuredPost} />
            </section>
          </FadeIn>
        )}

        {/* Gold divider */}
        <div className="gold-line mb-16" />

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {otherPosts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 100}>
              <BlogCard {...post} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
