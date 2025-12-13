# Quick Setup Guide

Follow these steps to get your 3DGS viewer working on GitHub Pages and X.

## Step 1: Update Your Username

**CRITICAL:** Before pushing to GitHub, update `index.html`:

1. Open `index.html`
2. Find and replace ALL instances of `yourusername` with your actual GitHub username
3. There are 5 places to update (lines 13, 16, 17, 22, 23)

## Step 2: Add Preview Image

1. Create or add a `preview.jpg` file (1280x720 pixels recommended)
2. This image will show when you share the link on X
3. Place it in the root directory

## Step 3: Add Your 3DGS File

1. Place your `.ply` file in the root directory
2. Default filename: `gs_VIVERSE_CampTaylor_LowRop.compressed.ply`
3. Or update the default in `viewer.js` (line ~95)

## Step 4: Push to GitHub

```bash
git add .
git commit -m "Setup 3DGS viewer"
git push origin main
```

## Step 5: Enable GitHub Pages

1. Go to: `https://github.com/yourusername/3dgs_viewer/settings/pages`
2. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
3. Click "Save"
4. Wait 1-2 minutes for deployment

## Step 6: Test

1. Visit: `https://yourusername.github.io/3dgs_viewer/`
2. The viewer should load your 3DGS file
3. Test controls: drag to rotate, scroll to zoom

## Step 7: Share on X

1. Copy your GitHub Pages URL
2. Post it on X (Twitter)
3. X will automatically embed the viewer
4. Users can interact with the 3D scene in their feed!

## Troubleshooting

### Viewer not loading?
- Check browser console (F12) for errors
- Verify file path is correct
- Check CORS if loading from different domain

### X not embedding?
- Verify all meta tags updated in `index.html`
- Check preview image exists
- Use Twitter Card validator: https://cards-dev.twitter.com/validator

### File too large?
- Consider compressing your PLY file
- Or host file on CDN and update path

## Next Steps

- Customize colors in `styles.css`
- Adjust camera settings in `viewer.js`
- Add more 3DGS files and use URL parameters to load them

