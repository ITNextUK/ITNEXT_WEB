
import React from 'react';
import { Target, Compass, Shield, Zap, Database, Activity, Globe, ArrowUpRight, Award, BookOpen, Fingerprint, Eye } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';

const About: React.FC = () => {
  const { content } = useGlobalContext();
  const { about } = content;
  
  const getIcon = (idx: number) => {
    switch(idx) {
      case 0: return <Target size={32} />;
      case 1: return <Fingerprint size={32} />;
      case 2: return <Shield size={32} />;
      default: return <Target size={32} />;
    }
  };

  const getDecorative = (idx: number) => {
    switch(idx) {
      case 0: return <Compass size={240} />;
      case 1: return <Eye size={240} />;
      case 2: return <Award size={240} />;
      default: return <Compass size={240} />;
    }
  };

  return (
    <div className="pb-0 bg-white animate-in fade-in duration-700">
      <section className="pt-48 pb-24 px-6 relative border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-[1px] bg-brand-accent"></div>
              <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Organization & Values</span>
              <div className="w-12 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              {about.hero.title}
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium mx-auto">
              {about.hero.description}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {about.pillars.map((pillar, index) => (
              <div 
                key={pillar.id} 
                className="group relative overflow-hidden bg-white rounded-[3rem] border border-zinc-200 p-12 flex flex-col justify-between hover:border-brand-accent transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-brand-accent/10 h-full min-h-[550px]"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-20 h-20 bg-zinc-50 text-brand-dark flex items-center justify-center rounded-3xl group-hover:bg-brand-dark group-hover:text-white transition-all duration-500 shadow-sm">
                      {getIcon(index)}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-zinc-300 tracking-[0.3em] block mb-1 uppercase">VALUE 0{index + 1}</span>
                      <div className="h-1 w-8 bg-brand-accent ml-auto group-hover:w-16 transition-all duration-500"></div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-brand-dark mb-6 uppercase tracking-tighter leading-[0.95] group-hover:text-brand-accent transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-500 text-lg leading-relaxed font-medium mb-12">
                    {pillar.desc}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {pillar.details.map(detail => (
                      <div key={detail} className="flex items-center justify-between group/item p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 hover:bg-white hover:border-brand-accent/30 transition-all">
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{detail}</span>
                        <ArrowUpRight size={16} className="text-zinc-300 group-hover/item:text-brand-accent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-110 pointer-events-none text-brand-dark">
                  {getDecorative(index)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">{about.alignment.subtitle || 'Strategic Alignment'}</h2>
              <h3 className="text-4xl font-black text-brand-dark mb-10 tracking-tight uppercase">{about.alignment.title}</h3>
              <p className="text-lg text-zinc-500 leading-relaxed mb-12 font-medium">
                {about.alignment.description}
              </p>
              <div className="space-y-8">
                {about.alignmentItems.map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center text-brand-accent font-bold text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-brand-dark uppercase tracking-wider mb-2">{item.title}</h4>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="relative z-10">
                <blockquote className="text-2xl lg:text-3xl font-medium leading-tight mb-12 italic text-zinc-300">
                  "{about.visionQuote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-[1px] bg-brand-accent"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent uppercase">Organization Vision</span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4 opacity-10">
                <BookOpen size={256} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
