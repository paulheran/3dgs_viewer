# 3D Gaussian Splatting Viewer

An interactive 3D Gaussian Splatting viewer optimized for embedding in X (Twitter) feed and hosting on GitHub Pages.

## Features

- 🎨 Interactive 3D viewer with orbit controls
- 📱 Mobile-responsive design
- 🐦 Optimized for X (Twitter) embedding with Twitter Card meta tags
- 🚀 Hosted on GitHub Pages
- ⚡ Fast loading with CDN resources (Three.js from CDN)
- 🎯 Auto-centering and scaling of 3D models
- 🔄 Auto-rotate option

## Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/yourusername/3dgs_viewer.git
cd 3dgs_viewer
```

### 2. Update Configuration

**IMPORTANT:** Before deploying, update `index.html`:

1. Replace `yourusername` with your GitHub username in all meta tags:
   - Line 13: `@yourusername` → `@yourusername`
   - Line 16: `https://yourusername.github.io/3dgs_viewer/preview.jpg`
   - Line 17: `https://yourusername.github.io/3dgs_viewer/player.html`
   - Line 22: `https://yourusername.github.io/3dgs_viewer/preview.jpg`
   - Line 23: `https://yourusername.github.io/3dgs_viewer/`

2. Add your preview image:
   - Create or add a `preview.jpg` file (1280x720 recommended)
   - This will be shown when sharing on X

### 3. Add Your 3DGS Files

Place your `.ply` files in the root directory. The default file is:
- `gs_VIVERSE_CampTaylor_LowRop.compressed.ply`

Or specify a different file via URL parameter:
```
https://yourusername.github.io/3dgs_viewer/player.html?file=yourfile.ply
```

### 4. Enable GitHub Pages

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial 3DGS viewer setup"
   git push origin main
   ```

2. Go to your repository on GitHub
3. Navigate to **Settings** → **Pages**
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

Your viewer will be available at:
```
https://yourusername.github.io/3dgs_viewer/
```

### 5. Test X Embedding

1. Visit your GitHub Pages URL
2. Copy the URL
3. Post it on X (Twitter)
4. X will automatically detect the Twitter Card and embed the viewer
5. Users can interact with the 3D scene directly in their feed!

## Usage

### Basic Usage

Simply visit your GitHub Pages URL or open `index.html` locally.

### Loading Different Files

Specify a file via URL parameter:
```
https://yourusername.github.io/3dgs_viewer/player.html?file=path/to/your/file.ply
```

### Local Development

You can test locally, but note:
- Some browsers may block loading local files due to CORS
- For full testing, use a local server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Node.js (if you have http-server installed)
  npx http-server
  ```
- Then visit `http://localhost:8000`

## Embedding in X (Twitter)

The viewer is optimized for X embedding:

1. **Share your GitHub Pages URL** in an X post
2. X automatically detects the **Twitter Card** meta tags
3. The viewer appears as an **embedded player** in the feed
4. Users can **interact with the 3D scene** without leaving X
5. The viewer is **responsive** and works on mobile and desktop

### Twitter Card Requirements

The viewer includes all necessary meta tags:
- `twitter:card` = "player"
- `twitter:player` = Your player.html URL
- `twitter:player:width` = 1280
- `twitter:player:height` = 720
- `twitter:image` = Preview image for the card

## File Structure

```
3dgs_viewer/
├── index.html          # Main page with Twitter Card meta tags
├── player.html         # Embedded player for X (iframe)
├── viewer.js           # 3D viewer logic (Three.js)
├── styles.css          # Styling
├── README.md           # This file
├── .nojekyll           # Prevents Jekyll processing
├── .gitignore          # Git ignore rules
├── preview.jpg         # Preview image for social sharing (add this!)
└── assets/             # Optional: 3DGS files and other assets
    └── *.ply           # Your 3DGS files
```

## Controls

- **Drag**: Rotate the camera around the model
- **Scroll/Pinch**: Zoom in and out
- **Right-click + Drag**: Pan the view
- **Reset View**: Reset camera to initial position
- **Auto Rotate**: Toggle automatic rotation

## Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

### Current Implementation

- Uses **Three.js** for 3D rendering
- Loads **PLY files** (point cloud format)
- Renders as **point cloud** with colors
- Optimized for performance with:
  - Efficient rendering pipeline
  - Responsive controls
  - Mobile optimizations

### Future Enhancements

For full 3D Gaussian Splatting rendering with proper splat visualization, you may want to integrate:
- [gaussian-splatting-web](https://github.com/antimatter15/gaussian-splatting-web) - Full 3DGS renderer
- Custom WebGL shaders for splat rendering
- Compressed format support (.splat files)

## Troubleshooting

### File Not Loading

- Check browser console for errors
- Verify file path is correct
- Ensure file is accessible (CORS if loading from different domain)
- Check file size (very large files may timeout)

### X Not Embedding

- Verify all meta tags are updated with your username
- Ensure `preview.jpg` exists and is accessible
- Check Twitter Card validator: https://cards-dev.twitter.com/validator
- Wait a few minutes after updating - X caches card data

### Performance Issues

- Large PLY files may load slowly
- Consider compressing your 3DGS files
- Reduce point count if possible
- Use compressed formats when available

## License

MIT License - feel free to use and modify as needed.

## Contributing

Feel free to submit issues and pull requests!

## Credits

- Built with [Three.js](https://threejs.org/)
- Optimized for X (Twitter) embedding
- Hosted on GitHub Pages

