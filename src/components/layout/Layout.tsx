import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion } from 'motion/react';
import { NothingLoadingScreen } from '../shared/NothingLoadingScreen';

const Layout = () => {
  const location = useLocation();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  return (
    <div className="min-h-screen flex selection:bg-gold selection:text-white relative">
      {/* 3D Nothing Phone / AirPods Inspired Loading Screen */}
      {showLoadingScreen && (
        <NothingLoadingScreen onComplete={() => setShowLoadingScreen(false)} />
      )}

      <Sidebar onTriggerLoader={() => setShowLoadingScreen(true)} />

      <main className="flex-1 md:ml-20 mb-16 md:mb-0 relative">
        {/* Floating Nothing Glyph Control to easily trigger loader */}
        <button
          onClick={() => setShowLoadingScreen(true)}
          title="Re-play 3D Nothing OS Loader"
          className="fixed top-4 right-4 z-40 bg-charcoal/90 border border-gold/30 backdrop-blur-md px-3 py-1.5 rounded-full text-gold hover:bg-gold hover:text-charcoal transition-all shadow-lg flex items-center gap-2 text-[10px] font-mono tracking-wider cursor-pointer group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="font-bold tracking-widest">NOTHING // OS</span>
        </button>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="p-4 sm:p-6 md:p-8 lg:p-12 pb-24 md:pb-12 min-h-screen"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
