# Branding Workflow Documentation

## Overview

This portfolio project utilizes a suite of specialized MCP (Model Context Protocol) servers for comprehensive branding and asset management. These servers provide AI-powered tools for logo generation, favicon creation, icon selection, and design asset extraction, streamlining the branding process for modern web applications.

## Branding Servers

| Server | What It Does | Example Usage |
|--------|--------------|---------------|
| **image-gen** | AI logo/image generation using Flux model | "Generate a minimalist logo for Cloudless.gr with blue cloud gradient" |
| **auto-favicon** | Create complete favicon sets from PNG images | "Generate favicon set from my logo.png" |
| **pickapicon** | Access to 200K+ Iconify SVG icons | "Get a cloud icon from Lucide" |
| **icon-search** | Search Bootstrap, Feather, Tabler icon libraries | "Search for a settings gear icon" |
| **figma-developer-mcp** | Extract assets and images from Figma files | "Export the logo from my Figma file" |
| **flowbite** | Figma-to-code conversion and theme generation | "Generate theme colors from Figma design" |

## Portfolio Branding Workflow

The following workflow provides a systematic approach to branding your portfolio:

### 1. Logo Generation (image-gen)
- Use AI-powered image generation to create professional logos
- Supports various styles: minimalist, modern, abstract, etc.
- Generates high-quality images optimized for web use
- Example: Generate a logo with your brand colors and preferred style

### 2. Favicon Creation (auto-favicon)
- Convert your generated logo into a complete favicon set
- Automatically generates all required sizes (16x16, 32x32, 48x48, etc.)
- Creates both PNG and ICO formats
- Includes Apple touch icons and Android icons

### 3. Icon Selection (pickapicon / icon-search)
- Access extensive icon libraries for UI elements
- Search by description or browse by category
- Get SVG icons in multiple formats (React components, raw SVG)
- Consistent iconography across your portfolio

### 4. Design Asset Integration (figma-developer-mcp)
- Extract logos, illustrations, and UI elements from Figma designs
- Convert Figma components to code-ready assets
- Maintain design consistency between design files and implementation

## Technical Integration

### MCP Server Architecture
- Each branding server runs as an independent MCP server
- Servers communicate via the Model Context Protocol
- Integration allows seamless workflow between design and development

### File Organization
- Generated assets are stored in `/public/` directory
- Icons organized by category in `/public/icons/`
- Images stored in `/public/images/`
- Favicon files placed in `/public/` root

### Build Process
- Assets are processed during the Next.js build
- Automatic optimization for web delivery
- Responsive image generation where applicable

## Usage Examples

### Logo Generation
```bash
# Generate a professional logo
"Generate a minimalist logo for Cloudless.gr with blue cloud gradient"
```

### Favicon Creation
```bash
# Create favicon set from logo
"Generate favicon set from logo.png"
```

### Icon Retrieval
```bash
# Get specific icons
"Get a cloud icon from Lucide"
"Search for a settings gear icon"
```

### Figma Integration
```bash
# Extract assets from Figma
"Export the logo from my Figma file"
```

## Best Practices

1. **Consistent Branding**: Use the same color palette and style across all generated assets
2. **File Naming**: Follow consistent naming conventions for generated files
3. **Optimization**: Let the tools handle image optimization and format conversion
4. **Version Control**: Commit generated assets to ensure reproducibility
5. **Backup**: Keep original source files for future modifications

## Dependencies

- MCP server infrastructure
- Image processing libraries
- Icon font libraries
- Figma API access (for figma-developer-mcp)
- AI image generation models (for image-gen)

## Troubleshooting

### Common Issues
- **Server Connection**: Ensure MCP servers are running and accessible
- **API Limits**: Check rate limits for AI generation services
- **File Formats**: Verify input files meet server requirements
- **Permissions**: Ensure proper access to Figma files when using figma-developer-mcp

### Support
- Check individual server documentation for specific error codes
- Verify network connectivity for external API calls
- Ensure all required environment variables are set

## Future Enhancements

- Integration with additional design tools
- Automated branding consistency checks
- Batch processing capabilities
- Custom style guide generation