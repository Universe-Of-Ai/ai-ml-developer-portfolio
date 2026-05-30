'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical, Trash2, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate?: string;
  order: number;
}

const columns = [
  { id: 'backlog', label: 'Backlog', color: 'border-gray-500' },
  { id: 'todo', label: 'To Do', color: 'border-amber-500' },
  { id: 'in_progress', label: 'In Progress', color: 'border-violet-500' },
  { id: 'done', label: 'Done', color: 'border-emerald-500' },
] as const;

const priorityConfig = {
  high: { label: 'High', className: 'bg-red-500/20 text-red-400 border border-red-500/30' },
  medium: { label: 'Medium', className: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
  low: { label: 'Low', className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
};

const agentColors = {
  diana: 'bg-violet-500/20 text-violet-400 ring-violet-500',
  vexis: 'bg-cyan-500/20 text-cyan-400 ring-cyan-500',
};

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formColumn, setFormColumn] = useState('backlog');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: 'vexis',
    dueDate: '',
  });
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/workspace/tasks');
      const data = await res.json();
      setTasks(data);
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async () => {
    if (!formData.title.trim()) return;
    try {
      await fetch('/api/workspace/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: formColumn }),
      });
      await fetchTasks();
      setFormData({ title: '', description: '', priority: 'medium', assignee: 'vexis', dueDate: '' });
      setShowForm(false);
    } catch {
      // empty
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`/api/workspace/tasks/${id}`, { method: 'DELETE' });
      await fetchTasks();
    } catch {
      // empty
    }
  };

  const handleDrop = async (status: string) => {
    if (!draggedTask) return;
    try {
      await fetch(`/api/workspace/tasks/${draggedTask}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await fetchTasks();
    } catch {
      // empty
    } finally {
      setDraggedTask(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Task Creation Dialog */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111827] border border-gray-700/50 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">New Task</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-300 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Task title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1F2937] border border-gray-700/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <textarea
                  placeholder="Description (optional)..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1F2937] border border-gray-700/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none h-20"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="px-4 py-2.5 rounded-lg bg-[#1F2937] border border-gray-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <select
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    className="px-4 py-2.5 rounded-lg bg-[#1F2937] border border-gray-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  >
                    <option value="diana">Diana</option>
                    <option value="vexis">Vexis</option>
                  </select>
                </div>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1F2937] border border-gray-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <button
                  onClick={handleCreateTask}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm hover:from-violet-500 hover:to-cyan-500 transition-all cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[60vh]">
        {columns.map((column, colIdx) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);
          return (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIdx * 0.1 }}
              className={`rounded-xl border ${column.color} border-opacity-30 bg-[#111827]/50 flex flex-col`}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('bg-[#111827]');
                e.currentTarget.classList.add('ring-2', 'ring-violet-500/30');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('ring-2', 'ring-violet-500/30');
              }}
              onDrop={(e) => {
                e.currentTarget.classList.remove('ring-2', 'ring-violet-500/30');
                handleDrop(column.id);
              }}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-gray-700/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${column.color.replace('border-', 'bg-')}`} />
                  <h3 className="text-sm font-semibold text-gray-300">{column.label}</h3>
                  <span className="text-xs text-gray-500 bg-[#1F2937] px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFormColumn(column.id);
                    setShowForm(true);
                  }}
                  className="w-7 h-7 rounded-lg hover:bg-[#1F2937] flex items-center justify-center text-gray-500 hover:text-violet-400 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[55vh]">
                <AnimatePresence>
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      draggable
                      onDragStart={() => setDraggedTask(task.id)}
                      onDragEnd={() => setDraggedTask(null)}
                      className={`rounded-lg border border-gray-700/30 bg-[#1F2937]/80 p-3.5 cursor-grab active:cursor-grabbing hover:border-gray-600/50 hover:bg-[#1F2937] transition-all group ${
                        draggedTask === task.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <GripVertical className="w-3.5 h-3.5 text-gray-600" />
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                              priorityConfig[task.priority as keyof typeof priorityConfig]?.className
                            }`}
                          >
                            {priorityConfig[task.priority as keyof typeof priorityConfig]?.label}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-sm font-medium text-white mb-1.5 leading-snug">{task.title}</h4>
                      {task.description && (
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ring-2 ring-opacity-30 ${
                            agentColors[task.assignee as keyof typeof agentColors]
                          }`}
                        >
                          <span className="text-[10px] font-bold">
                            {task.assignee[0].toUpperCase()}
                          </span>
                        </div>
                        {task.dueDate && (
                          <span className="text-[10px] text-gray-500">{formatDate(task.dueDate)}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-600 text-xs">No tasks</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
