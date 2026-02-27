
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Clock, User, ArrowLeft, ArrowUpRight, 
  Linkedin, Twitter, MessageSquare, Heart, Eye, 
  Share2, Tag, Calendar, ChevronRight, BookOpen, 
  Sparkles, Database, Zap, Shield, Activity, Globe,
  Facebook, Mail, ExternalLink, Bookmark, Filter,
  ArrowRight, CheckCircle2, Quote, Copy, AlertCircle,
  ChevronDown, ChevronUp, X, Image as ImageIcon
} from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import { newsletterApi } from '../services/api.service';
import { InsightPost, ContentBlock } from '../types';

// ── Render a single body block (shared between expanded card and full-page view) ──
const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <h2 className="text-2xl lg:text-3xl font-black text-brand-dark uppercase tracking-tighter mt-10 mb-6 leading-tight">{block.content}</h2>;
    case 'text':
      return <p className="text-zinc-600 text-lg leading-relaxed mb-6">{block.content}</p>;
    case 'quote':
      return (
        <blockquote className="my-10 border-l-4 border-brand-accent pl-8 py-2">
          <div className="flex items-center space-x-2 text-brand-accent mb-3">
            <Quote size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Thesis</span>
          </div>
          <p className="text-xl font-medium text-brand-dark tracking-tight italic">"{block.content}"</p>
        </blockquote>
      );
    case 'image':
      return (
        <figure className="my-8">
          <div className="rounded-3xl overflow-hidden border border-zinc-100 shadow-lg bg-zinc-50">
            {block.content ? (
              <img src={block.content} className="w-full" alt={block.caption || 'Article image'} />
            ) : (
              <div className="flex items-center justify-center h-48 text-zinc-300">
                <ImageIcon size={48} strokeWidth={1} />
              </div>
            )}
          </div>
          {block.caption && <figcaption className="text-center text-[10px] text-zinc-400 uppercase tracking-[0.3em] mt-4 font-black">{block.caption}</figcaption>}
        </figure>
      );
    case 'code':
      return (
        <div className="my-8 bg-zinc-950 rounded-2xl p-8 overflow-x-auto shadow-xl relative group">
          <span className="absolute top-4 right-6 text-[8px] font-black text-white/30 uppercase tracking-widest">{block.language || 'code'}</span>
          <code className="text-brand-accent text-sm font-mono whitespace-pre">{block.content}</code>
        </div>
      );
    case 'list':
      return (
        <ul className="space-y-3 my-8">
          {(block.items || []).map((item, i) => (
            <li key={i} className="flex items-start space-x-4 text-lg text-zinc-600">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-brand-accent text-xs font-black mt-0.5">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div className="bg-brand-accentLight border-l-4 border-brand-accent p-8 rounded-r-3xl my-8 shadow-sm">
          <div className="flex items-center space-x-2 text-brand-accent mb-3">
            <AlertCircle size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Key Insight</span>
          </div>
          <p className="text-lg font-medium text-brand-dark leading-snug">{block.content}</p>
        </div>
      );
    default:
      return null;
  }
};

// ── Expanded card overlay ──
const ExpandedCard: React.FC<{ post: InsightPost; founderImage: string; onCollapse: () => void; onFullArticle: () => void; onLike: () => void; onShare: () => void; isLiked: boolean; initialLikes: number }> = ({ post, founderImage, onCollapse, onFullArticle, onLike, onShare, isLiked, initialLikes }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [localLikes, setLocalLikes] = useState(initialLikes);

  const handleLike = () => {
    if (!isLiked) setLocalLikes(l => l + 1);
    onLike();
  };

  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div ref={cardRef} className="col-span-full bg-white rounded-[3rem] border-2 border-brand-accent shadow-2xl shadow-brand-accent/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Image */}
      {post.featureImage && (
        <div className="relative aspect-[21/9] overflow-hidden bg-zinc-100">
          <img src={post.featureImage} className="w-full h-full object-cover" alt={post.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
          <div className="absolute bottom-8 left-10 right-10 flex items-end justify-between">
            <span className="px-4 py-1.5 bg-brand-accent text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl">
              {post.category}
            </span>
            {post.isFeatured && (
              <span className="flex items-center space-x-1 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest rounded-xl border border-white/20">
                <Sparkles size={10} /> <span>Featured</span>
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-10 lg:p-16">
        {/* Header bar */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex-grow">
            {!post.featureImage && (
              <span className="inline-block px-3 py-1 bg-brand-accentLight text-brand-accent text-[9px] font-black uppercase tracking-widest rounded-lg border border-brand-accent/10 mb-4">
                {post.category}
              </span>
            )}
            <h2 className="text-3xl lg:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-none">{post.title}</h2>
            {post.subtitle && <p className="text-xl text-zinc-500 font-medium italic mt-3">{post.subtitle}</p>}
          </div>
          <button
            onClick={onCollapse}
            className="flex-shrink-0 p-3 rounded-2xl bg-zinc-100 hover:bg-red-50 hover:text-red-500 text-zinc-400 transition-all"
            title="Collapse"
          >
            <ChevronUp size={20} />
          </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-8 pb-8 border-b border-zinc-100 mb-8 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100">
              <img src={founderImage} className="w-full h-full object-cover" alt={post.author} />
            </div>
            <span className="text-brand-dark">{post.author}</span>
          </div>
          <div className="flex items-center space-x-2"><Calendar size={14} /><span>{post.date}</span></div>
          <div className="flex items-center space-x-2"><Clock size={14} /><span>{post.readingTime}</span></div>
          <div className="flex items-center space-x-2"><Eye size={14} /><span>{post.views.toLocaleString()} Reads</span></div>
          <button onClick={handleLike} className={`flex items-center space-x-2 transition-all ${isLiked ? "text-red-500" : "hover:text-red-400"}`}><Heart size={14} className={isLiked ? "fill-red-500" : ""} /><span>{localLikes} Endorsements</span></button>
        </div>

        {/* Excerpt */}
        <p className="text-xl text-zinc-600 leading-relaxed font-medium italic mb-10 max-w-3xl">{post.excerpt}</p>

        {/* Body blocks */}
        <div className="max-w-3xl">
          {post.body.map(block => <BlockRenderer key={block.id} block={block} />)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-zinc-100">
            {post.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-zinc-50 text-[9px] font-black uppercase tracking-widest text-zinc-400 rounded-xl border border-zinc-100">#{tag}</span>
            ))}
          </div>
        )}

        {/* Action row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-10 pt-8 border-t border-zinc-100">
          <div className="flex items-center space-x-3">
            <button onClick={() => { const url = encodeURIComponent(window.location.href); window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank"); onShare(); }} className="flex items-center space-x-2 px-6 py-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-all border border-zinc-100">
              <Linkedin size={16} className="text-zinc-400" /><span>Share</span>
            </button>
            <button onClick={() => { const url = encodeURIComponent(window.location.href); const text = encodeURIComponent(post.title); window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank"); onShare(); }} className="flex items-center space-x-2 px-6 py-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-all border border-zinc-100">
              <Twitter size={16} className="text-zinc-400" /><span>Tweet</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCollapse}
              className="flex items-center space-x-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-all"
            >
              <ChevronUp size={14} /><span>Collapse</span>
            </button>
            <button
              onClick={onFullArticle}
              className="flex items-center space-x-2 px-8 py-3 bg-brand-dark hover:bg-brand-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-brand-dark/10"
            >
              <BookOpen size={14} /><span>Full Article View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  const { content, likePost, sharePost } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('likedPosts') || '[]')); }
    catch { return new Set(); }
  });

  const focusAreas = ["Data-Driven Digital Products", "AI Automation & Intelligent Systems", "Cloud Architecture & Cybersecurity", "Digital Transformation Advisory"];
  const categories = ['All', ...focusAreas];

  const filteredPosts = useMemo(() => {
    return content.insights.filter(post => {
      if (post.status !== 'published') return false;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [content.insights, searchQuery, activeCategory]);

  const featuredPost = useMemo(() => {
    return filteredPosts.find(p => p.isFeatured) || filteredPosts[0];
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter(p => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  // Reset expanded card when filters change
  useEffect(() => {
    setExpandedPostId(null);
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    if (selectedPost) window.scrollTo(0, 0);
  }, [selectedPost]);

  const handleCardClick = (post: InsightPost) => {
    if (expandedPostId === post.id) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(post.id);
    }
  };

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await newsletterApi.subscribe(newsletterEmail);
    } catch (err) {
      // Non-critical: show success even if backend is offline
    }
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  // ── Full article view ──
  if (selectedPost) {
    return (
      <div className="pb-0 bg-white animate-in fade-in duration-700">
        <div className="fixed top-0 left-0 w-full h-1 bg-zinc-100 z-[60]">
          <div className="h-full bg-brand-accent transition-all duration-300" style={{ width: '45%' }}></div>
        </div>
        
        <article className="pt-48 pb-32 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand-accent transition-all group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                <span>Return to Journal</span>
              </button>
              <div className="flex items-center space-x-6">
                 <button className="text-zinc-300 hover:text-brand-dark transition-colors"><Bookmark size={18} /></button>
                 <button className="text-zinc-300 hover:text-brand-dark transition-colors"><Share2 size={18} /></button>
              </div>
            </div>

            <div className="space-y-10 mb-20">
              <div className="flex items-center space-x-4">
                <span className="px-4 py-1 bg-brand-accentLight text-brand-accent text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-brand-accent/10">
                  {selectedPost.category}
                </span>
                {selectedPost.lastUpdated && (
                  <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">Updated {selectedPost.lastUpdated}</span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
                {selectedPost.title}
              </h1>
              
              {selectedPost.subtitle && (
                <p className="text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl italic">
                  {selectedPost.subtitle}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-zinc-100">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-3xl bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-100">
                    <img src={content.founder.image} alt={selectedPost.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-brand-dark uppercase tracking-widest block mb-1">{selectedPost.author}</span>
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-none">{selectedPost.authorRole || 'Founder & Researcher'}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-12 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center space-x-3"><Calendar size={16} /> <span>{selectedPost.date}</span></div>
                  <div className="flex items-center space-x-3"><Clock size={16} /> <span>{selectedPost.readingTime}</span></div>
                  <div className="flex items-center space-x-3"><Eye size={16} /> <span>{selectedPost.views.toLocaleString()} Reads</span></div>
                </div>
              </div>
            </div>

            {selectedPost.featureImage && (
              <div className="rounded-[4rem] overflow-hidden aspect-[21/10] mb-24 shadow-2xl relative">
                <img src={selectedPost.featureImage} className="w-full h-full object-cover" alt="Feature" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent"></div>
              </div>
            )}

            <div className="prose prose-zinc prose-xl max-w-none">
              {selectedPost.body.map(block => (
                <div key={block.id} className="mb-16">
                  {block.type === 'heading' && <h2 className="text-4xl lg:text-5xl font-black text-brand-dark uppercase tracking-tighter mt-24 mb-12 leading-none">{block.content}</h2>}
                  {block.type === 'text' && <p className="text-xl text-zinc-600 leading-relaxed">{block.content}</p>}
                  {block.type === 'quote' && (
                    <blockquote className="text-3xl font-medium tracking-tight mb-16">
                      <div className="flex items-center space-x-2 text-brand-accent mb-4">
                        <Quote size={24} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Thesis</span>
                      </div>
                      "{block.content}"
                    </blockquote>
                  )}
                  {block.type === 'image' && (
                    <figure className="my-20">
                      <div className="rounded-[3rem] overflow-hidden border border-zinc-100 shadow-lg">
                        <img src={block.content} className="w-full" alt="Analysis Media" />
                      </div>
                      {block.caption && <figcaption className="text-center text-[10px] text-zinc-400 uppercase tracking-[0.3em] mt-8 font-black">{block.caption}</figcaption>}
                    </figure>
                  )}
                  {block.type === 'code' && (
                    <div className="my-16 bg-brand-dark rounded-[2.5rem] p-10 overflow-x-auto shadow-2xl relative group">
                      <div className="absolute top-6 right-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{block.language || 'text'}</span>
                         <button className="p-2 text-white/20 hover:text-white transition-colors"><Copy size={14} /></button>
                      </div>
                      <code className="text-brand-accent text-sm font-mono whitespace-pre">{block.content}</code>
                    </div>
                  )}
                  {block.type === 'list' && (
                    <ul className="space-y-4 my-12">
                      {(block.items || []).map((item, i) => (
                        <li key={i} className="flex items-start space-x-6 text-xl text-zinc-600">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-brand-accent text-xs font-black">{i + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {block.type === 'callout' && (
                    <div className="bg-brand-accentLight border-l-8 border-brand-accent p-12 rounded-r-[2.5rem] my-16 shadow-lg shadow-brand-accent/5">
                       <div className="flex items-center space-x-3 text-brand-accent mb-6">
                         <AlertCircle size={20} />
                         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Critical Insight</span>
                       </div>
                       <p className="text-2xl font-medium text-brand-dark leading-snug tracking-tight m-0">{block.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-32 pt-20 border-t border-zinc-100">
               <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                 <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-3 bg-zinc-50 hover:bg-zinc-100 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-all border border-zinc-100">
                      <Heart size={18} className="text-zinc-300" />
                      <span>{selectedPost.likes} Endorsements</span>
                    </button>
                    <div className="flex items-center space-x-3">
                       <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest mr-2">Disseminate</span>
                       <button className="p-4 bg-zinc-50 hover:bg-brand-dark hover:text-white rounded-2xl text-zinc-400 transition-all border border-zinc-100"><Linkedin size={18} /></button>
                       <button className="p-4 bg-zinc-50 hover:bg-brand-dark hover:text-white rounded-2xl text-zinc-400 transition-all border border-zinc-100"><Twitter size={18} /></button>
                       <button className="p-4 bg-zinc-50 hover:bg-brand-dark hover:text-white rounded-2xl text-zinc-400 transition-all border border-zinc-100"><Mail size={18} /></button>
                    </div>
                 </div>
                 <div className="flex flex-wrap gap-2 justify-center">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-zinc-50 text-[9px] font-black uppercase tracking-widest text-zinc-400 rounded-xl border border-zinc-100">#{tag}</span>
                    ))}
                 </div>
               </div>
            </div>

            <div className="mt-40">
               <div className="flex items-center justify-between mb-16">
                  <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Adjacent Research</h2>
                  <Link to="/blog" onClick={() => setSelectedPost(null)} className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-brand-accent hover:text-brand-dark transition-all">
                    <span>Explore Full Repository</span>
                    <ArrowRight size={16} />
                  </Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {content.insights.filter(p => p.id !== selectedPost.id && p.status === 'published').slice(0, 2).map(post => (
                    <div key={post.id} onClick={() => { setSelectedPost(post); }} className="group cursor-pointer">
                       <div className="aspect-[16/9] bg-zinc-100 rounded-[2.5rem] overflow-hidden mb-8 border border-zinc-100 group-hover:shadow-2xl transition-all duration-700">
                          <img src={post.featureImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Related" />
                       </div>
                       <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest mb-3">{post.category}</div>
                       <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter leading-tight group-hover:text-brand-accent transition-colors">{post.title}</h3>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // ── Main blog listing view ──
  return (
    <div className="pb-0 bg-white animate-in fade-in duration-700">
      {/* Hero / Search */}
      <section className="pt-48 pb-32 px-6 lg:px-12 relative border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center space-x-4 mb-10">
              <div className="w-16 h-[1px] bg-brand-accent"></div>
              <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.5em]">{content.blogPage.hero.eyebrow}</span>
              <div className="w-16 h-[1px] bg-brand-accent"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-10 tracking-tighter">
              {content.blogPage.hero.title}
            </h1>
            <p className="text-xl lg:text-2xl text-zinc-500 leading-relaxed font-medium mx-auto max-w-2xl mb-20 italic">
              {content.blogPage.hero.description}
            </p>

            <div className="flex flex-col items-center space-y-12">
              <div className="relative group w-full max-w-xl">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand-accent transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="FILTER REPOSITORY BY TOPIC OR NODES..." 
                  className="w-full bg-white border border-zinc-200 rounded-[2.5rem] py-6 pl-16 pr-10 text-[13px] font-black uppercase tracking-widest focus:outline-none focus:border-brand-accent transition-all shadow-xl shadow-brand-dark/5"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                      activeCategory === cat 
                        ? 'bg-brand-dark text-white border-brand-dark shadow-2xl scale-105' 
                        : 'bg-white text-zinc-400 border-zinc-200 hover:border-brand-accent hover:text-brand-dark'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
             <div
               className="group relative overflow-hidden bg-brand-dark rounded-[4rem] flex flex-col lg:flex-row h-full min-h-[600px] shadow-2xl cursor-pointer"
               onClick={() => handleCardClick(featuredPost)}
             >
                <div className="lg:w-1/2 p-16 lg:p-24 flex flex-col justify-center relative z-10">
                   <div className="flex items-center space-x-4 mb-10">
                     <span className="px-4 py-1.5 bg-brand-accent text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-lg">Featured Research</span>
                     <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Node 0{featuredPost.id}</span>
                   </div>
                   <h2 className="text-4xl lg:text-6xl font-black text-white leading-none mb-10 tracking-tighter uppercase group-hover:text-brand-accent transition-colors duration-700">
                     {featuredPost.title}
                   </h2>
                   <p className="text-xl text-zinc-400 leading-relaxed font-medium mb-12 line-clamp-3">
                     {featuredPost.excerpt}
                   </p>
                   <div className="flex items-center space-x-10 text-zinc-500 text-[10px] font-black uppercase tracking-widest pt-10 border-t border-white/10">
                      <div className="flex items-center space-x-3 text-white"><User size={16} className="text-brand-accent" /> <span>{featuredPost.author}</span></div>
                      <div className="flex items-center space-x-3"><Calendar size={16} /> <span>{featuredPost.date}</span></div>
                      <div className="flex items-center space-x-3"><Clock size={16} /> <span>{featuredPost.readingTime}</span></div>
                   </div>
                   <div className="mt-8 flex items-center space-x-2 text-brand-accent text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                     <ChevronDown size={16} />
                     <span>{expandedPostId === featuredPost.id ? 'Click to collapse' : 'Click to expand'}</span>
                   </div>
                </div>
                <div className="lg:w-1/2 relative overflow-hidden h-[400px] lg:h-auto">
                   <img src={featuredPost.featureImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Featured" />
                   <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/20 to-transparent"></div>
                </div>
             </div>
          </div>
        </section>
      )}

      {/* Featured post expanded view */}
      {expandedPostId === featuredPost?.id && (
        <section className="px-6 lg:px-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <ExpandedCard
              post={featuredPost}
              founderImage={content.founder.image}
              onCollapse={() => setExpandedPostId(null)}
              onFullArticle={() => { setSelectedPost(featuredPost); setExpandedPostId(null); }}
              isLiked={likedPosts.has(featuredPost.id)}
              initialLikes={featuredPost.likes}
              onLike={async () => {
                if (likedPosts.has(featuredPost.id)) return;
                const newLiked = new Set(likedPosts); newLiked.add(featuredPost.id); setLikedPosts(newLiked);
                localStorage.setItem('likedPosts', JSON.stringify([...newLiked]));
                await likePost(featuredPost.id);
              }}
              onShare={async () => { await sharePost(featuredPost.id); }}
            />
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-24">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-accent">Sequential Research Nodes</h2>
            <div className="h-[1px] flex-grow mx-12 bg-zinc-100 hidden md:block"></div>
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Filter results: {filteredPosts.length} Nodes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
            {regularPosts.map((post) => (
              <React.Fragment key={post.id}>
                {/* Regular card */}
                <div 
                  onClick={() => handleCardClick(post)}
                  className={`group flex flex-col h-full border-b pb-16 cursor-pointer transition-all duration-300 ${
                    expandedPostId === post.id
                      ? 'border-brand-accent'
                      : 'border-zinc-100 lg:border-0 lg:pb-0'
                  }`}
                >
                  <div className={`mb-10 relative overflow-hidden rounded-[3rem] aspect-[16/10] bg-zinc-100 shadow-sm border transition-all duration-700 ${
                    expandedPostId === post.id
                      ? 'border-brand-accent shadow-2xl shadow-brand-accent/15'
                      : 'border-zinc-100 group-hover:shadow-2xl'
                  }`}>
                    {post.featureImage ? (
                      <img src={post.featureImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Post" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-200">
                         <BookOpen size={64} strokeWidth={0.5} />
                      </div>
                    )}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-brand-dark text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg border border-white">
                        {post.category}
                      </span>
                    </div>
                    {/* Expand indicator */}
                    <div className={`absolute bottom-4 right-4 p-2 rounded-xl transition-all duration-300 ${
                      expandedPostId === post.id
                        ? 'bg-brand-accent text-white opacity-100'
                        : 'bg-white/90 text-brand-dark opacity-0 group-hover:opacity-100'
                    }`}>
                      {expandedPostId === post.id
                        ? <ChevronUp size={14} />
                        : <ChevronDown size={14} />
                      }
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center space-x-6 mb-8 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                      <span>{post.date}</span>
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full opacity-40"></span>
                      <span>{post.readingTime}</span>
                    </div>
                    
                    <h3 className={`text-3xl font-black mb-8 uppercase tracking-tighter leading-[0.9] transition-colors duration-500 ${
                      expandedPostId === post.id ? 'text-brand-accent' : 'text-brand-dark group-hover:text-brand-accent'
                    }`}>
                      {post.title}
                    </h3>
                    
                    <p className="text-zinc-500 text-lg leading-relaxed font-medium mb-10 line-clamp-3 italic">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-10 border-t border-zinc-100">
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 overflow-hidden">
                          <img src={content.founder.image} className="w-full h-full object-cover" alt="Author" />
                        </div>
                        <span className="text-[11px] font-black text-brand-dark uppercase tracking-widest">{post.author}</span>
                     </div>
                     <div className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                       expandedPostId === post.id
                         ? 'text-brand-accent'
                         : 'text-zinc-400 group-hover:text-brand-accent group-hover:translate-x-2'
                     }`}>
                       <span>{expandedPostId === post.id ? 'Collapse' : 'Read More'}</span>
                       {expandedPostId === post.id ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
                     </div>
                  </div>
                </div>

                {/* Expanded card - rendered inline spanning full width */}
                {expandedPostId === post.id && (
                  <ExpandedCard
                    post={post}
                    founderImage={content.founder.image}
                    onCollapse={() => setExpandedPostId(null)}
                    onFullArticle={() => { setSelectedPost(post); setExpandedPostId(null); }}
                    isLiked={likedPosts.has(post.id)}
                    initialLikes={post.likes}
                    onLike={async () => {
                      if (likedPosts.has(post.id)) return;
                      const newLiked = new Set(likedPosts); newLiked.add(post.id); setLikedPosts(newLiked);
                      localStorage.setItem('likedPosts', JSON.stringify([...newLiked]));
                      await likePost(post.id);
                    }}
                    onShare={async () => { await sharePost(post.id); }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-48 text-center bg-zinc-50 rounded-[4rem] border border-dashed border-zinc-200">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-zinc-200 mx-auto mb-10 shadow-sm">
                <Filter size={48} strokeWidth={1} />
              </div>
              <h4 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-4">No analysis nodes match your query</h4>
              <p className="text-zinc-500 text-lg font-medium max-w-sm mx-auto">Try refining your search parameters or select a different focus area taxonomy.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-12 px-10 py-5 bg-brand-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all shadow-xl">Reset Parameters</button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-40 px-6 lg:px-12 bg-brand-dark relative overflow-hidden">
         <div className="max-w-5xl mx-auto text-center relative z-10">
           <div className="inline-flex items-center space-x-3 mb-12">
             <div className="w-12 h-12 bg-brand-accent text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-accent/40"><Mail size={24} /></div>
             <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.5em]">{content.blogPage.newsletter.eyebrow}</span>
           </div>
           <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-none">{content.blogPage.newsletter.title}</h2>
           <p className="text-2xl text-zinc-400 mb-16 max-w-2xl mx-auto leading-relaxed">{content.blogPage.newsletter.description}</p>
           
           {!subscribed ? (
             <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
                <input required type="email" placeholder="PROFESSIONAL WORK EMAIL..." className="flex-grow bg-white/5 border border-white/10 rounded-[2.5rem] px-10 py-6 text-xs text-white uppercase tracking-widest focus:outline-none focus:border-brand-accent transition-all placeholder:text-zinc-600" />
                <button type="submit" className="bg-brand-accent text-white px-12 py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-brand-dark transition-all shadow-2xl shadow-brand-accent/20">Subscribe Node</button>
             </form>
           ) : (
             <div className="flex flex-col items-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/40"><CheckCircle2 size={40} /></div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Transmission Successful</h3>
                <p className="text-zinc-500 font-medium">You have been indexed in our high-priority intelligence feed.</p>
             </div>
           )}
           <p className="mt-12 text-[9px] font-black text-zinc-600 uppercase tracking-widest">{content.blogPage.newsletter.privacy}</p>
         </div>
         
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
         </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 lg:px-12 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-between items-center gap-16">
          {content.blogPage.stats.map((stat, i) => (
            <div key={i} className="flex items-center space-x-6 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:text-brand-accent group-hover:border-brand-accent transition-all duration-500 shadow-sm">
                {i === 0 && <Database size={18} />}
                {i === 1 && <Activity size={18} />}
                {i === 2 && <Globe size={18} />}
                {i === 3 && <Share2 size={18} />}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">{stat.label}</span>
                <span className="text-xs font-black text-brand-dark uppercase tracking-widest">{stat.val}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
