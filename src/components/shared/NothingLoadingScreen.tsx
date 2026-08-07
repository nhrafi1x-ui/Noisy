import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Brain, Sparkles, Zap, X, Gamepad2, Layers, Clock, Timer, Calendar } from 'lucide-react';
import { PixelMindQuest } from './PixelMindQuest';

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

function calculateTimeLeft2027() {
  const target = new Date(2027, 0, 1, 0, 0, 0);
  const now = new Date();

  if (now >= target) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  let checkDate = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
  if (checkDate > target) {
    months--;
    checkDate = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
  }

  let diffMs = target.getTime() - checkDate.getTime();
  if (diffMs < 0) diffMs = 0;

  const secondsTotal = Math.floor(diffMs / 1000);
  const minutesTotal = Math.floor(secondsTotal / 60);
  const hoursTotal = Math.floor(minutesTotal / 60);
  const days = Math.floor(hoursTotal / 24);

  const hours = hoursTotal % 24;
  const minutes = minutesTotal % 60;
  const seconds = secondsTotal % 60;

  return { months, days, hours, minutes, seconds };
}

export const NothingLoadingScreen: React.FC<NothingLoadingScreenProps> = ({
  onComplete,
  forceShow = false,
  persistentMode = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(persistentMode ? 100 : 0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(persistentMode ? 3 : 0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'hud' | 'timer' | 'game'>('hud');
  const [timerValues, setTimerValues] = useState(calculateTimeLeft2027());

  // Update 2027 timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerValues(calculateTimeLeft2027());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const timerUnits = [
    { label: 'Months', value: timerValues.months, unit: 'MOS' },
    { label: 'Days', value: timerValues.days, unit: 'DAYS' },
    { label: 'Hours', value: timerValues.hours, unit: 'HRS' },
    { label: 'Minutes', value: timerValues.minutes, unit: 'MINS' },
    { label: 'Seconds', value: timerValues.seconds, unit: 'SECS' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 z-[9999] bg-[#0a0a0c] text-white flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-y-auto font-mono"
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
        <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-3 gap-3 z-10 text-xs text-white/60 shrink-0">
          <div className="flex items-center gap-3">
            {/* Blinking Red LED Glyph Dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 shadow-[0_0_8px_#ff0033]"></span>
            </span>
            <span className="tracking-[0.25em] font-bold text-white uppercase">NOTHING (R) // 2.5</span>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center bg-white/5 border border-white/15 rounded-full p-1 text-[11px] flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('hud')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                activeTab === 'hud'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>3D HUD</span>
            </button>

            <button
              onClick={() => setActiveTab('timer')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                activeTab === 'timer'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Timer size={13} />
              <span>2027 TIMER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            </button>

            <button
              onClick={() => setActiveTab('game')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer font-bold relative ${
                activeTab === 'game'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Gamepad2 size={13} />
              <span>PIXEL MIND QUEST</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block tracking-widest text-white/40">LATENCY: 12ms</span>
            <button 
              onClick={handleClose}
              title="Close 3D HUD"
              className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 hover:text-white rounded-full transition-all text-xs font-mono tracking-wider cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.2)]"
            >
              <span>EXIT WORLD</span>
              <X size={14} />
            </button>
          </div>
        </header>

        {/* Dynamic Mode Content */}
        {activeTab === 'hud' ? (
          /* Center 3D Floating Hardware Device (AirPods / Nothing Ear Translucent Pod) */
          <div className="relative my-auto py-6 flex flex-col items-center justify-center [perspective:1000px] z-10 w-full max-w-4xl">
            <motion.div
              onClick={() => setActiveTab('timer')}
              animate={{
                rotateY: mousePos.x,
                rotateX: mousePos.y,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
              title="Click to view 2027 Countdown Timer"
              className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-6 flex flex-col justify-between border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] group cursor-pointer hover:border-gold/50 hover:shadow-[0_30px_70px_rgba(212,175,55,0.25)] transition-colors"
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
            </motion.div>

            {/* Dynamic Nothing Dot-Matrix Phase Text */}
            <div className="mt-12 text-center space-y-3">
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
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <button
                      onClick={() => setActiveTab('timer')}
                      className="text-[11px] text-gold/90 hover:text-gold bg-gold/10 hover:bg-gold/20 border border-gold/40 px-3 py-1 rounded-full font-mono transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Timer size={12} />
                      <span>[ VIEW 2027 COUNTDOWN ]</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('game')}
                      className="text-[11px] text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/30 px-3 py-1 rounded-full font-mono transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Gamepad2 size={12} />
                      <span>[ START QUEST GAME ]</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : activeTab === 'timer' ? (
          /* Nothing OS 3D Countdown Mode */
          <div className="w-full max-w-4xl my-auto py-6 z-10 flex flex-col items-center [perspective:1000px]">
            {/* Header Badge inside 3D Timer */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-gold text-xs font-mono tracking-[0.25em] mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>NOTHING OS // 2027 MILESTONE</span>
              <Calendar size={13} className="text-white/60" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif text-white mb-2 tracking-tight text-center">
              Target <span className="text-gold italic">January 1, 2027</span>
            </h2>
            <p className="text-xs font-mono text-white/50 mb-8 uppercase tracking-widest text-center">
              [ REAL-TIME PRECISION DOT-MATRIX CHRONOMETER ]
            </p>

            {/* 3D Glassmorphism Cards Container */}
            <motion.div
              animate={{
                rotateY: mousePos.x * 0.5,
                rotateX: mousePos.y * 0.5,
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
            >
              {timerUnits.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="relative group bg-black/40 border border-white/15 hover:border-gold/80 p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-between min-h-[130px] sm:min-h-[150px] shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                >
                  {/* Glowing LED top indicator */}
                  <div className="flex items-center justify-between w-full text-[9px] font-mono text-white/40">
                    <span className="text-gold font-bold">{item.unit}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_#ff0000]" />
                  </div>

                  {/* Number Display with dot-matrix look */}
                  <div className="my-2 text-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white group-hover:text-gold transition-colors tracking-tighter drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Label */}
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    {item.label}
                  </span>

                  {/* Corner Accent */}
                  <div className="absolute bottom-1 right-1 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Clock size={10} className="text-gold" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footnote inside Nothing Mode Timer */}
            <div className="mt-8 flex items-center justify-center gap-3 text-[11px] font-mono text-white/40 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM CLOCK SYNCHRONIZED TO 2027 GOAL LINE</span>
            </div>
          </div>
        ) : (
          /* Pixel Mind Quest Game Mode */
          <div className="w-full my-auto py-4 z-10">
            <PixelMindQuest />
          </div>
        )}

        {/* Nothing Bottom Grid Progress */}
        <footer className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-3 z-10 text-xs shrink-0">
          <div className="flex items-center gap-2 text-white/40 text-[10px] sm:text-xs flex-wrap justify-center">
            <span>[AUTOMATION]</span>
            <span>•</span>
            <span>[CODING]</span>
            <span>•</span>
            <span>[2027 TIMER]</span>
            <span>•</span>
            <span>[PSYCHOLOGY GAME]</span>
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


