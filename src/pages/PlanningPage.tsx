import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListTodo, Briefcase, Bookmark, Plus, Grid, LayoutList } from 'lucide-react';
import TodoList from '../components/planning/TodoList';
import ApplicationTracker from '../components/planning/ApplicationTracker';
import NotesSaver from '../components/planning/NotesSaver';
import NextPage from '../components/shared/NextPage';

const PlanningPage = () => {
  const [activeTab, setActiveTab] = useState<'todos' | 'apps' | 'notes'>('todos');

  const tabs = [
    { id: 'todos', label: 'Todo Strategy', icon: ListTodo },
    { id: 'apps', label: 'Job Pursuit', icon: Briefcase },
    { id: 'notes', label: 'Knowledge Base', icon: Bookmark },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif">Planning Desk</h1>
          <p className="text-charcoal/60 font-serif italic text-lg">Private dashboard for strategic personal management.</p>
        </div>
        
        <div className="flex bg-white shadow-sm border border-gold/10 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-2 transition-all duration-300 relative ${activeTab === tab.id ? 'text-white' : 'text-charcoal/40 hover:text-charcoal'}`}
            >
              <tab.icon size={16} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold z-10">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="planning-tab-bg" 
                  className="absolute inset-0 bg-charcoal"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <section className="bg-white/50 backdrop-blur-md border border-gold/10 min-h-[70vh] shadow-sm overflow-hidden relative">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12 h-full"
          >
            {activeTab === 'todos' && <TodoList />}
            {activeTab === 'apps' && <ApplicationTracker />}
            {activeTab === 'notes' && <NotesSaver />}
          </motion.div>
        </AnimatePresence>
      </section>

      <NextPage to="/" label="Exit to Home" />
    </div>
  );
};

export default PlanningPage;
