
export interface NavItem {
  label: string;
  path: string;
}

export interface FocusArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface ResearchProduct {
  id: string;
  name: string;
  description: string;
  researchCategoryId: 'poc' | 'framework' | 'innovation';
  targetMarket: string;
  url: string;
}

export type ContentBlockType = 'text' | 'heading' | 'image' | 'code' | 'quote' | 'video' | 'callout' | 'list' | 'table';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  caption?: string;
  language?: string; // For code blocks
  items?: string[]; // For lists
  rows?: string[][]; // For tables
}

export interface InsightPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  lastUpdated?: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  readingTime: string;
  tags: string[];
  featureImage: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured?: boolean;
  body: ContentBlock[];
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  views: number;
  likes: number;
  shares: number;
}

export interface PageSection {
  title: string;
  subtitle?: string;
  description?: string;
}

export interface PillarItem {
  id: string;
  title: string;
  desc: string;
  details: string[];
}

export interface ListEntry {
  title: string;
  desc: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  overview: {
    title: string;
    text1: string;
    text2: string;
    statValue: string;
    statLabel: string;
  };
  focusAreas: FocusArea[];
  products: ResearchProduct[];
  insights: InsightPost[];
  founder: {
    name: string;
    bio: string;
    quote: string;
    image: string;
    linkedin: string;
    email: string;
    mobile: string;
    detailedBio: string;
    credentials: { title: string; subtitle: string }[];
    focus: string[];
  };
  about: {
    hero: PageSection;
    pillars: PillarItem[];
    alignment: PageSection;
    alignmentItems: ListEntry[];
    visionQuote: string;
  };
  research: {
    hero: PageSection;
    pillars: PillarItem[];
    ethics: PageSection;
    ethicsItems: ListEntry[];
    methodologyQuote: string;
  };
  contact: {
    hero: PageSection;
    channels: PillarItem[];
    mandate: PageSection;
    mandateQuote: string;
    mandateItems: ListEntry[];
  };
}
