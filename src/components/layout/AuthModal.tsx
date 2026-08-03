import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Sign-in error in modal:', err);
      if (err?.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setError(`Firebase Auth Domain Error: '${domain}' is not added to Authorized Domains in Firebase Console. (Firebase Console -> Auth -> Settings -> Authorized Domains)`);
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed before completing authentication.');
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Sign in failed. Please try again.');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-cream p-8 shadow-2xl border border-gold/20 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 -translate-x-2 translate-y-2 pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-serif text-charcoal">Owner Access Only</h2>
            <p className="text-sm text-charcoal/60 italic font-serif">
              "This private sanctuary is reserved for the architect of these thoughts."
            </p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-4 border border-gold/40 bg-white hover:bg-gold/5 transition-all duration-300 text-charcoal font-medium shadow-sm active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign In as NH Rafi
            </button>

            {error && (
              <p className="text-red-500 text-xs text-center font-mono">
                {error}
              </p>
            )}

            <div className="pt-4 border-t border-charcoal/10 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
                Unauthorized access is strictly limited by the core architecture.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
