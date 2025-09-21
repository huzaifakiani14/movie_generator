# Movie Generator App

A full-stack movie discovery application with a secure backend API and modern frontend.

## Features

- 🎬 Discover random movies by genre
- 🔍 Search for specific movies
- ❤️ Save favorite movies
- 🎨 Modern, responsive UI
- 🔒 Secure API key handling

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: The Movie Database (TMDB)
- **Security**: Environment variables for API keys

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie_generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your TMDB API key
   nano .env
   ```
   
   Your `.env` file should look like:
   ```
   TMDB_API_KEY=your_actual_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open the application**
   - Visit `http://localhost:3001` in your browser
   - The backend serves both the API and frontend

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/genres` - Get movie genres
- `GET /api/discover?genre={id}` - Discover movies by genre
- `GET /api/search?query={term}` - Search movies
- `GET /api/movie/{id}` - Get movie details

## Security Features

- ✅ API key stored in environment variables
- ✅ `.env` file excluded from Git
- ✅ Backend acts as proxy to TMDB API
- ✅ No sensitive data exposed to frontend
- ✅ CORS enabled for frontend communication

## Development

### Project Structure
```
movie_generator/
├── server.js          # Express backend server
├── package.json       # Node.js dependencies
├── .env               # Environment variables (not in Git)
├── env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── index.html         # Frontend HTML
├── style.css          # Frontend styles
├── script.js          # Frontend JavaScript
└── README.md          # This file
```

### Adding New Features

1. **Backend**: Add new routes in `server.js`
2. **Frontend**: Update `script.js` to call new endpoints
3. **Security**: Always use environment variables for sensitive data

## Deployment

### For Production

1. Set `NODE_ENV=production` in your `.env` file
2. Use a process manager like PM2
3. Set up proper logging and monitoring
4. Use HTTPS in production

### Environment Variables for Production

```bash
TMDB_API_KEY=your_production_api_key
PORT=3001
NODE_ENV=production
```

## Troubleshooting

### Common Issues

1. **"Failed to load genres" error**
   - Make sure the backend server is running
   - Check that your TMDB API key is correct
   - Verify the `.env` file exists and has the right format

2. **CORS errors**
   - The backend has CORS enabled, but if you're running frontend separately, update the `API_BASE_URL` in `script.js`

3. **API key not working**
   - Verify your TMDB API key is valid
   - Check the server console for error messages
   - Make sure the `.env` file is in the root directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.