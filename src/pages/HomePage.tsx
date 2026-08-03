import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowDown, Sparkles } from 'lucide-react';
import { GoldButton, Badge } from '../components/shared/UI';
import NextPage from '../components/shared/NextPage';
import SEO from '../components/shared/SEO';
import { Showcase3DSlideshow, ShowcaseItem } from '../components/shared/Showcase3DSlideshow';
import { seedData } from '../data/seedData';

const slides = [
  {
    title: 'Software Engineering',
    subtitle: 'Building robust, scalable digital architectures.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200',
    category: 'Engineering'
  },
  {
    title: 'Architectural Elegance',
    subtitle: 'Precision in form and function.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    category: 'Architecture'
  },
  {
    title: 'Rigorous Research',
    subtitle: '"Optimization is the soul of software engineering."',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200',
    category: 'Research'
  },
  {
    title: 'Culinary Craft',
    subtitle: 'Artistry on a plate.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1200',
    category: 'Cooking'
  },
  {
    title: 'Visual Storytelling',
    subtitle: 'Freezing moments in time.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    category: 'Photography'
  }
];

// Convert seedData into 3D Showcase Slideshow items
const showcaseSlideshowItems: ShowcaseItem[] = [
  ...seedData.projects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    techTags: p.techTags,
    liveLink: p.liveLink,
    repoLink: p.repoLink,
    category: 'Project'
  })),
  {
    id: 'res-1',
    title: seedData.research[0].title,
    description: seedData.research[0].abstract,
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800',
    techTags: ['AI Research', 'Optimization', 'Neural Nets'],
    category: 'Research'
  },
  {
    id: 'photo-1',
    title: seedData.photography[0].title,
    description: `Shot on ${seedData.photography[0].camera} • ${seedData.photography[0].settings}`,
    imageUrl: seedData.photography[0].url,
    techTags: ['Fujifilm', 'Street Photo'],
    category: 'Photography'
  }
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nazmul Haque Rafi",
    "alternateName": "NH Rafi",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "jobTitle": "Software Engineer & Researcher",
    "description": "Software engineer, researcher, and creative problem solver specializing in scalable digital architectures and AI research.",
    "knowsAbout": ["Software Engineering", "AI Research", "3D Architectural Visualization", "Web Development"]
  };

  return (
    <div className="space-y-12 sm:space-y-16 max-w-7xl mx-auto py-4 sm:py-8">
      <SEO 
        title="Home" 
        description="Official portfolio of Nazmul Haque Rafi (NH Rafi). A software engineer and researcher building robust, scalable digital architectures and exploring AI optimization."
        schemaData={personSchema}
      />
      
      {/* Small & Sleek Hero Image Slideshow */}
      <section className="space-y-3 px-1 sm:px-2">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xs uppercase tracking-[0.4em] font-mono text-gold/80">Interests Overview</h2>
          <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest">{currentSlide + 1} / {slides.length}</span>
        </div>

        <div className="relative h-[32vh] sm:h-[38vh] md:h-[42vh] max-h-[380px] min-h-[240px] overflow-hidden group rounded-lg border border-gold/20 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent z-10" />
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title} 
                className="w-full h-full object-cover transition-transform duration-[8000ms] scale-105 group-hover:scale-100"
              />
              
              <div className="absolute bottom-4 left-4 right-12 sm:bottom-6 sm:left-6 sm:right-16 z-20 flex flex-col items-start gap-1.5 sm:gap-2">
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge>{slides[currentSlide].category}</Badge>
                </motion.div>
                <motion.h1 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-3xl md:text-4xl font-serif text-white max-w-2xl leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs sm:text-sm md:text-base text-white/80 font-serif italic line-clamp-1"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="group relative flex items-center justify-end p-1 cursor-pointer"
                aria-label={`Slide ${idx + 1}`}
              >
                <span className={`h-1 rounded-full transition-all duration-500 bg-gold ${currentSlide === idx ? 'w-6 bg-gold' : 'w-2 opacity-40 group-hover:w-4 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Intro & Stats Section (Centered Alignment) */}
      <section className="px-2 sm:px-4 border-y border-gold/15 py-10 sm:py-14 bg-charcoal/[0.02]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-serif leading-tight mb-8 sm:mb-10 text-center max-w-3xl"
          >
            I'm <span className="text-gold">Rafi</span> – software engineer, researcher, and creative problem solver.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12 border-t border-gold/20 pt-8 sm:pt-10 text-center"
          >
            <StatItem label="Projects" value="5" />
            <StatItem label="Research Papers" value="1" />
            <StatItem label="Years Exp" value="1+" />
            <StatItem label="Freelance Earnings" value="$1100+" />
          </motion.div>
        </div>
      </section>

      {/* 3D Showcase Slideshow Section */}
      <section className="space-y-4 px-1 sm:px-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-2">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] font-mono text-gold mb-1">
              <Sparkles size={14} /> Interactive 3D Showcase
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif">Featured Showcase</h2>
          </div>
        </div>

        <Showcase3DSlideshow items={showcaseSlideshowItems} autoPlay={true} />
      </section>

      <NextPage to="/about" label="About Me" />
    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="group">
    <div className="text-3xl font-serif text-charcoal group-hover:text-gold transition-colors duration-500">{value}</div>
    <div className="text-xs uppercase tracking-widest text-charcoal/40 font-mono mt-1">{label}</div>
  </div>
);

export default HomePage;
