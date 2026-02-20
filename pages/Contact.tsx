
import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Send, MessageSquare, Shield, Globe, Zap, Database, Activity, Sparkles, ArrowUpRight, Users, Phone } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';

const Contact: React.FC = () => {
  const { content } = useGlobalContext();
  const { contact } = content;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const getIcon = (idx: number) => {
    switch(idx) {
      case 0: return <Mail size={32} />;
      case 1: return <Linkedin size={32} />;
      case 2: return <MapPin size={32} />;
      default: return <Mail size={32} />;
    }
  };

  const getDecorative = (idx: number) => {
    switch(idx) {
      case 0: return <MessageSquare size={240} />;
      case 1: return <Users size={240} />;
      case 2: return <Globe size={240} />;
      default: return <MessageSquare size={240} />;
    }
  };

  return (
    <div className="pb-0 bg-white animate-in fade-in duration-700">
      <section className="pt-48 pb-24 px-6 relative border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-[1px] bg-brand-accent"></div>
              <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Initialize Dialogue</span>
              <div className="w-12 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              {contact.hero.title}
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium mx-auto">
              {contact.hero.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {contact.channels.map((channel, index) => (
              <div key={channel.id} className="group relative overflow-hidden bg-white rounded-[3rem] border border-zinc-200 p-12 flex flex-col justify-between hover:border-brand-accent transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-brand-accent/10 h-full min-h-[550px]">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-20 h-20 bg-zinc-50 text-brand-dark flex items-center justify-center rounded-3xl group-hover:bg-brand-dark group-hover:text-white transition-all duration-500 shadow-sm">
                      {getIcon(index)}
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
                    {channel.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center justify-between group/item p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 hover:bg-white hover:border-brand-accent/30 transition-all cursor-pointer">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
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
                  <button type="submit" className="w-full bg-brand-dark text-white font-black py-5 rounded-2xl hover:bg-brand-accent transition-all flex items-center justify-center space-x-3 text-[10px] tracking-[0.2em] uppercase shadow-xl">
                    <span>Initialize Dialogue</span>
                    <Send size={16} />
                  </button>
                </form>
                {submitted && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-20 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-brand-accentLight text-brand-accent rounded-3xl flex items-center justify-center mb-8"><Send size={32} /></div>
                    <h3 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tighter leading-none">Message Received</h3>
                    <p className="text-zinc-500 font-medium">Thank you. We will review and respond within 48 hours.</p>
                  </div>
                )}
            </div>
            <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col justify-center min-h-[600px]">
              <div className="relative z-10">
                <blockquote className="text-2xl lg:text-3xl font-medium leading-tight mb-12 italic text-zinc-300">
                  "{contact.mandateQuote}"
                </blockquote>
                <div className="flex items-center space-x-4 mb-12">
                  <div className="w-10 h-[1px] bg-brand-accent"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">{contact.mandate.title}</span>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {contact.mandateItems.map((item, i) => (
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
