# Movie Generator App - Secure Version

A secure movie discovery application that uses environment variables to protect API keys and follows security best practices.

## 🔒 Security Features

- ✅ **API key stored in environment variables** (never committed to Git)
- ✅ **Backend server** handles all API calls securely
- ✅ **CORS protection** for cross-origin requests
- ✅ **Error handling** with proper status codes
- ✅ **Health check endpoint** for monitoring

## 🚀 Features

- 🎬 Discover random movies by genre
- 🔍 Search for specific movies
- ❤️ Save favorite movies
- 🎨 Modern, responsive UI
- 🔒 Secure API key handling
- 📊 Real-time statistics

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **API**: The Movie Database (TMDB)
- **Security**: Environment variables, dotenv
- **Dependencies**: axios, cors, express

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🔧 Setup Instructions

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
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
Open `http://localhost:3001` in your browser, or open `index.html` directly.

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
├── index.html          # Frontend HTML
├── script.js           # Frontend JavaScript
├── style.css           # Frontend styles
└── README.md           # This file
```

## 🚀 API Endpoints

The backend provides these secure endpoints:

- `GET /api/health` - Health check
- `GET /api/genres` - Get movie genres
- `GET /api/discover?genre=ID` - Discover movies by genre
- `GET /api/search?query=TERM` - Search movies
- `GET /api/movie/:id` - Get movie details

## 🛡️ Security Best Practices

### ✅ What We Do Right:
1. **Environment Variables**: API key stored in `.env` file
2. **Git Ignore**: `.env` file never committed to repository
3. **Backend Proxy**: All API calls go through secure backend
4. **Error Handling**: Proper error messages without exposing internals
5. **CORS Protection**: Cross-origin requests handled securely

### ❌ What We Avoid:
1. **Hardcoded API Keys**: Never store keys in source code
2. **Client-Side API Calls**: Frontend never directly calls TMDB API
3. **Exposed Credentials**: No sensitive data in public repositories
4. **Insecure Headers**: Proper CORS and security headers

## 🧪 Testing

### Test the Backend
```bash
# Health check
curl http://localhost:3001/api/health

# Get genres
curl http://localhost:3001/api/genres

# Search movies
curl "http://localhost:3001/api/search?query=batman"
```

### Test the Frontend
1. Open `http://localhost:3001` in your browser
2. Try discovering movies by genre
3. Search for specific movies
4. Add movies to favorites

## 🚀 Deployment

### Local Development
```bash
npm start
# Server runs on http://localhost:3001
```

### Production Deployment
1. **Set environment variables** on your hosting platform
2. **Deploy the backend** to a service like Heroku, Railway, or Vercel
3. **Update the frontend** API_BASE_URL to point to your deployed backend
4. **Deploy the frontend** to GitHub Pages or similar

### Environment Variables for Production
```bash
TMDB_API_KEY=your_production_api_key
PORT=3001
NODE_ENV=production
```

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

2. **CORS errors**
   - The backend has CORS enabled, but check your browser console
   - Make sure you're accessing the frontend through the backend server

3. **API rate limits**
   - TMDB has generous rate limits for normal use
   - Check server logs for rate limit messages

### Getting Help

- Check the server logs for detailed error messages
- Verify your `.env` file is properly configured
- Test API endpoints directly with curl
- Check browser console for frontend errors

---

**🔒 Security Note**: This implementation follows security best practices by keeping API keys in environment variables and never committing them to version control. Always use this approach for any production applications.