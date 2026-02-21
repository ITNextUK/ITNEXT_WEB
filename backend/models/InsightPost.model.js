const mongoose = require('mongoose');

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'heading', 'image', 'code', 'quote', 'video', 'callout', 'list', 'table'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  caption: String,
  language: String, // For code blocks
  items: [String], // For lists
  rows: [[String]] // For tables
}, { _id: true });

const insightPostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: String,
  category: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'ITNEXT Team'
  },
  authorRole: String,
  readingTime: String,
  tags: [String],
  featureImage: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  body: [contentBlockSchema],
  seoTitle: String,
  metaDescription: String,
  ogImage: String,
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  lastUpdated: Date
}, {
  timestamps: true
});

// Generate slug from title before saving
insightPostSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  if (this.isModified('body')) {
    this.lastUpdated = new Date();
  }
  next();
});

// Index for search and filtering
insightPostSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });
insightPostSchema.index({ status: 1, createdAt: -1 });
insightPostSchema.index({ category: 1 });

module.exports = mongoose.model('InsightPost', insightPostSchema);
