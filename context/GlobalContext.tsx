
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FOCUS_AREAS } from '../constants';
import { SiteContent, InsightPost } from '../types';
import { insightsApi, contentApi } from '../services/api.service';

// ─── Default Data (used when backend is unavailable) ─────────────────────────

const DEFAULT_INSIGHTS: InsightPost[] = [
  {
    id: '1',
    slug: 'optimizing-multi-agent-systems',
    title: 'Optimizing Multi-Agent Systems for Complex Supply Chain Logistics',
    subtitle: 'The shift from linear automation to agentic intelligence.',
    category: 'AI Automation & Intelligent Systems',
    date: 'April 2024',
    author: 'Sangeeth Liyanarachchi',
    authorRole: 'Founder & Strategy Lead',
    readingTime: '14 min read',
    tags: ['Multi-Agent Systems', 'Autonomous Logistics', 'Intelligent Agents'],
    featureImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'A research deep-dive into the orchestration of specialized AI agents to handle non-deterministic variables in global supply chains.',
    status: 'published',
    isFeatured: true,
    views: 1240,
    likes: 85,
    shares: 0,
    body: [
      { id: 'b1', type: 'heading', content: 'The Agentic Paradigm' },
      { id: 'b2', type: 'text', content: 'In modern supply chains, the complexity of variables often exceeds the capacity of traditional, deterministic automation.' },
      { id: 'b3', type: 'quote', content: 'True innovation in logistics is not about faster transport, but smarter decision-making at every node.' },
      { id: 'b4', type: 'image', content: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop', caption: 'Visualizing agent node intersections.' }
    ],
    seoTitle: '',
    metaDescription: ''
  }
];

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    title: "Data-Driven Digital Systems & AI Transformation.",
    subtitle: "Strategic research, intelligent systems design, and expert transformation advisory for technology leaders and European enterprises.",
    ctaPrimary: "Explore Focus Areas",
    ctaSecondary: "Connect With ITNEXT"
  },
  overview: {
    title: "Knowledge-Led Innovation",
    text1: "ITNEXT operates at the intersection of industry expertise and academic rigor. We are not a high-volume commercial agency; we are an exploratory innovation platform.",
    text2: "Our mission is to help organizations navigate the complex landscape of AI, cloud architecture, and data analytics through a research-driven lens that prioritizes long-term strategic value.",
    statValue: "18+",
    statLabel: "Years Experience"
  },
  homeCTA: {
    title: "Ready to explore the next frontier of digital intelligence?",
    description: "We partner with forward-thinking organizations on research-based innovation projects and strategic transformations.",
    buttonText: "Start a Collaboration"
  },
  focusAreasPage: {
    hero: {
      eyebrow: "Execution Architecture",
      title: "Core Capabilities",
      description: "We deconstruct complex digital challenges into high-performance architectural pillars."
    },
    framework: {
      title: "Applied Technical Rigor",
      description: "Our methodology prioritizes long-term resilience over immediate convenience.",
      items: [
        { title: "Empirical Design", desc: "Every architectural decision is backed by research and data-driven proof-of-concepts." },
        { title: "Scalable Logic", desc: "Building modular frameworks that handle industrial loads and multi-region deployment." },
        { title: "Risk-First Security", desc: "Integrating defensive measures at the foundation of the digital infrastructure." }
      ],
      quote: "ITNEXT capabilities are the fundamental building blocks of a resilient, intelligence-driven enterprise operating model."
    }
  },
  blogPage: {
    hero: {
      eyebrow: "Research Repository v3.0",
      title: "Strategic Journal",
      description: "Empirical technical deconstructions, algorithmic analysis, and enterprise operating models from the ITNEXT Laboratory."
    },
    newsletter: {
      eyebrow: "Global Syndication",
      title: "The Intelligence Network",
      description: "Join 1,200+ technology leaders receiving our monthly primary research nodes and digital operating models.",
      privacy: "Respecting intellectual privacy. Single-click decommissioning available."
    },
    stats: [
      { label: "Active Nodes", val: "148 ANALYSES" },
      { label: "Lab Rigor", val: "PEER REVIEWED" },
      { label: "Intelligence Origin", val: "UK / EU SECTORS" },
      { label: "Dissemination", val: "MONTHLY SYNC" }
    ]
  },
  focusAreas: FOCUS_AREAS,
  products: [
    {
      id: 'prod-talent-dev',
      name: 'Talent Development Cloud',
      description: 'Strategic research-led platform focusing on workforce intelligence and institutional talent development frameworks.',
      researchCategoryId: 'framework',
      targetMarket: 'Higher Education & Corporate HR',
      url: 'https://ltbr.uk/'
    },
    {
      id: 'prod-global-visa',
      name: 'ITNEXT Global Visa',
      description: 'Innovation model researching global talent mobility and digital nomad framework integration.',
      researchCategoryId: 'innovation',
      targetMarket: 'Global Talent & Policy Makers',
      url: 'https://itnext-globalvisa.org/'
    }
  ],
  insights: DEFAULT_INSIGHTS,
  founder: {
    name: "Sangeeth Liyanarachchi",
    bio: "Technology Founder and Digital Innovation Leader with 18+ years of enterprise expertise.",
    quote: "At ITNEXT, we focus on the fundamental architecture of innovation.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    linkedin: "https://www.linkedin.com/in/sangeeth-liyanarachchi-8886b7134",
    email: "Sangeeth@itnext.uk",
    mobile: "+447424436454",
    detailedBio: "Sangeeth Liyanarachchi is a visionary technology leader specializing in complex digital architectures and AI-driven transformation.",
    credentials: [{ title: "MSc Project Management", subtitle: "Strategic Implementation" }],
    focus: ["AI Strategy", "Product Vision", "Digital Architecture", "Strategic Innovation"]
  },
  about: {
    hero: { title: "Pioneering Knowledge Led Innovation", description: "ITNEXT is a dedicated platform for strategic research and the practical application of emerging technologies in the enterprise landscape." },
    pillars: [
      { id: '1', title: "Our Mission & Vision", desc: "Bridging the gap between academic research and industrial application.", details: ["Academic-Industry Bridge", "Data-Informed Paths", "Resilience Focus"] },
      { id: '2', title: "Non-Commercial Core", desc: "Providing the strategic clarity leaders need without commercial noise.", details: ["Objective Strategy", "Intellectual Freedom", "Exploratory Focus"] },
      { id: '3', title: "Responsible Innovation", desc: "A commitment to ethics and transparency in AI standards.", details: ["Ethical AI Advocacy", "Transparency First", "Safety Alignment"] }
    ],
    alignment: { title: "Responsible Digital Growth", description: "Our approach to innovation is rooted in the UK's digital and AI growth strategy, focusing on sustainable systems." },
    alignmentItems: [
      { title: "Continuous Learning", desc: "Fostering a culture where emerging research is constantly integrated into our strategic frameworks." },
      { title: "Applied Frameworks", desc: "Developing methodologies that ensure digital transformation is both cutting-edge and industrially stable." },
      { title: "Global Exchange", desc: "Collaborating across UK and European sectors to share insights on digital operating models." }
    ],
    visionQuote: "ITNEXT operates as an intellectual engine, decoupling innovation from commercial noise to provide the strategic clarity leaders need."
  },
  research: {
    hero: { title: "The Innovation Platform", description: "ITNEXT functions as a non-commercial experimentation environment where we deconstruct emerging technologies into actionable industrial frameworks." },
    pillars: [
      { id: 'poc', title: "Proof-of-Concept Design", desc: "Rapid prototyping of experimental models to test technological viability.", details: ["Viability Testing", "Rapid Prototyping", "Risk Mitigation"] },
      { id: 'framework', title: "Framework Development", desc: "Codifying research into high-performance architectural patterns.", details: ["Architectural Patterns", "Standardization", "Scalability Research"] },
      { id: 'innovation', title: "Innovation Models", desc: "Developing long-term operating models for organizations.", details: ["Change Absorption", "Stability Engineering", "Future-Proofing"] }
    ],
    ethics: { title: "Responsible Experimentation", description: "Our research prioritizes 'Responsible AI' and sustainable digital systems." },
    ethicsItems: [
      { title: "Algorithmic Transparency", desc: "Every model we test is deconstructed to ensure decision-making logic is clear and auditable." },
      { title: "Empirical Testing", desc: "Moving beyond theoretical hype into data-backed validation of performance and security." },
      { title: "Safety Alignment", desc: "Ensuring that intelligent automation remains aligned with human values and safety protocols." }
    ],
    methodologyQuote: "The goal of ITNEXT Research is not to deliver a product, but to deliver the wisdom and the framework required for an organization to build its own future."
  },
  contact: {
    hero: { title: "Connect With ITNEXT", description: "We look forward to starting a strategic conversation about your digital innovation journey and research requirements." },
    channels: [
      { id: 'email', title: "Direct Correspondence", desc: "For formal research inquiries and partnership proposals.", details: ["Sangeeth@itnext.uk", "+447424436454", "48h Response SLA"] },
      { id: 'linkedin', title: "Strategic Network", desc: "Connect with our leadership and follow our latest research nodes.", details: ["LinkedIn Profile", "Innovation Updates", "Founder Direct"] },
      { id: 'location', title: "Operational Hub", desc: "Headquartered in the UK, serving enterprises across Europe.", details: ["UK Registered", "European Outreach", "Remote Capability"] }
    ],
    mandate: { title: "Collaboration Mandate" },
    mandateQuote: "Every strategic partnership at ITNEXT begins with a commitment to empirical clarity and long-term innovation value.",
    mandateItems: [
      { title: "Research Integrity", desc: "No commercial-led bias in our advisory." },
      { title: "UK Support", desc: "Aligned with UK digital growth strategy." },
      { title: "Global Reach", desc: "Expertise across EU and global tech sectors." }
    ]
  }
};

// ─── Context Types ────────────────────────────────────────────────────────────

interface GlobalContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  upsertPost: (post: InsightPost) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<number>;
  sharePost: (id: string) => Promise<number>;
  resetToDefaults: () => void;
  refreshInsights: () => Promise<void>;
  backendOnline: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// ── Helper: map MongoDB doc (_id) → frontend id ───────────────────────────────
function mapPost(doc: any): InsightPost {
  return {
    ...doc,
    id: doc._id ?? doc.id,
  };
}

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backendOnline, setBackendOnline] = useState(false);
  const [content, setContent] = useState<SiteContent>(() => {
    // Start from localStorage while we fetch from backend
    const saved = localStorage.getItem('itnext_content');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        return {
          ...DEFAULT_CONTENT,
          ...p,
          hero: { ...DEFAULT_CONTENT.hero, ...p.hero },
          overview: { ...DEFAULT_CONTENT.overview, ...p.overview },
          homeCTA: p.homeCTA || DEFAULT_CONTENT.homeCTA,
          blogPage: p.blogPage ? {
            hero: { ...DEFAULT_CONTENT.blogPage.hero, ...p.blogPage.hero },
            newsletter: { ...DEFAULT_CONTENT.blogPage.newsletter, ...p.blogPage.newsletter },
            stats: p.blogPage.stats || DEFAULT_CONTENT.blogPage.stats
          } : DEFAULT_CONTENT.blogPage,
          founder: { ...DEFAULT_CONTENT.founder, ...p.founder },
          about: { ...DEFAULT_CONTENT.about, ...p.about },
          research: { ...DEFAULT_CONTENT.research, ...p.research },
          contact: { ...DEFAULT_CONTENT.contact, ...p.contact },
          insights: Array.isArray(p.insights) && p.insights.length ? p.insights : DEFAULT_CONTENT.insights,
        };
      } catch {
        return DEFAULT_CONTENT;
      }
    }
    return DEFAULT_CONTENT;
  });

  // ── Persist non-insight content to localStorage ──
  useEffect(() => {
    localStorage.setItem('itnext_content', JSON.stringify(content));
  }, [content]);

  // ── Load insights from backend on mount ──
  const refreshInsights = useCallback(async () => {
    try {
      const res = await insightsApi.getAll({ status: 'all' } as any);
      const posts = (res.data.insights || []).map(mapPost);
      if (posts.length > 0) {
        setContent(prev => ({ ...prev, insights: posts }));
        setBackendOnline(true);
      }
    } catch (err) {
      // backend offline → use localStorage data silently
      setBackendOnline(false);
    }
  }, []);

  useEffect(() => {
    refreshInsights();
    // Poll every 60s to stay in sync
    const interval = setInterval(refreshInsights, 60_000);
    return () => clearInterval(interval);
  }, [refreshInsights]);

  // ── updateContent: site-wide content (non-posts) ──
  const updateContent = (updates: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...updates }));
  };

  // ── upsertPost: create or update via API, then sync locally ──
  const upsertPost = async (post: InsightPost) => {
    // Optimistic local update first
    setContent(prev => {
      const exists = prev.insights.find(p => p.id === post.id);
      return {
        ...prev,
        insights: exists
          ? prev.insights.map(p => p.id === post.id ? post : p)
          : [post, ...prev.insights]
      };
    });

    if (!backendOnline) return;

    try {
      // MongoDB uses _id, check if the post has a real Mongo id or a local temporary one
      const isMongoId = /^[a-f\d]{24}$/i.test(post.id);
      if (isMongoId) {
        await insightsApi.update(post.id, post);
      } else {
        // New post — create on backend
        const res = await insightsApi.create(post);
        const saved = mapPost(res.data.insight);
        // Replace temp id with real Mongo _id
        setContent(prev => ({
          ...prev,
          insights: prev.insights.map(p => p.id === post.id ? saved : p)
        }));
      }
    } catch (err) {
      console.error('Failed to save post to backend:', err);
    }
  };

  // ── deletePost: delete via API, then sync locally ──
  const deletePost = async (id: string) => {
    // Optimistic local delete
    setContent(prev => ({ ...prev, insights: prev.insights.filter(p => p.id !== id) }));

    if (!backendOnline) return;

    try {
      const isMongoId = /^[a-f\d]{24}$/i.test(id);
      if (isMongoId) {
        await insightsApi.delete(id);
      }
    } catch (err) {
      console.error('Failed to delete post from backend:', err);
    }
  };

  // ── likePost: increment likes via API, return new count ──
  const likePost = async (id: string): Promise<number> => {
    // Optimistic local increment
    let newCount = 0;
    setContent(prev => ({
      ...prev,
      insights: prev.insights.map(p => {
        if (p.id === id) {
          newCount = p.likes + 1;
          return { ...p, likes: newCount };
        }
        return p;
      })
    }));

    if (backendOnline) {
      try {
        const isMongoId = /^[a-f\d]{24}$/i.test(id);
        if (isMongoId) {
          const res = await insightsApi.like(id);
          newCount = res.data.likes;
          // Sync with server value
          setContent(prev => ({
            ...prev,
            insights: prev.insights.map(p => p.id === id ? { ...p, likes: newCount } : p)
          }));
        }
      } catch (err) {
        console.error('Failed to sync like:', err);
      }
    }
    return newCount;
  };

  // ── sharePost: increment shares via API, return new count ──
  const sharePost = async (id: string): Promise<number> => {
    let newCount = 0;
    setContent(prev => ({
      ...prev,
      insights: prev.insights.map(p => {
        if (p.id === id) {
          newCount = p.shares + 1;
          return { ...p, shares: newCount };
        }
        return p;
      })
    }));

    if (backendOnline) {
      try {
        const isMongoId = /^[a-f\d]{24}$/i.test(id);
        if (isMongoId) {
          const res = await insightsApi.share(id);
          newCount = res.data.shares;
          setContent(prev => ({
            ...prev,
            insights: prev.insights.map(p => p.id === id ? { ...p, shares: newCount } : p)
          }));
        }
      } catch (err) {
        console.error('Failed to sync share:', err);
      }
    }
    return newCount;
  };

  const resetToDefaults = () => setContent(DEFAULT_CONTENT);

  return (
    <GlobalContext.Provider value={{
      content, updateContent, upsertPost, deletePost,
      likePost, sharePost, refreshInsights, resetToDefaults, backendOnline
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobalContext must be used within GlobalProvider');
  return context;
};
