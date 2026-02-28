import React from 'react';
import { Linkedin, Award, BookOpen, GraduationCap, Mail, Globe, Shield, Zap, Phone } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import founderImageFallback from '../assets/1755347681490 (1).jpg';

const Founder: React.FC = () => {
  const { content } = useGlobalContext();
  const { founder } = content;
  const founderImage = founder.image || founderImageFallback;
  
  return (
    <div className="pb-0 bg-white animate-in fade-in duration-700">
      <section className="pt-48 pb-24 px-6 relative border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-[1px] bg-brand-accent"></div>
              <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Leadership Profile</span>
              <div className="w-12 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              {founder.name}
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium mx-auto max-w-2xl">
              {founder.bio}
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none hidden lg:block text-brand-dark">
          <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100H400M0 200H400M0 300H400M0 400H400M0 500H400M0 600H400M0 700H400" stroke="currentColor" strokeWidth="1"/>
            <path d="M100 0V800M200 0V800M300 0V800" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl relative transition-all duration-700 border border-zinc-100">
                  <img 
                    src={founderImage} 
                    alt={founder.name} 
                    className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105 filter group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-accent rounded-3xl -z-10 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
              </div>

              <div className="mt-12 flex flex-col items-center lg:items-start space-y-6">
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-zinc-400 hover:text-brand-accent transition-all group w-full lg:w-auto">
                  <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em]">LinkedIn Profile</span>
                </a>
                <a href={`mailto:${founder.email}`} className="flex items-center space-x-4 text-zinc-400 hover:text-brand-accent transition-all group w-full lg:w-auto">
                  <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Email Correspondence</span>
                    <span className="text-[10px] font-bold opacity-60 uppercase">{founder.email}</span>
                  </div>
                </a>
                <a href={`tel:${founder.mobile}`} className="flex items-center space-x-4 text-zinc-400 hover:text-brand-accent transition-all group w-full lg:w-auto">
                  <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                    <Phone size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Direct Telephone</span>
                    <span className="text-[10px] font-bold opacity-60 uppercase">{founder.mobile}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-12">
              <div className="prose prose-lg prose-zinc max-w-none">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">Strategic Leadership</h2>
                <p className="text-2xl font-medium text-brand-dark leading-snug tracking-tight mb-8 italic">
                  "{founder.quote}"
                </p>
                <div className="space-y-6 text-zinc-500 font-medium leading-relaxed whitespace-pre-line">
                  {founder.detailedBio}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-zinc-100">
                <div className="p-8 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:border-brand-accent transition-colors">
                  <GraduationCap className="text-brand-accent mb-6" size={32} />
                  <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider mb-4">Academic Credentials</h3>
                  <div className="space-y-4">
                    {founder.credentials.map((cred, idx) => (
                      <div key={idx} className={idx < founder.credentials.length - 1 ? "pb-4 border-b border-zinc-50" : ""}>
                        <p className="text-xs font-bold text-zinc-900 mb-1">{cred.title}</p>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{cred.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-brand-dark text-white shadow-xl">
                  <Award className="text-brand-accent mb-6" size={32} />
                  <h3 className="text-sm font-black uppercase tracking-wider mb-6">Current Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {founder.focus.map(focus => (
                      <span key={focus} className="text-[9px] font-black bg-white/10 px-3 py-1.5 rounded-full uppercase tracking-widest text-zinc-300">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "18+ Years", icon: <Zap size={20} /> },
            { label: "Enterprise Scale", icon: <Globe size={20} /> },
            { label: "UK / EU Focus", icon: <Shield size={20} /> },
            { label: "Research Driven", icon: <BookOpen size={20} /> }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="text-zinc-300 mb-6 group-hover:text-brand-accent transition-colors duration-500">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black text-brand-dark uppercase tracking-[0.3em]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Founder;
