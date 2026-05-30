'use client';

import { useEffect, useState } from 'react';
import {
  FolderOpen,
  ListTodo,
  MessageSquare,
  Activity,
  Plus,
  Send,
  FileText,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ActivityLog {
  id: string;
  agent: string;
  action: string;
  details?: string;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  assignee: string;
}

interface Message {
  id: string;
  sender: string;
  createdAt: string;
}

interface Project {
  id: string;
  status: string;
}

const agentColors = {
  diana: { bg: 'bg-violet-500/20', text: 'text-violet-400', ring: 'ring-violet-500' },
  vexis: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', ring: 'ring-cyan-500' },
};

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export default function DashboardView() {
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [actRes, taskRes, msgRes, projRes] = await Promise.all([
          fetch('/api/workspace/activity'),
          fetch('/api/workspace/tasks'),
          fetch('/api/workspace/messages'),
          fetch('/api/workspace/projects'),
        ]);
        const [actData, taskData, msgData, projData] = await Promise.all([
          actRes.json(),
          taskRes.json(),
          msgRes.json(),
          projRes.json(),
        ]);
        setActivity(actData);
        setTasks(taskData);
        setMessages(msgData);
        setProjects(projData);
      } catch {
        // fallback to empty
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const pendingTasks = tasks.filter(
    (t) => t.status === 'backlog' || t.status === 'todo'
  ).length;
  const messagesToday = messages.length;

  const stats = [
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: FolderOpen,
      color: 'from-violet-500/20 to-violet-600/10',
      iconColor: 'text-violet-400',
      border: 'border-violet-500/20',
    },
    {
      label: 'Pending Tasks',
      value: pendingTasks,
      icon: ListTodo,
      color: 'from-amber-500/20 to-amber-600/10',
      iconColor: 'text-amber-400',
      border: 'border-amber-500/20',
    },
    {
      label: 'Messages Today',
      value: messagesToday,
      icon: MessageSquare,
      color: 'from-cyan-500/20 to-cyan-600/10',
      iconColor: 'text-cyan-400',
      border: 'border-cyan-500/20',
    },
    {
      label: 'System Uptime',
      value: '99.8%',
      icon: Activity,
      color: 'from-emerald-500/20 to-emerald-600/10',
      iconColor: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
  ];

  const quickActions = [
    { label: 'New Task', icon: Plus, color: 'hover:border-violet-500/50 hover:bg-violet-500/10' },
    { label: 'Send Message', icon: Send, color: 'hover:border-cyan-500/50 hover:bg-cyan-500/10' },
    { label: 'New Project', icon: FolderOpen, color: 'hover:border-emerald-500/50 hover:bg-emerald-500/10' },
    { label: 'Add Note', icon: FileText, color: 'hover:border-amber-500/50 hover:bg-amber-500/10' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border ${stat.border} bg-gradient-to-br ${stat.color} p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 rounded-xl border border-gray-700/50 bg-[#111827] p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Recent Activity
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {activity.map((item, i) => {
              const colors = agentColors[item.agent as keyof typeof agentColors] || agentColors.vexis;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#1F2937]/50 hover:bg-[#1F2937] transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center shrink-0 ring-2 ${colors.ring}/30`}
                  >
                    <span className={`text-xs font-bold ${colors.text}`}>
                      {item.agent[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">
                      <span className={`font-semibold ${colors.text}`}>{item.agent}</span>{' '}
                      <span className="text-gray-500">{item.action}</span>
                    </p>
                    {item.details && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{item.details}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 shrink-0">
                    {timeAgo(item.createdAt)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Agent Status Panel */}
        <div className="space-y-4">
          {(['diana', 'vexis'] as const).map((agent, i) => {
            const colors = agentColors[agent];
            const currentTasks = tasks.filter((t) => t.assignee === agent && (t.status === 'in_progress'));
            const latestActivity = activity.find((a) => a.agent === agent);

            return (
              <motion.div
                key={agent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-xl border border-gray-700/50 bg-[#111827] p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center ring-2 ${colors.ring}/30`}
                  >
                    <span className={`text-lg font-bold ${colors.text}`}>
                      {agent[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white capitalize">{agent}</h4>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400">Online • Working</span>
                    </div>
                  </div>
                </div>

                {currentTasks.length > 0 ? (
                  <div className="mb-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Current Task</span>
                    <p className="text-sm text-gray-300 mt-1">{currentTasks[0].title}</p>
                  </div>
                ) : (
                  <div className="mb-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Current Task</span>
                    <p className="text-sm text-gray-500 mt-1 italic">No active task</p>
                  </div>
                )}

                {latestActivity && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Last Active</span>
                    <p className="text-sm text-gray-400 mt-1">{timeAgo(latestActivity.createdAt)}</p>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-gray-700/50 bg-[#111827] p-5"
          >
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={`flex items-center gap-2 p-3 rounded-lg border border-gray-700/50 bg-[#1F2937]/50 text-sm text-gray-300 transition-all ${action.color} cursor-pointer`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
