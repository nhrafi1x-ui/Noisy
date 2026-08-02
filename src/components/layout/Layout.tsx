import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion } from 'motion/react';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex selection:bg-gold selection:text-white">
      <Sidebar />
      <main className="flex-1 md:ml-20 mb-16 md:mb-0 relative">
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
