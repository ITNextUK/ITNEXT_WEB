const User = require('../models/User.model');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (adminExists) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@itnext.uk',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'ITNEXT Admin',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log('Email:', admin.email);
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

module.exports = seedAdmin;
