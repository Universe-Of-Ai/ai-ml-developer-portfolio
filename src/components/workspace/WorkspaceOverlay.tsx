'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LayoutDashboard,
  ListTodo,
  MessageSquare,
  FolderKanban,
  BookOpen,
  Wifi,
} from 'lucide-react';

import DashboardView from './DashboardView';
import TasksView from './TasksView';
import CrossCommView from './CrossCommView';
import ProjectsView from './ProjectsView';
import KnowledgeView from './KnowledgeView';

interface WorkspaceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'cross-comm', label: 'Cross-Comm', icon: MessageSquare },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function WorkspaceOverlay({ isOpen, onClose }: WorkspaceOverlayProps) {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50"
          style={{ backgroundColor: '#0B0F1A' }}
        >
          {/* Top Navigation */}
          <header
            className="sticky top-0 z-10 border-b border-gray-700/50 backdrop-blur-xl"
            style={{ backgroundColor: 'rgba(11, 15, 26, 0.85)' }}
          >
            <div className="flex items-center justify-between px-4 lg:px-8 h-16">
              {/* Left: Title */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold text-white tracking-wide">
                    NEXUS <span className="text-gray-500">Command Center</span>
                  </h1>
                </div>
              </div>

              {/* Center: Tab Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-violet-500/15 text-violet-400'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-[#1F2937]/50'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Right: Agent Status + Close */}
              <div className="flex items-center gap-3">
                {/* Agent Status Indicators */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] border border-gray-700/30">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-violet-400">Diana</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] border border-gray-700/30">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-cyan-400">Vexis</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111827] border border-gray-700/30">
                    <Wifi className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-medium text-emerald-400">Live</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-[#111827] border border-gray-700/30 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1F2937] transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Tab Bar */}
            <nav className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-violet-500/15 text-violet-400'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </header>

          {/* Content */}
          <main className="px-4 lg:px-8 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <DashboardView />}
                {activeTab === 'tasks' && <TasksView />}
                {activeTab === 'cross-comm' && <CrossCommView />}
                {activeTab === 'projects' && <ProjectsView />}
                {activeTab === 'knowledge' && <KnowledgeView />}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
