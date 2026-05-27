import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  category,
  date,
  readTime,
  featured = false,
}: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="group block">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden mb-6">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em]">
                {category}
              </span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/50 text-xs">{date}</span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/50 text-xs">{readTime}</span>
            </div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl text-white leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {title}
            </h2>
            <p className="text-white/60 text-sm mt-3 max-w-xl">{excerpt}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="relative h-56 overflow-hidden mb-4">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em]">
            {category}
          </span>
          <span className="text-[#555] text-xs">·</span>
          <span className="text-[#888] text-xs">{date}</span>
          <span className="text-[#555] text-xs">·</span>
          <span className="text-[#888] text-xs">{readTime}</span>
        </div>
        <h3
          className="text-lg text-[#f5f5f5] leading-snug mb-2 group-hover:text-[#d4af37] transition-colors duration-300"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {title}
        </h3>
        <p className="text-[#888] text-sm leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
