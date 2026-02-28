const mongoose = require('mongoose');
const InsightPost = require('../models/InsightPost.model');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && /^[a-f\d]{24}$/i.test(id);

// @desc    Get all insights (published only for public)
// @route   GET /api/insights
// @access  Public
exports.getAllInsights = async (req, res, next) => {
  try {
    const { status, category, search, featured, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    // Public users only see published posts
    if (!req.user) {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const insights = await InsightPost.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await InsightPost.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        insights,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single insight by slug
// @route   GET /api/insights/:slug
// @access  Public
exports.getInsightBySlug = async (req, res, next) => {
  try {
    const insight = await InsightPost.findOne({ slug: req.params.slug });

    if (!insight) {
      return res.status(404).json({
        status: 'error',
        message: 'Insight not found'
      });
    }

    // Increment view count
    insight.views += 1;
    await insight.save();

    res.status(200).json({
      status: 'success',
      data: { insight }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new insight
// @route   POST /api/insights
// @access  Private
exports.createInsight = async (req, res, next) => {
  try {
    const insight = await InsightPost.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { insight }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update insight
// @route   PUT /api/insights/:id
// @access  Private
exports.updateInsight = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ status: 'error', message: 'Invalid insight ID format' });
    }

    const insight = await InsightPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!insight) {
      return res.status(404).json({
        status: 'error',
        message: 'Insight not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { insight }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete insight
// @route   DELETE /api/insights/:id
// @access  Private/Admin
exports.deleteInsight = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ status: 'error', message: 'Invalid insight ID format' });
    }

    const insight = await InsightPost.findByIdAndDelete(req.params.id);

    if (!insight) {
      return res.status(404).json({
        status: 'error',
        message: 'Insight not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Insight deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like insight
// @route   POST /api/insights/:id/like
// @access  Public
exports.likeInsight = async (req, res, next) => {
  try {
    const insight = await InsightPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!insight) {
      return res.status(404).json({
        status: 'error',
        message: 'Insight not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { likes: insight.likes }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Share insight (increment counter)
// @route   POST /api/insights/:id/share
// @access  Public
exports.shareInsight = async (req, res, next) => {
  try {
    const insight = await InsightPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { shares: 1 } },
      { new: true }
    );

    if (!insight) {
      return res.status(404).json({
        status: 'error',
        message: 'Insight not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { shares: insight.shares }
    });
  } catch (error) {
    next(error);
  }
};
