import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Brain, Sparkles, Trophy, RotateCcw, CheckCircle2, ChevronRight, Zap, Info, Compass } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  badgeName: string;
  x: number; // percentage in grid 0-100
  y: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  psychologyInsight: string;
  quote: string;
  traits: string[];
}

const STATIONS: Station[] = [
  {
    id: 'logic',
    name: 'Logic Cortex',
    badgeName: 'First-Principles Thinker',
    x: 20,
    y: 30,
    icon: '⚡',
    color: '#3B82F6', // Blue
    title: 'The Analytical & Problem-Solving Cortex',
    subtitle: 'How Rafi processes complex systems & research bugs',
    psychologyInsight: 'Rafi breaks down chaotic problems to fundamental first principles rather than relying on superficial assumptions. He treats code and research as mathematical poetry, seeking deterministic clarity amidst complexity.',
    quote: '"Complexity is often just unorganized simplicity."',
    traits: ['First-Principles Reasoning', 'Analytical Precision', 'Deconstructive Debugging']
  },
  {
    id: 'design',
    name: 'Design Synthesizer',
    badgeName: 'Minimalist Architect',
    x: 80,
    y: 30,
    icon: '🎨',
    color: '#D4AF37', // Gold
    title: 'The Creative & Visual Vision',
    subtitle: 'Aesthetic philosophy & tactile UI craftsmanship',
    psychologyInsight: 'Informed by clean Nothing-OS aesthetics and street photography, Rafi believes software should feel tactile, intentional, and quiet. Good design eliminates friction while evoking curiosity.',
    quote: '"Simplicity is not the absence of clutter, but the presence of focus."',
    traits: ['Tactile Interface Craft', 'Quiet Luxury UX', 'Spatial Harmony']
  },
  {
    id: 'resilience',
    name: 'Flow Chamber',
    badgeName: 'Stoic Flow Engine',
    x: 20,
    y: 75,
    icon: '🔥',
    color: '#EF4444', // Red
    title: 'Resilience & Deep Focus Engine',
    subtitle: 'Psychological composure under high stakes',
    psychologyInsight: 'Rafi thrives in prolonged flow states during complex deep-work sessions. Setbacks and edge-case errors are viewed stoically—not as obstacles, but as structural diagnostics guiding the next refactor.',
    quote: '"Obstacles do not block the path; they are the path."',
    traits: ['Deep Work Endurance', 'Stoic Composure', 'Iterative Mastery']
  },
  {
    id: 'vision',
    name: 'Future Core',
    badgeName: 'Human-Centric Visionary',
    x: 80,
    y: 75,
    icon: '🧠',
    color: '#10B981', // Emerald
    title: 'Curiosity & Human Empathy',
    subtitle: 'Core motivation & philosophy on technology',
    psychologyInsight: 'Technology to Rafi is an amplifier for human potential, not a substitute for human warmth. His ultimate mission is building intelligent tools that genuinely empower people quietly in the background.',
    quote: '"Build tools that make humans feel more capable, not obsolete."',
    traits: ['Empathetic Engineering', 'Relentless Curiosity', 'Purpose-Driven Tech']
  }
];

export const PixelMindQuest: React.FC = () => {
  // Player Position in percentage grid (0 - 100)
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 52 });
  const [facing, setFacing] = useState<'down' | 'up' | 'left' | 'right'>('down');
  const [activeStation, setActiveStation] = useState<Station | null>(null);
  const [unlockedStations, setUnlockedStations] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Check proximity to stations
  useEffect(() => {
    let nearest: Station | null = null;
    let minDistance = 18; // proximity threshold in percentage units

    STATIONS.forEach((st) => {
      const dist = Math.hypot(playerPos.x - st.x, playerPos.y - st.y);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = st;
      }
    });

    setActiveStation(nearest);
  }, [playerPos]);

  // Movement handler
  const movePlayer = (dx: number, dy: number, dir: 'down' | 'up' | 'left' | 'right') => {
    setFacing(dir);
    setStepCount(s => s + 1);
    setPlayerPos((prev) => {
      const nextX = Math.max(8, Math.min(92, prev.x + dx));
      const nextY = Math.max(12, Math.min(88, prev.y + dy));
      return { x: nextX, y: nextY };
    });
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if a modal/dialog is active
      if (isCompleted) return;

      const SPEED = 4;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer(0, -SPEED, 'up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer(0, SPEED, 'down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer(-SPEED, 0, 'left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer(SPEED, 0, 'right');
          break;
        case ' ':
        case 'Enter':
        case 'e':
        case 'E':
          if (activeStation) {
            e.preventDefault();
            handleInteractStation(activeStation);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStation, isCompleted]);

  const handleInteractStation = (st: Station) => {
    setUnlockedStations((prev) => {
      const updated = { ...prev, [st.id]: true };
      if (Object.keys(updated).length === STATIONS.length) {
        setTimeout(() => setIsCompleted(true), 400);
      }
      return updated;
    });
  };

  const handleResetGame = () => {
    setPlayerPos({ x: 50, y: 52 });
    setUnlockedStations({});
    setIsCompleted(false);
    setStepCount(0);
  };

  const unlockedCount = Object.keys(unlockedStations).length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none font-mono text-white space-y-4">
      {/* Mini Quest Header / Status Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-black/60 border border-white/15 p-3 rounded-2xl backdrop-blur-md gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gold/20 border border-gold/40 rounded-xl text-gold">
            <Gamepad2 size={18} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-widest text-gold uppercase flex items-center gap-2">
              RAFI'S MIND MATRIX // PIXEL PSYCHOLOGY QUEST
            </h3>
            <p className="text-[10px] text-white/50">Explore 4 cognitive nodes to decode Rafi's mindset</p>
          </div>
        </div>

        {/* Progress Tracker Badges */}
        <div className="flex items-center gap-2">
          <div className="text-right text-[10px] hidden sm:block">
            <div className="text-white/40">NODES EXPLORED</div>
            <div className="text-gold font-bold">{unlockedCount} / 4</div>
          </div>
          <div className="flex gap-1">
            {STATIONS.map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  // Direct teleport on click for accessibility
                  setPlayerPos({ x: st.x, y: st.y + 10 });
                }}
                title={`Click to teleport to ${st.name}`}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center text-xs cursor-pointer transition-all ${
                  unlockedStations[st.id]
                    ? 'bg-gold/20 border-gold text-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'bg-white/5 border-white/10 text-white/30 hover:border-white/30'
                }`}
              >
                {st.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Pixel Canvas Area */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[480px] bg-[#0c0d12] border-2 border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 flex flex-col justify-between"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Pixel Scanlines Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none z-10" />

        {/* Center Room Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        {/* Center Mind Core Glyph Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-dashed border-white/10 rounded-full w-24 h-24 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] text-white/20 tracking-widest font-mono">PSYCH.CORE</span>
        </div>

        {/* Render 4 Interactive Psychology Stations */}
        {STATIONS.map((st) => {
          const isUnlocked = unlockedStations[st.id];
          const isTargeted = activeStation?.id === st.id;

          return (
            <motion.div
              key={st.id}
              onClick={() => {
                setPlayerPos({ x: st.x, y: st.y + 8 });
                handleInteractStation(st);
              }}
              style={{ left: `${st.x}%`, top: `${st.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-transform ${
                isTargeted ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              {/* Station Outer Pulsing Ring */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex flex-col items-center justify-center backdrop-blur-md transition-all shadow-lg ${
                  isTargeted
                    ? 'border-gold bg-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                    : isUnlocked
                    ? 'border-emerald-500/60 bg-emerald-950/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                }`}
              >
                <span className="text-xl sm:text-2xl">{st.icon}</span>
                <span className="text-[8px] font-bold tracking-tighter uppercase mt-0.5 text-white/70">
                  {st.name}
                </span>

                {/* Status Dot */}
                <span
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-black ${
                    isUnlocked ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-gold animate-ping'
                  }`}
                />
              </div>

              {/* Station Proximity Label / Prompt */}
              {isTargeted && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: -10 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap bg-gold text-charcoal font-black text-[10px] px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>[ TAP / PRESS E ]</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Player Pixel Avatar Character */}
        <motion.div
          animate={{
            left: `${playerPos.x}%`,
            top: `${playerPos.y}%`,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Player Shadow */}
            <div className="absolute -bottom-1 w-6 h-2 bg-black/60 rounded-full blur-[2px]" />

            {/* Pixel Character Sprite Container */}
            <div className="relative w-8 h-10 bg-gradient-to-b from-amber-200 to-amber-400 border-2 border-black rounded-t-lg shadow-md flex flex-col items-center justify-between p-1">
              {/* Glasses / Hair line */}
              <div className="w-6 h-1.5 bg-charcoal rounded-sm" />
              {/* Eyes */}
              <div className="flex gap-1.5 my-0.5">
                <span className="w-1 h-1 bg-black rounded-full" />
                <span className="w-1 h-1 bg-black rounded-full" />
              </div>
              {/* Shirt */}
              <div className="w-full h-3 bg-gold border-t border-black/40 rounded-b-sm flex items-center justify-center text-[7px] font-extrabold text-black">
                R
              </div>
            </div>

            {/* Player Name Pill */}
            <span className="mt-1 bg-black/80 border border-gold/40 text-gold text-[8px] font-bold px-1.5 py-0.5 rounded tracking-widest uppercase">
              YOU
            </span>
          </div>
        </motion.div>
      </div>

      {/* Touch & Direction Controls + Active Node Inspector */}
      <div className="w-full grid md:grid-cols-12 gap-3 items-stretch">
        {/* On-Screen D-Pad Controls for Mobile/Mouse users */}
        <div className="md:col-span-5 bg-black/60 border border-white/15 p-3 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center space-y-2">
          <div className="text-[10px] text-white/50 font-mono flex items-center gap-1">
            <Compass size={12} className="text-gold" /> USE ARROW KEYS / WASD OR BUTTONS:
          </div>

          <div className="grid grid-cols-3 gap-1.5 w-36">
            <div />
            <button
              onClick={() => movePlayer(0, -6, 'up')}
              className="p-2 bg-white/10 hover:bg-gold hover:text-black border border-white/20 rounded-lg text-xs font-bold active:scale-95 transition-all flex items-center justify-center"
            >
              ▲
            </button>
            <div />
            <button
              onClick={() => movePlayer(-6, 0, 'left')}
              className="p-2 bg-white/10 hover:bg-gold hover:text-black border border-white/20 rounded-lg text-xs font-bold active:scale-95 transition-all flex items-center justify-center"
            >
              ◀
            </button>
            <button
              onClick={() => movePlayer(0, 6, 'down')}
              className="p-2 bg-white/10 hover:bg-gold hover:text-black border border-white/20 rounded-lg text-xs font-bold active:scale-95 transition-all flex items-center justify-center"
            >
              ▼
            </button>
            <button
              onClick={() => movePlayer(6, 0, 'right')}
              className="p-2 bg-white/10 hover:bg-gold hover:text-black border border-white/20 rounded-lg text-xs font-bold active:scale-95 transition-all flex items-center justify-center"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Active Proximity Inspector Panel */}
        <div className="md:col-span-7 bg-black/60 border border-white/15 p-4 rounded-2xl backdrop-blur-md flex flex-col justify-between space-y-3">
          {activeStation ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeStation.icon}</span>
                  <span className="text-xs sm:text-sm font-bold text-gold uppercase tracking-wider">
                    {activeStation.title}
                  </span>
                </div>
                <span className="text-[9px] bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded font-mono">
                  {unlockedStations[activeStation.id] ? 'UNLOCKED' : 'READY TO INSPECT'}
                </span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-mono">
                {activeStation.psychologyInsight}
              </p>

              <div className="bg-white/5 p-2 rounded-lg border border-white/10 text-[11px] text-gold italic font-serif">
                {activeStation.quote}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1">
                  {activeStation.traits.map((t, i) => (
                    <span key={i} className="text-[9px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleInteractStation(activeStation)}
                  className="bg-gold text-charcoal font-black text-xs px-3 py-1.5 rounded-lg hover:bg-amber-400 transition-all flex items-center gap-1 cursor-pointer shadow-md"
                >
                  <span>{unlockedStations[activeStation.id] ? 'RE-READ NODE' : 'UNLOCK NODE'}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center space-y-2 py-3">
              <Brain size={24} className="mx-auto text-gold/60 animate-pulse" />
              <p className="text-xs text-white/60 font-mono">
                Walk your pixel character near any of the 4 glowing nodes (or tap them) to unlock Rafi's cognitive insights!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Modal / Victory Mind Matrix Summary */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <div className="bg-[#111218] border-2 border-gold/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-center space-y-6 shadow-[0_0_80px_rgba(212,175,55,0.3)]">
              <div className="w-16 h-16 bg-gold/20 border-2 border-gold rounded-full mx-auto flex items-center justify-center text-gold text-3xl shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                🏆
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.4em] text-gold font-mono font-bold">
                  QUEST COMPLETE // PSYCHOLOGY MATRIX DECODED
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  Rafi's Cognitive & Psychological Profile
                </h2>
                <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto font-mono">
                  You have successfully explored all 4 cognitive chambers of Nazmul Haque Rafi's mind.
                </p>
              </div>

              {/* Unlocked Badges Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                {STATIONS.map((st) => (
                  <div key={st.id} className="bg-white/5 border border-gold/30 p-3 rounded-xl flex items-center gap-3">
                    <span className="text-2xl">{st.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-gold">{st.badgeName}</div>
                      <div className="text-[10px] text-white/50 font-mono">{st.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gold/10 border border-gold/30 p-4 rounded-xl text-left space-y-1">
                <div className="text-xs font-bold text-gold flex items-center gap-1.5">
                  <Sparkles size={14} /> CORE PSYCHOLOGICAL SUMMARY:
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-mono">
                  Rafi combines structured analytical rigor with artistic minimalism. He approaches challenges with stoic patience, prioritizing foundational understanding, elegant user empathy, and relentless curiosity.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetGame}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw size={14} /> REPLAY QUEST
                </button>
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-6 py-2 bg-gold hover:bg-amber-400 text-charcoal text-xs font-mono font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <CheckCircle2 size={14} /> KEEP EXPLORING
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
