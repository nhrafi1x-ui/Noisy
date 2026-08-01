import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Mail, Diamond, LayoutDashboard, Lock, LogOut, Sun, Moon, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'About', path: '/about' },
    { icon: Diamond, label: 'Showcase', path: '/showcase' },
    { icon: MessageSquare, label: 'My Thinking', path: '/thinking' },
    { icon: Mail, label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed left-0 top-0 h-full w-20 bg-charcoal flex flex-col items-center py-8 z-50 md:flex hidden">
        <div className="mb-12">
          <motion.div 
            initial={{ rotate: -45 }}
            animate={{ rotate: 0 }}
            className="w-10 h-10 border-2 border-gold flex items-center justify-center text-gold font-serif font-bold text-xl"
          >
            R
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          {menuItems.map((item) => (
            <SidebarIcon key={item.path} icon={item.icon} label={item.label} path={item.path} />
          ))}

          {user ? (
            <SidebarIcon icon={LayoutDashboard} label="Only For The Owner" path="/planning" />
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="group relative p-3 text-[#8E9299] hover:text-gold transition-colors duration-300"
            >
              <Lock size={24} />
              <Tooltip label="Only For The Owner" />
            </button>
          )}
        </div>

        <div className="mt-auto flex flex-col items-center gap-6">
          {user && (
            <button 
              onClick={logout}
              className="text-[#8E9299] hover:text-red-400 transition-colors duration-300"
            >
              <LogOut size={20} />
            </button>
          )}
          <div className="w-px h-12 bg-gold/30" />
          <div className="w-8 h-8 rounded-full border border-gold/50 bg-charcoal flex items-center justify-center overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" />
            ) : (
              <div className="w-full h-full bg-gold/10" />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-charcoal flex items-center justify-around md:hidden z-50 border-t border-gold/10 px-2 overflow-x-auto">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => `p-2 shrink-0 ${isActive ? 'text-gold' : 'text-[#8E9299]'}`}
          >
            <item.icon size={20} />
          </NavLink>
        ))}
        {user ? (
          <NavLink to="/planning" className={({ isActive }) => `p-2 shrink-0 ${isActive ? 'text-gold' : 'text-[#8E9299]'}`}>
            <LayoutDashboard size={20} />
          </NavLink>
        ) : (
          <button onClick={() => setIsAuthModalOpen(true)} className="p-2 text-[#8E9299] shrink-0">
            <Lock size={20} />
          </button>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

const SidebarIcon = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => (
  <NavLink 
    to={path}
    className={({ isActive }) => `group relative p-3 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-[#8E9299] hover:text-gold'}`}
  >
    {({ isActive }) => (
      <>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <Tooltip label={label} />
        {isActive && (
          <motion.div 
            layoutId="active-pill"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-r-full"
          />
        )}
      </>
    )}
  </NavLink>
);

const Tooltip = ({ label }: { label: string }) => (
  <span className="absolute left-20 top-1/2 -translate-y-1/2 bg-charcoal text-gold px-3 py-1 text-sm font-serif border border-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[100] shadow-xl">
    {label}
  </span>
);

export default Sidebar;
