const mongoose = require('mongoose');
require('dotenv').config();
const seedAdmin = require('./seedAdmin');
const SiteContent = require('../models/SiteContent.model');
const InsightPost = require('../models/InsightPost.model');

const DEFAULT_CONTENT = {
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
  focusAreas: [
    {
      id: 'data-products',
      title: 'Data-Driven Digital Products',
      description: 'Developing intelligent product frameworks that leverage data as a primary asset.',
      icon: 'chart-bar',
      details: ['Analytics-led platforms', 'Decision-support systems', 'Data-informed product design frameworks']
    },
    {
      id: 'ai-automation',
      title: 'AI Automation & Intelligent Systems',
      description: 'Researching and architecting autonomous workflows and intelligent agent models.',
      icon: 'cpu-chip',
      details: ['AI-enabled workflows', 'Intelligent automation models', 'Applied research and conceptual frameworks']
    },
    {
      id: 'cloud-cyber',
      title: 'Cloud Architecture & Cybersecurity',
      description: 'Engineering resilient, scalable, and risk-aware digital foundations.',
      icon: 'shield-check',
      details: ['Secure, scalable infrastructure design', 'Cloud-native thinking', 'Risk-aware architectural research']
    },
    {
      id: 'transformation',
      title: 'Digital Transformation Advisory',
      description: 'Guiding organizational change through strategic technological alignment.',
      icon: 'arrows-right-left',
      details: ['Technology-led organizational change', 'Strategy alignment', 'Operating model transformation']
    }
  ],
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
  founder: {
    name: "Sangeeth Liyanarachchi",
    bio: "Technology Founder and Digital Innovation Leader with 18+ years of enterprise expertise.",
    quote: "At ITNEXT, we focus on the fundamental architecture of innovation.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    linkedin: "https://www.linkedin.com/in/sangeeth-liyanarachchi-8886b7134",
    email: "Sangeeth@itnext.uk",
    mobile: "+447424436454",
    detailedBio: "Sangeeth Liyanarachchi is a visionary technology leader specializing in complex digital architectures and AI-driven transformation. With a career spanning nearly two decades, he has architected systems for global enterprises and led multidisciplinary research teams in the UK and European sectors.",
    credentials: [{ title: "MSc Project Management", subtitle: "Strategic Implementation" }],
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

const DEFAULT_INSIGHTS = [
  {
    slug: 'optimizing-multi-agent-systems',
    title: 'Optimizing Multi-Agent Systems for Complex Supply Chain Logistics',
    subtitle: 'The shift from linear automation to agentic intelligence.',
    category: 'AI Automation & Intelligent Systems',
    excerpt: 'A research deep-dive into the orchestration of specialized AI agents to handle non-deterministic variables in global supply chains.',
    author: 'Sangeeth Liyanarachchi',
    authorRole: 'Founder & Strategy Lead',
    readingTime: '14 min read',
    tags: ['Multi-Agent Systems', 'Autonomous Logistics', 'Intelligent Agents'],
    featureImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    status: 'published',
    views: 1240,
    likes: 85,
    shares: 0,
    body: [
      { type: 'heading', content: 'The Agentic Paradigm' },
      { type: 'text', content: 'In modern supply chains, the complexity of variables often exceeds the capacity of traditional, deterministic automation.' },
      { type: 'quote', content: 'True innovation in logistics is not about faster transport, but smarter decision-making at every node.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop', caption: 'Visualizing agent node intersections.' }
    ]
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Seed admin user
    await seedAdmin();

    // Seed site content
    const existingContent = await SiteContent.findOne();
    if (!existingContent) {
      await SiteContent.create(DEFAULT_CONTENT);
      console.log('✅ Default site content seeded');
    } else {
      console.log('ℹ️  Site content already exists — skipping');
    }

    // Seed insight posts
    const existingInsights = await InsightPost.countDocuments();
    if (existingInsights === 0) {
      await InsightPost.insertMany(DEFAULT_INSIGHTS);
      console.log('✅ Default insight posts seeded');
    } else {
      console.log('ℹ️  Insight posts already exist — skipping');
    }

    console.log('🎉 Seed complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

connectDB();
