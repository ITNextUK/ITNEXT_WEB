
import { NavItem, FocusArea, InsightPost } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Focus Areas', path: '/focus-areas' },
  { label: 'Research', path: '/research' },
  { label: 'Insights', path: '/insights' },
  { label: 'Founder', path: '/founder' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
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

export const RECENT_INSIGHTS: InsightPost[] = [
  {
    id: '1',
    title: 'The Future of AI-Driven Governance in Enterprise Systems',
    category: 'Research Note',
    date: 'March 2024',
    author: 'Sangeeth Liyanarachchi',
    excerpt: 'Exploring the intersection of autonomous agents and corporate accountability frameworks in high-scale digital ecosystems.'
  },
  {
    id: '2',
    title: 'Data Sovereignty: Navigating the EU Digital Landscape',
    category: 'Strategy',
    date: 'February 2024',
    author: 'ITNEXT Research Lab',
    excerpt: 'Strategic implications of emerging data regulations for multi-national digital products and decentralized storage architectures.'
  }
];