# ITNEXT Backend API

Backend server for ITNEXT Digital Innovation & Research Platform built with Node.js, Express, MongoDB, and Cloudinary.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **Cloudinary** integration for image and file uploads
- **JWT Authentication** for secure access
- **Role-based access control** (Admin/Editor)
- **Content Management** API
- **Blog/Insights** management
- **Rate limiting** and security headers

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (free tier available)

## 🛠️ Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`
   ```bash
   copy .env.example .env
   ```

4. **Configure Environment Variables:**

   Edit `.env` file with your credentials:

   **MongoDB:**
   - Local: `mongodb://localhost:27017/itnext`
   - Atlas: Get connection string from MongoDB Atlas

   **Cloudinary** (Sign up at https://cloudinary.com):
   - `CLOUDINARY_CLOUD_NAME`: Your cloud name
   - `CLOUDINARY_API_KEY`: Your API key
   - `CLOUDINARY_API_SECRET`: Your API secret

   **JWT Secret:**
   - Generate a strong random string for `JWT_SECRET`

   **Admin Credentials:**
   - Set initial admin email and password

5. **Seed Admin User:**
   ```bash
   node utils/seed.js
   ```

## 🚀 Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user (Admin only)
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password

### Content Management
- `GET /api/content` - Get all site content
- `PUT /api/content` - Update site content (Protected)
- `PUT /api/content/:section` - Update specific section (Protected)
- `POST /api/content/reset` - Reset to defaults (Admin only)

### Insights/Blog
- `GET /api/insights` - Get all insights (public: published only)
- `GET /api/insights/:slug` - Get single insight by slug
- `POST /api/insights` - Create insight (Protected)
- `PUT /api/insights/:id` - Update insight (Protected)
- `DELETE /api/insights/:id` - Delete insight (Admin only)
- `POST /api/insights/:id/like` - Like insight
- `POST /api/insights/:id/share` - Increment share count

### File Upload
- `POST /api/upload/image` - Upload single image (Protected)
- `POST /api/upload/images` - Upload multiple images (Protected)
- `POST /api/upload/file` - Upload file/document (Protected)
- `DELETE /api/upload/:publicId` - Delete file (Protected)

### Health Check
- `GET /api/health` - Check API status

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Login Example:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@itnext.uk",
    "password": "your-password"
  }'
```

## 📤 File Upload Examples

### Upload Single Image:

```bash
curl -X POST http://localhost:5000/api/upload/image \
  -H "Authorization: Bearer <your-token>" \
  -F "image=@/path/to/image.jpg"
```

### Upload Multiple Images:

```bash
curl -X POST http://localhost:5000/api/upload/images \
  -H "Authorization: Bearer <your-token>" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

## 📁 Project Structure

```
backend/
├── config/
│   └── cloudinary.config.js    # Cloudinary setup
├── controllers/
│   ├── auth.controller.js      # Authentication logic
│   ├── content.controller.js   # Content management
│   ├── insight.controller.js   # Blog/insights logic
│   └── upload.controller.js    # File upload handling
├── middleware/
│   └── auth.middleware.js      # JWT verification
├── models/
│   ├── User.model.js           # User schema
│   ├── SiteContent.model.js    # Site content schema
│   └── InsightPost.model.js    # Blog post schema
├── routes/
│   ├── auth.routes.js          # Auth routes
│   ├── content.routes.js       # Content routes
│   ├── insight.routes.js       # Insight routes
│   └── upload.routes.js        # Upload routes
├── utils/
│   ├── seed.js                 # Database seeding
│   └── seedAdmin.js            # Admin user creation
├── .env.example                # Environment variables template
├── server.js                   # Main server file
└── package.json                # Dependencies
```

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - Prevent abuse
- **CORS** - Configured for frontend
- **JWT** - Secure authentication
- **Password Hashing** - bcrypt
- **Input Validation** - express-validator

## 🌐 Cloudinary Setup

1. Sign up at https://cloudinary.com (free tier available)
2. Get your credentials from dashboard
3. Add to `.env` file
4. Images automatically optimized and delivered via CDN

**Free Tier Includes:**
- 25 GB storage
- 25 GB bandwidth/month
- Unlimited transformations

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# Run: mongod
```

### Option 2: MongoDB Atlas (Recommended)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`

## 📝 Notes

- Default admin credentials are set in `.env`
- **Change admin password immediately after first login!**
- Cloudinary free tier is sufficient for development
- JWT tokens expire after 7 days (configurable)
- Upload limits: 5MB for images, 10MB for files

## 🤝 Integration with Frontend

Update your frontend to connect to this API:

```javascript
const API_URL = 'http://localhost:5000/api';

// Example: Fetch content
const response = await fetch(`${API_URL}/content`);
const data = await response.json();
```

## 📧 Support

For issues or questions, contact: admin@itnext.uk

---

**ITNEXT Backend API v1.0.0**
