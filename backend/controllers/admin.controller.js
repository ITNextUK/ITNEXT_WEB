const crypto = require('crypto');
const User = require('../models/User.model');

// Generate a secure random password (12 characters)
function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  const bytes = crypto.randomBytes(12);
  for (let i = 0; i < 12; i++) {
    password += chars[bytes[i] % chars.length];
  }
  return password;
}

// @desc    Get all admin users
// @route   GET /api/admin/admins
// @access  Private/Admin
exports.getAllAdmins = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const admins = await User.find({ role: 'admin' })
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ role: 'admin' });

    res.status(200).json({
      status: 'success',
      data: {
        admins,
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new admin user with system-generated password
// @route   POST /api/admin/admins
// @access  Private/Admin
exports.createAdmin = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'A user with this email already exists'
      });
    }

    // Generate system password
    const plainPassword = generatePassword();

    const user = await User.create({
      name,
      email,
      password: plainPassword,
      role: 'admin',
      mustChangePassword: true
    });

    res.status(201).json({
      status: 'success',
      message: 'Admin created successfully',
      data: {
        admin: user.toJSON(),
        generatedPassword: plainPassword // Returned ONCE for the creator to share
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an admin user's details
// @route   PUT /api/admin/admins/:id
// @access  Private/Admin
exports.updateAdmin = async (req, res, next) => {
  try {
    const { name, email, isActive } = req.body;
    const admin = await User.findById(req.params.id);

    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({
        status: 'error',
        message: 'Admin user not found'
      });
    }

    // Prevent deactivating yourself
    if (req.user.id === req.params.id && isActive === false) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot deactivate your own account'
      });
    }

    if (name !== undefined) admin.name = name;
    if (email !== undefined) admin.email = email;
    if (isActive !== undefined) admin.isActive = isActive;

    await admin.save();

    res.status(200).json({
      status: 'success',
      message: 'Admin updated successfully',
      data: { admin: admin.toJSON() }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset an admin's password (system-generated)
// @route   PUT /api/admin/admins/:id/reset-password
// @access  Private/Admin
exports.resetAdminPassword = async (req, res, next) => {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({
        status: 'error',
        message: 'Admin user not found'
      });
    }

    // Generate new password
    const plainPassword = generatePassword();
    admin.password = plainPassword;
    admin.mustChangePassword = true;
    await admin.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully',
      data: {
        generatedPassword: plainPassword // Returned ONCE
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an admin user
// @route   DELETE /api/admin/admins/:id
// @access  Private/Admin
exports.deleteAdmin = async (req, res, next) => {
  try {
    // Cannot delete yourself
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot delete your own account'
      });
    }

    const admin = await User.findById(req.params.id);

    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({
        status: 'error',
        message: 'Admin user not found'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
