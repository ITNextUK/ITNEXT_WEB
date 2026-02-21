const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage configuration for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'itnext/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    transformation: [{ width: 2000, height: 2000, crop: 'limit', quality: 'auto' }]
  }
});

// Storage configuration for documents/files
const fileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'itnext/files',
    allowed_formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
    resource_type: 'raw'
  }
});

// Multer upload middleware
const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const uploadFile = multer({
  storage: fileStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Helper function to delete from cloudinary
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Helper function to get optimized URL
const getOptimizedUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...options
  });
};

module.exports = {
  cloudinary,
  uploadImage,
  uploadFile,
  deleteFromCloudinary,
  getOptimizedUrl
};
