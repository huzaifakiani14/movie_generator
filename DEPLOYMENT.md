# 🚀 Deployment Guide - 24/7 Movie Generator

This guide will help you deploy your Movie Generator app to run 24/7 without needing your local backend server.

## 🌟 Recommended: Render (Free & Reliable)

### Step 1: Sign up for Render
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect repository: `huzaifakiani14/movie_generator`
3. Configure:
   - **Name**: `movie-generator-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Step 3: Set Environment Variables
Add these environment variables in Render dashboard:
- **TMDB_API_KEY**: `9a285bb9c2df50399087dbe038fedeca`
- **NODE_ENV**: `production`

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Copy your service URL (e.g., `https://movie-generator-backend.onrender.com`)

### Step 5: Update Frontend
1. Open `script.js`
2. Update the `API_BASE_URL` with your deployed URL:
   ```javascript
   const API_BASE_URL = 'https://your-app-name.onrender.com/api';
   ```
3. Commit and push changes

## 🔄 Alternative: Heroku

### Step 1: Install Heroku CLI
```bash
# macOS
brew install heroku/brew/heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Deploy to Heroku
```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create movie-generator-backend

# Set environment variables
heroku config:set TMDB_API_KEY=9a285bb9c2df50399087dbe038fedeca
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Step 3: Update Frontend
Update `API_BASE_URL` in `script.js` with your Heroku URL.

## ✅ After Deployment

### Test Your Deployed Backend
```bash
# Replace with your actual deployed URL
curl https://your-app-name.onrender.com/api/health
curl https://your-app-name.onrender.com/api/genres
```

### Update Frontend URL
1. **Get your deployed URL** from Render/Heroku dashboard
2. **Update `script.js`**:
   ```javascript
   const API_BASE_URL = 'https://your-actual-url.com/api';
   ```
3. **Commit and push**:
   ```bash
   git add script.js
   git commit -m "Update frontend to use deployed backend"
   git push origin main
   ```

## 🎯 Benefits of Deployment

- ✅ **24/7 Availability**: App works even when your computer is off
- ✅ **No Local Setup**: Users don't need to run backend locally
- ✅ **Professional**: Real URL instead of localhost
- ✅ **Scalable**: Can handle multiple users simultaneously
- ✅ **Secure**: API key safely stored in cloud environment variables

## 🔧 Troubleshooting

### Common Issues:

1. **"Failed to load genres" error**
   - Check if your deployed backend is running
   - Verify environment variables are set correctly
   - Check the deployment logs

2. **CORS errors**
   - Make sure CORS is enabled in your backend (it is)
   - Check if you're using the correct deployed URL

3. **Slow loading**
   - Free tiers have cold starts
   - First request might take 10-30 seconds
   - Subsequent requests are fast

### Check Deployment Status:
- **Render**: Go to your service dashboard
- **Heroku**: Run `heroku logs --tail`

## 📱 Final Result

After deployment, your app will:
- ✅ Work 24/7 without your local server
- ✅ Be accessible from anywhere
- ✅ Handle multiple users
- ✅ Keep your API key secure
- ✅ Scale automatically

Your Movie Generator will be live at your deployed URL! 🎬✨
