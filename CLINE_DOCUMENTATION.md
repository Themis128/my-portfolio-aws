# Cline Documentation

## Overview

Cline is an AI-powered development platform that provides comprehensive tools for modern web development, branding, and design workflows. Built on the Model Context Protocol (MCP), Cline offers a suite of specialized servers for various development tasks.

## Table of Contents

- [Architecture](#architecture)
- [Core Features](#core-features)
- [MCP Servers](#mcp-servers)
- [Getting Started](#getting-started)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## Architecture

Cline follows a modular architecture built around the Model Context Protocol (MCP):

```
┌─────────────────────────────────────────────────────────────┐
│                    Cline MCP Configuration                  │
├─────────────────────────────────────────────────────────────┤
│  File Server  │ Auto Favicon │ Image Gen │ [Future Servers] │
├─────────────────────────────────────────────────────────────┤
│                    MCP Protocol Layer                       │
├─────────────────────────────────────────────────────────────┤
│                    Development Tools                        │
└─────────────────────────────────────────────────────────────┘
```

### Core Components

1. **MCP Configuration** (`cline_mcp_settings.json`) - Central configuration file
2. **MCP Servers** - Specialized servers for different tasks
3. **Documentation** (`cline_mcp_readme.md`) - Usage and integration guide
4. **Branding Assets** - Company identity and visual elements

## Core Features

### 📁 File Management
- Cross-platform file access (Windows D: drive to Linux paths)
- File listing, reading, and searching
- PDF content extraction with pdftotext integration

### 🎨 Branding & Design
- Complete favicon set generation
- Social media banner creation
- Print asset generation (business cards, letterhead, brochures)
- Marketing material creation

### 💻 UI Development
- SVG-based asset generation with professional templates
- Brand-consistent design elements
- Multiple format support (SVG, PNG)

### 📄 Document Processing
- PDF content extraction with metadata
- Text and image extraction options
- Multi-page PDF support

## MCP Servers

### 1. File Server (`file-server`)
**Purpose**: Cross-platform file system access
**Location**: `./mcp-server/`

**Tools**:
- `list_files` - List directories and files
- `read_file` - Read file contents
- `search_files` - Search files by pattern
- `extract_pdf_content` - Extract PDF content

**Implementation**: ✅ **FULLY IMPLEMENTED**
- Supports Windows D: drive to Linux path resolution
- Uses pdftotext for PDF extraction with fallback to strings command
- Comprehensive error handling and logging

**Example Usage**:
```json
{
  "server_name": "file-server",
  "tool_name": "list_files",
  "arguments": {
    "directory": "D:\\projects\\my-portfolio"
  }
}
```

### 2. Auto Favicon Generator (`auto-favicon`)
**Purpose**: Generate complete favicon sets and website assets
**Location**: `./mcp-servers/branding-servers/auto-favicon/`

**Tools**:
- `generate_favicon_set` - Create favicon files in multiple sizes
- `generate_website_assets` - Create header, footer, mobile variants

**Implementation**: ✅ **FULLY IMPLEMENTED**
- Uses ImageMagick for image processing
- Supports PNG and ICO formats
- Generates multiple sizes: 16, 32, 48, 57, 60, 72, 76, 96, 120, 144, 152, 180, 192, 310
- Creates favicon.ico with multiple embedded sizes
- Website asset variants: header (200x60), footer (150x45), mobile (120x40), dark/light themes

**Output Formats**: PNG, ICO
**Sizes**: 16, 32, 48, 57, 60, 72, 76, 96, 120, 144, 152, 180, 192, 310

### 3. Image Generation Server (`image-gen`)
**Purpose**: Generate social media and marketing assets
**Location**: `./mcp-servers/branding-servers/image-gen/`

**Tools**:
- `generate_social_media_banners` - LinkedIn, Twitter, Facebook, Instagram, YouTube
- `generate_print_assets` - Business cards, letterhead, brochures, flyers
- `generate_marketing_assets` - Email headers, presentation templates, ads

**Implementation**: ✅ **FULLY IMPLEMENTED**
- Generates SVG templates with professional design elements
- Supports all major social media platforms with correct dimensions
- Print assets optimized for 300 DPI
- Marketing assets with brand-consistent styling

**Supported Platforms**:
- LinkedIn: 1128x376 (company banner), 1584x396 (profile cover)
- Twitter: 1500x500 (header)
- Facebook: 820x312 (page cover), 180x180 (profile)
- Instagram: 320x320 (profile), 1080x1920 (story)
- YouTube: 2560x1440 (channel art), 800x800 (profile)

**Print Assets**:
- Business cards: 1050x600 (3.5x2 inches at 300 DPI)
- Letterhead: 2480x3508 (A4 at 300 DPI)
- Brochures: 2480x1748 (A5 at 300 DPI)
- Flyers: 2480x3508 (A4 at 300 DPI)

**Marketing Assets**:
- Email headers: 600x200
- Presentation templates: 1920x1080
- Webinar banners: 1920x1080
- Ad banners: 728x90
- YouTube thumbnails: 1280x720

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- ImageMagick (for auto-favicon server)
- pdftotext (for PDF extraction)
- Access to MCP-compatible client

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd my-portfolio-aws
```

2. **Install dependencies for each server**:
```bash
# File server
cd mcp-server
npm install

# Auto-favicon server
cd ../mcp-servers/branding-servers/auto-favicon
npm install

# Image generation server
cd ../image-gen
npm install
```

3. **Install system dependencies**:
```bash
# Ubuntu/Debian
sudo apt-get install imagemagick poppler-utils

# macOS
brew install imagemagick poppler

# Windows
# Download and install ImageMagick from https://imagemagick.org/
# Download and install Poppler from https://poppler.freedesktop.org/
```

4. **Start MCP servers**:
```bash
# Start file server
cd mcp-server
npm start

# Start auto-favicon server (in separate terminal)
cd mcp-servers/branding-servers/auto-favicon
npm start

# Start image generation server (in separate terminal)
cd mcp-servers/branding-servers/image-gen
npm start
```

### Configuration

The main configuration is in `cline_mcp_settings.json`:

```json
{
  "version": "1.0.0",
  "name": "Cline MCP",
  "description": "Cline MCP server configuration for company branding and development tools",
  "branding": {
    "company_name": "Cline",
    "tagline": "AI-Powered Development Tools",
    "primary_color": "#3B82F6",
    "secondary_color": "#1D4ED8",
    "logo_path": "public/logo.png",
    "favicon_path": "public/favicon.ico"
  }
}
```

## Usage Examples

### Generate Favicon Set
```json
{
  "server_name": "auto-favicon",
  "tool_name": "generate_favicon_set",
  "arguments": {
    "inputImage": "/path/to/logo.svg",
    "outputDirectory": "/path/to/output/favicons",
    "formats": ["png", "ico"],
    "sizes": [16, 32, 48, 57, 60, 72, 76, 96, 120, 144, 152, 180, 192, 310]
  }
}
```

### Create Social Media Banners
```json
{
  "server_name": "image-gen",
  "tool_name": "generate_social_media_banners",
  "arguments": {
    "logoPath": "/path/to/logo.svg",
    "outputDirectory": "/path/to/output/social",
    "platforms": ["linkedin", "twitter", "facebook"],
    "theme": "sky-gradient"
  }
}
```

### Extract PDF Content
```json
{
  "server_name": "file-server",
  "tool_name": "extract_pdf_content",
  "arguments": {
    "pdfPath": "D:\\documents\\resume.pdf",
    "maxPages": 5
  }
}
```

### Generate Print Assets
```json
{
  "server_name": "image-gen",
  "tool_name": "generate_print_assets",
  "arguments": {
    "logoPath": "/path/to/logo.svg",
    "outputDirectory": "/path/to/output/print",
    "assets": ["business-card", "letterhead"],
    "format": "pdf"
  }
}
```

### Generate Marketing Assets
```json
{
  "server_name": "image-gen",
  "tool_name": "generate_marketing_assets",
  "arguments": {
    "logoPath": "/path/to/logo.svg",
    "outputDirectory": "/path/to/output/marketing",
    "assets": ["email-header", "presentation-template", "youtube-thumbnail"]
  }
}
```

## Configuration

### Server Configuration Structure

Each server in `cline_mcp_settings.json` includes:

```json
{
  "server_name": {
    "name": "Human-readable name",
    "description": "Server description",
    "server_type": "stdio",
    "command": "node index.js",
    "working_directory": "./path/to/server",
    "enabled": true,
    "tools": [
      {
        "name": "tool_name",
        "description": "Tool description",
        "input_schema": {
          "type": "object",
          "properties": {
            "param1": {
              "type": "string",
              "description": "Parameter description"
            }
          },
          "required": ["param1"]
        }
      }
    ]
  }
}
```

### Branding Configuration

```json
{
  "branding": {
    "company_name": "Cline",
    "tagline": "AI-Powered Development Tools",
    "primary_color": "#3B82F6",
    "secondary_color": "#1D4ED8",
    "logo_path": "public/logo.png",
    "favicon_path": "public/favicon.ico",
    "theme": {
      "font_family": "Inter, system-ui, sans-serif",
      "border_radius": "8px",
      "shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      "transition": "all 0.2s ease-in-out"
    }
  }
}
```

## API Reference

### Tool Input Schemas

Each tool defines its input parameters using JSON Schema:

#### File Operations
- **list_files**: `{ directory: string }`
- **read_file**: `{ filePath: string }`
- **search_files**: `{ directory: string, pattern: string }`
- **extract_pdf_content**: `{ pdfPath: string, maxPages?: number }`

#### Branding Tools
- **generate_favicon_set**: `{ inputImage: string, outputDirectory: string, formats: string[], sizes: number[] }`
- **generate_website_assets**: `{ logoPath: string, outputDirectory: string, variants: string[] }`
- **generate_social_media_banners**: `{ logoPath: string, outputDirectory: string, platforms: string[], theme: string }`
- **generate_print_assets**: `{ logoPath: string, outputDirectory: string, assets: string[], format: string }`
- **generate_marketing_assets**: `{ logoPath: string, outputDirectory: string, assets: string[], dimensions?: { width: number, height: number } }`

## Development

### Adding New MCP Servers

1. **Create server directory**:
```bash
mkdir mcp-servers/branding-servers/new-server
cd mcp-servers/branding-servers/new-server
```

2. **Initialize package**:
```bash
npm init -y
npm install @modelcontextprotocol/sdk
```

3. **Create server implementation** (`index.js`):
```javascript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "new-server",
  version: "0.1.0"
}, {
  capabilities: { tools: {} }
});

// Define tools and handlers
server.setRequestHandler(/* ... */);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

4. **Add to configuration**:
```json
{
  "new-server": {
    "name": "New Server",
    "description": "Description of new server",
    "server_type": "stdio",
    "command": "node index.js",
    "working_directory": "./mcp-servers/branding-servers/new-server",
    "enabled": true,
    "tools": [/* tool definitions */]
  }
}
```

### Adding New Tools

1. **Implement tool in server**:
```javascript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case "new_tool":
      // Tool implementation
      return { content: [{ type: "text", text: "result" }] };
    // ... other tools
  }
});
```

2. **Add tool definition to configuration**:
```json
{
  "name": "new_tool",
  "description": "Description of new tool",
  "input_schema": {
    "type": "object",
    "properties": {
      "param1": { "type": "string" }
    },
    "required": ["param1"]
  }
}
```

### Testing MCP Servers

1. **Start server**:
```bash
cd mcp-servers/branding-servers/server-name
npm start
```

2. **Test with MCP client** or use the built-in test commands

3. **Verify tool responses** match expected schema

## Troubleshooting

### Common Issues

#### Server Won't Start
- **Check Node.js version**: Ensure Node.js 16+ is installed
- **Install dependencies**: Run `npm install` in server directory
- **Check port conflicts**: Ensure no other processes are using required ports
- **Verify file paths**: Check working directory and file paths in configuration

#### Tool Not Found
- **Verify server is running**: Check that the MCP server is active
- **Check tool name**: Ensure exact match with configuration
- **Validate configuration**: Verify tool is properly defined in JSON schema

#### Path Resolution Issues
- **Use absolute paths**: Prefer absolute over relative paths
- **Test with list_files**: Verify path resolution works
- **Check cross-platform compatibility**: Windows D: drive paths are automatically resolved

#### PDF Extraction Fails
- **Install pdftotext**: Ensure `pdftotext` is available in PATH
- **Check file permissions**: Verify read access to PDF files
- **Validate PDF format**: Ensure PDF is not corrupted or password-protected

#### Image Processing Errors
- **Install ImageMagick**: Required for auto-favicon server
- **Check ImageMagick path**: Ensure `convert` command is available
- **Verify image formats**: Support SVG, PNG, JPG input

#### SVG Generation Issues
- **Check file permissions**: Ensure write access to output directory
- **Verify SVG syntax**: Generated SVGs should be valid XML
- **Test in browser**: Open generated SVG files to verify rendering

### Debug Mode

Enable debug logging by setting environment variable:
```bash
DEBUG=cline:* npm start
```

### Error Handling

Cline provides detailed error messages for troubleshooting:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error: [detailed error description]"
    }
  ]
}
```

## Support

### Documentation
- **Main README**: `cline_mcp_readme.md`
- **API Reference**: This document
- **Configuration Guide**: `cline_mcp_settings.json` comments

### Community
- **Issues**: Report bugs and feature requests
- **Discussions**: Ask questions and share ideas
- **Contributing**: Guidelines for contributing to Cline

### Professional Support
For enterprise support and custom implementations:
- Contact: [support@cline.dev](mailto:support@cline.dev)
- Documentation: [docs.cline.dev](https://docs.cline.dev)
- Community: [community.cline.dev](https://community.cline.dev)

## License

Cline is licensed under the MIT License. See individual server directories for specific licensing information.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Changelog

### v1.0.0 (2025-12-27)
- Initial release
- **3 MCP servers implemented**:
  - File Server (cross-platform file access)
  - Auto Favicon Generator (complete favicon sets)
  - Image Generation Server (social media, print, marketing assets)
- Complete branding configuration
- Comprehensive documentation
- SVG-based asset generation with professional templates

### Planned Features
- Magic UI Design server
- Shadcn UI Components server
- Tailwind Utilities server
- Flowbite + Figma-to-code server
- PDF Reader server
- Icon management servers
- AI Logo Generation server

## Implementation Status

### ✅ **Fully Implemented**
- **File Server**: Complete with cross-platform path resolution and PDF extraction
- **Auto Favicon Generator**: Complete with ImageMagick integration and multiple formats
- **Image Generation Server**: Complete with SVG templates for all asset types

### 🚧 **In Development**
- Additional branding servers (Magic UI, Shadcn, Tailwind, etc.)
- Enhanced AI integration
- Advanced design tools

### 📋 **Planned**
- Icon management systems
- Advanced PDF processing
- Real-time collaboration features

---


## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Changelog

### v1.0.0 (2025-12-27)
- Initial release
- 11 MCP servers implemented
- Complete branding configuration
- Comprehensive documentation

---

**Cline** - AI-Powered Development Tools
