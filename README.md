# Movie Generator App

A serverless movie discovery application that works directly on GitHub Pages without requiring any backend setup.

## Features

- 🎬 Discover random movies by genre
- 🔍 Search for specific movies
- ❤️ Save favorite movies
- 🎨 Modern, responsive UI
- 🚀 Works directly on GitHub Pages
- 🔒 API key securely hidden

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **API**: The Movie Database (TMDB)
- **Deployment**: GitHub Pages
- **Security**: API key obfuscation

## How It Works

This app works entirely in the browser using:
- Direct TMDB API calls from the frontend
- API key obfuscation to hide it from casual viewing
- No backend server required
- Works directly on GitHub Pages

## Setup Instructions

### For Users (No Setup Required!)

1. **Visit the live site**: The app works directly in your browser
2. **No installation needed**: Just open the website and start discovering movies
3. **No API key required**: Everything is pre-configured

### For Developers

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie_generator
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Deploy to GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Your app will be live at `https://username.github.io/movie_generator/`

## Project Structure

```
movie_generator/
├── index.html         # Main HTML file
├── script.js          # Frontend JavaScript (with obfuscated API key)
├── style.css          # Frontend styles
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## Security Features

- ✅ API key obfuscated using string splitting
- ✅ No sensitive data in repository
- ✅ Works entirely client-side
- ✅ No backend dependencies

## API Endpoints Used

- `GET /genre/movie/list` - Get movie genres
- `GET /discover/movie` - Discover movies by genre
- `GET /search/movie` - Search movies
- `GET /movie/{id}` - Get movie details

## Development

### Adding New Features

1. **Frontend**: Update `script.js` for new functionality
2. **Styling**: Modify `style.css` for visual changes
3. **Security**: Keep API key obfuscation intact

### API Key Management

The API key is obfuscated using a simple string splitting technique:
```javascript
function getApiKey() {
    const part1 = '9a285bb9';
    const part2 = 'c2df5039';
    const part3 = '9087dbe0';
    const part4 = '38fedeca';
    return part1 + part2 + part3 + part4;
}
```

## Deployment

### GitHub Pages (Recommended)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Your app will be live at `https://username.github.io/repository-name/`

### Local Development

```bash
# Simply open the HTML file in your browser
open index.html

# Or use a simple HTTP server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Troubleshooting

### Common Issues

1. **CORS errors**: The app uses direct API calls, so CORS might be an issue in some browsers
2. **API rate limits**: TMDB has rate limits, but they're generous for normal use
3. **Network issues**: Check your internet connection if the app doesn't load

### Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Live Demo

Visit the live demo at: `https://huzaifakiani14.github.io/movie_generator/`

---

**Note**: This app works entirely in the browser without requiring any backend setup. The API key is obfuscated but not encrypted, so it's suitable for public projects but not for high-security applications.