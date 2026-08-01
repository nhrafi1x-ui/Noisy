import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { seedData } from '../data/seedData';
import { Badge, GoldButton } from '../components/shared/UI';
import { ExternalLink, Github, FileText, Camera as CameraIcon, Utensils, Presentation, Briefcase, ChevronRight } from 'lucide-react';
import NextPage from '../components/shared/NextPage';
import SEO from '../components/shared/SEO';

const tabs = [
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'research', label: 'Research', icon: FileText },
  { id: 'photography', label: 'Photography', icon: CameraIcon },
  { id: 'cooking', label: 'Culinary', icon: Utensils },
  { id: 'freelance', label: 'Freelance', icon: ChevronRight },
];

const ShowcasePage = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const showcaseSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio Showcase - NH Rafi",
    "description": "Explore the diverse portfolio of Nazmul Haque Rafi, including engineering projects, academic research, and creative works.",
    "creator": {
      "@type": "Person",
      "name": "Nazmul Haque Rafi"
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 px-1 sm:px-2">
      <SEO 
        title="Showcase" 
        description="A curated collection of digital artifacts, academic contributions, and personal passions by NH Rafi. Featuring web development, machine learning research, and 3D design."
        keywords="Portfolio, Projects, Research Papers, Photography, Culinary Arts, Freelance, Development"
        schemaData={showcaseSchema}
      />
      <header className="space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl font-serif">Showcase</h1>
        <p className="text-charcoal/60 font-serif italic max-w-2xl text-base sm:text-lg">
          A collection of digital artifacts, academic contributions, and personal passions.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 sm:gap-8 border-b border-gold/10 overflow-x-auto pb-3 custom-scrollbar whitespace-nowrap -mx-2 px-2 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center gap-2.5 pb-3 transition-all duration-300 relative shrink-0 ${activeTab === tab.id ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <tab.icon size={16} />
            <span className="uppercase tracking-[0.2em] text-xs font-mono">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="showcase-tab" 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[60vh]"
        >
          {activeTab === 'projects' && <ProjectsGrid />}
          {activeTab === 'research' && <ResearchList />}
          {activeTab === 'photography' && <PhotographyGallery />}
          {activeTab === 'cooking' && <CookingCards />}
          {activeTab === 'freelance' && <FreelanceHistory />}
        </motion.div>
      </AnimatePresence>

      <NextPage to="/thinking" label="My Thinking" />
    </div>
  );
};

const ProjectsGrid = () => (
  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
    {seedData.projects.map((project) => (
      <div key={project.id} className="deco-card group">
        <div className="aspect-video overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.techTags.map(tag => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <h3 className="text-xl sm:text-3xl font-serif leading-tight group-hover:text-gold transition-colors">{project.title}</h3>
          <p className="text-charcoal/60 leading-relaxed font-serif text-sm sm:text-base">{project.description}</p>
          <div className="flex flex-wrap gap-4 pt-2 sm:pt-4">
            <a href={project.liveLink} className="text-gold flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-mono">
              <ExternalLink size={16} /> Live Demo
            </a>
            <a href={project.repoLink} className="text-charcoal/40 hover:text-charcoal flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-mono transition-colors">
              <Github size={16} /> Source
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ResearchList = () => (
  <div className="space-y-6 sm:space-y-8 max-w-4xl">
    {seedData.research.map((item) => (
      <div key={item.id} className="bg-white p-6 sm:p-12 shadow-sm border-l-4 border-gold relative group white-box">
        <div className="sm:absolute top-6 sm:top-8 right-6 sm:right-8 mb-4 sm:mb-0">
          <Badge>{item.status}</Badge>
        </div>
        <h3 className="text-xl sm:text-3xl font-serif mb-3 sm:mb-4 sm:pr-24 leading-tight group-hover:text-gold transition-colors">{item.title}</h3>
        <div className="text-charcoal/40 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6">
          {item.authors} | {item.journal} | {item.date}
        </div>
        <p className="text-charcoal/70 font-serif leading-relaxed line-clamp-3 mb-6 sm:mb-8 text-sm sm:text-base">
          {item.abstract}
        </p>
        <GoldButton className="flex items-center gap-2 text-xs sm:text-sm">
          <FileText size={16} /> Download Paper
        </GoldButton>
      </div>
    ))}
  </div>
);

const PhotographyGallery = () => (
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
    {seedData.photography.map((photo) => (
      <div key={photo.id} className="relative group overflow-hidden break-inside-avoid">
        <img 
          src={photo.url} 
          alt={photo.title} 
          className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end text-white">
          <Badge className="w-fit mb-2">{photo.category}</Badge>
          <h4 className="text-xl font-serif mb-1">{photo.title}</h4>
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">
            {photo.camera} • {photo.settings}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const CookingCards = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {seedData.cooking.map((recipe) => (
      <div key={recipe.id} className="deco-card group">
        <div className="aspect-square overflow-hidden relative">
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          {recipe.isChefSpecial && (
            <div className="absolute top-4 left-4">
              <Badge color="orange">Chef's Special</Badge>
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-serif mb-4 group-hover:text-gold transition-colors">{recipe.title}</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.ingredients.slice(0, 3).map(i => <Badge key={i} color="gold">{i}</Badge>)}
            {recipe.ingredients.length > 3 && <span className="text-xs text-charcoal/40">+{recipe.ingredients.length - 3} more</span>}
          </div>
          <GoldButton className="w-full text-xs uppercase tracking-[0.2em]">View Recipe</GoldButton>
        </div>
      </div>
    ))}
  </div>
);

const FreelanceHistory = () => (
  <div className="space-y-6 max-w-4xl">
    {seedData.freelanceHistory.map((job) => (
      <div key={job.id} className="flex flex-col md:flex-row gap-6 sm:gap-8 bg-white p-5 sm:p-8 items-center group white-box">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 flex items-center justify-center text-gold font-serif text-2xl sm:text-3xl shrink-0">
          {job.client.charAt(0)}
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            <h4 className="text-xl sm:text-2xl font-serif pr-4 border-r border-gold/20 leading-none">{job.client}</h4>
            <Badge color="green">{job.badge}</Badge>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < job.rating ? 'text-gold' : 'text-charcoal/10'}`}>★</span>
              ))}
            </div>
          </div>
          <p className="text-charcoal/60 font-serif italic text-base sm:text-lg">{job.service}</p>
        </div>
        <div className="text-center md:text-right">
          <div className="text-xl sm:text-2xl font-serif text-gold">${job.earnings}</div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-charcoal/30">{job.date}</div>
        </div>
      </div>
    ))}
  </div>
);

export default ShowcasePage;
