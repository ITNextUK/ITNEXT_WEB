
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FOCUS_AREAS } from '../constants';
import { SiteContent, InsightPost } from '../types';
import { contentApi, insightsApi } from '../services/api.service';

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
    views: 1240,
    likes: 85,
    shares: 0,
    body: [
      { id: 'b1', type: 'heading', content: 'The Agentic Paradigm' },
      { id: 'b2', type: 'text', content: 'In modern supply chains, the complexity of variables often exceeds the capacity of traditional, deterministic automation.' },
      { id: 'b3', type: 'quote', content: 'True innovation in logistics is not about faster transport, but smarter decision-making at every node.' },
      { id: 'b4', type: 'image', content: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop', caption: 'Visualizing agent node intersections.' }
    ]
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
      description: "We deconstruct complex digital challenges into high-performance architectural pillars. Our approach translates exploratory innovation into resilient, enterprise-grade systems."
    },
    framework: {
      title: "Applied Technical Rigor",
      description: "Our methodology prioritizes long-term resilience over immediate convenience. We build systems that are designed to evolve with the rapid pace of AI and data science.",
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
    detailedBio: "Sangeeth Liyanarachchi is a visionary technology leader specializing in complex digital architectures and AI-driven transformation. With a career spanning nearly two decades, he has architected systems for global enterprises and led multidisciplinary research teams in the UK and European sectors.",
    credentials: [
      { title: "MSc Project Management", subtitle: "Strategic Implementation" }
    ],
    focus: ["AI Strategy", "Product Vision", "Digital Architecture", "Strategic Innovation"]
  },
  about: {
    hero: {
      title: "Pioneering Knowledge Led Innovation",
      description: "ITNEXT is a dedicated platform for strategic research and the practical application of emerging technologies in the enterprise landscape."
    },
    pillars: [
      { id: '1', title: "Our Mission & Vision", desc: "Bridging the gap between academic research and industrial application.", details: ["Academic-Industry Bridge", "Data-Informed Paths", "Resilience Focus"] },
      { id: '2', title: "Non-Commercial Core", desc: "Providing the strategic clarity leaders need without commercial noise.", details: ["Objective Strategy", "Intellectual Freedom", "Exploratory Focus"] },
      { id: '3', title: "Responsible Innovation", desc: "A commitment to ethics and transparency in AI standards.", details: ["Ethical AI Advocacy", "Transparency First", "Safety Alignment"] }
    ],
    alignment: {
      title: "Responsible Digital Growth",
      description: "Our approach to innovation is rooted in the UK's digital and AI growth strategy, focusing on sustainable systems."
    },
    alignmentItems: [
      { title: "Continuous Learning", desc: "Fostering a culture where emerging research is constantly integrated into our strategic frameworks." },
      { title: "Applied Frameworks", desc: "Developing methodologies that ensure digital transformation is both cutting-edge and industrially stable." },
      { title: "Global Exchange", desc: "Collaborating across UK and European sectors to share insights on digital operating models." }
    ],
    visionQuote: "ITNEXT operates as an intellectual engine, decoupling innovation from commercial noise to provide the strategic clarity leaders need."
  },
  research: {
    hero: {
      title: "The Innovation Platform",
      description: "ITNEXT functions as a non-commercial experimentation environment where we deconstruct emerging technologies into actionable industrial frameworks."
    },
    pillars: [
      { id: 'poc', title: "Proof-of-Concept Design", desc: "Rapid prototyping of experimental models to test technological viability.", details: ["Viability Testing", "Rapid Prototyping", "Risk Mitigation"] },
      { id: 'framework', title: "Framework Development", desc: "Codifying research into high-performance architectural patterns.", details: ["Architectural Patterns", "Standardization", "Scalability Research"] },
      { id: 'innovation', title: "Innovation Models", desc: "Developing long-term operating models for organizations.", details: ["Change Absorption", "Stability Engineering", "Future-Proofing"] }
    ],
    ethics: {
      title: "Responsible Experimentation",
      description: "Our research prioritizes 'Responsible AI' and sustainable digital systems."
    },
    ethicsItems: [
      { title: "Algorithmic Transparency", desc: "Every model we test is deconstructed to ensure decision-making logic is clear and auditable." },
      { title: "Empirical Testing", desc: "Moving beyond theoretical hype into data-backed validation of performance and security." },
      { title: "Safety Alignment", desc: "Ensuring that intelligent automation remains aligned with human values and safety protocols." }
    ],
    methodologyQuote: "The goal of ITNEXT Research is not to deliver a product, but to deliver the wisdom and the framework required for an organization to build its own future."
  },
  contact: {
    hero: {
      title: "Connect With ITNEXT",
      description: "We look forward to starting a strategic conversation about your digital innovation journey and research requirements."
    },
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

interface GlobalContextType {
  content: SiteContent;
  isLoading: boolean;
  error: string | null;
  updateContent: (newContent: Partial<SiteContent>) => Promise<void>;
  upsertPost: (post: InsightPost) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  resetToDefaults: () => void;
  refreshContent: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Helper: normalise a MongoDB insight document to the frontend InsightPost shape
function normaliseInsight(doc: any): InsightPost {
  return {
    ...doc,
    id: doc._id || doc.id,
    date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''),
    body: (doc.body || []).map((block: any, i: number) => ({
      ...block,
      id: block._id || block.id || `block-${i}`,
    })),
  };
}

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    // Start with localStorage / defaults while the API call is in-flight
    const saved = localStorage.getItem('itnext_content');
    if (saved) {
      try {
        const parsedContent = JSON.parse(saved);
        return {
          ...DEFAULT_CONTENT,
          ...parsedContent,
          hero: { ...DEFAULT_CONTENT.hero, ...parsedContent.hero },
          overview: { ...DEFAULT_CONTENT.overview, ...parsedContent.overview },
          homeCTA: parsedContent.homeCTA || DEFAULT_CONTENT.homeCTA,
          focusAreasPage: parsedContent.focusAreasPage ? {
            hero: { ...DEFAULT_CONTENT.focusAreasPage.hero, ...parsedContent.focusAreasPage.hero },
            framework: { ...DEFAULT_CONTENT.focusAreasPage.framework, ...parsedContent.focusAreasPage.framework }
          } : DEFAULT_CONTENT.focusAreasPage,
          blogPage: parsedContent.blogPage ? {
            hero: { ...DEFAULT_CONTENT.blogPage.hero, ...parsedContent.blogPage.hero },
            newsletter: { ...DEFAULT_CONTENT.blogPage.newsletter, ...parsedContent.blogPage.newsletter },
            stats: parsedContent.blogPage.stats || DEFAULT_CONTENT.blogPage.stats
          } : DEFAULT_CONTENT.blogPage,
          founder: { ...DEFAULT_CONTENT.founder, ...parsedContent.founder },
          about: { ...DEFAULT_CONTENT.about, ...parsedContent.about },
          research: { ...DEFAULT_CONTENT.research, ...parsedContent.research },
          contact: { ...DEFAULT_CONTENT.contact, ...parsedContent.contact },
        };
      } catch (e) {
        return DEFAULT_CONTENT;
      }
    }
    return DEFAULT_CONTENT;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch everything from backend on mount ─────────────────────────────

  const refreshContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch site content + insights in parallel
      const [contentRes, insightsRes] = await Promise.all([
        contentApi.get(),
        insightsApi.getAll().catch(() => ({ data: { insights: [] } })),
      ]);

      const backendContent = contentRes.data?.content || {};
      const backendInsights: InsightPost[] = (insightsRes.data?.insights || []).map(normaliseInsight);

      const merged: SiteContent = {
        ...DEFAULT_CONTENT,
        ...backendContent,
        hero: { ...DEFAULT_CONTENT.hero, ...(backendContent.hero || {}) },
        overview: { ...DEFAULT_CONTENT.overview, ...(backendContent.overview || {}) },
        homeCTA: backendContent.homeCTA || DEFAULT_CONTENT.homeCTA,
        focusAreasPage: backendContent.focusAreasPage ? {
          hero: { ...DEFAULT_CONTENT.focusAreasPage.hero, ...(backendContent.focusAreasPage.hero || {}) },
          framework: { ...DEFAULT_CONTENT.focusAreasPage.framework, ...(backendContent.focusAreasPage.framework || {}) }
        } : DEFAULT_CONTENT.focusAreasPage,
        blogPage: backendContent.blogPage ? {
          hero: { ...DEFAULT_CONTENT.blogPage.hero, ...(backendContent.blogPage.hero || {}) },
          newsletter: { ...DEFAULT_CONTENT.blogPage.newsletter, ...(backendContent.blogPage.newsletter || {}) },
          stats: backendContent.blogPage.stats || DEFAULT_CONTENT.blogPage.stats
        } : DEFAULT_CONTENT.blogPage,
        founder: { ...DEFAULT_CONTENT.founder, ...(backendContent.founder || {}) },
        about: { ...DEFAULT_CONTENT.about, ...(backendContent.about || {}) },
        research: { ...DEFAULT_CONTENT.research, ...(backendContent.research || {}) },
        contact: { ...DEFAULT_CONTENT.contact, ...(backendContent.contact || {}) },
        focusAreas: backendContent.focusAreas?.length ? backendContent.focusAreas : DEFAULT_CONTENT.focusAreas,
        products: backendContent.products?.length ? backendContent.products : DEFAULT_CONTENT.products,
        insights: backendInsights.length ? backendInsights : DEFAULT_CONTENT.insights,
      };

      setContent(merged);
      localStorage.setItem('itnext_content', JSON.stringify(merged));
    } catch (err: any) {
      console.warn('Backend unreachable — using local/default data:', err.message);
      setError('Backend unreachable — showing cached data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  // ── Persist helper ─────────────────────────────────────────────────────

  const persistToLocalStorage = (updated: SiteContent) => {
    localStorage.setItem('itnext_content', JSON.stringify(updated));
  };

  // ── Update site content (calls backend, then updates local state) ──────

  const updateContent = async (updates: Partial<SiteContent>) => {
    const prev = content;
    const next = { ...prev, ...updates };
    setContent(next);
    persistToLocalStorage(next);

    try {
      await contentApi.update(updates);
    } catch (err: any) {
      console.error('Failed to save to backend:', err.message);
    }
  };

  // ── Upsert insight post ───────────────────────────────────────────────

  const isMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);

  const upsertPost = async (post: InsightPost) => {
    const prev = content;
    const tempId = post.id; // may be a client-side timestamp id
    const existsInBackend = isMongoId(tempId);

    // Optimistic local update
    const existsLocally = prev.insights.find(p => p.id === tempId);
    const updatedInsights = existsLocally
      ? prev.insights.map(p => p.id === tempId ? post : p)
      : [post, ...prev.insights];
    const next = { ...prev, insights: updatedInsights };
    setContent(next);
    persistToLocalStorage(next);

    try {
      if (existsInBackend) {
        // Real MongoDB document — update in place
        const res = await insightsApi.update(tempId, post);
        const savedPost = normaliseInsight(res.data?.insight || post);
        setContent(c => ({
          ...c,
          insights: c.insights.map(p => p.id === tempId ? savedPost : p)
        }));
      } else {
        // New post (client-side id) — always create
        const res = await insightsApi.create(post);
        const savedPost = normaliseInsight(res.data?.insight || post);
        // Replace the temp-id entry with the real MongoDB entry
        setContent(c => ({
          ...c,
          insights: c.insights.map(p => p.id === tempId ? savedPost : p)
        }));
      }
    } catch (err: any) {
      console.error('Failed to save insight to backend:', err.message);
    }
  };

  // ── Delete insight post ───────────────────────────────────────────────

  const deletePost = async (id: string) => {
    const prev = content;
    const next = { ...prev, insights: prev.insights.filter(p => p.id !== id) };
    setContent(next);
    persistToLocalStorage(next);

    try {
      if (isMongoId(id)) {
        await insightsApi.delete(id);
      }
    } catch (err: any) {
      console.error('Failed to delete insight from backend:', err.message);
    }
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT);
  };

  return (
    <GlobalContext.Provider value={{ content, isLoading, error, updateContent, upsertPost, deletePost, resetToDefaults, refreshContent }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobalContext must be used within GlobalProvider');
  return context;
};
