const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  uploadImage,
  uploadImages,
  uploadFile,
  deleteFile
} = require('../controllers/upload.controller');

// All upload routes are protected
router.post('/image', protect, uploadImage);
router.post('/images', protect, uploadImages);
router.post('/file', protect, uploadFile);
router.delete('/:publicId', protect, deleteFile);

module.exports = router;
