import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface NextPageProps {
  to: string;
  label: string;
}

const NextPage = ({ to, label }: NextPageProps) => {
  return (
    <div className="pt-24 pb-12 flex justify-center">
      <NavLink to={to} className="group relative">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-mono text-charcoal/40 group-hover:text-gold transition-colors duration-500">
            Continue to
          </span>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-6xl font-serif text-charcoal group-hover:text-gold transition-colors duration-500">
              {label}
            </h2>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-gold"
            >
              <ArrowRight size={32} strokeWidth={1} />
            </motion.div>
          </div>
          <div className="w-0 group-hover:w-full h-px bg-gold transition-all duration-700" />
        </motion.div>
      </NavLink>
    </div>
  );
};

export default NextPage;
