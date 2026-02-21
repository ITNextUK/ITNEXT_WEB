const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    title: String,
    subtitle: String,
    ctaPrimary: String,
    ctaSecondary: String
  },

  // Overview Section
  overview: {
    title: String,
    text1: String,
    text2: String,
    statValue: String,
    statLabel: String
  },

  // Focus Areas
  focusAreas: [{
    id: String,
    title: String,
    description: String,
    icon: String,
    details: [String]
  }],

  // Research Products
  products: [{
    id: String,
    name: String,
    description: String,
    researchCategoryId: {
      type: String,
      enum: ['poc', 'framework', 'innovation']
    },
    targetMarket: String,
    url: String
  }],

  // Founder Information
  founder: {
    name: String,
    bio: String,
    quote: String,
    image: String,
    linkedin: String,
    email: String,
    mobile: String,
    detailedBio: String,
    credentials: [{
      title: String,
      subtitle: String
    }],
    focus: [String]
  },

  // About Page Content
  about: {
    hero: {
      title: String,
      description: String
    },
    pillars: [{
      id: String,
      title: String,
      desc: String,
      details: [String]
    }],
    alignment: {
      title: String,
      description: String
    },
    alignmentItems: [{
      title: String,
      desc: String
    }],
    visionQuote: String
  },

  // Research Page Content
  research: {
    hero: {
      title: String,
      description: String
    },
    pillars: [{
      id: String,
      title: String,
      desc: String,
      details: [String]
    }],
    ethics: {
      title: String,
      description: String
    },
    ethicsItems: [{
      title: String,
      desc: String
    }],
    methodologyQuote: String
  },

  // Contact Page Content
  contact: {
    hero: {
      title: String,
      description: String
    },
    channels: [{
      id: String,
      title: String,
      desc: String,
      details: [String]
    }],
    mandate: {
      title: String
    },
    mandateQuote: String,
    mandateItems: [{
      title: String,
      desc: String
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteContent', siteContentSchema);
