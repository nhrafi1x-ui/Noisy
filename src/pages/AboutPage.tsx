import React from 'react';
import { motion } from 'motion/react';
import { GoldButton, Badge } from '../components/shared/UI';
import { 
  Download, Github, Linkedin, Twitter, Instagram, 
  Facebook, MessageSquare, Dribbble, Globe, Briefcase, 
  ShoppingBag, Palette, ExternalLink
} from 'lucide-react';
import NextPage from '../components/shared/NextPage';
import SEO from '../components/shared/SEO';
import portraitImg from '../assets/images/portrait.jpg';
import { socialLinks } from '../data/socials';

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageSquare,
  Briefcase,
  Globe,
  Dribbble,
  Palette,
  ShoppingBag
};

const AboutPage = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Nazmul Haque Rafi",
    "description": "Biography and professional background of Nazmul Haque Rafi, a Software Engineer and Researcher.",
    "mainEntity": {
      "@type": "Person",
      "name": "Nazmul Haque Rafi",
      "jobTitle": "Software Engineer & Researcher",
      "alumniOf": "Premier University Chittagong"
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 md:space-y-32 py-6 sm:py-12 px-2 sm:px-4">
      <SEO 
        title="About" 
        description="Learn more about Nazmul Haque Rafi (NH Rafi). A Software Engineer and Researcher with a background in Computer Science and a passion for creative technical solutions."
        keywords="Biography, Education, Skills, Software Engineer, Researcher, Premier University Chittagong"
        schemaData={aboutSchema}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <h1 className="text-3xl sm:text-5xl font-serif mb-6 md:mb-8 leading-tight">Biography</h1>
          <p className="text-base sm:text-xl text-charcoal/70 leading-relaxed font-serif first-letter:text-5xl sm:first-letter:text-7xl first-letter:float-left first-letter:mr-3 sm:first-letter:mr-4 first-letter:font-bold first-letter:text-gold">
            I am a Software Engineer and Researcher dedicated to bridging the gap between artistic vision and technical precision. My work spans from high-end 3D architectural design to rigorous machine learning research. With over four years of experience in creative problem-solving, I aim to create digital experiences that are as beautiful as they are functional.
          </p>
          <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <motion.a 
                href="/CV_Md_Nazmul_Haque_Rafi.pdf"
                download="CV_Md_Nazmul_Haque_Rafi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  x: [0, -4, 4, -3, 3, 0],
                  rotate: [0, -2, 2, -1.5, 1.5, 0],
                  scale: [1, 1.03, 1.03, 1.03, 1]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-white font-mono text-xs uppercase tracking-widest font-bold border border-gold hover:bg-gold/90 transition-all shadow-lg hover:shadow-gold/30 rounded-none cursor-pointer group"
              >
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                <span>Download CV (Academic)</span>
              </motion.a>

              <motion.a 
                href="/Resume_Nazmul_Haque_Rafi.pdf"
                download="Resume_Nazmul_Haque_Rafi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  x: [0, 4, -4, 3, -3, 0],
                  rotate: [0, 2, -2, 1.5, -1.5, 0],
                  scale: [1, 1.03, 1.03, 1.03, 1]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-charcoal font-mono text-xs uppercase tracking-widest font-bold border border-gold hover:bg-gold hover:text-white transition-all shadow-md rounded-none cursor-pointer group white-box"
              >
                <Download size={16} className="text-gold group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
                <span>Download Resume (Tech)</span>
              </motion.a>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-xs uppercase tracking-[0.3em] font-mono text-charcoal/40">Social & Profiles</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.iconName] || Globe;
                  return (
                    <SocialCard 
                      key={social.id} 
                      icon={IconComponent} 
                      href={social.url} 
                      name={social.name} 
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 relative max-w-md mx-auto md:max-w-none w-full"
        >
          {/* Ornate Frame */}
          <div className="absolute -inset-3 sm:-inset-4 border border-gold/30 pointer-events-none" />
          <div className="absolute -inset-1.5 sm:-inset-2 border-2 border-gold/10 pointer-events-none" />
          <div className="bg-white p-3 sm:p-4 shadow-2xl relative white-box">
            <img 
              src={portraitImg} 
              alt="Portrait" 
              className="w-full aspect-[3/4] object-cover transition-all duration-700 bg-black cursor-pointer"
            />
          </div>
        </motion.div>
      </section>

      <section className="space-y-16">
        <SectionTitle title="Expertise" subtitle="Skills grouped by domain" />
        <div className="grid md:grid-cols-3 gap-12">
          <SkillGroup title="Programming" skills={['JavaScript', 'TypeScript', 'Python', 'Go', 'C++', 'Java']} />
          <SkillGroup title="Tools" skills={['React', 'Node.js', 'Firebase', 'Vite', 'Three.js', 'Docker', 'AWS']} />
          <SkillGroup title="Domains" skills={['AI/Research', 'Web3', '3D Design', 'Fintech', 'SaaS']} />
        </div>
      </section>

      <section className="space-y-16">
        <SectionTitle title="Education" subtitle="My academic journey" />
        <div className="relative pl-8 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-gold/30">
          <TimelineItem 
            date="2023 - Present"
            title="B.Sc in Software Engineering"
            institution="Daffodil International University"
            description="Focusing on Software Architecture, DevOps, Data Engineering, Machine Learning & Automation. Current SGPA: 3.75."
          />
          <TimelineItem 
            date="2018 - 2020"
            title="Higher Secondary School Certificate (HSC)"
            institution="Netrakona Govt. College, Netrakona"
            description="Science Group. Achieved GPA: 5.00 out of 5.00."
          />
          <TimelineItem 
            date="2016 - 2018"
            title="Secondary School Certificate (SSC)"
            institution="Anjuman Adarsha Govt. High School, Netrakona"
            description="Science Group. Achieved GPA: 5.00 out of 5.00."
          />
        </div>
      </section>

      <section className="space-y-16">
        <SectionTitle title="Achievements & Research" subtitle="Honors & Community Leadership" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AchievementCard 
            title="Best Research Proposal Award" 
            award="DIU Research Society 2024" 
            description="Awarded for outstanding proposal in the 'Meet the Researchers' program." 
          />
          <AchievementCard 
            title="Accepted Research Publication" 
            award="DIU Journal of Allied Health & Sciences" 
            description="Titled 'Dengue Fever: A Persistent Public Health Challenge in Bangladesh'." 
          />
          <AchievementCard 
            title="Organizing Secretary" 
            award="DIU Research Society (2025 - Present)" 
            description="Organized 10+ international seminars, workshops and guest lecture series." 
          />
        </div>
      </section>

      <NextPage to="/showcase" label="Showcase" />
    </div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="space-y-2">
    <h3 className="text-3xl font-serif text-charcoal">{title}</h3>
    <p className="text-xs uppercase tracking-[0.3em] font-mono text-charcoal/40">{subtitle}</p>
    <div className="w-12 h-px bg-gold mt-4" />
  </div>
);

const SocialCard = ({ icon: Icon, href, name }: { icon: any, href: string, name: string }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-3.5 bg-white border border-charcoal/5 hover:border-gold transition-all duration-300 shadow-sm group/card white-box"
    aria-label={name}
  >
    <div className="text-charcoal/40 group-hover/card:text-gold transition-colors duration-300 shrink-0">
      <Icon size={18} />
    </div>
    <span className="text-[10px] uppercase tracking-[0.15em] font-mono font-bold text-charcoal/70 group-hover/card:text-charcoal transition-colors duration-300 truncate">
      {name}
    </span>
  </a>
);

const SkillGroup = ({ title, skills }: { title: string, skills: string[] }) => (
  <div className="space-y-6">
    <h4 className="text-xl font-serif text-charcoal/80 border-b border-gold/10 pb-2">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <Badge key={skill} className="hover:bg-gold hover:text-white transition-colors cursor-default">{skill}</Badge>
      ))}
    </div>
  </div>
);

const TimelineItem = ({ date, title, institution, description }: any) => (
  <div className="relative">
    <div className="absolute -left-10 top-2 w-4 h-4 bg-cream border-2 border-gold rounded-full" />
    <div className="text-sm font-mono text-gold mb-1">{date}</div>
    <h4 className="text-2xl font-serif text-charcoal mb-1">{title}</h4>
    <div className="text-charcoal/60 font-serif italic mb-3">{institution}</div>
    <p className="text-charcoal/70 leading-relaxed max-w-xl">{description}</p>
  </div>
);

const AchievementCard = ({ title, award, description }: any) => (
  <div className="deco-card p-8 group">
    <h4 className="text-2xl font-serif mb-2 text-charcoal group-hover:text-gold transition-colors">{title}</h4>
    <div className="text-gold text-xs uppercase tracking-widest mb-4 font-mono">{award}</div>
    <p className="text-charcoal/60 text-sm leading-relaxed">{description}</p>
  </div>
);

export default AboutPage;
