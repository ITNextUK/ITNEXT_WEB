
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Target, LogOut, Save, RotateCcw,
  CheckCircle, Home as HomeIcon, Plus, Trash2, 
  Image as ImageIcon, Info, ArrowLeft, Upload, 
  Linkedin, Mail, GraduationCap, Award, Type, 
  Phone, Package, BookOpen, Clock, Edit3, 
  ChevronRight, Search, Calendar, X, Eye, 
  Settings, Layers, Code, Quote, Video,
  FileText, Globe, Sparkles, MessageSquare,
  Users, Share2, Heart, ExternalLink, List, 
  Table as TableIcon, AlertCircle, Copy, Archive,
  BarChart4, MoveUp, MoveDown, User, PlusCircle,
  Camera
} from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import { useAuth } from '../context/AuthContext';
import { uploadApi } from '../services/api.service';
import { InsightPost, ContentBlock, ContentBlockType, SiteContent } from '../types';

// Shared Admin UI Components
const SectionHeader: React.FC<{ title: string, onSave?: () => void, saved?: boolean, secondaryAction?: React.ReactNode }> = ({ title, onSave, saved, secondaryAction }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-zinc-100 gap-4">
    <h2 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">{title}</h2>
    <div className="flex items-center space-x-4">
      {secondaryAction}
      {onSave && (
        <button 
          onClick={onSave}
          className={`flex items-center space-x-2 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            saved ? 'bg-green-500 text-white' : 'bg-brand-dark text-white hover:bg-brand-accent shadow-xl shadow-brand-dark/10'
          }`}
        >
          {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          <span>{saved ? 'Saved Successfully' : 'Save Changes'}</span>
        </button>
      )}
    </div>
  </div>
);

const InputField: React.FC<{ label: string, value: any, onChange: (v: any) => void, type?: string, placeholder?: string, rows?: number, required?: boolean }> = ({ label, value, onChange, type = "text", placeholder = "", rows = 4, required = false }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea 
        required={required}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all resize-none font-medium text-zinc-700"
      />
    ) : (
      <input 
        required={required}
        type={type}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all font-medium text-zinc-700"
      />
    )}
  </div>
);

// Cloudinary Image Upload Component
const CloudinaryImageUpload: React.FC<{
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectClass?: string;
}> = ({ value, onChange, label = 'Feature Image', aspectClass = 'aspect-[16/9]' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const url = await uploadApi.image(file);
      onChange(url);
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed. Ensure backend is running.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL or upload via Cloudinary..."
          className="flex-grow bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-all font-medium text-zinc-700"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center space-x-2 px-5 py-3 bg-brand-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-dark transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-brand-accent/20 flex-shrink-0"
        >
          {uploading ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Uploading...</span></>
          ) : (
            <><Upload size={14} /><span>Upload</span></>
          )}
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
      </div>
      {uploadError && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest">{uploadError}</p>}
      {value && (
        <div className={`${aspectClass} bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 mt-2`}>
          <img src={value} className="w-full h-full object-cover" alt="Preview" />
        </div>
      )}
      {!value && (
        <div className={`${aspectClass} bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-brand-accent transition-all mt-2`} onClick={() => fileInputRef.current?.click()}>
          <div className="text-center">
            <ImageIcon size={32} className="text-zinc-200 mx-auto mb-3" />
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Click to upload image</p>
            <p className="text-[8px] text-zinc-200 mt-1">JPG, PNG, WebP supported</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Advanced Block Editor Components
const BlockItem: React.FC<{ 
  block: ContentBlock, 
  updateBlock: (id: string, updates: Partial<ContentBlock>) => void,
  removeBlock: (id: string) => void,
  moveBlock: (id: string, dir: 'up' | 'down') => void
}> = ({ block, updateBlock, removeBlock, moveBlock }) => {
  const getIcon = () => {
    switch(block.type) {
      case 'heading': return <Type size={16} />;
      case 'image': return <ImageIcon size={16} />;
      case 'code': return <Code size={16} />;
      case 'quote': return <Quote size={16} />;
      case 'callout': return <AlertCircle size={16} />;
      case 'list': return <List size={16} />;
      case 'table': return <TableIcon size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="group bg-white border border-zinc-200 rounded-2xl p-6 mb-4 relative hover:border-brand-accent transition-all shadow-sm">
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-zinc-100 rounded-lg py-1 shadow-md">
        <button onClick={() => moveBlock(block.id, 'up')} className="p-2 text-zinc-300 hover:text-brand-accent transition-colors"><MoveUp size={14} /></button>
        <button onClick={() => moveBlock(block.id, 'down')} className="p-2 text-zinc-300 hover:text-brand-accent transition-colors"><MoveDown size={14} /></button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-[10px] font-black text-brand-accent uppercase tracking-widest">
          {getIcon()}
          <span>{block.type} Block</span>
        </div>
        <button onClick={() => removeBlock(block.id)} className="text-zinc-300 hover:text-red-500 transition-colors p-1"><Trash2 size={14} /></button>
      </div>

      {block.type === 'text' || block.type === 'heading' || block.type === 'quote' || block.type === 'callout' ? (
        <textarea 
          value={block.content}
          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          placeholder={`Enter ${block.type} content...`}
          rows={block.type === 'text' ? 5 : 2}
          className="w-full bg-zinc-50 border-none focus:ring-0 text-sm font-medium text-zinc-700 resize-none p-4 rounded-xl"
        />
      ) : block.type === 'image' ? (
        <div className="space-y-4">
          <CloudinaryImageUpload
            label="Image"
            value={block.content}
            onChange={(url: string) => updateBlock(block.id, { content: url })}
            aspectClass="aspect-[16/9]"
          />
          <InputField label="Caption / Alt Text" value={block.caption || ''} onChange={(v: string) => updateBlock(block.id, { caption: v })} />
        </div>
      ) : block.type === 'video' ? (
        <div className="space-y-4">
          <InputField label="Video URL / Path" value={block.content} onChange={(v: string) => updateBlock(block.id, { content: v })} />
          <InputField label="Caption / Alt Text" value={block.caption || ''} onChange={(v: string) => updateBlock(block.id, { caption: v })} />
        </div>
      ) : block.type === 'code' ? (
        <div className="space-y-4">
          <InputField label="Language (e.g., typescript, python)" value={block.language} onChange={(v: string) => updateBlock(block.id, { language: v })} />
          <textarea 
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="w-full bg-zinc-950 text-brand-accent p-6 rounded-2xl font-mono text-xs h-48 focus:ring-0 border-none shadow-inner"
            placeholder="// Paste code here..."
          />
        </div>
      ) : block.type === 'list' ? (
        <div className="space-y-3">
          {(block.items || []).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <span className="text-brand-accent font-black">•</span>
              <input 
                type="text" 
                value={item} 
                onChange={(e) => {
                  const newItems = [...(block.items || [])];
                  newItems[idx] = e.target.value;
                  updateBlock(block.id, { items: newItems });
                }}
                className="flex-grow bg-zinc-50 border-none focus:ring-0 text-sm font-medium text-zinc-700 p-2 rounded-lg"
              />
              <button onClick={() => {
                const newItems = (block.items || []).filter((_, i) => i !== idx);
                updateBlock(block.id, { items: newItems });
              }} className="text-zinc-200 hover:text-red-500 transition-colors"><X size={14} /></button>
            </div>
          ))}
          <button 
            onClick={() => updateBlock(block.id, { items: [...(block.items || []), 'New list item'] })}
            className="text-[9px] font-black uppercase text-brand-accent mt-2 hover:underline"
          >
            + Add List Item
          </button>
        </div>
      ) : null}
    </div>
  );
};

const DashboardHome = () => {
  const { content } = useGlobalContext();
  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="Intelligence Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-4">Research Nodes</span>
           <span className="text-3xl font-black text-brand-dark">{content.insights.length}</span>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-4">Total Views</span>
           <span className="text-3xl font-black text-brand-accent">{content.insights.reduce((acc, p) => acc + p.views, 0).toLocaleString()}</span>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-4">Endorsements</span>
           <span className="text-3xl font-black text-brand-dark">{content.insights.reduce((acc, p) => acc + p.likes, 0).toLocaleString()}</span>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-4">Active Projects</span>
           <span className="text-3xl font-black text-brand-accent">{content.products.length}</span>
        </div>
      </div>
      <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-16 text-white relative overflow-hidden flex flex-col justify-center min-h-[300px]">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6 text-brand-accent">
            <Sparkles size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Status</span>
          </div>
          <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Systems Optimal</h3>
          <p className="text-zinc-400 text-lg font-medium max-w-xl">
            The ITNEXT administrative console is synchronized with the global data context. All strategic nodes are currently active and disseminated.
          </p>
        </div>
        <Layers className="absolute -bottom-10 -right-10 w-96 h-96 opacity-5 rotate-12" />
      </div>
    </div>
  );
};

const HomeEditor = () => {
  const { content, updateContent } = useGlobalContext();
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="Home Hero Console" onSave={handleSave} saved={saved} />
      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Hero Section Configuration</h3>
          <InputField label="Hero Title" value={content.hero.title} onChange={(v) => updateContent({ hero: { ...content.hero, title: v } })} />
          <InputField label="Hero Subtitle" type="textarea" value={content.hero.subtitle} onChange={(v) => updateContent({ hero: { ...content.hero, subtitle: v } })} />
          <div className="grid grid-cols-2 gap-8">
            <InputField label="Primary CTA Label" value={content.hero.ctaPrimary} onChange={(v) => updateContent({ hero: { ...content.hero, ctaPrimary: v } })} />
            <InputField label="Secondary CTA Label" value={content.hero.ctaSecondary} onChange={(v) => updateContent({ hero: { ...content.hero, ctaSecondary: v } })} />
          </div>
        </div>
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Overview Section Configuration</h3>
          <InputField label="Overview Title" value={content.overview.title} onChange={(v) => updateContent({ overview: { ...content.overview, title: v } })} />
          <InputField label="Overview Text 1" type="textarea" value={content.overview.text1} onChange={(v) => updateContent({ overview: { ...content.overview, text1: v } })} />
          <InputField label="Overview Text 2" type="textarea" value={content.overview.text2} onChange={(v) => updateContent({ overview: { ...content.overview, text2: v } })} />
          <div className="grid grid-cols-2 gap-8">
            <InputField label="Stat Value" value={content.overview.statValue} onChange={(v) => updateContent({ overview: { ...content.overview, statValue: v } })} />
            <InputField label="Stat Label" value={content.overview.statLabel} onChange={(v) => updateContent({ overview: { ...content.overview, statLabel: v } })} />
          </div>
        </div>
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Bottom CTA Section Configuration</h3>
          <InputField label="CTA Title" value={content.homeCTA.title} onChange={(v) => updateContent({ homeCTA: { ...content.homeCTA, title: v } })} />
          <InputField label="CTA Description" type="textarea" value={content.homeCTA.description} onChange={(v) => updateContent({ homeCTA: { ...content.homeCTA, description: v } })} />
          <InputField label="CTA Button Text" value={content.homeCTA.buttonText} onChange={(v) => updateContent({ homeCTA: { ...content.homeCTA, buttonText: v } })} />
        </div>
      </div>
    </div>
  );
};

const FounderEditor = () => {
  const { content, updateContent } = useGlobalContext();
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent({ founder: { ...content.founder, image: reader.result as string } });
      };
      reader.readAsDataURL(file);
    }
  };

  const addCredential = () => {
    const updated = {
      ...content.founder,
      credentials: [...content.founder.credentials, { title: 'New Credential', subtitle: 'Institution/Role' }]
    };
    updateContent({ founder: updated });
  };

  const removeCredential = (idx: number) => {
    const updated = {
      ...content.founder,
      credentials: content.founder.credentials.filter((_, i) => i !== idx)
    };
    updateContent({ founder: updated });
  };

  const updateCredential = (idx: number, field: 'title' | 'subtitle', val: string) => {
    const updatedCreds = [...content.founder.credentials];
    updatedCreds[idx] = { ...updatedCreds[idx], [field]: val };
    updateContent({ founder: { ...content.founder, credentials: updatedCreds } });
  };

  const addFocus = () => {
    updateContent({ founder: { ...content.founder, focus: [...content.founder.focus, 'New Focus Area'] } });
  };

  const removeFocus = (idx: number) => {
    updateContent({ founder: { ...content.founder, focus: content.founder.focus.filter((_, i) => i !== idx) } });
  };

  const updateFocus = (idx: number, val: string) => {
    const updatedFocus = [...content.founder.focus];
    updatedFocus[idx] = val;
    updateContent({ founder: { ...content.founder, focus: updatedFocus } });
  };

  return (
    <div className="animate-in fade-in duration-500 pb-32">
      <SectionHeader title="Founder Profile Manager" onSave={handleSave} saved={saved} />
      
      <div className="space-y-12">
        {/* Profile Identity & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Image Upload */}
          <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-10 w-full text-brand-accent">
              <Camera size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Media Identity</h3>
            </div>
            
            <div className="relative group mb-10">
              <div className="w-56 h-56 rounded-[3rem] overflow-hidden border-4 border-zinc-50 shadow-2xl relative bg-zinc-100">
                {content.founder.image ? (
                  <img src={content.founder.image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Founder" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300">
                    <User size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 bg-brand-accent text-white rounded-2xl shadow-xl hover:scale-110 transition-transform"
                   >
                     <Upload size={24} />
                   </button>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-brand-accent transition-colors"
            >
              Update Leadership Image
            </button>
            <p className="mt-4 text-[9px] text-zinc-400 uppercase tracking-widest text-center">推奨: 1:1 Aspect Ratio, Max 5MB</p>
          </div>

          {/* Basic Info */}
          <div className="lg:col-span-2 bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 mb-4 text-brand-accent">
              <User size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Core Profile Information</h3>
            </div>
            <InputField label="Full Name" value={content.founder.name} onChange={(v: string) => updateContent({ founder: { ...content.founder, name: v } })} />
            <InputField label="Executive Bio (Short)" type="textarea" rows={3} value={content.founder.bio} onChange={(v: string) => updateContent({ founder: { ...content.founder, bio: v } })} />
            <InputField label="Leadership Quote" type="textarea" value={content.founder.quote} rows={2} onChange={(v: string) => updateContent({ founder: { ...content.founder, quote: v } })} />
          </div>
        </div>

        {/* Contact & Social */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 mb-4 text-brand-accent">
            <Share2 size={20} />
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Contact & Networks</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InputField label="LinkedIn URL" value={content.founder.linkedin} onChange={(v: string) => updateContent({ founder: { ...content.founder, linkedin: v } })} />
            <InputField label="Contact Email" value={content.founder.email} onChange={(v: string) => updateContent({ founder: { ...content.founder, email: v } })} />
            <InputField label="Mobile Number" value={content.founder.mobile} onChange={(v: string) => updateContent({ founder: { ...content.founder, mobile: v } })} />
          </div>
        </div>

        {/* Detailed Narrative */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 mb-4 text-brand-accent">
            <FileText size={20} />
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Full Biography Narrative</h3>
          </div>
          <InputField label="Detailed Bio" type="textarea" rows={10} value={content.founder.detailedBio} onChange={(v: string) => updateContent({ founder: { ...content.founder, detailedBio: v } })} />
        </div>

        {/* Dynamic Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Credentials */}
          <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 text-brand-accent">
                <GraduationCap size={20} />
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Academic Credentials</h3>
              </div>
              <button onClick={addCredential} className="text-brand-accent hover:text-brand-dark transition-colors"><PlusCircle size={20} /></button>
            </div>
            <div className="space-y-6">
              {content.founder.credentials.map((cred, i) => (
                <div key={i} className="p-6 bg-zinc-50 rounded-2xl relative group">
                  <button onClick={() => removeCredential(i)} className="absolute -top-2 -right-2 p-1.5 bg-white border border-zinc-200 rounded-full text-zinc-300 hover:text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100"><X size={12} /></button>
                  <div className="space-y-4">
                    <InputField label="Title / Degree" value={cred.title} onChange={(v: string) => updateCredential(i, 'title', v)} />
                    <InputField label="Institution / Specialization" value={cred.subtitle} onChange={(v: string) => updateCredential(i, 'subtitle', v)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8 h-fit">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 text-brand-accent">
                <Award size={20} />
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Strategic Focus Areas</h3>
              </div>
              <button onClick={addFocus} className="text-brand-accent hover:text-brand-dark transition-colors"><PlusCircle size={20} /></button>
            </div>
            <div className="flex flex-wrap gap-4">
              {content.founder.focus.map((f, i) => (
                <div key={i} className="flex items-center space-x-2 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 group">
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest text-zinc-600 w-32"
                    value={f}
                    onChange={(e) => updateFocus(i, e.target.value)}
                  />
                  <button onClick={() => removeFocus(i)} className="text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutEditor = () => {
  const { content, updateContent } = useGlobalContext();
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="Mission & Vision Editor" onSave={handleSave} saved={saved} />
      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">About Hero</h3>
          <InputField label="Hero Title" value={content.about.hero.title} onChange={(v) => updateContent({ about: { ...content.about, hero: { ...content.about.hero, title: v } } })} />
          <InputField label="Hero Description" type="textarea" value={content.about.hero.description} onChange={(v) => updateContent({ about: { ...content.about, hero: { ...content.about.hero, description: v } } })} />
        </div>
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Strategy & Vision</h3>
          <InputField label="Alignment Title" value={content.about.alignment.title} onChange={(v) => updateContent({ about: { ...content.about, alignment: { ...content.about.alignment, title: v } } })} />
          <InputField label="Alignment Description" type="textarea" value={content.about.alignment.description} onChange={(v) => updateContent({ about: { ...content.about, alignment: { ...content.about.alignment, description: v } } })} />
          <InputField label="Vision Quote" type="textarea" value={content.about.visionQuote} onChange={(v) => updateContent({ about: { ...content.about, visionQuote: v } })} />
        </div>
      </div>
    </div>
  );
};

const ResearchEditor = () => {
  const { content, updateContent } = useGlobalContext();
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="Methodology Lab Editor" onSave={handleSave} saved={saved} />
      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Research Hero</h3>
          <InputField label="Hero Title" value={content.research.hero.title} onChange={(v) => updateContent({ research: { ...content.research, hero: { ...content.research.hero, title: v } } })} />
          <InputField label="Hero Description" type="textarea" value={content.research.hero.description} onChange={(v) => updateContent({ research: { ...content.research, hero: { ...content.research.hero, description: v } } })} />
        </div>
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Ethics & Methodology</h3>
          <InputField label="Ethics Title" value={content.research.ethics.title} onChange={(v) => updateContent({ research: { ...content.research, ethics: { ...content.research.ethics, title: v } } })} />
          <InputField label="Ethics Description" type="textarea" value={content.research.ethics.description} onChange={(v) => updateContent({ research: { ...content.research, ethics: { ...content.research.ethics, description: v } } })} />
          <InputField label="Methodology Quote" type="textarea" value={content.research.methodologyQuote} onChange={(v) => updateContent({ research: { ...content.research, methodologyQuote: v } })} />
        </div>
      </div>
    </div>
  );
};

const ContactEditor = () => {
  const { content, updateContent } = useGlobalContext();
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="Dialogue Channels Editor" onSave={handleSave} saved={saved} />
      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Contact Hero</h3>
          <InputField label="Hero Title" value={content.contact.hero.title} onChange={(v) => updateContent({ contact: { ...content.contact, hero: { ...content.contact.hero, title: v } } })} />
          <InputField label="Hero Description" type="textarea" value={content.contact.hero.description} onChange={(v) => updateContent({ contact: { ...content.contact, hero: { ...content.contact.hero, description: v } } })} />
        </div>
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Mandate & Mission</h3>
          <InputField label="Mandate Title" value={content.contact.mandate.title} onChange={(v) => updateContent({ contact: { ...content.contact, mandate: { ...content.contact.mandate, title: v } } })} />
          <InputField label="Mandate Quote" type="textarea" value={content.contact.mandateQuote} onChange={(v) => updateContent({ contact: { ...content.contact, mandateQuote: v } })} />
        </div>
      </div>
    </div>
  );
};

const FocusAreasEditor = () => {
  const { content, updateContent } = useGlobalContext();
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addFrameworkItem = () => {
    const updated = {
      ...content.focusAreasPage,
      framework: {
        ...content.focusAreasPage.framework,
        items: [...content.focusAreasPage.framework.items, { title: 'New Item', desc: 'Description here...' }]
      }
    };
    updateContent({ focusAreasPage: updated });
  };

  const removeFrameworkItem = (idx: number) => {
    const updated = {
      ...content.focusAreasPage,
      framework: {
        ...content.focusAreasPage.framework,
        items: content.focusAreasPage.framework.items.filter((_, i) => i !== idx)
      }
    };
    updateContent({ focusAreasPage: updated });
  };

  const updateFrameworkItem = (idx: number, field: 'title' | 'desc', val: string) => {
    const updatedItems = [...content.focusAreasPage.framework.items];
    updatedItems[idx] = { ...updatedItems[idx], [field]: val };
    const updated = {
      ...content.focusAreasPage,
      framework: {
        ...content.focusAreasPage.framework,
        items: updatedItems
      }
    };
    updateContent({ focusAreasPage: updated });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="Focus Areas Page Manager" onSave={handleSave} saved={saved} />
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Hero Section</h3>
          <InputField 
            label="Hero Eyebrow" 
            value={content.focusAreasPage.hero.eyebrow} 
            onChange={(v: string) => updateContent({ focusAreasPage: { ...content.focusAreasPage, hero: { ...content.focusAreasPage.hero, eyebrow: v } } })} 
          />
          <InputField 
            label="Hero Title" 
            value={content.focusAreasPage.hero.title} 
            onChange={(v: string) => updateContent({ focusAreasPage: { ...content.focusAreasPage, hero: { ...content.focusAreasPage.hero, title: v } } })} 
          />
          <InputField 
            label="Hero Description" 
            type="textarea" 
            value={content.focusAreasPage.hero.description} 
            onChange={(v: string) => updateContent({ focusAreasPage: { ...content.focusAreasPage, hero: { ...content.focusAreasPage.hero, description: v } } })} 
          />
        </div>

        {/* Framework Section */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Strategic Framework Section</h3>
          <InputField 
            label="Framework Title" 
            value={content.focusAreasPage.framework.title} 
            onChange={(v: string) => updateContent({ focusAreasPage: { ...content.focusAreasPage, framework: { ...content.focusAreasPage.framework, title: v } } })} 
          />
          <InputField 
            label="Framework Description" 
            type="textarea" 
            value={content.focusAreasPage.framework.description} 
            onChange={(v: string) => updateContent({ focusAreasPage: { ...content.focusAreasPage, framework: { ...content.focusAreasPage.framework, description: v } } })} 
          />
          <InputField 
            label="Framework Quote" 
            type="textarea" 
            value={content.focusAreasPage.framework.quote} 
            onChange={(v: string) => updateContent({ focusAreasPage: { ...content.focusAreasPage, framework: { ...content.focusAreasPage.framework, quote: v } } })} 
          />
        </div>

        {/* Framework Items */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 text-brand-accent">
              <Target size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Framework Items</h3>
            </div>
            <button onClick={addFrameworkItem} className="text-brand-accent hover:text-brand-dark transition-colors">
              <PlusCircle size={20} />
            </button>
          </div>
          <div className="space-y-6">
            {content.focusAreasPage.framework.items.map((item, i) => (
              <div key={i} className="p-6 bg-zinc-50 rounded-2xl relative group">
                <button 
                  onClick={() => removeFrameworkItem(i)} 
                  className="absolute -top-2 -right-2 p-1.5 bg-white border border-zinc-200 rounded-full text-zinc-300 hover:text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
                <div className="space-y-4">
                  <InputField 
                    label={`Item ${i + 1} - Title`} 
                    value={item.title} 
                    onChange={(v: string) => updateFrameworkItem(i, 'title', v)} 
                  />
                  <InputField 
                    label={`Item ${i + 1} - Description`} 
                    type="textarea"
                    value={item.desc} 
                    onChange={(v: string) => updateFrameworkItem(i, 'desc', v)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPageEditor = () => {
  const { content, updateContent } = useGlobalContext();
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addStat = () => {
    const updated = {
      ...content.blogPage,
      stats: [...content.blogPage.stats, { label: 'New Stat', val: 'VALUE' }]
    };
    updateContent({ blogPage: updated });
  };

  const removeStat = (idx: number) => {
    const updated = {
      ...content.blogPage,
      stats: content.blogPage.stats.filter((_, i) => i !== idx)
    };
    updateContent({ blogPage: updated });
  };

  const updateStat = (idx: number, field: 'label' | 'val', val: string) => {
    const updatedStats = [...content.blogPage.stats];
    updatedStats[idx] = { ...updatedStats[idx], [field]: val };
    const updated = {
      ...content.blogPage,
      stats: updatedStats
    };
    updateContent({ blogPage: updated });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <SectionHeader title="Blog Page Configuration" onSave={handleSave} saved={saved} />
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Hero Section</h3>
          <InputField 
            label="Hero Eyebrow" 
            value={content.blogPage.hero.eyebrow} 
            onChange={(v: string) => updateContent({ blogPage: { ...content.blogPage, hero: { ...content.blogPage.hero, eyebrow: v } } })} 
          />
          <InputField 
            label="Hero Title" 
            value={content.blogPage.hero.title} 
            onChange={(v: string) => updateContent({ blogPage: { ...content.blogPage, hero: { ...content.blogPage.hero, title: v } } })} 
          />
          <InputField 
            label="Hero Description" 
            type="textarea" 
            value={content.blogPage.hero.description} 
            onChange={(v: string) => updateContent({ blogPage: { ...content.blogPage, hero: { ...content.blogPage.hero, description: v } } })} 
          />
        </div>

        {/* Newsletter Section */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">Newsletter Section</h3>
          <InputField 
            label="Newsletter Eyebrow" 
            value={content.blogPage.newsletter.eyebrow} 
            onChange={(v: string) => updateContent({ blogPage: { ...content.blogPage, newsletter: { ...content.blogPage.newsletter, eyebrow: v } } })} 
          />
          <InputField 
            label="Newsletter Title" 
            value={content.blogPage.newsletter.title} 
            onChange={(v: string) => updateContent({ blogPage: { ...content.blogPage, newsletter: { ...content.blogPage.newsletter, title: v } } })} 
          />
          <InputField 
            label="Newsletter Description" 
            type="textarea" 
            value={content.blogPage.newsletter.description} 
            onChange={(v: string) => updateContent({ blogPage: { ...content.blogPage, newsletter: { ...content.blogPage.newsletter, description: v } } })} 
          />
          <InputField 
            label="Privacy Notice" 
            value={content.blogPage.newsletter.privacy} 
            onChange={(v: string) => updateContent({ blogPage: { ...content.blogPage, newsletter: { ...content.blogPage.newsletter, privacy: v } } })} 
          />
        </div>

        {/* Stats Section */}
        <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 text-brand-accent">
              <BarChart4 size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark">Blog Statistics (Footer)</h3>
            </div>
            <button onClick={addStat} className="text-brand-accent hover:text-brand-dark transition-colors">
              <PlusCircle size={20} />
            </button>
          </div>
          <div className="space-y-6">
            {content.blogPage.stats.map((stat, i) => (
              <div key={i} className="p-6 bg-zinc-50 rounded-2xl relative group">
                <button 
                  onClick={() => removeStat(i)} 
                  className="absolute -top-2 -right-2 p-1.5 bg-white border border-zinc-200 rounded-full text-zinc-300 hover:text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <InputField 
                    label={`Stat ${i + 1} - Label`} 
                    value={stat.label} 
                    onChange={(v: string) => updateStat(i, 'label', v)} 
                  />
                  <InputField 
                    label={`Stat ${i + 1} - Value`} 
                    value={stat.val} 
                    onChange={(v: string) => updateStat(i, 'val', v)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogEditor = () => {
  const { content, upsertPost, deletePost } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'seo' | 'analytics'>('content');
  const [currentPost, setCurrentPost] = useState<InsightPost | null>(null);
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const focusAreas = ["Data-Driven Digital Products", "AI Automation & Intelligent Systems", "Cloud Architecture & Cybersecurity", "Digital Transformation Advisory"];

  const handleEdit = (post: InsightPost) => {
    setCurrentPost({ ...post });
    setIsEditing(true);
    setActiveTab('content');
  };

  const handleCreate = () => {
    const newPost: InsightPost = {
      id: Date.now().toString(),
      slug: '',
      title: 'Strategic Analysis: New Node',
      category: focusAreas[0],
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      excerpt: 'Executive summary of the technical deconstruction...',
      author: content.founder.name,
      authorRole: 'Founder',
      readingTime: '5 min read',
      tags: [],
      featureImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
      status: 'draft',
      isFeatured: false,
      body: [{ id: '1', type: 'text', content: 'Begin your research node here...' }],
      views: 0,
      likes: 0,
      shares: 0,
      seoTitle: '',
      metaDescription: ''
    };
    setCurrentPost(newPost);
    setIsEditing(true);
    setActiveTab('content');
  };

  const addBlock = (type: ContentBlockType) => {
    if (!currentPost) return;
    const newBlock: ContentBlock = { id: Math.random().toString(), type, content: '', items: type === 'list' ? ['First list item'] : undefined };
    setCurrentPost({ ...currentPost, body: [...currentPost.body, newBlock] });
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    if (!currentPost) return;
    setCurrentPost({
      ...currentPost,
      body: currentPost.body.map(b => b.id === id ? { ...b, ...updates } : b)
    });
  };

  const removeBlock = (id: string) => {
    if (!currentPost) return;
    setCurrentPost({
      ...currentPost,
      body: currentPost.body.filter(b => b.id !== id)
    });
  };

  const moveBlock = (id: string, dir: 'up' | 'down') => {
    if (!currentPost) return;
    const idx = currentPost.body.findIndex(b => b.id === id);
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === currentPost.body.length - 1)) return;
    const newBody = [...currentPost.body];
    const item = newBody.splice(idx, 1)[0];
    newBody.splice(dir === 'up' ? idx - 1 : idx + 1, 0, item);
    setCurrentPost({ ...currentPost, body: newBody });
  };

  const handleSave = () => {
    if (!currentPost) return;
    // Reading time calculation
    const wordCount = currentPost.body.reduce((acc, b) => acc + (b.content?.split(' ').length || 0), 0);
    const estTime = Math.max(1, Math.ceil(wordCount / 200));
    const updatedPost = { 
      ...currentPost, 
      readingTime: `${estTime} min read`,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      slug: currentPost.slug || currentPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    };
    upsertPost(updatedPost);
    setSaved(true);
    setTimeout(() => { 
      setSaved(false); 
      setIsEditing(false); 
    }, 1500);
  };

  const filteredPosts = content.insights.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isEditing && currentPost) {
    return (
      <div className="flex flex-col h-screen -m-12 animate-in fade-in duration-500 overflow-hidden bg-white">
        {/* Editor Toolbar */}
        <div className="h-20 bg-white border-b border-zinc-100 px-12 flex items-center justify-between flex-shrink-0 z-50 shadow-sm">
          <div className="flex items-center space-x-6">
            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-400 transition-colors"><ArrowLeft size={18} /></button>
            <div className="flex flex-col">
              <h2 className="text-sm font-black uppercase tracking-tighter text-zinc-900 line-clamp-1">{currentPost.title}</h2>
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{currentPost.status} • {currentPost.category}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center bg-zinc-100 p-1 rounded-xl">
                {(['content', 'settings', 'seo', 'analytics'] as const).map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-brand-accent shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                  >
                    {tab}
                  </button>
                ))}
             </div>
             <button 
              onClick={handleSave}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${saved ? 'bg-green-500 text-white' : 'bg-brand-dark text-white hover:bg-brand-accent shadow-brand-dark/20'}`}
             >
                {saved ? <CheckCircle size={14} /> : <Save size={14} />}
                <span>{saved ? 'PUBLISHED' : 'PUBLISH NODE'}</span>
             </button>
          </div>
        </div>

        {/* Editor Content Area */}
        <div className="flex flex-grow overflow-hidden">
          {/* Main Canvas */}
          <div className="flex-grow overflow-y-auto bg-zinc-50/50 p-24">
            <div className="max-w-3xl mx-auto">
              {activeTab === 'content' && (
                <div className="space-y-12 pb-32">
                   <div className="space-y-6 mb-16">
                     <textarea 
                      value={currentPost.title}
                      onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                      placeholder="ENTER NODE TITLE..."
                      className="w-full bg-transparent border-none focus:ring-0 text-5xl font-black text-brand-dark placeholder:text-zinc-200 resize-none h-auto p-0 leading-tight uppercase tracking-tighter"
                     />
                     <textarea 
                      value={currentPost.subtitle}
                      onChange={(e) => setCurrentPost({...currentPost, subtitle: e.target.value})}
                      placeholder="Add sub-headline or strategic thesis (optional)..."
                      className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium text-zinc-400 placeholder:text-zinc-200 resize-none h-auto p-0"
                     />
                   </div>

                   {currentPost.body.map(block => (
                     <BlockItem 
                      key={block.id} 
                      block={block} 
                      updateBlock={updateBlock} 
                      removeBlock={removeBlock} 
                      moveBlock={moveBlock} 
                     />
                   ))}

                   <div className="flex flex-wrap items-center justify-center gap-3 pt-12 border-t border-zinc-200">
                     {[
                       { type: 'text', icon: <FileText size={14} /> },
                       { type: 'heading', icon: <Type size={14} /> },
                       { type: 'image', icon: <ImageIcon size={14} /> },
                       { type: 'quote', icon: <Quote size={14} /> },
                       { type: 'code', icon: <Code size={14} /> },
                       { type: 'list', icon: <List size={14} /> },
                       { type: 'callout', icon: <AlertCircle size={14} /> }
                     ].map(b => (
                       <button 
                        key={b.type}
                        onClick={() => addBlock(b.type as any)}
                        className="flex items-center space-x-2 px-5 py-3 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:border-brand-accent hover:text-brand-accent hover:shadow-lg transition-all"
                       >
                         {b.icon}
                         <span>{b.type}</span>
                       </button>
                     ))}
                   </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-10 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-300">
                   <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-10">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Core Focus Area Association</label>
                          <select 
                            value={currentPost.category}
                            onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-brand-accent focus:border-brand-accent transition-all appearance-none"
                          >
                            {focusAreas.map(a => <option key={a}>{a}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Publication Status</label>
                          <select 
                            value={currentPost.status}
                            onChange={(e) => setCurrentPost({...currentPost, status: e.target.value as any})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-brand-accent focus:border-brand-accent transition-all appearance-none"
                          >
                            <option value="draft">DRAFT</option>
                            <option value="published">PUBLISHED</option>
                            <option value="archived">ARCHIVED</option>
                          </select>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          id="featured" 
                          checked={currentPost.isFeatured} 
                          onChange={(e) => setCurrentPost({...currentPost, isFeatured: e.target.checked})}
                          className="w-5 h-5 rounded border-zinc-300 text-brand-accent focus:ring-brand-accent"
                        />
                        <label htmlFor="featured" className="text-[10px] font-black uppercase text-zinc-600 tracking-widest cursor-pointer">Pin as Featured Research Node</label>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <InputField label="Assigned Author" value={currentPost.author} onChange={(v: string) => setCurrentPost({...currentPost, author: v})} />
                        <InputField label="Author Strategic Role" value={currentPost.authorRole} onChange={(v: string) => setCurrentPost({...currentPost, authorRole: v})} />
                     </div>
                     <InputField label="Executive Summary (Excerpt)" type="textarea" value={currentPost.excerpt} onChange={(v: string) => setCurrentPost({...currentPost, excerpt: v})} />
                     <CloudinaryImageUpload
                       label="Feature Image (Cloudinary)"
                       value={currentPost.featureImage}
                       onChange={(url: string) => setCurrentPost({...currentPost, featureImage: url})}
                       aspectClass="aspect-[21/9]"
                     />
                   </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-10 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-300">
                   <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark">SEO Configuration</h3>
                        <div className="flex items-center space-x-2">
                           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">SEO Score:</span>
                           <span className="text-xs font-black text-green-500 uppercase">92/100</span>
                        </div>
                      </div>
                      <InputField label="URL Slug (Permanent Link)" value={currentPost.slug} onChange={(v: string) => setCurrentPost({...currentPost, slug: v.toLowerCase().replace(/ /g, '-')})} />
                      <InputField label="Meta Strategic Title" value={currentPost.seoTitle} onChange={(v: string) => setCurrentPost({...currentPost, seoTitle: v})} />
                      <InputField label="Meta Description (Abstract)" type="textarea" value={currentPost.metaDescription} onChange={(v: string) => setCurrentPost({...currentPost, metaDescription: v})} />
                      
                      <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 shadow-inner">
                         <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest block mb-6">SERP Preview (Desktop)</span>
                         <div className="space-y-2">
                           <div className="text-blue-600 text-xl font-medium hover:underline cursor-pointer">{currentPost.seoTitle || currentPost.title}</div>
                           <div className="text-green-800 text-sm flex items-center space-x-1">
                             <span className="opacity-60">itnext.uk</span>
                             <span className="opacity-40">/</span>
                             <span className="opacity-60">journal</span>
                             <span className="opacity-40">/</span>
                             <span>{currentPost.slug || '...' }</span>
                           </div>
                           <p className="text-zinc-600 text-sm leading-relaxed line-clamp-2">{currentPost.metaDescription || currentPost.excerpt}</p>
                         </div>
                      </div>

                      <div className="p-8 bg-zinc-950 text-white rounded-[2rem]">
                        <div className="flex items-center space-x-2 text-brand-accent mb-4">
                          <Share2 size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Social Meta Preview</span>
                        </div>
                        <div className="border border-white/10 rounded-2xl overflow-hidden flex bg-white/5">
                           <div className="w-1/3 aspect-square bg-white/5 flex-shrink-0">
                             {currentPost.featureImage && <img src={currentPost.featureImage} className="w-full h-full object-cover" alt="OG" />}
                           </div>
                           <div className="p-6 flex flex-col justify-center">
                              <div className="text-[8px] font-black text-brand-accent uppercase mb-2">itnext.uk</div>
                              <div className="text-sm font-black uppercase tracking-tighter mb-2 line-clamp-1">{currentPost.seoTitle || currentPost.title}</div>
                              <div className="text-[10px] text-zinc-500 line-clamp-2">{currentPost.metaDescription || currentPost.excerpt}</div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-10 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-300">
                   <div className="bg-white p-12 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-12">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark">Engagement Intelligence</h3>
                         <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded-full">Active Monitoring</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-8">
                        {[
                          { label: 'Total Reads', val: currentPost.views, icon: <Eye size={18} />, trend: '+12% this week' },
                          { label: 'Endorsements', val: currentPost.likes, icon: <Heart size={18} />, trend: '+4% this week' },
                          { label: 'Circulation', val: currentPost.shares, icon: <Share2 size={18} />, trend: 'Steady' },
                        ].map((stat, i) => (
                          <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 flex flex-col items-center text-center group hover:border-brand-accent transition-all">
                             <div className="mb-4 text-zinc-300 group-hover:text-brand-accent transition-colors">{stat.icon}</div>
                             <span className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">{stat.label}</span>
                             <span className="text-4xl font-black text-brand-dark mb-4">{stat.val.toLocaleString()}</span>
                             <span className="text-[8px] font-bold text-green-500 uppercase">{stat.trend}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-10 border-t border-zinc-100">
                         <div className="flex items-center space-x-3 mb-8">
                            <BarChart4 size={18} className="text-brand-accent" />
                            <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Traffic Origin Analysis</h4>
                         </div>
                         <div className="space-y-6">
                            {[
                              { label: 'Direct Boardroom Traffic', val: '45%', color: 'bg-brand-dark' },
                              { label: 'LinkedIn Referral Network', val: '32%', color: 'bg-brand-accent' },
                              { label: 'Strategic Search (SERP)', val: '18%', color: 'bg-zinc-400' },
                              { label: 'Partner Lab Syndication', val: '5%', color: 'bg-zinc-200' },
                            ].map((row, i) => (
                              <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                  <span>{row.label}</span>
                                  <span>{row.val}</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                                  <div className={`h-full ${row.color}`} style={{ width: row.val }}></div>
                                </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="w-80 bg-white border-l border-zinc-100 p-10 flex-shrink-0 hidden xl:block">
             <div className="space-y-12">
               <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">Publishing Context</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-zinc-400">Word Count</span>
                      <span className="text-brand-dark">{currentPost.body.reduce((acc, b) => acc + (b.content?.split(' ').length || 0), 0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-zinc-400">Block Nodes</span>
                      <span className="text-brand-dark">{currentPost.body.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-zinc-400">Read Est.</span>
                      <span className="text-brand-dark">{currentPost.readingTime}</span>
                    </div>
                 </div>
               </div>

               <div className="p-8 bg-brand-dark text-white rounded-3xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 text-brand-accent mb-4">
                      <Sparkles size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">AI Intelligence</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-zinc-400 italic">
                      "This analysis leans heavily toward infrastructure. Consider adding a 'Strategy' block to balance the technical deconstruction for leadership readers."
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Layers size={80} />
                  </div>
               </div>

               <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">Actions</h3>
                 <div className="grid grid-cols-1 gap-3">
                    <button className="w-full flex items-center space-x-3 px-6 py-4 bg-zinc-50 hover:bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 transition-all">
                      <Copy size={14} />
                      <span>Duplicate Node</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-6 py-4 bg-zinc-50 hover:bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 transition-all">
                      <Archive size={14} />
                      <span>Archive Publication</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-6 py-4 bg-red-50 hover:bg-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 transition-all">
                      <Trash2 size={14} />
                      <span>Delete Permantently</span>
                    </button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <SectionHeader 
        title="Journal Management" 
        secondaryAction={
          <button 
            onClick={handleCreate}
            className="flex items-center space-x-2 bg-brand-accent text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-dark shadow-xl shadow-brand-accent/20 transition-all"
          >
            <Plus size={16} />
            <span>New Research Node</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {[
          { label: 'Published Research', count: content.insights.filter(p => p.status === 'published').length, color: 'text-brand-dark' },
          { label: 'Drafted Analyses', count: content.insights.filter(p => p.status === 'draft').length, color: 'text-zinc-400' },
          { label: 'Total Engagement', count: content.insights.reduce((acc, p) => acc + p.views, 0).toLocaleString(), color: 'text-brand-accent' },
          { label: 'Endorsements', count: content.insights.reduce((acc, p) => acc + p.likes, 0).toLocaleString(), color: 'text-brand-dark' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
             <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-4">{m.label}</span>
             <span className={`text-3xl font-black ${m.color}`}>{m.count}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden mb-20">
        <div className="p-8 border-b border-zinc-100 bg-zinc-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, category, or researcher..."
              className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-14 pr-6 text-xs focus:outline-none focus:border-brand-accent transition-all font-medium"
            />
          </div>
          <div className="flex items-center space-x-4">
             <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand-accent transition-all">Export Report</button>
             <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand-accent transition-all">Bulk Actions</button>
          </div>
        </div>

        <div className="divide-y divide-zinc-100">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="group flex flex-col md:flex-row md:items-center justify-between p-10 hover:bg-zinc-50 transition-all cursor-default">
                <div className="flex items-center space-x-8 flex-grow max-w-2xl">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 flex-shrink-0 relative">
                    <img src={post.featureImage || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&auto=format&fit=crop'} className="w-full h-full object-cover" alt="Thumb" />
                    {post.isFeatured && (
                      <div className="absolute top-2 right-2 p-1.5 bg-brand-accent text-white rounded-lg shadow-lg">
                        <Sparkles size={10} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                       <span className="px-2 py-0.5 bg-brand-accentLight text-brand-accent text-[8px] font-black uppercase tracking-widest rounded border border-brand-accent/10">
                        {post.category}
                       </span>
                       <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded border ${post.status === 'published' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-zinc-100 text-zinc-400 border-zinc-200'}`}>
                        {post.status}
                       </span>
                    </div>
                    <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter group-hover:text-brand-accent transition-colors leading-tight">{post.title}</h3>
                    <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-[9px] font-bold uppercase tracking-widest">
                      <span className="flex items-center space-x-2"><User size={12} /> <span>{post.author}</span></span>
                      <span className="flex items-center space-x-2"><Eye size={12} /> <span>{post.views}</span></span>
                      <span className="flex items-center space-x-2"><Clock size={12} /> <span>{post.readingTime}</span></span>
                      <span className="flex items-center space-x-2"><Calendar size={12} /> <span>{post.date}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-8 md:mt-0">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="flex items-center space-x-2 px-6 py-4 bg-zinc-100 hover:bg-brand-dark hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-all"
                  >
                    <Edit3 size={16} />
                    <span>Edit Node</span>
                  </button>
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="p-4 bg-zinc-100 hover:bg-red-500 hover:text-white rounded-2xl text-zinc-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-40 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-200 mb-8">
                <BookOpen size={48} strokeWidth={1} />
              </div>
              <h4 className="text-2xl font-black text-brand-dark uppercase tracking-tighter mb-4">Repository Empty</h4>
              <p className="text-zinc-400 text-sm font-medium mb-12 max-w-xs mx-auto italic">No strategic nodes matching your filter were found in the intelligence laboratory.</p>
              <button onClick={handleCreate} className="bg-brand-dark text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all">Initialize First Node</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    window.location.hash = '#/admin';
  };
  
  const menuItems = [
    { label: 'Intelligence Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Site Hero Console', path: '/admin/home', icon: <HomeIcon size={18} /> },
    { label: 'Focus Areas Manager', path: '/admin/focus-areas', icon: <Target size={18} /> },
    { label: 'Strategic Journal', path: '/admin/blog', icon: <BookOpen size={18} /> },
    { label: 'Blog Page Settings', path: '/admin/blog-page', icon: <FileText size={18} /> },
    { label: 'Leadership Profile', path: '/admin/founder', icon: <Users size={18} /> },
    { label: 'Mission & Vision', path: '/admin/about', icon: <Info size={18} /> },
    { label: 'Methodology Lab', path: '/admin/research', icon: <Layers size={18} /> },
    { label: 'Dialogue Channels', path: '/admin/contact', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="flex bg-zinc-50 min-h-screen">
      <div className="w-72 bg-zinc-950 text-white min-h-screen flex flex-col border-r border-white/5 sticky top-0 flex-shrink-0 z-[100]">
        <div className="p-10 border-b border-white/5">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center font-black group-hover:rotate-12 transition-transform">IT</div>
            <h1 className="text-xl font-black tracking-tighter uppercase text-white">ITNEXT <span className="text-brand-accent opacity-60">Admin</span></h1>
          </Link>
        </div>
        <nav className="flex-grow p-6 space-y-3 overflow-y-auto">
          <Link to="/" className="flex items-center space-x-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white hover:bg-white/5 mb-10 transition-all">
            <ArrowLeft size={16} />
            <span>Return to Site</span>
          </Link>
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                location.pathname === item.path ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={location.pathname === item.path ? 'text-white' : 'text-zinc-600'}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5 bg-zinc-950/50">
           <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                <Users size={18} />
              </div>
              <div>
                 <div className="text-[10px] font-black uppercase text-white">Administrator</div>
                 <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Full Access</div>
              </div>
           </div>
           <button onClick={handleLogout} className="flex items-center space-x-4 w-full px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-red-500 hover:text-white transition-all">
              <LogOut size={16} />
              <span>Sign Out</span>
           </button>
        </div>
      </div>

      <div className="flex-grow p-12 lg:p-20 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/home" element={<HomeEditor />} />
            <Route path="/focus-areas" element={<FocusAreasEditor />} />
            <Route path="/blog" element={<BlogEditor />} />
            <Route path="/blog-page" element={<BlogPageEditor />} />
            <Route path="/founder" element={<FounderEditor />} />
            <Route path="/about" element={<AboutEditor />} />
            <Route path="/research" element={<ResearchEditor />} />
            <Route path="/contact" element={<ContactEditor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
