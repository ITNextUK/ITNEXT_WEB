
import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Send, MessageSquare, Shield, Globe, Zap, Database, Activity, Sparkles, ArrowUpRight, Users } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactChannels = [
    {
      id: 'email',
      icon: <Mail size={32} />,
      title: "Direct Correspondence",
      desc: "For formal research inquiries, partnership proposals, and detailed strategy discussions.",
      details: ["info@itnext.co.uk", "48h Response SLA", "Secure Channels"],
      decorative: <MessageSquare size={240} />
    },
    {
      id: 'linkedin',
      icon: <Linkedin size={32} />,
      title: "Strategic Network",
      desc: "Connect with our leadership and follow our latest research nodes and industry insights.",
      details: ["LinkedIn Profile", "Innovation Updates", "Founder Direct"],
      decorative: <Users size={240} />
    },
    {
      id: 'location',
      icon: <MapPin size={32} />,
      title: "Operational Hub",
      desc: "Headquartered in the United Kingdom, serving enterprises across the European digital landscape.",
      details: ["UK Registered", "European Outreach", "Remote Capability"],
      decorative: <Globe size={240} />
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
              <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Initialize Dialogue</span>
              <div className="w-12 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              Connect With ITNEXT
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium mx-auto">
              We look forward to starting a strategic conversation about your digital innovation journey and research requirements.
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

      {/* Uniform High-Attention Engagement Grid */}
      <section className="py-24 px-6 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {contactChannels.map((channel, index) => (
              <div 
                key={channel.id} 
                className="group relative overflow-hidden bg-white rounded-[3rem] border border-zinc-200 p-12 flex flex-col justify-between hover:border-brand-accent transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-brand-accent/10 h-full min-h-[550px]"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-20 h-20 bg-zinc-50 text-brand-dark flex items-center justify-center rounded-3xl group-hover:bg-brand-dark group-hover:text-white transition-all duration-500 shadow-sm">
                      {channel.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-zinc-300 tracking-[0.3em] block mb-1 uppercase">CHANNEL 0{index + 1}</span>
                      <div className="h-1 w-8 bg-brand-accent ml-auto group-hover:w-16 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-brand-dark mb-6 uppercase tracking-tighter leading-[0.95] group-hover:text-brand-accent transition-colors">
                    {channel.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-lg leading-relaxed font-medium mb-12">
                    {channel.desc}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {channel.details.map(detail => (
                      <div key={detail} className="flex items-center justify-between group/item p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 hover:bg-white hover:border-brand-accent/30 transition-all cursor-pointer">
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{detail}</span>
                        <ArrowUpRight size={16} className="text-zinc-300 group-hover/item:text-brand-accent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute -bottom-12 -right-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:scale-110 pointer-events-none text-brand-dark">
                  {channel.decorative}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applied Contact Form & Vision */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="bg-white p-8 lg:p-16 rounded-[3rem] border border-zinc-200 shadow-sm relative overflow-hidden">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-10">Briefing Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required type="text" placeholder="FULL NAME" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-brand-accent transition-all placeholder:text-zinc-400" />
                    <input type="text" placeholder="ORGANIZATION" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-brand-accent transition-all placeholder:text-zinc-400" />
                  </div>
                  <input required type="email" placeholder="WORK EMAIL" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-brand-accent transition-all placeholder:text-zinc-400" />
                  <select className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-brand-accent transition-all appearance-none cursor-pointer">
                    <option>RESEARCH PARTNERSHIP</option>
                    <option>DIGITAL TRANSFORMATION STRATEGY</option>
                    <option>AI AUTOMATION INQUIRY</option>
                    <option>OTHER / GENERAL INQUIRY</option>
                  </select>
                  <textarea rows={4} placeholder="BRIEF MESSAGE" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-brand-accent transition-all resize-none placeholder:text-zinc-400"></textarea>
                  <button 
                    type="submit" 
                    className="w-full bg-brand-dark text-white font-black py-5 rounded-2xl hover:bg-brand-accent transition-all flex items-center justify-center space-x-3 text-[10px] tracking-[0.2em] uppercase shadow-xl"
                  >
                    <span>Initialize Dialogue</span>
                    <Send size={16} />
                  </button>
                </form>

                {submitted && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500 z-20">
                    <div className="w-20 h-20 bg-brand-accentLight text-brand-accent rounded-3xl flex items-center justify-center mb-8">
                      <Send size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tighter leading-none">Message Received</h3>
                    <p className="text-zinc-500 font-medium">Thank you for your briefing. We will review and respond within 48 business hours.</p>
                  </div>
                )}
              </div>
              
              {/* Decorative side element */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col justify-center min-h-[600px]">
              <div className="relative z-10">
                <blockquote className="text-2xl lg:text-3xl font-medium leading-tight mb-12 italic text-zinc-300">
                  "Every strategic partnership at ITNEXT begins with a commitment to empirical clarity and long-term innovation value."
                </blockquote>
                <div className="flex items-center space-x-4 mb-12">
                  <div className="w-10 h-[1px] bg-brand-accent"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">Collaboration Mandate</span>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { title: "Research Integrity", desc: "No commercial-led bias in our advisory." },
                    { title: "UK Support", icon: <Shield size={16} />, desc: "Aligned with UK digital growth strategy." },
                    { title: "Global Reach", icon: <Globe size={16} />, desc: "Expertise across EU and global tech sectors." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 text-zinc-400 group cursor-default">
                      <Sparkles size={14} className="text-brand-accent group-hover:scale-110 transition-transform" />
                      <div>
                         <span className="text-[10px] font-bold uppercase tracking-widest block text-white">{item.title}</span>
                         <span className="text-[10px] uppercase tracking-widest opacity-60">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/4 translate-y-1/4 opacity-10 text-white">
                <Sparkles size={256} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Engagement Metrics */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "48h Response", icon: <Zap size={20} /> },
            { label: "UK / EU Presence", icon: <Globe size={20} /> },
            { label: "Secure Lab Access", icon: <Database size={20} /> },
            { label: "Expert Dialogue", icon: <Activity size={20} /> }
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

export default Contact;
