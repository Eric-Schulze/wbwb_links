# Link Tree Website

A simple, static website for displaying links similar to Linktree. Easy to customize and deploy.

## Features

- 📱 Responsive design that works on all devices
- 🎨 Light and dark theme support
- ✨ Smooth animations and hover effects
- ⌨️ Keyboard navigation support
- 🔧 Easy to edit via JSON configuration
- 🚀 Static files - deploy anywhere
- ♿ Accessible design

## Quick Start

1. Edit `links.json` to customize your profile and links
2. Open `index.html` in your browser
3. Deploy to any static hosting service

## Customization

### Editing Your Information

Update `links.json` with your information:

```json
{
  "profile": {
    "name": "Your Name",
    "bio": "Your bio or description",
    "avatar": "https://your-avatar-url.com/image.jpg",
    "theme": "dark"
  },
  "links": [
    {
      "title": "Link Title",
      "url": "https://example.com",
      "description": "Optional description",
      "icon": "🌐"
    }
  ]
}
```

### Theme Options

Set `"theme": "light"` or `"theme": "dark"` in the profile section.

### Adding Links

Add new links to the `links` array in `links.json`. Each link supports:
- `title`: The main text for the link
- `url`: Where the link goes (https://, mailto:, tel:, etc.)
- `description`: Optional subtitle
- `icon`: Emoji or symbol to display

## Deployment

### GitHub Pages
1. Push files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Your site will be live instantly

### Vercel
1. Import your repository to Vercel
2. Deploy with one click

## Development

For local development with auto-reload:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

The JavaScript includes auto-reload functionality when running on localhost.

## Browser Support

Works in all modern browsers including:
- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Mobile browsers

## License

Feel free to use this for personal or commercial projects.