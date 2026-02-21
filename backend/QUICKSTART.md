# ITNEXT Backend - Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
copy .env.example .env
```

Edit `.env` file:
- **MongoDB**: Use `mongodb://localhost:27017/itnext` for local OR get Atlas connection string
- **JWT_SECRET**: Use any strong random string (e.g., `openssl rand -base64 32`)
- **Cloudinary**: Sign up at https://cloudinary.com and get credentials from dashboard

### 3. Setup MongoDB

**Option A - MongoDB Atlas (Cloud - Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster...`)
4. Add to `.env` as `MONGODB_URI`

**Option B - Local MongoDB:**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB: `mongod`
3. Use `mongodb://localhost:27017/itnext` in `.env`

### 4. Setup Cloudinary (Free)
1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add to `.env`

### 5. Create Admin User
```bash
node utils/seed.js
```

### 6. Start Server
```bash
npm run dev
```

Server starts at: `http://localhost:5000`

### 7. Test API
Visit: `http://localhost:5000/api/health`

Should return:
```json
{
  "status": "success",
  "message": "ITNEXT API is running"
}
```

### 8. Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@itnext.uk",
  "password": "changethispassword123"
}
```

## Common Issues

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: Check IP whitelist (allow 0.0.0.0/0 for development)

**Cloudinary Upload Fails:**
- Verify credentials in `.env`
- Check Cloudinary dashboard for errors

**Port 5000 in use:**
- Change `PORT=5000` to another port in `.env`

## Next Steps

1. **Change Admin Password** (Important!)
2. Connect frontend to backend API
3. Test file uploads
4. Create content via API

## API Testing with Postman

Import this collection:
- Base URL: `http://localhost:5000/api`
- Add Bearer token to Authorization header after login

---

Need help? Check `README.md` for full documentation.
