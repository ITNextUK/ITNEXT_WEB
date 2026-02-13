
import React from 'react';
import { RECENT_INSIGHTS } from '../constants';
import { Calendar, User, ArrowUpRight, BookOpen, Newspaper, Lightbulb, MessageSquare, Zap, Globe, Activity, Database, Sparkles } from 'lucide-react';

const Insights: React.FC = () => {
  const categories = [
    { name: 'Research Notes', count: 12 },
    { name: 'Strategy', count: 8 },
    { name: 'AI Ethics', count: 5 },
    { name: 'Cloud Architecture', count: 7 },
    { name: 'Digital Transformation', count: 14 }
  ];

  return (
    <div className="pb-0 bg-white animate-in fade-in duration-700">
      {/* Centered Minimalist Hero */}
      <section className="pt-48 pb-24 px-6 relative border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-[1px] bg-brand-accent"></div>
              <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Knowledge & Analysis</span>
              <div className="w-12 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              Strategic Intelligence
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium mx-auto">
              A curated hub for deep-dive technical research, thought leadership, and operational frameworks for the modern enterprise.
            </p>
          </div>
        </div>
        
        {/* Subtle geometric background detail */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none hidden lg:block text-brand-dark">
          <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100H400M0 200H400M0 300H400M0 400H400M0 500H400M0 600H400M0 700H400" stroke="currentColor" strokeWidth="1"/>
            <path d="M100 0V800M200 0V800M300 0V800" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </section>

      {/* Uniform High-Attention Insights Grid */}
      <section className="py-24 px-6 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RECENT_INSIGHTS.map((post, index) => (
              <div 
                key={post.id} 
                className="group relative overflow-hidden bg-white rounded-[3rem] border border-zinc-200 p-12 lg:p-16 flex flex-col justify-between hover:border-brand-accent transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-brand-accent/10 min-h-[500px]"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-zinc-50 text-brand-dark flex items-center justify-center rounded-2xl group-hover:bg-brand-dark group-hover:text-white transition-all duration-500 shadow-sm">
                        {index % 2 === 0 ? <Newspaper size={28} /> : <Lightbulb size={28} />}
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-brand-accent tracking-[0.2em] uppercase block mb-1">{post.category}</span>
                        <div className="flex items-center space-x-3 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                          <Calendar size={12} />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-zinc-300 tracking-[0.3em] block mb-1 uppercase">NODE 0{index + 1}</span>
                      <div className="h-1 w-8 bg-brand-accent ml-auto group-hover:w-16 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-black text-brand-dark mb-6 uppercase tracking-tighter leading-[0.95] group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-lg leading-relaxed font-medium mb-12">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                        <User size={18} />
                      </div>
                      <span className="text-xs font-black text-brand-dark uppercase tracking-widest">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-brand-accent font-black text-[10px] uppercase tracking-[0.2em] group/btn cursor-pointer">
                      <span>Read Analysis</span>
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute -bottom-12 -right-12 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-1000 group-hover:scale-110 pointer-events-none text-brand-dark">
                   <BookOpen size={280} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Subscription - High Impact Blocks */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Category Pillar */}
            <div className="lg:col-span-5">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-10">Taxonomy</h2>
              <h3 className="text-4xl font-black text-brand-dark mb-10 tracking-tight uppercase">Knowledge Areas</h3>
              <div className="space-y-4">
                {categories.map((cat, i) => (
                  <div key={i} className="group flex items-center justify-between p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-brand-accent transition-all cursor-pointer">
                    <div className="flex items-center space-x-6">
                      <span className="text-[10px] font-black text-zinc-300 uppercase">0{i + 1}</span>
                      <span className="text-sm font-black text-brand-dark uppercase tracking-widest group-hover:text-brand-accent transition-colors">{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-black bg-zinc-200 group-hover:bg-brand-accent group-hover:text-white px-3 py-1 rounded-full transition-all">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Architecture Block */}
            <div className="lg:col-span-7">
              <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-24 text-white relative overflow-hidden h-full flex flex-col justify-center">
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <Sparkles size={20} className="text-brand-accent" />
                    <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Subscription</span>
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tighter leading-tight uppercase">Intelligence Briefing</h3>
                  <p className="text-lg text-zinc-400 leading-relaxed mb-12 font-medium max-w-md">
                    Receive our monthly technical deconstructions and innovation frameworks directly to your leadership team.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="ENTER WORK EMAIL" 
                      className="flex-grow bg-white/5 border border-white/10 rounded-full px-8 py-5 text-xs font-bold tracking-widest focus:outline-none focus:border-brand-accent transition-all placeholder:text-zinc-600"
                    />
                    <button className="bg-brand-accent text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all shadow-2xl shadow-brand-accent/20 whitespace-nowrap">
                      Join Research Hub
                    </button>
                  </div>
                </div>
                
                {/* Decorative background logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-white">
                  <MessageSquare size={400} strokeWidth={0.5} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Insights Reach Metrics */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Global Citations", icon: <Zap size={20} /> },
            { label: "Research Nodes", icon: <Database size={20} /> },
            { label: "Reader Growth", icon: <Activity size={20} /> },
            { label: "Expert Network", icon: <Globe size={20} /> }
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

export default Insights;
