import React from 'react';
import { motion } from 'motion/react';
import { GoldButton, Badge } from '../components/shared/UI';
import { 
  Download, Github, Linkedin, Twitter, Instagram, 
  Youtube, Dribbble, ExternalLink, Globe, Briefcase, 
  ShoppingBag, Link as LinkIcon 
} from 'lucide-react';
import NextPage from '../components/shared/NextPage';
import SEO from '../components/shared/SEO';
import portraitImg from '../assets/images/regenerated_image_1778779242183.jpg';

const AboutPage = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Fiverr', icon: Briefcase, href: '#' },
    { name: 'Upwork', icon: Globe, href: '#' },
    { name: 'Dribbble', icon: Dribbble, href: '#' },
    { name: 'Gumroad', icon: ShoppingBag, href: '#' },
  ];

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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <GoldButton className="flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold w-full sm:w-auto">
                <Download size={16} />
                Download CV
              </GoldButton>
              <GoldButton className="flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold w-full sm:w-auto">
                <Download size={16} />
                Download Resume
              </GoldButton>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-xs uppercase tracking-[0.3em] font-mono text-charcoal/40">Social Presence</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {socialLinks.map((social) => (
                  <SocialCard key={social.name} icon={social.icon} href={social.href} name={social.name} />
                ))}
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
              className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700 bg-black cursor-pointer"
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
            date="2019 - 2023"
            title="B.Sc in Computer Science & Engineering"
            institution="Premier University Chittagong"
            description="Focused on Artificial Intelligence and Distributed Systems. Graduated with honors."
          />
          <TimelineItem 
            date="2016 - 2018"
            title="Higher Secondary Certificate"
            institution="Chittagong College"
            description="Science major with a strong foundation in Mathematics and Physics."
          />
        </div>
      </section>

      <section className="space-y-16">
        <SectionTitle title="Achievements" subtitle="Honors & Awards" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AchievementCard 
            title="Best Research Award" 
            award="IJAI Excellence 2023" 
            description="Awarded for 'Optimization of Neural Networks for Low-Power Devices'." 
          />
          <AchievementCard 
            title="Organising Secretary" 
            award="AI Symposium 2022" 
            description="Led the organization of the regional AI conference with 500+ attendees." 
          />
          <AchievementCard 
            title="Level 2 Seller" 
            award="Fiverr Freelance" 
            description="Consistently rated 5 stars for high-end 3D interior design services." 
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
    className="flex items-center gap-3 p-4 bg-white border border-charcoal/5 hover:border-gold transition-all duration-500 shadow-sm group/card white-box"
    aria-label={name}
  >
    <div className="text-charcoal/40 group-hover/card:text-gold transition-colors duration-300">
      <Icon size={20} />
    </div>
    <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-charcoal/60 group-hover/card:text-charcoal transition-colors duration-300">
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
