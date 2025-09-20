// Simple Movie Generator
const tmdbKey = 'fd6275bcc82b3d92530d85150045c04c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

console.log('Script loaded');

// Wait for page to load
window.addEventListener('load', function() {
    console.log('Page loaded, starting app...');
    loadGenres();
    setupEventListeners();
});

// Load genres and populate dropdown
async function loadGenres() {
    try {
        console.log('Loading genres...');
        const response = await fetch(`${tmdbBaseUrl}/genre/movie/list?api_key=${tmdbKey}`);
        console.log('Response status:', response.status);
        
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
        } else {
            console.error('Select element not found or no genres data');
        }
    } catch (error) {
        console.error('Error loading genres:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', showRandomMovie);
        console.log('Play button event listener added');
    }
}

// Show random movie
async function showRandomMovie() {
    const selectedGenre = document.getElementById('genres').value;
    console.log('Selected genre:', selectedGenre);
    
    if (!selectedGenre) {
        alert('Please select a genre first!');
        return;
    }
    
    try {
        console.log('Loading movies for genre:', selectedGenre);
        const response = await fetch(`${tmdbBaseUrl}/discover/movie?api_key=${tmdbKey}&with_genres=${selectedGenre}`);
        const data = await response.json();
        console.log('Movies loaded:', data.results.length);
        
        if (data.results && data.results.length > 0) {
            const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            displayMovie(randomMovie);
        } else {
            alert('No movies found for this genre!');
        }
    } catch (error) {
        console.error('Error loading movies:', error);
        alert('Error loading movies. Please try again.');
    }
}

// Display movie
function displayMovie(movie) {
    console.log('Displaying movie:', movie.title);
    
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeOrDislikeBtns = document.getElementById('likeOrDislikeBtns');
    
    // Clear previous content
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
    
    // Create poster
    if (movie.poster_path) {
        const posterImg = document.createElement('img');
        posterImg.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        posterImg.style.maxWidth = '300px';
        posterImg.style.height = 'auto';
        moviePosterDiv.appendChild(posterImg);
    }
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = movie.title;
    movieTextDiv.appendChild(title);
    
    // Create overview
    const overview = document.createElement('p');
    overview.textContent = movie.overview;
    movieTextDiv.appendChild(overview);
    
    // Show buttons
    if (likeOrDislikeBtns) {
        likeOrDislikeBtns.style.display = 'block';
        
        // Setup button events
        const likeBtn = document.getElementById('likeBtn');
        const dislikeBtn = document.getElementById('dislikeBtn');
        
        if (likeBtn) {
            likeBtn.onclick = () => {
                console.log('Liked movie:', movie.title);
                showRandomMovie();
            };
        }
        
        if (dislikeBtn) {
            dislikeBtn.onclick = () => {
                console.log('Disliked movie:', movie.title);
                showRandomMovie();
            };
        }
    }
}