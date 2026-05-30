'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Palette,
  Code,
  Users,
  Rocket,
  FileText,
  BookOpen,
} from 'lucide-react';

interface KnowledgeDoc {
  id: string;
  title: string;
  content: string;
  category: string;
  excerpt?: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Code,
  Users,
  Rocket,
  FileText,
  BookOpen,
};

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  design: {
    label: 'Design',
    color: 'text-pink-400',
    bg: 'bg-pink-500/20 border-pink-500/30',
  },
  engineering: {
    label: 'Engineering',
    color: 'text-violet-400',
    bg: 'bg-violet-500/20 border-violet-500/30',
  },
  protocol: {
    label: 'Protocol',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20 border-cyan-500/30',
  },
  devops: {
    label: 'DevOps',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20 border-amber-500/30',
  },
  content: {
    label: 'Content',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20 border-emerald-500/30',
  },
};

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function KnowledgeView() {
  const [docs, setDocs] = useState<KnowledgeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch('/api/workspace/knowledge');
        const data = await res.json();
        setDocs(data);
      } catch {
        // empty
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  const filteredDocs = docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1F2937] border border-gray-700/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        />
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc, i) => {
          const cat = categoryConfig[doc.category] || categoryConfig.content;
          const IconComponent = iconMap[doc.icon] || FileText;
          const isExpanded = expandedId === doc.id;

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border border-gray-700/50 bg-[#111827] p-5 cursor-pointer hover:border-gray-600/50 transition-all ${
                isExpanded ? 'ring-1 ring-violet-500/30' : ''
              }`}
              onClick={() => setExpandedId(isExpanded ? null : doc.id)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-lg ${cat.bg} border flex items-center justify-center shrink-0`}
                >
                  <IconComponent className={`w-5 h-5 ${cat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">{doc.title}</h3>
                  </div>
                  <span
                    className={`inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded border ${cat.bg} ${cat.color} mb-2`}
                  >
                    {cat.label}
                  </span>
                  {doc.excerpt && (
                    <p className="text-xs text-gray-500 leading-relaxed">{doc.excerpt}</p>
                  )}
                  <div className="mt-2 text-[10px] text-gray-600">{timeAgo(doc.updatedAt)}</div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-4 pt-4 border-t border-gray-700/30"
                >
                  <div className="prose prose-invert prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-xs text-gray-400 font-sans bg-[#1F2937] rounded-lg p-4 overflow-x-auto">
                      {doc.content}
                    </pre>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {search ? 'No documents found matching your search.' : 'No documents available.'}
          </p>
        </div>
      )}
    </div>
  );
}
