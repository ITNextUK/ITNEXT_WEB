const mongoose = require('mongoose');
require('dotenv').config();
const seedAdmin = require('./seedAdmin');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
    
    // Seed admin user
    await seedAdmin();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

connectDB();
