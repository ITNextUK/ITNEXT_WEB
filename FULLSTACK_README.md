# ITNEXT Platform - Full Stack Setup

This project consists of a React frontend and Node.js/Express backend with MongoDB and Cloudinary.

## 🏗️ Architecture

```
ITNEXT_WEB/
├── frontend/              # React + Vite + TypeScript
│   ├── components/
│   ├── pages/
│   └── ...
└── backend/               # Node.js + Express + MongoDB
    ├── models/
    ├── routes/
    ├── controllers/
    └── ...
```

## 🚀 Quick Start

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Runs on http://localhost:3000
```

### Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Setup environment (see backend/.env.example)
copy .env.example .env
# Edit .env with your credentials

# Create admin user
node utils/seed.js

# Run server
npm run dev
# Runs on http://localhost:5000
```

## 📋 Prerequisites

- **Node.js** v16+
- **MongoDB** (local or Atlas)
- **Cloudinary Account** (free tier)

## 🔧 Configuration

### Frontend Environment (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend Environment (backend/.env)
See `backend/.env.example` for full configuration.

Key requirements:
- MongoDB connection string
- Cloudinary credentials
- JWT secret

## 📚 Documentation

- **Backend API**: See `backend/README.md`
- **Quick Start**: See `backend/QUICKSTART.md`

## 🔐 Default Credentials

**Admin Login:**
- Email: `admin@itnext.uk`
- Password: `changethispassword123`

⚠️ **Change these immediately after first login!**

## 🌐 API Endpoints

Backend API available at: `http://localhost:5000/api`

- `/api/auth/*` - Authentication
- `/api/content/*` - Content management
- `/api/insights/*` - Blog posts
- `/api/upload/*` - File uploads

## 📦 Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- React Router
- TailwindCSS
- Lucide Icons

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (file storage)

## 🛠️ Development

Run both servers concurrently:

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```

## 📝 Notes

- Frontend uses localStorage for development
- Backend API provides persistent storage
- Cloudinary handles all media files
- MongoDB stores all content and posts

---

**ITNEXT - Digital Innovation & Research Platform**
