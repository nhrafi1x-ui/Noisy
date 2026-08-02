import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Code2, Brain, Sparkles, Radio, Zap, X } from 'lucide-react';

interface NothingLoadingScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
  persistentMode?: boolean;
}

const PHASES = [
  { id: 'automation', label: 'AUTOMATION & CODING', icon: Code2, code: '01 // SYS.BUILD' },
  { id: 'research', label: 'ADVANCED RESEARCH', icon: Brain, code: '02 // AI.NEURAL' },
  { id: 'thoughts', label: 'NEW OPEN THOUGHTS', icon: Sparkles, code: '03 // THOUGHTS.LOG' },
  { id: 'ready', label: 'SYSTEM READY [NH RAFI]', icon: Zap, code: '04 // INITIALIZED' },
];

export const NothingLoadingScreen: React.FC<NothingLoadingScreenProps> = ({
  onComplete,
  forceShow = false,
  persistentMode = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(persistentMode ? 100 : 0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(persistentMode ? 3 : 0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle progress counter and phase sequence
  useEffect(() => {
    if (persistentMode) {
      setProgress(100);
      setCurrentPhaseIndex(3);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!persistentMode) {
            setTimeout(() => {
              setIsVisible(false);
              if (onComplete) onComplete();
            }, 600);
          }
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 3;
        const bounded = Math.min(next, 100);

        if (bounded > 75) setCurrentPhaseIndex(3);
        else if (bounded > 50) setCurrentPhaseIndex(2);
        else if (bounded > 25) setCurrentPhaseIndex(1);
        else setCurrentPhaseIndex(0);

        return bounded;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete, persistentMode]);

  const handleClose = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  // Track mouse for subtle 3D tilt effect on the Nothing device case
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30; // degrees
    const y = (clientY / innerHeight - 0.5) * -30;
    setMousePos({ x, y });
  };

  if (!isVisible && !forceShow) return null;

  const currentPhase = PHASES[currentPhaseIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 z-[9999] bg-[#0a0a0c] text-white flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden font-mono"
      >
        {/* Dot-matrix Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Nothing OS Top Bar Header */}
        <header className="w-full max-w-4xl flex items-center justify-between border-b border-white/10 pb-4 z-10 text-xs text-white/60">
          <div className="flex items-center gap-3">
            {/* Blinking Red LED Glyph Dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 shadow-[0_0_8px_#ff0033]"></span>
            </span>
            <span className="tracking-[0.25em] font-bold text-white uppercase">NOTHING (R) // 2.5</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block tracking-widest text-white/40">LATENCY: 12ms</span>
            <span className="tracking-widest text-gold text-xs font-bold">{progress}%</span>
            <button 
              onClick={handleClose}
              title="Close 3D HUD"
              className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 hover:text-white rounded-full transition-all text-xs font-mono tracking-wider cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.2)]"
            >
              <span>EXIT HUD</span>
              <X size={14} />
            </button>
          </div>
        </header>

        {/* Center 3D Floating Hardware Device (AirPods / Nothing Ear Translucent Pod) */}
        <div className="relative my-auto flex flex-col items-center justify-center [perspective:1000px] z-10">
          <motion.div
            animate={{
              rotateY: mousePos.x,
              rotateX: mousePos.y,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-6 flex flex-col justify-between border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] group"
          >
            {/* Inner Glass Contour Highlights */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-b-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

            {/* Glyph Pattern Ambient Circuit Lines */}
            <div className="absolute inset-3 rounded-2xl border border-dashed border-white/10 flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex justify-between items-center text-[9px] text-white/30">
                <span>MODEL: EAR(3D)</span>
                <span>[REV.2026]</span>
              </div>

              {/* Glowing Central Battery/Circuit Ring */}
              <div className="relative mx-auto w-28 h-28 rounded-full border border-white/20 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-1 rounded-full border border-dashed border-gold/40"
                />
                <motion.div 
                  animate={{ scale: [0.9, 1.05, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-full bg-white/5 border border-white/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <currentPhase.icon className="w-8 h-8 text-gold animate-pulse" />
                </motion.div>

                {/* Micro Red LED on Pod Stem */}
                <div className="absolute -bottom-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ff0000]" />
              </div>

              <div className="flex justify-between items-center text-[9px] text-white/30 font-mono">
                <span>AUDIO/CODE</span>
                <span>TRANSLUCENT(R)</span>
              </div>
            </div>

            {/* STEM Representation (AirPods / Ear Stem style) */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-b-xl flex flex-col justify-end items-center pb-2 shadow-2xl">
              <div className="w-4 h-1 bg-gold/80 rounded-full mb-1" />
              <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_5px_#ff0000]" />
            </div>

            {/* Bottom Glass Tag */}
            <div className="mt-auto pt-4 flex items-center justify-between text-[10px] text-white/50 border-t border-white/10">
              <span className="font-mono tracking-widest">{currentPhase.code}</span>
              <span className="text-gold font-mono font-bold">ACTIVE</span>
            </div>
          </motion.div>

          {/* Dynamic Nothing Dot-Matrix Phase Text */}
          <div className="mt-12 text-center space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                <div className="text-gold text-xs sm:text-sm font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                  <Sparkles size={14} className="animate-spin" />
                  {currentPhase.label}
                </div>
                <p className="text-xs text-white/50 tracking-widest uppercase">
                  INITIALIZING ARCHITECTURE // {progress}%
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Nothing Bottom Grid Progress */}
        <footer className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 z-10 text-xs">
          <div className="flex items-center gap-2 text-white/40">
            <span>[AUTOMATION]</span>
            <span>•</span>
            <span>[CODING]</span>
            <span>•</span>
            <span>[RESEARCH]</span>
            <span>•</span>
            <span>[OPEN THOUGHTS]</span>
          </div>

          {/* Dot-matrix Progress Bar */}
          <div className="flex items-center gap-1 font-mono text-gold text-xs tracking-tighter">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className={`inline-block w-2 h-3.5 transition-all duration-300 ${
                  i / 20 <= progress / 100
                    ? 'bg-gold shadow-[0_0_6px_rgba(212,175,55,0.8)]'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
