
import React from 'react';
import { Beaker, Layers, TrendingUp, BrainCircuit, ArrowUpRight, Zap, Database, Activity, Globe, Search, TestTube, Lightbulb } from 'lucide-react';

const Research: React.FC = () => {
  const researchPillars = [
    {
      id: 'poc',
      icon: <Beaker size={32} />,
      title: "Proof-of-Concept Design",
      desc: "Rapid prototyping of experimental models to test technological viability in complex enterprise infrastructures without commercial risk.",
      details: ["Viability Testing", "Rapid Prototyping", "Risk Mitigation"],
      decorative: <TestTube size={240} />
    },
    {
      id: 'framework',
      icon: <Layers size={32} />,
      title: "Framework Development",
      desc: "Codifying research into high-performance architectural patterns that can be standardized and scaled across disparate business units.",
      details: ["Architectural Patterns", "Standardization", "Scalability Research"],
      decorative: <Search size={240} />
    },
    {
      id: 'innovation',
      icon: <TrendingUp size={32} />,
      title: "Innovation Models",
      desc: "Developing long-term operating models that allow organizations to absorb continuous technological change while maintaining stability.",
      details: ["Change Absorption", "Stability Engineering", "Future-Proofing"],
      decorative: <Lightbulb size={240} />
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
              <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Methodology & Lab</span>
              <div className="w-12 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              The Innovation Platform
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium mx-auto">
              ITNEXT functions as a non-commercial experimentation environment where we deconstruct emerging technologies into actionable industrial frameworks.
            </p>
          </div>
        </div>
        
        {/* Subtle geometric background detail */}
        <div className="absolute top-0 left-0 w-1/3 h-full opacity-[0.03] pointer-events-none hidden lg:block text-brand-dark">
          <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100H400M0 200H400M0 300H400M0 400H400M0 500H400M0 600H400M0 700H400" stroke="currentColor" strokeWidth="1"/>
            <path d="M100 0V800M200 0V800M300 0V800" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </section>

      {/* Uniform High-Attention Research Grid */}
      <section className="py-24 px-6 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {researchPillars.map((pillar, index) => (
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
                      <span className="text-[10px] font-black text-zinc-300 tracking-[0.3em] block mb-1 uppercase">UNIT 0{index + 1}</span>
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

      {/* Applied Lab Lifecycle */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">Research Ethics</h2>
              <h3 className="text-4xl font-black text-brand-dark mb-10 tracking-tight uppercase">Responsible Experimentation</h3>
              <p className="text-lg text-zinc-500 leading-relaxed mb-12 font-medium">
                Our research prioritizes "Responsible AI" and sustainable digital systems. We evaluate not just what technology can do, but how it integrates ethically into the human workforce.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Algorithmic Transparency", desc: "Every model we test is deconstructed to ensure decision-making logic is clear and auditable." },
                  { title: "Empirical Testing", desc: "Moving beyond theoretical hype into data-backed validation of performance and security." },
                  { title: "Safety Alignment", desc: "Ensuring that intelligent automation remains aligned with human values and safety protocols." }
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
                  "The goal of ITNEXT Research is not to deliver a product, but to deliver the wisdom and the framework required for an organization to build its own future."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-[1px] bg-brand-accent"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent uppercase">Methodology Statement</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4 opacity-10">
                <BrainCircuit size={256} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Capability Metrics */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "PoC Speed", icon: <Zap size={20} /> },
            { label: "Empirical Data", icon: <Database size={20} /> },
            { label: "Lab Uptime", icon: <Activity size={20} /> },
            { label: "Open Research", icon: <Globe size={20} /> }
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

export default Research;
