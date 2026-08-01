import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Clock, Share2, Send } from 'lucide-react';
import { GoldButton, Badge } from '../components/shared/UI';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import NextPage from '../components/shared/NextPage';
import SEO from '../components/shared/SEO';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Nazmul Haque Rafi",
    "description": "Professional contact portal for Nazmul Haque Rafi (NH Rafi). Send inquiries regarding software development or machine learning research.",
    "mainEntity": {
      "@type": "Person",
      "name": "Nazmul Haque Rafi",
      "email": "nhrafi1x@gmail.com"
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const path = 'contacts';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('idle');
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-12 px-2 sm:px-4 space-y-12 sm:space-y-20">
      <SEO 
        title="Contact" 
        description="Get in touch with Nazmul Haque Rafi (NH Rafi). Open for collaborations, professional opportunities, and research discussions."
        keywords="Contact, Hire, Collaboration, Software Engineer, Chittagong, Bangladesh"
        schemaData={contactSchema}
      />
      <header className="text-center space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif">Get in Touch</h1>
        <p className="text-charcoal/60 font-serif italic max-w-xl mx-auto text-base sm:text-lg">
          Whether you have a potential project, a research inquiry, or just want to say hello, my inbox is always open.
        </p>
      </header>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-white p-6 sm:p-10 md:p-12 border border-gold/10 shadow-2xl relative white-box"
        >
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 border-t border-r border-gold/20 -translate-x-2 translate-y-2 sm:-translate-x-4 sm:translate-y-4 pointer-events-none" />
          
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <FloatingInput 
                label="Full Name" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required 
              />
              <FloatingInput 
                label="Email Address" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                required 
              />
            </div>
            <FloatingInput 
              label="Subject" 
              value={formData.subject} 
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
              required 
            />
            <div className="relative pt-2">
              <textarea 
                className="w-full bg-transparent border-b border-charcoal/20 py-3 sm:py-4 focus:border-gold outline-none transition-all resize-none h-28 sm:h-32 peer font-serif text-sm sm:text-base"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest text-[10px] sm:text-xs font-mono ${formData.message ? '-top-2 text-gold' : 'top-5 text-charcoal/40 peer-focus:-top-2 peer-focus:text-gold'}`}>
                Tell me about your inquiry
              </label>
            </div>
            
            <button 
              disabled={status === 'submitting'}
              className="gold-button w-full py-3.5 sm:py-4 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em]"
            >
              {status === 'submitting' ? 'Transmitting...' : status === 'success' ? 'Message Received' : (
                <>
                  Send Message
                  <Send size={16} className="mt-[-2px]" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <ContactInfoCard 
            icon={Mail} 
            title="Email" 
            content="nhrafi1x@gmail.com" 
            sub="Expect a reply within 24 hours." 
          />
          <ContactInfoCard 
            icon={MapPin} 
            title="Location" 
            content="Chittagong, Bangladesh" 
            sub="Available for remote & hybrid roles." 
          />
          <ContactInfoCard 
            icon={Clock} 
            title="Availability" 
            content="Mon — Fri, 9:00 — 18:00" 
            sub="Current Time: GMT+6" 
          />
          <div className="bg-white p-6 sm:p-8 border border-gold/10 white-box">
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-charcoal/40 mb-4 sm:mb-6 flex items-center gap-3">
              <Share2 size={14} /> Social Presence
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <SocialLink name="LinkedIn" href="#" />
              <SocialLink name="GitHub" href="#" />
              <SocialLink name="Twitter" href="#" />
              <SocialLink name="Fiverr" href="#" />
            </div>
          </div>
        </div>
      </div>

      <NextPage to="/" label="Back Home" />
    </div>
  );
};

const FloatingInput = ({ label, type = 'text', ...props }: any) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <input 
        type={type}
        className="w-full bg-transparent border-b border-charcoal/20 py-4 focus:border-gold outline-none transition-all peer font-serif"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest text-xs font-mono ${(focused || props.value) ? '-top-4 text-gold' : 'top-4 text-charcoal/40'}`}>
        {label}
      </label>
    </div>
  );
};

const ContactInfoCard = ({ icon: Icon, title, content, sub }: any) => (
  <div className="bg-white p-8 border border-gold/10 group hover:border-gold/40 transition-all duration-500 shadow-sm white-box">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 border border-gold/20 flex items-center justify-center text-gold bg-gold/5 transition-all duration-500 group-hover:bg-gold group-hover:text-white">
        <Icon size={20} />
      </div>
      <h4 className="text-xs uppercase tracking-[0.3em] font-mono text-charcoal/40">{title}</h4>
    </div>
    <div className="text-2xl font-serif text-charcoal mb-1">{content}</div>
    <p className="text-xs text-charcoal/40 font-mono italic">{sub}</p>
  </div>
);

const SocialLink = ({ name, href }: { name: string, href: string }) => (
  <a href={href} className="flex items-center justify-between p-4 border border-charcoal/5 hover:border-gold transition-colors group">
    <span className="text-sm font-mono text-charcoal/60 group-hover:text-charcoal uppercase tracking-widest">{name}</span>
    <ChevronRight size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
  </a>
);

export default ContactPage;
const ChevronRight = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
