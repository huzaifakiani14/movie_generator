# 🎬 Movie Discovery Hub - Secure Version

A secure, full-featured movie discovery application that uses environment variables to protect API keys and follows security best practices. Deployed on **Render** for 24/7 availability.

## 🔒 Security Features

- ✅ **API key stored in environment variables** (never committed to Git)
- ✅ **Backend server** handles all API calls securely
- ✅ **CORS protection** for cross-origin requests
- ✅ **Error handling** with proper status codes
- ✅ **Health check endpoint** for monitoring
- ✅ **Deployed on Render** for secure cloud hosting

## 🚀 Features

- 🎬 **Discover random movies** by genre
- 🔍 **Search for specific movies** with instant results
- ❤️ **Save favorite movies** to your personal collection
- ❌ **Remove favorites** with one-click functionality
- 🎨 **Modern, responsive UI** with smooth animations
- 🔒 **Secure API key handling** via backend proxy
- 📊 **Real-time statistics** tracking
- 🌐 **24/7 availability** via Render deployment
- 🎭 **Movie emoji favicon** in browser tabs

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **API**: The Movie Database (TMDB)
- **Security**: Environment variables, dotenv
- **Deployment**: Render (free tier)
- **Dependencies**: axios, cors, express

## 🌐 Live Demo

**🔗 [https://movie-generator-backend.onrender.com](https://movie-generator-backend.onrender.com)**

- ✅ **Backend API**: Live and secure
- ✅ **Frontend**: Open `index.html` to use the deployed backend
- ✅ **24/7 Availability**: Works even when your computer is off

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🔧 Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/huzaifakiani14/movie_generator.git
cd movie_generator
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** with your actual API key:
   ```bash
   # Open .env file and replace with your actual TMDB API key
   TMDB_API_KEY=your_actual_tmdb_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

### Step 4: Start the Backend Server
```bash
npm start
```

The server will start on `http://localhost:3001`

### Step 5: Open the Frontend
Open `index.html` in your browser, or visit `http://localhost:3001`.

## 🚀 Deployment Options

### Option 1: Render (Recommended - Free & Reliable)

1. **Go to [render.com](https://render.com)** and sign up with GitHub
2. **Create Web Service:**
   - Repository: `huzaifakiani14/movie_generator`
   - Name: `movie-generator-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: `Free`

3. **Add Environment Variables:**
   - `TMDB_API_KEY` = `your_tmdb_api_key`
   - `NODE_ENV` = `production`

4. **Deploy and get your URL** (e.g., `https://movie-generator-backend.onrender.com`)

5. **Update frontend** with your deployed URL in `script.js`

### Option 2: Heroku (Alternative)

```bash
heroku login
heroku create movie-generator-backend
heroku config:set TMDB_API_KEY=your_tmdb_api_key
heroku config:set NODE_ENV=production
git push heroku main
```

### Option 3: Other Platforms
- **Vercel**: Supports Node.js backends
- **Railway**: Easy deployment with GitHub integration
- **DigitalOcean App Platform**: Professional hosting

## 🔒 Security Implementation

### Environment Variables
The API key is stored in a `.env` file that is:
- ✅ **Never committed to Git** (added to `.gitignore`)
- ✅ **Loaded securely** using the `dotenv` package
- ✅ **Accessible only to the backend** server

### Backend API Proxy
All TMDB API calls are handled by the backend server:
- ✅ **Frontend never sees the API key**
- ✅ **CORS protection** enabled
- ✅ **Error handling** with proper HTTP status codes
- ✅ **Request logging** for debugging

### File Structure
```
movie_generator/
├── .env                 # Environment variables (NEVER commit this!)
├── .env.example         # Example environment file
├── .gitignore          # Git ignore rules (includes .env)
├── server.js           # Backend server with secure API handling
├── package.json        # Node.js dependencies
├── render.yaml         # Render deployment configuration
├── Procfile            # Heroku deployment configuration
├── index.html          # Frontend HTML
├── script.js           # Frontend JavaScript
├── style.css           # Frontend styles
├── DEPLOYMENT.md       # Detailed deployment guide
└── README.md           # This file
```

## 🚀 API Endpoints

The backend provides these secure endpoints:

- `GET /api/health` - Health check
- `GET /api/genres` - Get movie genres
- `GET /api/discover?genre=ID` - Discover movies by genre
- `GET /api/search?query=TERM` - Search movies
- `GET /api/movie/:id` - Get movie details

## 🎯 User Features

### Movie Discovery
- **Random Movies**: Click "🎲 Random Movie" to discover new films
- **Genre Filtering**: Choose specific genres from the dropdown
- **Search**: Use the search bar to find specific movies

### Favorites Management
- **Add Favorites**: Click "❤️ Add to Favorites" on any movie
- **Remove Favorites**: Click "❌ Remove" on any favorite movie
- **View Favorites**: Scroll down to see your saved movies
- **Click to Display**: Click any favorite to view it again

### Visual Feedback
- **Loading Indicators**: Smooth loading animations
- **Button Confirmations**: Visual feedback for add/remove actions
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛡️ Security Best Practices

### ✅ What We Do Right:
1. **Environment Variables**: API key stored in `.env` file
2. **Git Ignore**: `.env` file never committed to repository
3. **Backend Proxy**: All API calls go through secure backend
4. **Error Handling**: Proper error messages without exposing internals
5. **CORS Protection**: Cross-origin requests handled securely
6. **Cloud Deployment**: Secure hosting on Render

### ❌ What We Avoid:
1. **Hardcoded API Keys**: Never store keys in source code
2. **Client-Side API Calls**: Frontend never directly calls TMDB API
3. **Exposed Credentials**: No sensitive data in public repositories
4. **Insecure Headers**: Proper CORS and security headers

## 🧪 Testing

### Test the Backend
```bash
# Health check
curl https://movie-generator-backend.onrender.com/api/health

# Get genres
curl https://movie-generator-backend.onrender.com/api/genres

# Search movies
curl "https://movie-generator-backend.onrender.com/api/search?query=batman"
```

### Test the Frontend
1. Open `index.html` in your browser
2. Try discovering movies by genre
3. Search for specific movies
4. Add movies to favorites
5. Remove movies from favorites

## 🚀 Deployment Status

### ✅ Current Deployment
- **Platform**: Render (Free Tier)
- **URL**: [https://movie-generator-backend.onrender.com](https://movie-generator-backend.onrender.com)
- **Status**: Live and operational
- **Uptime**: 24/7 availability
- **Security**: API key safely stored in environment variables

### 🔧 Development vs Production
- **Development**: Uses `http://localhost:3001/api`
- **Production**: Uses `https://movie-generator-backend.onrender.com/api`
- **Automatic**: Frontend automatically uses the correct URL

## 🔧 Development

### Adding New Features
1. **Backend**: Add new endpoints in `server.js`
2. **Frontend**: Update `script.js` to call new endpoints
3. **Security**: Always use environment variables for sensitive data

### Debugging
- Check server logs for API call details
- Use browser dev tools to inspect network requests
- Test API endpoints directly with curl

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🆘 Troubleshooting

### Common Issues

1. **"Failed to load genres" error**
   - Make sure the backend server is running (`npm start`)
   - Check that your `.env` file has the correct API key
   - Verify the deployed backend is accessible

2. **CORS errors**
   - The backend has CORS enabled, but check your browser console
   - Make sure you're accessing the frontend through the backend server

3. **API rate limits**
   - TMDB has generous rate limits for normal use
   - Check server logs for rate limit messages

4. **Slow loading on Render**
   - Free tier has cold starts (10-30 seconds for first request)
   - Subsequent requests are fast
   - Consider upgrading to paid tier for better performance

### Getting Help

- Check the server logs for detailed error messages
- Verify your `.env` file is properly configured
- Test API endpoints directly with curl
- Check browser console for frontend errors
- Review the `DEPLOYMENT.md` file for detailed deployment instructions

## 🌟 Features Showcase

### 🎬 Movie Discovery
- **Random Discovery**: Find unexpected gems
- **Genre Exploration**: Dive into specific movie types
- **Smart Search**: Find exactly what you're looking for

### ❤️ Favorites Management
- **Easy Adding**: One-click to save movies
- **Quick Removal**: Remove favorites with confirmation
- **Visual Feedback**: See your actions confirmed
- **Persistent Storage**: Favorites saved locally

### 🎨 User Experience
- **Modern Design**: Clean, professional interface
- **Smooth Animations**: Polished interactions
- **Responsive Layout**: Works on all devices
- **Movie Emoji**: Fun favicon in browser tabs

---

**🔒 Security Note**: This implementation follows security best practices by keeping API keys in environment variables and never committing them to version control. Always use this approach for any production applications.

**🚀 Live Demo**: [https://movie-generator-backend.onrender.com](https://movie-generator-backend.onrender.com)