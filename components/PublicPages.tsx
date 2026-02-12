import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Star, Play, Camera, Coffee, Briefcase, Sparkles, ChevronDown, Plus, Minus, Instagram, Globe, Layers, TrendingUp, PenTool, Zap, UserCheck, ShieldCheck, Crown, Rocket, Clock, Target, Calendar } from 'lucide-react';
import { AppView, ServicePackage } from '../types';
import { SERVICES, PORTFOLIO, TESTIMONIALS, FAQS } from '../constants';

interface PublicProps {
  setView: (view: AppView) => void;
  setSelectedServiceId?: (id: string) => void;
  selectedServiceId?: string;
}

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
};

export const Home: React.FC<PublicProps> = ({ setView }) => {
  useScrollReveal();

  return (
    <div className="bg-stone-50 overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
           <video
            className="w-full h-full object-cover scale-105"
            autoPlay
            muted
            loop
            playsInline
            poster="https://img.freepik.com/free-photo/happy-diverse-people-using-digital-devices_53876-96225.jpg"
          >
            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Fine border frame */}
        <div className="absolute inset-8 border border-white/10 pointer-events-none z-20"></div>

        <div className="relative z-30 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
          <div className="mb-8 animate-fade-in-up">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-500 border border-amber-500/30 px-6 py-3">Est. MMXXIV</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[0.9] mb-10 animate-fade-in-up delay-100">
            Digital <span className="italic font-light text-stone-400">Haute</span><br/>
            Couture.
          </h1>
          <p className="text-lg md:text-xl text-stone-400 font-light max-w-lg mx-auto mb-16 leading-relaxed animate-fade-in-up delay-200 tracking-wide">
            Socialz curates bespoke digital narratives for the world's most discerning brands.
          </p>
          <div className="animate-fade-in-up delay-300">
             <button onClick={() => setView(AppView.SERVICES)} className="group relative px-10 py-5 bg-white text-stone-950 text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-transform duration-500 hover:scale-105">
              <span className="relative z-10">Enter Atelier</span>
              <div className="absolute inset-0 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Brand Marquee - Minimalist */}
      <section className="bg-stone-50 py-16 border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
           <p className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">Trusted By The Elite</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex space-x-32 items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-4xl font-serif font-bold text-stone-900 italic">VOGUE</span>
                <span className="text-4xl font-serif font-bold text-stone-900">Cartier</span>
                <span className="text-4xl font-serif font-bold text-stone-900 italic">ROLEX</span>
                <span className="text-4xl font-serif font-bold text-stone-900">Four Seasons</span>
                <span className="text-4xl font-serif font-bold text-stone-900 italic">CHANEL</span>
                <span className="text-4xl font-serif font-bold text-stone-900">Sotheby's</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Editorial Layout */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
            <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">
              Curated <br/> <span className="italic text-stone-400">Collections</span>
            </h2>
            <div className="w-24 h-px bg-stone-900 mb-4 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
             {[
               { title: 'The Launchpad', sub: 'For Startups', desc: 'Establishing authority from day one.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop' },
               { title: 'The Bistro', sub: 'For Hospitality', desc: 'Sensory storytelling for culinary arts.', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop' },
               { title: 'The Icon', sub: 'For Personal Brands', desc: 'Architecting your digital legacy.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
               { title: 'The Gala', sub: 'For Events', desc: 'Capturing moments, creating eternity.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop' },
             ].map((item, idx) => (
               <div key={idx} onClick={() => setView(AppView.SERVICES)} className="group relative bg-white h-[500px] overflow-hidden cursor-pointer">
                 <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/40 transition-colors duration-500 z-10"></div>
                 <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                 
                 <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
                    <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-y-4 group-hover:translate-y-0">
                       <span className="text-xs font-bold uppercase tracking-[0.2em] text-white border border-white/30 px-4 py-2">{item.sub}</span>
                       <ArrowRight className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-serif text-white italic mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                      <p className="text-white/80 font-light text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Methodology - Minimalist */}
      <section className="py-32 bg-stone-950 text-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 reveal">
                 <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-600 mb-6">Process</h2>
                 <h3 className="text-5xl font-serif text-white mb-8">From Vision to <span className="italic">Virality</span>.</h3>
                 <p className="font-light text-stone-400 leading-relaxed">
                   Our proprietary framework ensures that every piece of content serves a greater narrative purpose. We don't just post; we build worlds.
                 </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 reveal">
                 {[
                   { step: "01", title: "Audit & Discovery", desc: "Deconstructing your current presence to find the gold." },
                   { step: "02", title: "Visual Curation", desc: "Developing a moodboard that speaks your unspoken language." },
                   { step: "03", title: "Production", desc: "High-fidelity creation, copywriting, and meticulous scheduling." },
                   { step: "04", title: "Optimization", desc: "Data-driven refinement to ensure continuous ascent." },
                 ].map((s, i) => (
                   <div key={i} className="border-t border-stone-800 pt-8 group hover:border-amber-600 transition-colors duration-500">
                      <span className="text-4xl font-serif text-stone-700 mb-4 block group-hover:text-amber-600 transition-colors">{s.step}</span>
                      <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-3">{s.title}</h4>
                      <p className="text-stone-500 font-light text-sm">{s.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CTA - High End */}
      <section className="bg-stone-50 py-40 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center px-6 reveal">
          <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-12">
            Are you ready to be <br/><span className="italic text-stone-400">seen?</span>
          </h2>
          <button onClick={() => setView(AppView.SIGNUP)} className="bg-stone-900 text-white px-12 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-amber-600 transition-colors duration-300">
            Apply for Membership
          </button>
        </div>
      </section>
    </div>
  );
};

export const Services: React.FC<PublicProps> = ({ setView, setSelectedServiceId }) => {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const handleServiceSelect = (id: string) => {
      if(setSelectedServiceId) {
          setSelectedServiceId(id);
          setView(AppView.SERVICE_DETAIL);
      }
  };

  const categories = ['All', 'Business', 'Lifestyle', 'Events'];
  
  const getFilteredServices = () => {
      if (activeCategory === 'All') return SERVICES;
      if (activeCategory === 'Business') return SERVICES.filter(s => ['Startup', 'Real Estate', 'Corporate', 'E-Commerce'].includes(s.category));
      if (activeCategory === 'Lifestyle') return SERVICES.filter(s => ['Cafe', 'Influencer', 'Wellness'].includes(s.category));
      if (activeCategory === 'Events') return SERVICES.filter(s => ['Wedding'].includes(s.category));
      return SERVICES;
  };

  const filteredServices = getFilteredServices();

  return (
    <div className="bg-stone-50 min-h-screen pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20 reveal">
          <h1 className="text-7xl md:text-9xl font-serif text-stone-900 mb-8 opacity-90">Services</h1>
          <div className="h-px w-full bg-stone-200 mb-12"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-8 sticky top-24 z-30 bg-stone-50/90 backdrop-blur-md py-4 border-b border-stone-200">
            {categories.map((cat) => (
                <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeCategory === cat ? 'text-stone-900 border-b-2 border-amber-600 pb-1' : 'text-stone-400 hover:text-stone-700'}`}
                >
                    {cat}
                </button>
            ))}
          </div>
        </div>

        <div className="space-y-32">
          {filteredServices.map((service, index) => (
            <div key={service.id} className="group reveal grid grid-cols-1 lg:grid-cols-12 gap-12 items-center cursor-pointer" onClick={() => handleServiceSelect(service.id)}>
               <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''} overflow-hidden h-[600px] shadow-2xl`}>
                  <div className="w-full h-full overflow-hidden relative">
                     <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-all duration-500 z-10"></div>
                     <img src={service.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
               </div>
               <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1 lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                  <span className="text-amber-600 font-bold tracking-[0.2em] text-[10px] uppercase mb-6 block border border-amber-600/30 px-3 py-1 inline-block">
                     {service.category} Collection
                  </span>
                  <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 group-hover:italic transition-all duration-300 leading-none">{service.title}</h2>
                  <p className={`text-stone-500 text-lg font-light leading-relaxed mb-10 max-w-lg ${index % 2 === 1 ? 'ml-auto' : ''}`}>{service.description}</p>
                  
                  <div className={`flex items-center space-x-12 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                     <div>
                       <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Monthly Retainer</span>
                       <span className="text-3xl font-serif text-stone-900">${service.price}</span>
                     </div>
                     <button className="h-16 w-16 border border-stone-200 rounded-full flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white transition-all duration-500">
                        <ArrowRight size={20} />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
        
        {/* Bespoke Request Section */}
        <div className="mt-40 border border-stone-200 p-20 text-center bg-white reveal">
            <h2 className="text-4xl font-serif text-stone-900 mb-6">Need something bespoke?</h2>
            <p className="text-stone-500 font-light mb-10 max-w-2xl mx-auto">
                For enterprise clients and large-scale activations, our concierge team can architect a custom package tailored to your exact specifications.
            </p>
            <button onClick={() => setView(AppView.CONTACT)} className="px-10 py-4 bg-stone-900 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors">
                Contact Concierge
            </button>
        </div>
      </div>
    </div>
  );
};

export const Pricing: React.FC<PublicProps> = ({ setView }) => {
  useScrollReveal();
  
  return (
     <div className="bg-stone-50 min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 reveal">
           <h2 className="text-xs text-amber-600 font-bold tracking-[0.4em] uppercase mb-6">Investment</h2>
          <h1 className="text-6xl md:text-8xl font-serif text-stone-900">The Membership</h1>
          <p className="mt-8 text-xl text-stone-500 font-light max-w-2xl mx-auto">Start with an intensive sprint. Evolve into a legacy with our recurring atelier service.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-stone-200 bg-white reveal">
            {/* Standard */}
            <div className="p-16 border-r border-stone-100">
               <div className="mb-10">
                 <h3 className="text-3xl font-serif text-stone-900 mb-2">The Sprint</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-stone-400">30-Day Intensive</p>
               </div>
               <p className="text-stone-500 font-light leading-relaxed mb-12 min-h-[80px]">
                 The perfect foundation. We build your aesthetic, launch your content, and set the standard for your brand's future.
               </p>
               <ul className="space-y-6 mb-12">
                  <li className="flex items-center text-stone-800 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-stone-900 mr-4"></span> Full Content Production</li>
                  <li className="flex items-center text-stone-800 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-stone-900 mr-4"></span> Visual Identity Calibration</li>
                  <li className="flex items-center text-stone-800 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-stone-900 mr-4"></span> Basic Community Management</li>
               </ul>
               <button onClick={() => setView(AppView.SERVICES)} className="w-full border border-stone-900 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white transition-colors">View Collections</button>
            </div>

            {/* Premium */}
            <div className="p-16 bg-stone-950 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20"><Crown size={100} strokeWidth={0.5} /></div>
               <div className="mb-10 relative z-10">
                 <h3 className="text-3xl font-serif text-white mb-2 italic">The Retainer</h3>
                 <p className="text-xs font-bold uppercase tracking-widest text-amber-500">Recurring Membership</p>
               </div>
               <p className="text-stone-400 font-light leading-relaxed mb-12 min-h-[80px] relative z-10">
                 For brands that demand consistency. Priority access to our creative team, advanced analytics, and continuous evolution.
               </p>
               <ul className="space-y-6 mb-12 relative z-10">
                  <li className="flex items-center text-stone-300 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-amber-500 mr-4"></span> Everything in Sprint</li>
                  <li className="flex items-center text-stone-300 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-amber-500 mr-4"></span> 24/7 Concierge Support</li>
                  <li className="flex items-center text-stone-300 text-sm tracking-wide"><span className="w-1.5 h-1.5 bg-amber-500 mr-4"></span> Quarterly Brand Audits</li>
               </ul>
               <button onClick={() => setView(AppView.SIGNUP)} className="relative z-10 w-full bg-amber-700 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors">Apply for Access</button>
            </div>
        </div>
      </div>
     </div>
  );
};

export const About: React.FC = () => {
    useScrollReveal();
    return (
  <div className="bg-stone-50 min-h-screen">
    <div className="bg-stone-900 pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-8">The Architects of <span className="italic text-stone-400">Influence</span></h1>
            <p className="text-xl text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">We don't just manage social media. We curate digital legacies.</p>
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center reveal">
            <div>
                 <h2 className="text-xs text-amber-600 font-bold tracking-[0.3em] uppercase mb-6">Manifesto</h2>
                 <h2 className="text-5xl font-serif text-stone-900 mb-10 leading-tight">Elevating Standards. <br/> Defining Culture.</h2>
                 <div className="space-y-8">
                   <p className="text-stone-600 text-lg font-light leading-relaxed border-l-2 border-amber-600 pl-6">
                       We believe that true luxury is seamlessness. It is the art of appearing effortless while being meticulously planned.
                   </p>
                   <p className="text-stone-600 text-lg font-light leading-relaxed">
                       Our vision is to provide a white-glove service for the digital age, enabling founders and brands to focus on their craft while we ensure their voice resonates with elegance and authority.
                   </p>
                 </div>
            </div>
             <div className="relative aspect-[4/5]">
                <div className="absolute inset-0 border border-stone-900 transform translate-x-4 translate-y-4"></div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="relative z-10 w-full h-full object-cover grayscale" />
            </div>
        </div>
    </div>
  </div>
)};

export const Contact: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-stone-50 min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div className="reveal">
             <h1 className="text-7xl font-serif text-stone-900 mb-12">Get in <br/><span className="italic text-stone-400">Touch</span></h1>
             <p className="text-lg text-stone-500 font-light mb-16 max-w-md leading-relaxed">
               Ready to elevate your digital presence? Our concierge team is ready to curate a proposal for you.
             </p>
             
             <div className="space-y-10">
                <div className="flex items-start">
                   <span className="text-xs font-bold uppercase tracking-widest text-stone-400 w-24 pt-1">Atelier</span>
                   <p className="text-stone-900 font-serif text-xl">123 Creative Avenue, NY</p>
                </div>
                <div className="flex items-start">
                   <span className="text-xs font-bold uppercase tracking-widest text-stone-400 w-24 pt-1">Direct</span>
                   <p className="text-stone-900 font-serif text-xl">+1 (555) 000-0000</p>
                </div>
                <div className="flex items-start">
                   <span className="text-xs font-bold uppercase tracking-widest text-stone-400 w-24 pt-1">Email</span>
                   <p className="text-stone-900 font-serif text-xl">concierge@socialz.inc</p>
                </div>
             </div>
           </div>

           <div className="bg-white p-12 shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-stone-100 reveal">
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 group-focus-within:text-amber-600 transition-colors">First Name</label>
                      <input type="text" className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors text-stone-900" />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 group-focus-within:text-amber-600 transition-colors">Last Name</label>
                      <input type="text" className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors text-stone-900" />
                    </div>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 group-focus-within:text-amber-600 transition-colors">Email Address</label>
                  <input type="email" className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors text-stone-900" />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 group-focus-within:text-amber-600 transition-colors">Inquiry</label>
                  <textarea rows={4} className="w-full border-b border-stone-200 py-3 bg-transparent focus:outline-none focus:border-stone-900 transition-colors text-stone-900 resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors mt-8">
                  Send Message
                </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceDetail: React.FC<PublicProps> = ({ setView, selectedServiceId }) => {
    useScrollReveal();
    const service = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

    const handleBook = () => {
        // In a real app, we might pass the selected service ID through state/context
        // For this demo, user selects again in dashboard or we assume pre-selection logic
        setView(AppView.USER_REQUIREMENTS);
    };

    return (
        <div className="bg-stone-50 min-h-screen pb-0 pt-0">
             {/* Service Hero */}
            <div className="relative h-[85vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img src={service.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                </div>
                <div className="absolute inset-0 bg-stone-950/50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 animate-fade-in-up z-10">
                    <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs mb-8 border border-amber-500/30 px-4 py-2 bg-stone-900/50 backdrop-blur-md">{service.category} Collection</span>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 italic drop-shadow-2xl">{service.title}</h1>
                    <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed tracking-wide drop-shadow-md">{service.description}</p>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
                    <ChevronDown size={32} strokeWidth={1} />
                </div>
            </div>

            {/* Strategy & Overview */}
            <div className="bg-white py-32 border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-5 reveal">
                             <h2 className="text-xs font-bold text-amber-600 uppercase tracking-[0.4em] mb-8">The Strategy</h2>
                             <p className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
                                {service.strategy}
                             </p>
                        </div>
                        <div className="lg:col-span-1"></div>
                        <div className="lg:col-span-6 reveal delay-100">
                             <h3 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-8">Curated For</h3>
                             <div className="grid grid-cols-2 gap-6">
                                {service.idealFor?.map((item, i) => (
                                    <div key={i} className="flex items-center space-x-4 border-l-2 border-amber-500 pl-4 py-1">
                                        <span className="text-stone-700 font-serif text-lg">{item}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Process Timeline */}
            <div className="bg-stone-50 py-32 border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20 reveal">
                        <h2 className="text-4xl font-serif text-stone-900">The 4-Week Sprint</h2>
                        <p className="text-stone-500 font-light mt-4">From briefing to brilliance in 30 days.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 reveal">
                        {service.process?.map((step, idx) => (
                            <div key={idx} className="relative group">
                                <div className="text-8xl font-serif text-stone-200 absolute -top-12 -left-4 z-0 group-hover:text-amber-100 transition-colors">0{idx + 1}</div>
                                <div className="relative z-10 bg-white p-8 border border-stone-100 shadow-sm group-hover:-translate-y-2 transition-transform duration-500">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-2 block">{step.week}</span>
                                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-4">{step.title}</h3>
                                    <p className="text-stone-500 text-sm font-light leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Deliverables & Pricing */}
            <div className="bg-stone-950 text-white py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-24 reveal">
                        <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Investment</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white">Choose Your Path</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch reveal">
                        {/* Normal Plan - The Sprint */}
                        <div className="bg-stone-900 border border-stone-800 p-12 relative group hover:border-stone-700 transition-colors">
                            <div className="mb-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-4xl font-serif text-white">The Sprint</h3>
                                        <p className="text-stone-400 text-xs uppercase tracking-widest mt-2">One-Time Activation</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-5xl font-serif text-white">${service.price}</span>
                                        <span className="block text-stone-500 text-xs mt-1 uppercase tracking-widest">Total</span>
                                    </div>
                                </div>
                                <p className="text-stone-400 font-light text-sm leading-relaxed border-b border-stone-800 pb-8">
                                    Perfect for brands needing a complete visual overhaul and launch strategy. We build the foundation.
                                </p>
                            </div>

                            <div className="space-y-8 mb-16">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">Deliverables Breakdown</h4>
                                <ul className="space-y-6">
                                    {service.deliverables.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-stone-300 text-sm font-light group-hover:text-white transition-colors">
                                            <Check className="w-5 h-5 text-stone-600 mr-4 mt-0.5 flex-shrink-0 group-hover:text-amber-500 transition-colors" strokeWidth={1.5} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button onClick={handleBook} className="w-full bg-white text-stone-950 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-300">
                                Book One-Month Sprint
                            </button>
                        </div>

                        {/* Premium Plan - The Membership */}
                        <div className="bg-stone-100 text-stone-900 p-12 relative overflow-hidden transform lg:-translate-y-8 lg:translate-x-4 shadow-2xl border border-white">
                            <div className="absolute top-0 right-0 p-6 text-amber-200"><Crown size={120} strokeWidth={0.5} className="opacity-50" /></div>
                            
                            <div className="mb-10 relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-4xl font-serif text-stone-900">The Membership</h3>
                                        <p className="text-amber-600 text-xs uppercase tracking-widest mt-2">Recurring Legacy</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-5xl font-serif text-stone-900">+ $200</span>
                                        <span className="block text-stone-400 text-xs mt-1 uppercase tracking-widest">/ Month</span>
                                    </div>
                                </div>
                                <p className="text-stone-500 font-light text-sm leading-relaxed border-b border-stone-200 pb-8">
                                    The upgrade path. Continue the momentum with ongoing management, priority support, and deeper analytics.
                                </p>
                            </div>

                            <div className="space-y-8 mb-16 relative z-10">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Exclusive Privileges</h4>
                                <ul className="space-y-6">
                                    {service.premiumPerks.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-stone-700 text-sm font-medium">
                                            <Star className="w-5 h-5 text-amber-600 mr-4 mt-0.5 flex-shrink-0 fill-amber-600" strokeWidth={1} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                    {/* Reiterate core deliverables */}
                                    <li className="flex items-center text-stone-400 text-sm font-light italic mt-6 pt-6 border-t border-stone-200">
                                        <Plus size={14} className="mr-2" /> Includes all Sprint Deliverables monthly
                                    </li>
                                </ul>
                            </div>

                            <button onClick={() => setView(AppView.SERVICES)} className="w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all duration-300 relative z-10">
                                View Membership Details
                            </button>
                            <p className="text-[10px] text-center text-stone-400 mt-4 uppercase tracking-widest relative z-10">Available for upgrade after month 1</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Call to Action */}
            <div className="bg-white py-40 text-center">
                 <h2 className="text-5xl font-serif text-stone-900 mb-8">Not sure which to choose?</h2>
                 <p className="text-stone-500 font-light mb-12 max-w-xl mx-auto">Our concierge team can audit your brand and recommend the perfect tier for your goals.</p>
                 <button onClick={() => setView(AppView.CONTACT)} className="border-b border-stone-900 pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:text-amber-600 hover:border-amber-600 transition-colors">
                    Consult with an Expert
                 </button>
            </div>
        </div>
    );
}

export const FAQPage: React.FC = () => {
    useScrollReveal();
    const categories = Array.from(new Set(FAQS.map(f => f.category)));

    return (
        <div className="bg-stone-50 min-h-screen py-40">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-24 reveal">
                    <h1 className="text-6xl md:text-8xl font-serif text-stone-900 mb-8">Inquiries</h1>
                    <p className="text-lg text-stone-500 font-light tracking-wide">Common questions regarding our process and memberships.</p>
                </div>

                <div className="space-y-20">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="reveal">
                            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-8 border-b border-amber-600/20 pb-4 inline-block">{cat}</h3>
                            <div className="space-y-6">
                                {FAQS.filter(f => f.category === cat).map((faq, fIdx) => (
                                    <div key={fIdx} className="bg-white p-8 border border-stone-100">
                                      <h4 className="font-serif text-xl text-stone-900 mb-4">{faq.q}</h4>
                                      <p className="text-stone-500 font-light leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};