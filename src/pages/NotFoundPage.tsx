import React from 'react';
import { motion } from 'motion/react';
import { Compass, House } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { GoldButton } from '../components/shared/UI';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="mb-8 text-gold opacity-20"
      >
        <Compass size={200} strokeWidth={0.5} />
      </motion.div>
      
      <h1 className="text-8xl font-serif text-charcoal mb-4">404</h1>
      <h2 className="text-3xl font-serif text-charcoal/60 mb-8 italic">Space not found in the architectural plan.</h2>
      
      <NavLink to="/">
        <GoldButton className="flex items-center gap-3">
          <House size={18} />
          Return to Sanctuary
        </GoldButton>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
