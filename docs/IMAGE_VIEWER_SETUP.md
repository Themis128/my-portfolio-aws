# Image Viewer Extension Configuration

## Overview
The **Image Viewer** extension has been installed and configured to provide comprehensive image viewing capabilities for all common image formats in your VS Code workspace.

## Supported Image Formats
The extension is configured to handle the following image formats:
- **Common formats**: PNG, JPG, JPEG, GIF, BMP, WebP, SVG, ICO
- **Professional formats**: TIFF, TIF, RAW, PSD, AI, EPS
- **Document formats**: PDF

## Configuration Settings
The extension has been configured with the following settings in `.vscode/settings.json`:

- **Auto-open**: Images open automatically when clicked
- **Base64 copy**: Button to copy images as base64 strings
- **Zoom controls**: Enable zoom in/out and fit to screen
- **Image manipulation**: Rotate, flip, and pan controls
- **Information display**: Show image metadata and dimensions
- **Caching**: Improved performance with image caching
- **Preloading**: Faster navigation between images

## Keyboard Shortcuts
Custom keybindings have been set up for efficient image viewing:

- `Ctrl+Shift+I`: Open image viewer for selected image
- `Ctrl+Shift+G`: Show image gallery for the entire project
- `Ctrl+Shift+B`: Copy image as base64 string
- `Ctrl+Shift+Z`: Zoom in
- `Ctrl+Shift+X`: Zoom out
- `Ctrl+Shift+0`: Fit image to screen

## How to Use

### Viewing Individual Images
1. Open any image file in your project (PNG, JPG, SVG, etc.)
2. The image will automatically open in the Image Viewer
3. Use mouse or keyboard shortcuts to zoom, pan, and rotate

### Image Gallery
1. Press `Ctrl+Shift+G` or use Command Palette → "Image Viewer: Show Gallery"
2. Browse all images in your project in a gallery view
3. Click any image to view it in detail

### Base64 Export
1. Open an image in the viewer
2. Click the "Copy Base64" button or press `Ctrl+Shift+B`
3. The base64 string is copied to your clipboard for use in code

## Features
- **Multi-format support**: View images in all major formats
- **Zoom and pan**: Smooth zooming and panning controls
- **Rotation and flipping**: Rotate and flip images as needed
- **Metadata display**: View image dimensions, file size, and format info
- **Gallery view**: Browse all project images in one view
- **Base64 export**: Copy images as base64 for embedding in code
- **Performance optimized**: Caching and preloading for smooth experience

## Troubleshooting
If images don't open automatically:
1. Check that the file extension is in the supported formats list
2. Try manually opening with `Ctrl+Shift+I`
3. Restart VS Code if needed

The extension is now ready to use for viewing and managing all your project images!