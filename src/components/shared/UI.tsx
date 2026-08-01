import React from 'react';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'outline' | 'fill';
}

export const GoldButton = ({ children, variant = 'outline', className = '', ...props }: GoldButtonProps) => {
  return (
    <button 
      className={`gold-button ${variant === 'fill' ? 'bg-gold text-white' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, color = 'gold', className = '' }: { children: React.ReactNode, color?: 'gold' | 'red' | 'green' | 'orange', className?: string }) => {
  const colors = {
    gold: 'border-gold/30 text-gold bg-gold/5',
    red: 'border-red-500/30 text-red-500 bg-red-500/5',
    green: 'border-green-500/30 text-green-500 bg-green-500/5',
    orange: 'border-orange-500/30 text-orange-500 bg-orange-500/5',
  };

  return (
    <span className={`px-2 py-0.5 border text-[10px] uppercase tracking-widest font-mono ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};

export const Loader = () => (
  <div className="flex items-center justify-center p-12">
    <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);
