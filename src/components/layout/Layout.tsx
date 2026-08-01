import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex selection:bg-gold selection:text-white">
      <Sidebar />
      <main className="flex-1 md:ml-20 mb-16 md:mb-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="p-4 md:p-8 lg:p-12 min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
