# Movie Generator

A web application that helps you discover movies based on your preferred genre using The Movie Database (TMDB) API.

## Setup

1. Clone this repository
2. Get your TMDB API key from [The Movie Database](https://www.themoviedb.org/settings/api)
3. Copy `config.example.js` to `config.js` and add your API key:
   ```bash
   cp config.example.js config.js
   ```
4. Edit `config.js` and replace `your_api_key_here` with your actual API key
5. Open `index.html` in your web browser

## Configuration

- `config.js`: Contains your API key (not tracked in git)
- `config.example.js`: Template file showing required configuration

## Files

- `index.html` - Main HTML file
- `script.js` - Main JavaScript logic
- `helpers.js` - Helper functions
- `style.css` - Styling
- `.env` - Environment variables (not tracked in git)
- `.env.example` - Example environment file

## Security Note

The `.env` file is included in `.gitignore` to prevent accidentally committing your API key to version control. Make sure to never commit your actual API key to public repositories.
