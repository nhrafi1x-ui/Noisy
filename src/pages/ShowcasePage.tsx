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
      <div className="w-full overflow-x-auto custom-scrollbar border-b border-gold/10 pb-1 touch-pan-x -mx-2 px-2 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-4 sm:gap-8 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-2 sm:gap-2.5 pb-3 transition-all duration-300 relative shrink-0 text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] cursor-pointer ${activeTab === tab.id ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="showcase-tab" 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[50vh]"
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
            <a 
              href={project.liveLink} 
              target={project.liveLink.startsWith('http') ? '_blank' : undefined} 
              rel={project.liveLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-gold flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-mono hover:underline"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
            <a 
              href={project.repoLink} 
              target={project.repoLink.startsWith('http') ? '_blank' : undefined} 
              rel={project.repoLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-charcoal/40 hover:text-charcoal flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-mono transition-colors hover:underline"
            >
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
      <div key={item.id} className="bg-white p-6 sm:p-8 shadow-sm border-l-4 border-gold relative group white-box flex flex-col md:flex-row gap-6 items-start">
        {item.imageUrl && (
          <div className="w-full md:w-56 h-44 rounded-lg overflow-hidden shrink-0 border border-gold/20 shadow-md">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        )}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Badge>{item.status}</Badge>
            <span className="text-charcoal/40 font-mono text-[10px] sm:text-xs uppercase tracking-widest">{item.date}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif leading-tight group-hover:text-gold transition-colors">{item.title}</h3>
          <div className="text-charcoal/50 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
            {item.authors} • {item.journal}
          </div>
          <p className="text-charcoal/70 font-serif leading-relaxed line-clamp-3 text-xs sm:text-sm">
            {item.abstract}
          </p>
          <div className="pt-2">
            <GoldButton className="flex items-center gap-2 text-xs">
              <FileText size={14} /> Download Paper
            </GoldButton>
          </div>
        </div>
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
  <div className="max-w-5xl mx-auto py-2">
    {/* Clean Portfolio Graphic Card with crisp white border and drop shadow */}
    <div className="bg-white p-2 sm:p-4 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-[8px] sm:border-[14px] border-white transition-all duration-300 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.45)]">
      <div className="bg-[#EAEAEA] rounded-2xl p-4 sm:p-8 md:p-10 grid lg:grid-cols-12 gap-6 sm:gap-8 items-center font-sans">
        
        {/* Left Side Typography */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-10 text-center lg:text-left py-4 px-2">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#2B2B2B] tracking-tight">
            Portfolio
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-[#1DBF73]">FIVERR-</span>
              <span className="text-[#2B2B2B]">$600+</span>
            </div>

            <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-[#14A800]">UPWORK-</span>
              <span className="text-[#2B2B2B]">$400+</span>
            </div>
          </div>
        </div>

        {/* Right Side UI Cards (Fiverr & Upwork Dashboards) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          
          {/* Fiverr Earnings Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-3 sm:p-5 text-gray-800 space-y-3.5 text-xs font-sans">
            {/* Fiverr Top Nav */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 text-[10px] sm:text-xs">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-base sm:text-lg font-black tracking-tighter text-[#1DBF73] flex items-center">
                  fiverr<span className="w-1.5 h-1.5 bg-[#1DBF73] rounded-full inline-block ml-0.5"></span>
                </span>
                <span className="hidden sm:inline font-semibold text-gray-700">Dashboard</span>
                <span className="hidden sm:inline text-gray-500">My Business ▾</span>
                <span className="hidden md:inline text-gray-500">Growth & Marketing ▾</span>
                <span className="hidden lg:inline text-gray-500">Analytics ▾</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                <span className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-gray-700 font-bold">$8</span>
              </div>
            </div>

            {/* Earnings Section Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Earnings</h3>
              <span className="text-[10px] text-gray-500 underline cursor-pointer">Learn more about this page</span>
            </div>

            <div className="flex gap-4 text-[10px] sm:text-[11px] border-b border-gray-100 pb-1.5 text-gray-600 font-medium">
              <span className="text-gray-900 font-bold border-b-2 border-gray-900 pb-1">Overview</span>
              <span className="text-gray-400">Financial documents</span>
            </div>

            {/* Earnings Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5 text-[11px]">
              <div className="bg-gray-50/80 p-2.5 rounded-lg border border-gray-100 space-y-2">
                <div className="text-[10px] font-medium text-gray-500">Available funds</div>
                <div>
                  <div className="text-[9px] text-gray-400">Balance available for use</div>
                  <div className="text-lg font-bold text-gray-900">$8.00</div>
                  <div className="text-[9px] text-gray-400 mt-0.5">Withdrawn to date: $680.00</div>
                </div>
                <div className="pt-0.5">
                  <span className="inline-block bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                    Withdraw balance
                  </span>
                </div>
              </div>

              <div className="bg-gray-50/80 p-2.5 rounded-lg border border-gray-100 space-y-2">
                <div className="text-[10px] font-medium text-gray-500">Future payments</div>
                <div className="space-y-1.5 pt-0.5">
                  <div>
                    <div className="text-[9px] text-gray-400">Payments being cleared</div>
                    <div className="text-xs font-bold text-gray-800">$0.00</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400">Payments for active orders</div>
                    <div className="text-xs font-bold text-gray-800">$0.00</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/80 p-2.5 rounded-lg border border-gray-100 space-y-2">
                <div className="text-[10px] font-medium text-gray-500">Earnings & expenses</div>
                <div className="pt-0.5">
                  <div className="text-[9px] text-gray-400">Earnings to date</div>
                  <div className="text-lg font-extrabold text-gray-900">$688.00</div>
                  <div className="text-[9px] text-gray-400 italic">Your earnings since joining.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upwork Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-3 sm:p-5 text-gray-800 space-y-3.5 text-xs font-sans">
            {/* Upwork Top Nav */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 text-[10px] sm:text-xs">
              <div className="flex items-center gap-3">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#14A800]">
                  upwork
                </span>
                <span className="hidden sm:inline text-gray-500">Find work ▾</span>
                <span className="hidden md:inline text-gray-500">Deliver work ▾</span>
              </div>
              <div className="bg-gray-100 border border-gray-200 rounded-full px-2.5 py-0.5 text-[9px] text-gray-500 hidden sm:block">
                Search Jobs
              </div>
            </div>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-0.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-800 shrink-0 text-xs">
                  NH
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-gray-900">Nazmul Haque R.</span>
                    <span className="w-3.5 h-3.5 bg-[#14A800] text-white rounded-full flex items-center justify-center text-[8px] font-bold">✓</span>
                  </div>
                  <div className="text-[10px] text-gray-500">📍 Netrakona, Bangladesh</div>
                </div>
              </div>

              <div className="flex gap-2 text-[9px]">
                <span className="border border-[#14A800] text-[#14A800] font-bold px-2 py-0.5 rounded-md">
                  See public view
                </span>
                <span className="bg-[#14A800] text-white font-bold px-2 py-0.5 rounded-md">
                  Profile settings
                </span>
              </div>
            </div>

            {/* Job Title & Bio */}
            <div className="bg-gray-50/80 p-2.5 rounded-lg border border-gray-100 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-gray-900 text-xs">
                  I'm a professional 3D Designer ( Home Interior, Game Character Design)
                </h4>
                <span className="text-xs font-bold text-emerald-700 shrink-0">$40.00/hr</span>
              </div>
              <p className="text-[10px] text-gray-600 line-clamp-2 leading-relaxed">
                Hello, Welcome to my profile. I am a Graphic designer. I have 4 years of experience. I worked in many IT Farms as a Graphic Designer...
              </p>
            </div>

            {/* Upwork Earnings Stats */}
            <div className="flex items-center gap-6 pt-1 text-[11px] border-t border-gray-100">
              <div>
                <span className="font-extrabold text-gray-900 text-xs sm:text-sm">$400+</span>
                <span className="text-[9px] text-gray-500 block">Total earnings</span>
              </div>
              <div className="border-l border-gray-200 pl-6">
                <span className="font-extrabold text-gray-900 text-xs sm:text-sm">10</span>
                <span className="text-[9px] text-gray-500 block">Total jobs</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
);

export default ShowcasePage;
