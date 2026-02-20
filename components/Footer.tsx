
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-zinc-400 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-32">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-8 mb-10" light />
            <p className="max-w-sm mb-12 text-zinc-500 leading-relaxed font-medium">
              A strategic, research-led platform focused on the intersection of data science, AI automation, and resilient digital architecture.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors">Medium</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10">Navigation</h3>
            <ul className="space-y-5 text-[11px] font-bold uppercase tracking-[0.2em]">
              <li><Link to="/focus-areas" className="hover:text-white transition-colors">Focus Areas</Link></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Research</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/founder" className="hover:text-white transition-colors">Founder</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10">Contact</h3>
            <ul className="space-y-5 text-[11px] font-bold uppercase tracking-[0.1em]">
              <li className="text-zinc-500">London, United Kingdom</li>
              <li><Link to="/contact" className="hover:text-white transition-colors uppercase">Connect With ITNEXT</Link></li>
              <li className="text-zinc-500 uppercase">Strategic Partnerships</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-6 md:mb-0">
            © {new Date().getFullYear()} ITNEXT. Knowledge-led Innovation initiative.
          </p>
          <div className="flex space-x-10">
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Terms of Research</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
