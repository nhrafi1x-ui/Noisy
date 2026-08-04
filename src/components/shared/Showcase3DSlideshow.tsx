import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { Badge } from './UI';

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techTags?: string[];
  liveLink?: string;
  repoLink?: string;
  category?: string;
}

interface Showcase3DSlideshowProps {
  items: ShowcaseItem[];
  autoPlay?: boolean;
}

export const Showcase3DSlideshow: React.FC<Showcase3DSlideshowProps> = ({
  items,
  autoPlay = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  if (!items || items.length === 0) return null;

  return (
    <div 
      className="relative w-full py-6 sm:py-10 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Perspective Stage */}
      <div className="relative w-full max-w-5xl mx-auto h-[380px] sm:h-[440px] flex items-center justify-center [perspective:1000px] sm:[perspective:1200px]">
        {items.map((item, index) => {
          // Calculate offset relative to currentIndex
          let offset = index - currentIndex;
          const total = items.length;
          
          // Handle wrap-around offset calculation for smooth looping
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // 3D positioning parameters based on offset
          let translateX = '0%';
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 30;

          if (offset === 0) {
            translateX = '0%';
            translateZ = 0;
            rotateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = 30;
          } else if (offset === 1) {
            translateX = '55%';
            translateZ = -150;
            rotateY = -28;
            scale = 0.82;
            opacity = 0.65;
            zIndex = 20;
          } else if (offset === -1) {
            translateX = '-55%';
            translateZ = -150;
            rotateY = 28;
            scale = 0.82;
            opacity = 0.65;
            zIndex = 20;
          } else if (offset === 2) {
            translateX = '95%';
            translateZ = -300;
            rotateY = -45;
            scale = 0.65;
            opacity = 0.25;
            zIndex = 10;
          } else if (offset === -2) {
            translateX = '-95%';
            translateZ = -300;
            rotateY = 45;
            scale = 0.65;
            opacity = 0.25;
            zIndex = 10;
          }

          return (
            <motion.div
              key={item.id}
              className="absolute top-0 w-[90%] sm:w-[520px] max-w-[360px] sm:max-w-none h-[360px] sm:h-[420px] rounded-lg shadow-2xl cursor-pointer"
              style={{
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1],
              }}
              onClick={() => {
                if (!isActive) setCurrentIndex(index);
              }}
            >
              {/* Card Container */}
              <div 
                className={`w-full h-full rounded-lg overflow-hidden border transition-all duration-500 flex flex-col bg-charcoal text-off-white ${
                  isActive 
                    ? 'border-gold/60 shadow-[0_15px_35px_rgba(212,175,55,0.25)]' 
                    : 'border-white/10 hover:border-gold/30 shadow-lg'
                }`}
              >
                {/* Image Section */}
                <div className="relative h-40 sm:h-56 shrink-0 overflow-hidden bg-black/20">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isActive ? 'scale-105' : 'scale-100 opacity-90'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                  
                  {item.category && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge>{item.category}</Badge>
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute top-3 right-3 z-10 bg-gold/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/40 text-gold flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider">
                      <Sparkles size={12} className="animate-pulse" /> 3D View
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-charcoal">
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-serif text-white line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-off-white/70 font-serif line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Tech Tags & Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    {item.techTags && item.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
                        {item.techTags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gold/90">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 shrink-0 ml-auto">
                      {item.liveLink && item.liveLink !== '#' && (
                        <a 
                          href={item.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-gold hover:text-white text-xs font-mono tracking-wider uppercase transition-colors"
                        >
                          <ExternalLink size={14} /> Live
                        </a>
                      )}
                      {item.repoLink && item.repoLink !== '#' && (
                        <a 
                          href={item.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-white/50 hover:text-gold text-xs font-mono tracking-wider uppercase transition-colors"
                        >
                          <Github size={14} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls & Pagination */}
      <div className="flex items-center justify-center gap-6 mt-4 sm:mt-6">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="p-2 sm:p-3 rounded-full bg-charcoal/80 border border-gold/30 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-md cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Indicators: 3 dots (Left, Middle Active, Right) */}
        <div className="flex items-center gap-2">
          {/* Left dot */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide indicator"
            className="h-2 w-2 rounded-full bg-charcoal/30 hover:bg-gold/50 transition-all duration-300 cursor-pointer"
          />
          {/* Middle dot (Visible / Active) */}
          <button
            aria-label={`Slide ${currentIndex + 1} visible`}
            className="h-2 w-8 rounded-full bg-gold transition-all duration-500 cursor-default"
          />
          {/* Right dot */}
          <button
            onClick={handleNext}
            aria-label="Next slide indicator"
            className="h-2 w-2 rounded-full bg-charcoal/30 hover:bg-gold/50 transition-all duration-300 cursor-pointer"
          />
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="p-2 sm:p-3 rounded-full bg-charcoal/80 border border-gold/30 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-md cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
