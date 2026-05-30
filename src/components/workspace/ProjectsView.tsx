'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  Clock,
  CheckCircle2,
  PauseCircle,
  Users,
  ChevronRight,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  progress: number;
  teamMembers: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; icon: typeof FolderOpen; color: string; bg: string }> = {
  active: {
    label: 'Active',
    icon: Clock,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20 border-emerald-500/30',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20 border-blue-500/30',
  },
  paused: {
    label: 'Paused',
    icon: PauseCircle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20 border-amber-500/30',
  },
};

const progressColor = (progress: number) => {
  if (progress >= 100) return 'from-emerald-500 to-emerald-400';
  if (progress >= 60) return 'from-violet-500 to-cyan-400';
  if (progress >= 30) return 'from-amber-500 to-amber-400';
  return 'from-red-500 to-red-400';
};

const agentColors = {
  diana: { bg: 'bg-violet-500/20', text: 'text-violet-400' },
  vexis: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
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

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/workspace/projects');
        const data = await res.json();
        setProjects(data);
      } catch {
        // empty
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <p className="text-sm text-gray-400 mt-1">{projects.length} total projects</p>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => {
          const status = statusConfig[project.status] || statusConfig.active;
          const members: string[] = JSON.parse(project.teamMembers || '[]');
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border border-gray-700/50 bg-[#111827] overflow-hidden transition-all cursor-pointer hover:border-gray-600/50 ${
                isExpanded ? 'ring-1 ring-violet-500/30' : ''
              }`}
              onClick={() => setExpandedId(isExpanded ? null : project.id)}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${status.bg} border flex items-center justify-center`}
                    >
                      <FolderOpen className={`w-5 h-5 ${status.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{project.name}</h3>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border ${status.bg} ${status.color}`}
                      >
                        <status.icon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-medium text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1F2937] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${progressColor(project.progress)}`}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {members.map((member) => (
                      <div
                        key={member}
                        className={`w-6 h-6 rounded-full ${agentColors[member as keyof typeof agentColors]?.bg} flex items-center justify-center`}
                      >
                        <span
                          className={`text-[10px] font-bold ${agentColors[member as keyof typeof agentColors]?.text}`}
                        >
                          {member[0].toUpperCase()}
                        </span>
                      </div>
                    ))}
                    <span className="text-[10px] text-gray-500 ml-1 flex items-center gap-0.5">
                      <Users className="w-3 h-3" /> {members.length}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500">{timeAgo(project.updatedAt)}</span>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && project.description && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-5 pb-5 border-t border-gray-700/30 pt-4"
                >
                  <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-[10px] text-gray-500">
                    <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                    <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
