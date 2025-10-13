//render backend
const API_BASE_URL = 'https://movie-generator-backend.onrender.com/api';
// App state
let movieCount = 0;
let favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
let currentMovie = null;

console.log('Movie Discovery Hub loaded');

// Wait for page to load
window.addEventListener('load', function() {
    console.log('Page loaded, initializing app...');
    loadGenres();
    setupEventListeners();
    updateStats();
    loadFavorites();
});

// Load genres and populate dropdown
async function loadGenres() {
    try {
        console.log('Loading genres...');
        const response = await fetch(`${API_BASE_URL}/genres`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Genres loaded:', data.genres);
        
        const select = document.getElementById('genres');
        if (select && data.genres) {
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                select.appendChild(option);
            });
            console.log('Dropdown populated with', data.genres.length, 'genres');
        }
    } catch (error) {
        console.error('Error loading genres:', error);
        alert('Failed to load genres. Please make sure the backend server is running.');
    }
}

// Setting up all eventListeners on together
function setupEventListeners() {
    const playBtn = document.getElementById('playBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (playBtn) playBtn.addEventListener('click', showRandomMovie);
    if (searchBtn) searchBtn.addEventListener('click', searchMovies);
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchMovies();
        });
    }
    if (likeBtn) likeBtn.addEventListener('click', addToFavorites);
    if (dislikeBtn) dislikeBtn.addEventListener('click', nextMovie);
    if (nextBtn) nextBtn.addEventListener('click', nextMovie);
    
    console.log('Event listeners setup complete');
}

// Show loading indicator
function showLoading() {
    const loading = document.getElementById('loadingIndicator');
    const movieInfo = document.getElementById('movieInfo');
    const actionBtns = document.getElementById('likeOrDislikeBtns');
    
    if (loading) loading.classList.remove('hidden');
    if (movieInfo) movieInfo.style.display = 'none';
    if (actionBtns) actionBtns.classList.add('hidden');
}

// Hide loading indicator
function hideLoading() {
    const loading = document.getElementById('loadingIndicator');
    const movieInfo = document.getElementById('movieInfo');
    const actionBtns = document.getElementById('likeOrDislikeBtns');
    
    if (loading) loading.classList.add('hidden');
    if (movieInfo) movieInfo.style.display = 'flex';
    if (actionBtns) actionBtns.classList.remove('hidden');
}

// Show random movie
async function showRandomMovie() {
    const selectedGenre = document.getElementById('genres').value;
    console.log('Selected genre:', selectedGenre);
    
    showLoading();
    
    try {
        let url = `${API_BASE_URL}/discover`;
        if (selectedGenre) {
            url += `?genre=${selectedGenre}`;
        }
        
        console.log('Loading movies from:', url);
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            await displayMovie(randomMovie);
            movieCount++;
            updateStats();
        } else {
            alert('No movies found for this genre!');
        }
    } catch (error) {
        console.error('Error loading movies:', error);
        alert('Error loading movies. Please make sure the backend server is running.');
    } finally {
        hideLoading();
    }
}

// Search movies
async function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) {
        alert('Please enter a search term!');
        return;
    }
    
    showLoading();
    
    try {
        const url = `${API_BASE_URL}/search?query=${encodeURIComponent(searchTerm)}`;
        console.log('Searching for:', searchTerm);
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const movie = data.results[0]; // Get first result
            await displayMovie(movie);
            movieCount++;
            updateStats();
        } else {
            alert('No movies found for your search!');
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        alert('Error searching movies. Please make sure the backend server is running.');
    } finally {
        hideLoading();
    }
}

// Display movie with enhanced details
async function displayMovie(movie) {
    console.log('Displaying movie:', movie.title);
    currentMovie = movie;
    
    // Get additional movie details
    try {
        const detailsResponse = await fetch(`${API_BASE_URL}/movie/${movie.id}`);
        const details = await detailsResponse.json();
        movie = { ...movie, ...details }; // Merge additional details
    } catch (error) {
        console.log('Could not fetch additional details:', error);
    }
    
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    
    // Clear previous content
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
    
    // Create poster
    if (movie.poster_path) {
        const posterImg = document.createElement('img');
        posterImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        posterImg.alt = movie.title;
        moviePosterDiv.appendChild(posterImg);
    } else {
        moviePosterDiv.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 1.2rem;">No Image Available</div>';
    }
    
    // Create movie details
    const title = document.createElement('h2');
    title.className = 'movie-title';
    title.textContent = movie.title;
    movieTextDiv.appendChild(title);
    
    // Create meta information
    const meta = document.createElement('div');
    meta.className = 'movie-meta';
    
    if (movie.vote_average) {
        const rating = document.createElement('div');
        rating.className = 'meta-item';
        rating.innerHTML = `<span class="rating">⭐ ${movie.vote_average.toFixed(1)}</span>`;
        meta.appendChild(rating);
    }
    
    if (movie.release_date) {
        const year = document.createElement('div');
        year.className = 'meta-item';
        year.innerHTML = `📅 ${new Date(movie.release_date).getFullYear()}`;
        meta.appendChild(year);
    }
    
    if (movie.runtime) {
        const runtime = document.createElement('div');
        runtime.className = 'meta-item';
        runtime.innerHTML = `⏱️ ${movie.runtime} min`;
        meta.appendChild(runtime);
    }
    
    movieTextDiv.appendChild(meta);
    
    // Create genres
    if (movie.genres && movie.genres.length > 0) {
        const genresDiv = document.createElement('div');
        genresDiv.className = 'movie-genres';
        movie.genres.forEach(genre => {
            const genreTag = document.createElement('span');
            genreTag.className = 'genre-tag';
            genreTag.textContent = genre.name;
            genresDiv.appendChild(genreTag);
        });
        movieTextDiv.appendChild(genresDiv);
    }
    
    // Create overview
    const overview = document.createElement('p');
    overview.className = 'movie-overview';
    overview.textContent = movie.overview || 'No overview available.';
    movieTextDiv.appendChild(overview);
}

// Add movie to favorites
function addToFavorites() {
    if (!currentMovie) return;
    
    const isAlreadyFavorite = favorites.some(fav => fav.id === currentMovie.id);
    
    if (isAlreadyFavorite) {
        alert('This movie is already in your favorites!');
        return;
    }
    
    favorites.push(currentMovie);
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    updateStats();
    loadFavorites();
    
    // Update button text temporarily
    const likeBtn = document.getElementById('likeBtn');
    const originalText = likeBtn.textContent;
    likeBtn.textContent = '✅ Added!';
    likeBtn.style.background = 'linear-gradient(45deg, #00b894, #00a085)';
    
    setTimeout(() => {
        likeBtn.textContent = originalText;
        likeBtn.style.background = 'linear-gradient(45deg, #00b894, #00a085)';
    }, 2000);
}

// Remove movie from favorites
function removeFromFavorites(movieId) {
    favorites = favorites.filter(fav => fav.id !== movieId);
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    updateStats();
    loadFavorites();
    
    // Show confirmation
    const removeBtn = event.target;
    const originalText = removeBtn.textContent;
    removeBtn.textContent = '✅ Removed!';
    removeBtn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
    
    setTimeout(() => {
        removeBtn.textContent = originalText;
        removeBtn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
    }, 2000);
}

// Show next movie
function nextMovie() {
    showRandomMovie();
}

// Load and display favorites
function loadFavorites() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favoritesSection = document.getElementById('favoritesList');
    
    if (!favoritesContainer) return;
    
    favoritesContainer.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesSection.classList.add('hidden');
        return;
    }
    
    favoritesSection.classList.remove('hidden');
    
    favorites.forEach(movie => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        
        let posterHtml = '<div style="height: 250px; display: flex; align-items: center; justify-content: center; background: #f0f0f0; color: #666;">No Image</div>';
        if (movie.poster_path) {
            posterHtml = `<img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="${movie.title}">`;
        }
        
        favoriteItem.innerHTML = `
            ${posterHtml}
            <h4>${movie.title}</h4>
            <div class="rating">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</div>
            <button class="remove-favorite-btn" onclick="removeFromFavorites(${movie.id})" title="Remove from favorites">
                ❌ Remove
            </button>
        `;
        
        // Add click event for displaying movie (but not on the remove button)
        favoriteItem.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-favorite-btn')) {
                displayMovie(movie);
                document.getElementById('movieInfo').scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        favoritesContainer.appendChild(favoriteItem);
    });
}

// Update statistics
function updateStats() {
    const movieCountEl = document.getElementById('movieCount');
    const favoriteCountEl = document.getElementById('favoriteCount');
    
    if (movieCountEl) {
        movieCountEl.textContent = `Movies Discovered: ${movieCount}`;
    }
    
    if (favoriteCountEl) {
        favoriteCountEl.textContent = `Favorites: ${favorites.length}`;
    }
}
