const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  resetAdminPassword,
  deleteAdmin
} = require('../controllers/admin.controller');

// All routes require authentication + admin role
router.use(protect, adminOnly);

router.get('/admins', getAllAdmins);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.put('/admins/:id/reset-password', resetAdminPassword);
router.delete('/admins/:id', deleteAdmin);

module.exports = router;
