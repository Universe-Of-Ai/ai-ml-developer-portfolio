'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return 'Today';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function CrossCommView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sender] = useState<'diana' | 'vexis'>('diana');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/workspace/messages');
      const data = await res.json();
      setMessages(data);
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/workspace/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, content: input.trim() }),
      });
      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setInput('');
    } catch {
      // empty
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = '';
  messages.forEach((msg) => {
    const date = formatDate(msg.createdAt);
    if (date !== currentDate) {
      currentDate = date;
      groupedMessages.push({ date, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[75vh]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {groupedMessages.map((group) => (
          <div key={group.date}>
            {/* Date separator */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-700/50" />
              <span className="text-xs text-gray-500 font-medium">{group.date}</span>
              <div className="flex-1 h-px bg-gray-700/50" />
            </div>

            {group.messages.map((msg) => {
              const isDiana = msg.sender === 'diana';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${isDiana ? '' : 'flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ring-2 ${
                      isDiana
                        ? 'bg-violet-500/20 ring-violet-500/30'
                        : 'bg-cyan-500/20 ring-cyan-500/30'
                    }`}
                  >
                    <Bot
                      className={`w-4 h-4 ${isDiana ? 'text-violet-400' : 'text-cyan-400'}`}
                    />
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[70%] ${isDiana ? '' : 'items-end'}`}>
                    <div
                      className={`flex items-center gap-2 mb-1 ${isDiana ? '' : 'flex-row-reverse'}`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          isDiana ? 'text-violet-400' : 'text-cyan-400'
                        }`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-gray-600">{formatTime(msg.createdAt)}</span>
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm text-gray-200 leading-relaxed ${
                        isDiana
                          ? 'bg-violet-500/10 border border-violet-500/20 rounded-tl-sm'
                          : 'bg-cyan-500/10 border border-cyan-500/20 rounded-tr-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 pt-4 border-t border-gray-700/30">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Message as ${sender}...`}
              className="w-full px-4 py-3 rounded-xl bg-[#1F2937] border border-gray-700/50 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-3 h-3 rounded-full bg-violet-500/30 ring-1 ring-violet-500/50" />
          <span className="text-[10px] text-gray-500">Chatting as Diana</span>
        </div>
      </div>
    </div>
  );
}
