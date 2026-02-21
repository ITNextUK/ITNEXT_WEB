const SiteContent = require('../models/SiteContent.model');

// @desc    Get all site content
// @route   GET /api/content
// @access  Public
exports.getContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne();
    
    // If no content exists, create default
    if (!content) {
      content = await SiteContent.create({
        hero: {
          title: "Data-Driven Digital Systems & AI Transformation.",
          subtitle: "Strategic research, intelligent systems design, and expert transformation advisory.",
          ctaPrimary: "Explore Focus Areas",
          ctaSecondary: "Connect With ITNEXT"
        },
        overview: {
          title: "Knowledge-Led Innovation",
          text1: "ITNEXT operates at the intersection of industry expertise and academic rigor.",
          text2: "Our mission is to help organizations navigate the complex landscape of AI.",
          statValue: "18+",
          statLabel: "Years Experience"
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: { content }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site content
// @route   PUT /api/content
// @access  Private
exports.updateContent = async (req, res, next) => {
  try {
    const updates = req.body;

    let content = await SiteContent.findOne();
    
    if (!content) {
      content = await SiteContent.create(updates);
    } else {
      // Deep merge updates
      Object.keys(updates).forEach(key => {
        if (typeof updates[key] === 'object' && !Array.isArray(updates[key])) {
          content[key] = { ...content[key], ...updates[key] };
        } else {
          content[key] = updates[key];
        }
      });
      await content.save();
    }

    res.status(200).json({
      status: 'success',
      data: { content }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update specific section
// @route   PUT /api/content/:section
// @access  Private
exports.updateSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const updates = req.body;

    const content = await SiteContent.findOne();
    
    if (!content) {
      return res.status(404).json({
        status: 'error',
        message: 'Content not found'
      });
    }

    if (!content[section]) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid section name'
      });
    }

    content[section] = updates;
    await content.save();

    res.status(200).json({
      status: 'success',
      data: { content }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset content to defaults
// @route   POST /api/content/reset
// @access  Private/Admin
exports.resetContent = async (req, res, next) => {
  try {
    await SiteContent.deleteMany({});
    
    const content = await SiteContent.create({
      hero: {
        title: "Data-Driven Digital Systems & AI Transformation.",
        subtitle: "Strategic research, intelligent systems design, and expert transformation advisory.",
        ctaPrimary: "Explore Focus Areas",
        ctaSecondary: "Connect With ITNEXT"
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Content reset to defaults',
      data: { content }
    });
  } catch (error) {
    next(error);
  }
};
