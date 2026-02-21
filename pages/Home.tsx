
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, BarChart2, Shield, RefreshCcw, Sparkles } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';

const Hero: React.FC = () => {
  const { content } = useGlobalContext();
  return (
    <section className="relative pt-32 pb-32 lg:pt-56 lg:pb-72 px-6 bg-zinc-50 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-brand-accent blur-[160px]"></div>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.1] lg:opacity-[0.15]">
        <img 
          src="https://images.unsplash.com/photo-1620712943543-bcc463867000?q=80&w=2000&auto=format&fit=crop" 
          alt="Abstract Network"
          className="w-full h-full object-cover scale-110"
        />
      </div>
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-sm">
          <Sparkles size={12} />
          <span>Bridging Research & Industry</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
          {content.hero.title}
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mb-16 leading-relaxed mx-auto font-medium">
          {content.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 justify-center">
          <Link to="/focus-areas" className="bg-brand-dark text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:bg-brand-accent transition-all duration-500 group shadow-2xl shadow-brand-dark/20">
            {content.hero.ctaPrimary}
            <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/contact" className="bg-white border border-zinc-200 text-brand-dark px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-all duration-500 shadow-sm">
            {content.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

const Overview: React.FC = () => {
  const { content } = useGlobalContext();
  return (
    <section className="py-32 px-6 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <div className="w-12 h-1 bg-brand-accent mb-8"></div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark mb-8 tracking-tight uppercase">{content.overview.title}</h2>
          <p className="text-xl text-zinc-500 leading-relaxed mb-8 font-medium">
            {content.overview.text1}
          </p>
          <p className="text-lg text-zinc-500 leading-relaxed font-medium">
            {content.overview.text2}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="aspect-square bg-zinc-50 rounded-3xl flex flex-col justify-center p-10 border border-zinc-100 group hover:border-brand-accent transition-colors duration-500">
            <span className="text-5xl font-black text-brand-dark mb-4 group-hover:text-brand-accent transition-colors">{content.overview.statValue}</span>
            <span className="text-[10px] text-zinc-400 uppercase font-black tracking-[0.2em]">{content.overview.statLabel}</span>
          </div>
          <div className="aspect-square bg-brand-dark rounded-3xl flex flex-col justify-center p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-4xl font-black mb-4 block text-brand-accent">Non-Comm</span>
              <span className="text-[10px] text-zinc-400 uppercase font-black tracking-[0.2em]">Exploratory Focus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FocusAreasSection: React.FC = () => {
  const { content } = useGlobalContext();
  const getIcon = (id: string) => {
    switch(id) {
      case 'data-products': return <BarChart2 className="group-hover:text-white transition-colors" size={32} />;
      case 'ai-automation': return <Cpu className="group-hover:text-white transition-colors" size={32} />;
      case 'cloud-cyber': return <Shield className="group-hover:text-white transition-colors" size={32} />;
      default: return <RefreshCcw className="group-hover:text-white transition-colors" size={32} />;
    }
  };

  return (
    <section className="py-32 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">Capabilities</h2>
          <h3 className="text-5xl font-black text-brand-dark tracking-tight uppercase">Core Focus Areas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.focusAreas.map(area => (
            <Link to="/focus-areas" key={area.id} className="bg-white p-10 rounded-3xl border border-zinc-100 hover:border-brand-accent transition-all duration-500 group block hover:shadow-2xl hover:shadow-brand-accent/5">
              <div className="mb-8 p-5 bg-brand-accentLight text-brand-accent rounded-2xl inline-block group-hover:bg-brand-accent transition-all duration-500">
                {getIcon(area.id)}
              </div>
              <h4 className="text-xl font-black text-brand-dark mb-6 tracking-tight uppercase group-hover:text-brand-accent transition-colors">{area.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">{area.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  const { content } = useGlobalContext();
  return (
    <section className="py-32 px-6 bg-brand-dark text-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-black mb-10 tracking-tight uppercase">{content.homeCTA.title}</h2>
        <p className="text-xl text-zinc-400 mb-16 font-medium">{content.homeCTA.description}</p>
        <Link to="/contact" className="bg-brand-accent text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-all duration-500 inline-block shadow-2xl shadow-brand-accent/20">
          {content.homeCTA.buttonText}
        </Link>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <Overview />
      <FocusAreasSection />
      <CTASection />
    </div>
  );
};

export default Home;
