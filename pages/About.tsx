
import React from 'react';
import { Target, Compass, Shield, Zap, Database, Activity, Globe, ArrowUpRight, Award, BookOpen, Fingerprint, Eye } from 'lucide-react';

const About: React.FC = () => {
  const aboutPillars = [
    {
      id: 'mission',
      icon: <Target size={32} />,
      title: "Our Mission & Vision",
      desc: "Bridging the gap between academic research and industrial application through calculated, data-informed transformation journeys.",
      details: ["Academic-Industry Bridge", "Data-Informed Paths", "Resilience Focus"],
      decorative: <Compass size={240} />
    },
    {
      id: 'positioning',
      icon: <Fingerprint size={32} />,
      title: "Non-Commercial Core",
      desc: "Operating as an exploratory initiative to maintain intellectual freedom and provide truly objective, forward-looking strategic advice.",
      details: ["Objective Strategy", "Intellectual Freedom", "Exploratory Focus"],
      decorative: <Eye size={240} />
    },
    {
      id: 'responsibility',
      icon: <Shield size={32} />,
      title: "Responsible Innovation",
      desc: "A commitment to ethics and transparency, ensuring innovation models are cutting-edge and compliant with evolving AI standards.",
      details: ["Ethical AI Advocacy", "Transparency First", "Safety Alignment"],
      decorative: <Award size={240} />
    }
  ];

  return (
    <div className="pb-0 bg-white animate-in fade-in duration-700">
      {/* Centered Minimalist Hero */}
      <section className="pt-48 pb-24 px-6 relative border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-[1px] bg-brand-accent"></div>
              <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Organization & Values</span>
              <div className="w-12 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              Pioneering Knowledge <br className="hidden md:block" />
              Led Innovation
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium mx-auto">
              ITNEXT is a dedicated platform for strategic research and the practical application of emerging technologies in the enterprise landscape.
            </p>
          </div>
        </div>
        
        {/* Subtle geometric background detail */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none hidden lg:block">
          <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100H400M0 200H400M0 300H400M0 400H400M0 500H400M0 600H400M0 700H400" stroke="currentColor" strokeWidth="1"/>
            <path d="M100 0V800M200 0V800M300 0V800" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </section>

      {/* Uniform High-Attention About Grid */}
      <section className="py-24 px-6 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {aboutPillars.map((pillar, index) => (
              <div 
                key={pillar.id} 
                className="group relative overflow-hidden bg-white rounded-[3rem] border border-zinc-200 p-12 flex flex-col justify-between hover:border-brand-accent transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-brand-accent/10 h-full min-h-[550px]"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-20 h-20 bg-zinc-50 text-brand-dark flex items-center justify-center rounded-3xl group-hover:bg-brand-dark group-hover:text-white transition-all duration-500 shadow-sm">
                      {pillar.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-zinc-300 tracking-[0.3em] block mb-1">VALUE 0{index + 1}</span>
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

                {/* Decorative Background Element */}
                <div className="absolute -bottom-12 -right-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-110 pointer-events-none text-brand-dark">
                  {pillar.decorative}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophical Deep-Dive */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">Strategic Alignment</h2>
              <h3 className="text-4xl font-black text-brand-dark mb-10 tracking-tight uppercase">Responsible Digital Growth</h3>
              <p className="text-lg text-zinc-500 leading-relaxed mb-12 font-medium">
                Our approach to innovation is rooted in the UK's digital and AI growth strategy, focusing on sustainable systems that deliver long-term socio-economic value.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Continuous Learning", desc: "Fostering a culture where emerging research is constantly integrated into our strategic frameworks." },
                  { title: "Applied Frameworks", desc: "Developing methodologies that ensure digital transformation is both cutting-edge and industrially stable." },
                  { title: "Global Exchange", desc: "Collaborating across UK and European sectors to share insights on digital operating models." }
                ].map((item, i) => (
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
                  "ITNEXT operates as an intellectual engine, decoupling innovation from commercial noise to provide the strategic clarity leaders need."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-[1px] bg-brand-accent"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Organization Vision</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4 opacity-10">
                <BookOpen size={256} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Credibility Metrics */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "18+ Years", icon: <Zap size={20} /> },
            { label: "Research Driven", icon: <Database size={20} /> },
            { label: "UK / EU Focus", icon: <Globe size={20} /> },
            { label: "Non-Commercial", icon: <Activity size={20} /> }
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

export default About;
