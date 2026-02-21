const { uploadImage, uploadFile, deleteFromCloudinary } = require('../config/cloudinary.config');

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private
exports.uploadImage = (req, res, next) => {
  const upload = uploadImage.single('image');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname
      }
    });
  });
};

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private
exports.uploadImages = (req, res, next) => {
  const upload = uploadImage.array('images', 10);
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No files uploaded'
      });
    }

    const files = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname
    }));

    res.status(200).json({
      status: 'success',
      data: { files }
    });
  });
};

// @desc    Upload file (PDF, DOC, etc.)
// @route   POST /api/upload/file
// @access  Private
exports.uploadFile = (req, res, next) => {
  const upload = uploadFile.single('file');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname
      }
    });
  });
};

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
exports.deleteFile = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    const { resourceType } = req.query; // 'image' or 'raw'

    await deleteFromCloudinary(publicId, resourceType || 'image');

    res.status(200).json({
      status: 'success',
      message: 'File deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
