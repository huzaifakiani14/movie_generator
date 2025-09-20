# Movie Generator

A web application that helps you discover movies based on your preferred genre using The Movie Database (TMDB) API.

## Setup

1. Clone this repository
2. Get your TMDB API key from [The Movie Database](https://www.themoviedb.org/settings/api)
3. Create a `.env` file in the root directory and add your API key:
   ```
   TMDB_API_KEY=your_api_key_here
   ```
4. Open `index.html` in your web browser

## Environment Variables

- `TMDB_API_KEY`: Your TMDB API key (required)

## Files

- `index.html` - Main HTML file
- `script.js` - Main JavaScript logic
- `helpers.js` - Helper functions
- `style.css` - Styling
- `.env` - Environment variables (not tracked in git)
- `.env.example` - Example environment file

## Security Note

The `.env` file is included in `.gitignore` to prevent accidentally committing your API key to version control. Make sure to never commit your actual API key to public repositories.
