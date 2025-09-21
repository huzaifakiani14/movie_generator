const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// TMDB API configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Check if API key is configured
if (!TMDB_API_KEY) {
    console.error('❌ TMDB_API_KEY not found in environment variables!');
    console.error('Please create a .env file with your TMDB API key.');
    process.exit(1);
}

console.log('✅ TMDB API key loaded successfully');

// API Routes

// Get movie genres
app.get('/api/genres', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: {
                api_key: TMDB_API_KEY
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching genres:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch genres',
            message: error.message 
        });
    }
});

// Discover movies
app.get('/api/discover', async (req, res) => {
    try {
        const { genre, page = 1 } = req.query;
        
        const params = {
            api_key: TMDB_API_KEY,
            sort_by: 'popularity.desc',
            page: page
        };
        
        if (genre) {
            params.with_genres = genre;
        }
        
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
            params: params
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error discovering movies:', error.message);
        res.status(500).json({ 
            error: 'Failed to discover movies',
            message: error.message 
        });
    }
});

// Search movies
app.get('/api/search', async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        
        if (!query) {
            return res.status(400).json({ 
                error: 'Query parameter is required' 
            });
        }
        
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: query,
                page: page
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error searching movies:', error.message);
        res.status(500).json({ 
            error: 'Failed to search movies',
            message: error.message 
        });
    }
});

// Get movie details
app.get('/api/movie/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: {
                api_key: TMDB_API_KEY
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch movie details',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Movie Generator API is running',
        timestamp: new Date().toISOString()
    });
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: 'Something went wrong on the server'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Not found',
        message: 'The requested endpoint does not exist'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📱 Frontend available at http://localhost:${PORT}`);
    console.log(`🔗 API endpoints available at http://localhost:${PORT}/api/`);
    console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
});
