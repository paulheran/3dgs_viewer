# Supported File Formats

## Current Implementation

The viewer currently supports:

### ✅ PLY Files (Point Cloud Format)
- **Format**: `.ply` (Polygon File Format)
- **Type**: Point cloud data
- **Rendering**: Points with vertex colors
- **Compatibility**: Standard PLY files with position and color data

**What it does:**
- Loads PLY files using Three.js PLYLoader
- Renders as a point cloud (individual colored points)
- Supports vertex colors (RGB per point)
- Auto-centers and scales to fit view

**Limitations:**
- This is **NOT** true 3D Gaussian Splatting rendering
- It renders points, not splats (ellipsoids)
- No support for splat-specific properties (scale, rotation, opacity)
- Large files may be slow (no optimization for splat rendering)

## True 3D Gaussian Splatting Formats

The viewer does **NOT** currently support these formats:

### ❌ .splat Files
- Standard 3DGS format
- Contains splat data (position, color, scale, rotation, opacity)
- Requires specialized renderer (e.g., gaussian-splatting-web)

### ❌ Compressed .splat Files
- Compressed versions of splat files
- Smaller file sizes
- Still requires specialized renderer

### ❌ .ply Files with Splat Data
- Some 3DGS tools export to PLY
- But the current viewer only reads point cloud data, not splat properties

## File Requirements

For the current viewer to work, your PLY file should have:

1. **Position data** (x, y, z coordinates)
2. **Color data** (RGB values per vertex) - optional, will use white if missing
3. **Standard PLY format** (ASCII or binary)

## Example PLY File Structure

```
ply
format ascii 1.0
element vertex 1000000
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
...
end_header
```

## Upgrading to True 3DGS Support

To support true 3D Gaussian Splatting files (`.splat` format), you would need to:

1. **Integrate a 3DGS renderer library:**
   - [gaussian-splatting-web](https://github.com/antimatter15/gaussian-splatting-web)
   - Custom WebGL shader implementation

2. **Features of true 3DGS rendering:**
   - Proper splat rendering (ellipsoids, not points)
   - View-dependent appearance
   - Better quality and performance
   - Support for opacity and rotation

3. **File format support:**
   - `.splat` files (standard format)
   - Compressed `.splat` files
   - Better visual quality

## Current File: `gs_VIVERSE_CampTaylor_LowRop.compressed.ply`

Your current file appears to be:
- A PLY format file
- Compressed (based on filename)
- Likely exported from a 3DGS tool as a point cloud

**Note:** Even though it's named "compressed.ply", the viewer treats it as a standard PLY point cloud, not a true 3DGS splat file.

## Recommendations

1. **For current viewer:** Use standard PLY files with position and color data
2. **For true 3DGS:** Consider upgrading to a proper 3DGS renderer library
3. **File size:** Large PLY files (>10MB) may load slowly - consider compression or optimization

