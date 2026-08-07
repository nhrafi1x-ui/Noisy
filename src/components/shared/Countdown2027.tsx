import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles, Calendar, Zap } from 'lucide-react';

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const target = new Date(2027, 0, 1, 0, 0, 0); // January 1, 2027 00:00:00
  const now = new Date();

  if (now >= target) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  // Calculate full months
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

  return { months, days, hours, minutes, seconds, isPast: false };
}

export const Countdown2027: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Months', value: timeLeft.months, unit: 'MOS' },
    { label: 'Days', value: timeLeft.days, unit: 'DAYS' },
    { label: 'Hours', value: timeLeft.hours, unit: 'HRS' },
    { label: 'Minutes', value: timeLeft.minutes, unit: 'MINS' },
    { label: 'Seconds', value: timeLeft.seconds, unit: 'SECS' }
  ];

  return (
    <section className="px-4 py-8 sm:py-12 bg-charcoal/[0.02] border-2 border-charcoal shadow-[8px_8px_0px_0px_#1a1a1a] relative overflow-hidden my-10 rounded-none">
      {/* Subtle Background Accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Header Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-charcoal text-charcoal text-xs uppercase font-mono tracking-[0.25em] mb-4 shadow-[3px_3px_0px_0px_#1a1a1a]">
          <Sparkles size={14} className="text-gold animate-spin-slow" />
          <span className="font-bold">2027 Countdown</span>
          <Zap size={12} className="text-gold" />
        </div>

        <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif text-charcoal mb-2 tracking-tight">
          Road to <span className="text-gold italic font-light">2027</span>
        </h3>
        <p className="text-xs sm:text-sm font-mono text-charcoal/70 max-w-xl mb-8 sm:mb-10 flex items-center justify-center gap-2 font-medium">
          <Calendar size={14} className="text-gold" />
          <span>Targeting January 1, 2027 • Live Real-Time Precision</span>
        </p>

        {/* 3D Countdown Square Blocks Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {timeUnits.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group bg-white p-4 sm:p-6 border-2 border-charcoal shadow-[6px_6px_0px_0px_#1a1a1a] hover:shadow-[8px_8px_0px_0px_#b8860b] hover:border-gold hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between min-h-[130px] sm:min-h-[150px] rounded-none cursor-pointer"
            >
              {/* Corner Gold Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold group-hover:h-1.5 transition-all" />

              {/* Unit Tag */}
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-charcoal/50 group-hover:text-gold transition-colors font-bold">
                {item.unit}
              </span>

              {/* Number Display with Bold 3D presence */}
              <div className="my-1.5 sm:my-2">
                <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-charcoal group-hover:text-gold transition-colors duration-300 tracking-tighter">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>

              {/* Label */}
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal font-bold">
                {item.label}
              </span>

              {/* Icon in corner */}
              <div className="absolute bottom-1.5 right-1.5 text-charcoal/20 group-hover:text-gold transition-colors">
                <Clock size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info bar */}
        <div className="mt-10 pt-6 border-t-2 border-charcoal/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-charcoal/60 gap-2 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-none bg-emerald-500 animate-pulse border border-charcoal" />
            <span>Live System Synchronized</span>
          </div>
          <span>Next Major Software & Research Goal Line • 2027</span>
        </div>
      </div>
    </section>
  );
};

export default Countdown2027;
