
import { NavItem, FocusArea, InsightPost } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Focus Areas', path: '/focus-areas' },
  { label: 'Research', path: '/research' },
  { label: 'Blog', path: '/blog' },
  { label: 'Founder', path: '/founder' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Admin', path: '/admin' },
];

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'data-products',
    title: 'Data-Driven Digital Products',
    description: 'Developing intelligent product frameworks that leverage data as a primary asset.',
    icon: 'chart-bar',
    details: [
      'Analytics-led platforms',
      'Decision-support systems',
      'Data-informed product design frameworks'
    ]
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Intelligent Systems',
    description: 'Researching and architecting autonomous workflows and intelligent agent models.',
    icon: 'cpu-chip',
    details: [
      'AI-enabled workflows',
      'Intelligent automation models',
      'Applied research and conceptual frameworks'
    ]
  },
  {
    id: 'cloud-cyber',
    title: 'Cloud Architecture & Cybersecurity',
    description: 'Engineering resilient, scalable, and risk-aware digital foundations.',
    icon: 'shield-check',
    details: [
      'Secure, scalable infrastructure design',
      'Cloud-native thinking',
      'Risk-aware architectural research'
    ]
  },
  {
    id: 'transformation',
    title: 'Digital Transformation Advisory',
    description: 'Guiding organizational change through strategic technological alignment.',
    icon: 'arrows-right-left',
    details: [
      'Technology-led organizational change',
      'Strategy alignment',
      'Operating model transformation'
    ]
  }
];

// Added missing required properties (shares) to satisfy InsightPost type
export const RECENT_INSIGHTS: InsightPost[] = [
  {
    id: '1',
    slug: 'architecting-agentic-workflows',
    title: 'Architecting Agentic Workflows for Enterprise Scale',
    category: 'AI Automation & Intelligent Systems',
    date: 'March 2024',
    author: 'Sangeeth Liyanarachchi',
    excerpt: 'A deep dive into the transition from static automation to autonomous agentic systems within enterprise digital ecosystems.',
    readingTime: '10 min read',
    tags: ['AI', 'Workflows', 'Enterprise'],
    featureImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop',
    status: 'published',
    body: [],
    views: 0,
    likes: 0,
    shares: 0
  },
  {
    id: '2',
    slug: 'resilience-cloud-native-2024',
    title: 'The Resilience of Cloud-Native Infrastructure in 2024',
    category: 'Cloud Architecture & Cybersecurity',
    date: 'February 2024',
    author: 'ITNEXT Research Lab',
    excerpt: 'Evaluating the emerging threats to decentralized cloud structures and the architectural shift towards proactive defense models.',
    readingTime: '8 min read',
    tags: ['Cloud', 'Security', 'Infrastructure'],
    featureImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    status: 'published',
    body: [],
    views: 0,
    likes: 0,
    shares: 0
  }
];
