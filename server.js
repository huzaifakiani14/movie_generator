require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Trust proxy for production deployment
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Security check - ensure API key is loaded
if (!TMDB_API_KEY) {
    console.error('❌ TMDB_API_KEY is not set in environment variables.');
    console.error('Please create a .env file with TMDB_API_KEY=your_key_here');
    process.exit(1);
}

console.log('✅ TMDB API key loaded successfully from environment variables');

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Movie Generator API is running securely',
        timestamp: new Date().toISOString(),
        security: 'API key is safely stored in environment variables'
    });
});

// Proxy endpoint for genres
app.get('/api/genres', async (req, res) => {
    try {
        console.log('Fetching genres...');
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: { api_key: TMDB_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching genres:', error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch genres', 
            message: error.message 
        });
    }
});

// Proxy endpoint for discovering movies
app.get('/api/discover', async (req, res) => {
    const { genre } = req.query;
    try {
        let url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc`;
        if (genre) {
            url += `&with_genres=${genre}`;
        }
        console.log('Discovering movies...', genre ? `for genre: ${genre}` : '');
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error discovering movies:', error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to discover movies', 
            message: error.message 
        });
    }
});

// Proxy endpoint for searching movies
app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
    }
    try {
        console.log('Searching movies for:', query);
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: { api_key: TMDB_API_KEY, query }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error searching movies:', error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to search movies', 
            message: error.message 
        });
    }
});

// Proxy endpoint for movie details
app.get('/api/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log('Fetching movie details for ID:', id);
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: { api_key: TMDB_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching movie details for ID ${id}:`, error.message);
        res.status(error.response?.status || 500).json({ 
            error: `Failed to fetch movie details for ID ${id}`, 
            message: error.message 
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('🚀 Secure Movie Generator Backend Started!');
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🌐 Frontend available at http://localhost:${PORT}`);
    console.log(`🔗 API endpoints available at http://localhost:${PORT}/api/`);
    console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
    console.log('🔒 API key is securely stored in environment variables');
    console.log('✅ Ready to serve movie data!');
});
