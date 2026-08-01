import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowDown } from 'lucide-react';
import { GoldButton, Badge } from '../components/shared/UI';
import NextPage from '../components/shared/NextPage';
import SEO from '../components/shared/SEO';

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
    "url": window.location.origin,
    "jobTitle": "Software Engineer & Researcher",
    "description": "Software engineer, researcher, and creative problem solver specializing in scalable digital architectures and AI research.",
    "knowsAbout": ["Software Engineering", "AI Research", "3D Architectural Visualization", "Web Development"]
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-8">
      <SEO 
        title="Home" 
        description="Official portfolio of Nazmul Haque Rafi (NH Rafi). A software engineer and researcher building robust, scalable digital architectures and exploring AI optimization."
        schemaData={personSchema}
      />
      <header className="px-4">
        <h2 className="text-sm uppercase tracking-[0.5em] font-mono text-gold/60">Interests.</h2>
      </header>

      {/* Hero Slideshow */}
      <section className="relative h-[65vh] sm:h-[75vh] md:h-[80vh] overflow-hidden group rounded-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10 z-10" />
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title} 
              className="w-full h-full object-cover transition-transform duration-[10000ms] scale-110 group-hover:scale-100"
            />
            
            <div className="absolute bottom-6 left-4 right-12 sm:bottom-10 sm:left-8 sm:right-16 md:bottom-12 md:left-12 md:right-12 z-20 flex flex-col items-start gap-2 sm:gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Badge>{slides[currentSlide].category}</Badge>
              </motion.div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white max-w-2xl leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm sm:text-lg md:text-xl text-white/80 font-serif italic line-clamp-2"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Sidebar Indicators */}
        <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 sm:gap-4">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="group relative flex items-center justify-end p-1"
              aria-label={`Slide ${idx + 1}`}
            >
              <span className={`h-px transition-all duration-500 bg-gold ${currentSlide === idx ? 'w-8 sm:w-12' : 'w-3 sm:w-4 opacity-40 group-hover:w-6 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-2 sm:px-4">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-6xl font-serif leading-tight mb-6 sm:mb-8"
          >
            Hi, I'm <span className="text-gold">Rafi</span> – software engineer, researcher, and creative problem solver.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12 border-t border-gold/20 pt-8 sm:pt-12"
          >
            <StatItem label="Projects" value="10+" />
            <StatItem label="Research Papers" value="2" />
            <StatItem label="Years Exp" value="4+" />
            <StatItem label="Freelance Earnings" value="$600+" />
          </motion.div>
        </div>
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
