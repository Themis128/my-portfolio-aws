# Cline MCP Configuration

This directory contains the Cline MCP (Model Context Protocol) server configuration for company branding and development tools.

## Overview

The Cline MCP configuration provides a centralized way to manage multiple MCP servers that offer various development and branding tools. The configuration is defined in `cline_mcp_settings.json`.

## Available MCP Servers

### 1. File Server (`file-server`)
**Purpose**: Access files and folders on D: drive with cross-platform path resolution
**Location**: `./mcp-server/`
**Tools**:
- `list_files` - List files and directories
- `read_file` - Read file contents
- `search_files` - Search for files by pattern
- `extract_pdf_content` - Extract text from PDF files

### 2. Auto Favicon Generator (`auto-favicon`)
**Purpose**: Generate complete favicon sets and website assets from logos
**Location**: `./mcp-servers/branding-servers/auto-favicon/`
**Tools**:
- `generate_favicon_set` - Create favicon files in multiple sizes and formats
- `generate_website_assets` - Create header, footer, mobile, and theme variants

### 3. Image Generation Server (`image-gen`)
**Purpose**: Generate social media banners, print assets, and marketing materials
**Location**: `./mcp-servers/branding-servers/image-gen/`
**Tools**:
- `generate_social_media_banners` - Create banners for LinkedIn, Twitter, Facebook, Instagram, YouTube
- `generate_print_assets` - Create business cards, letterhead, brochures, flyers
- `generate_marketing_assets` - Create email headers, presentation templates, ads, thumbnails

### 4. Magic UI Design (`magicuidesign`)
**Purpose**: Generate Magic UI components and designs
**Location**: `./mcp-servers/branding-servers/magicuidesign/`
**Tools**:
- `generate_magic_ui_components` - Generate Magic UI component designs

### 5. Shadcn UI Components (`shadcn`)
**Purpose**: Generate shadcn/ui components
**Location**: `./mcp-servers/branding-servers/shadcn/`
**Tools**:
- `generate_shadcn_components` - Generate shadcn/ui component implementations

### 6. Tailwind Utilities (`tailwindcss`)
**Purpose**: Generate Tailwind CSS utilities and configurations
**Location**: `./mcp-servers/branding-servers/tailwindcss/`
**Tools**:
- `generate_tailwind_utilities` - Generate custom Tailwind CSS utilities

### 7. Flowbite + Figma-to-code (`flowbite`)
**Purpose**: Generate Flowbite components and Figma-to-code conversions
**Location**: `./mcp-servers/branding-servers/flowbite/`
**Tools**:
- `generate_flowbite_components` - Generate Flowbite component implementations
- `convert_figma_to_code` - Convert Figma designs to code

### 8. PDF Reader (`pdf-reader`)
**Purpose**: Extract content from PDF files
**Location**: `./mcp-servers/branding-servers/pdf-reader/`
**Tools**:
- `extract_pdf_content` - Extract text and metadata from PDF files

### 9. 200K+ Iconify Icons (`pickapicon200k`)
**Purpose**: Access to 200K+ Iconify icons
**Location**: `./mcp-servers/branding-servers/pickapicon200k/`
**Tools**:
- `search_icons` - Search for icons in the Iconify collection
- `get_icon_svg` - Get SVG content for specific icons

### 10. Bootstrap, Feather, Lucide Icons (`icon-search`)
**Purpose**: Search and provide Bootstrap, Feather, and Lucide icons
**Location**: `./mcp-servers/branding-servers/icon-search/`
**Tools**:
- `search_bootstrap_icons` - Search for Bootstrap icons
- `search_feather_icons` - Search for Feather icons
- `search_lucide_icons` - Search for Lucide icons

### 11. AI Logo Generation (Replicate) (`image-gen-ai`)
**Purpose**: Generate logos using AI via Replicate
**Location**: `./mcp-servers/branding-servers/image-gen-ai/`
**Tools**:
- `generate_ai_logo` - Generate logos using AI models

## Branding Configuration

The configuration includes comprehensive branding settings:

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

## Usage

### Starting MCP Servers

Each MCP server can be started individually:

```bash
# Start the file server
cd mcp-server
npm install
npm start

# Start the auto-favicon server
cd mcp-servers/branding-servers/auto-favicon
npm install
npm start

# Start the image generation server
cd mcp-servers/branding-servers/image-gen
npm install
npm start
```

### Using MCP Tools

MCP tools can be called through compatible MCP clients. Here are some examples:

#### Generate Favicon Set
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

#### Generate Social Media Banners
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

#### List Files on D: Drive
```json
{
  "server_name": "file-server",
  "tool_name": "list_files",
  "arguments": {
    "directory": "D:\\projects\\my-portfolio"
  }
}
```

#### Extract PDF Content
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

## Configuration Structure

The `cline_mcp_settings.json` file follows this structure:

```json
{
  "version": "1.0.0",
  "name": "Cline MCP",
  "description": "Cline MCP server configuration for company branding and development tools",
  "servers": {
    // Server configurations
  },
  "branding": {
    // Branding configuration
  },
  "metadata": {
    // Metadata about the configuration
  }
}
```

### Server Configuration

Each server includes:
- `name`: Human-readable server name
- `description`: Server description
- `server_type`: Type of server (stdio, http, etc.)
- `command`: Command to start the server
- `working_directory`: Directory to run the command from
- `enabled`: Whether the server is enabled
- `tools`: Array of available tools with their schemas

### Tool Schema

Each tool includes:
- `name`: Tool name
- `description`: Tool description
- `input_schema`: JSON schema defining the tool's input parameters

## Integration with Development Workflow

### 1. File Management
Use the file server to access and manage files across different platforms (Windows D: drive to Linux paths).

### 2. Branding Assets
Generate consistent branding assets across all platforms using the auto-favicon and image generation servers.

### 3. UI Development
Create UI components using shadcn, Magic UI, and Flowbite servers.

### 4. Design Integration
Convert Figma designs to code and extract content from PDFs.

### 5. Icon Management
Access and manage icons from multiple icon libraries.

## Development Notes

### Adding New Servers
To add a new MCP server:

1. Create the server implementation in `./mcp-servers/branding-servers/`
2. Add the server configuration to `cline_mcp_settings.json`
3. Ensure the server follows the MCP protocol
4. Test the server independently before integration

### Adding New Tools
To add a new tool to an existing server:

1. Implement the tool in the server code
2. Add the tool definition to the server's `tools` array in the configuration
3. Define the input schema for the tool
4. Test the tool functionality

### Branding Updates
To update branding:

1. Modify the `branding` section in `cline_mcp_settings.json`
2. Update the logo files at the specified paths
3. Ensure consistency across all generated assets

## Troubleshooting

### Server Not Starting
- Check that Node.js is installed
- Verify the server directory exists
- Check for missing dependencies and run `npm install`

### Tool Not Found
- Verify the tool is defined in the configuration
- Check that the server is running
- Ensure the tool name matches exactly

### Path Resolution Issues
- Use absolute paths when possible
- For Windows D: drive paths, the file server will automatically resolve them to Linux paths
- Test path resolution with the `list_files` tool first

## License

This configuration is licensed under the MIT License.

## Support

For support and questions:
- Check the individual server README files
- Review the MCP protocol documentation
- Report issues in the project repository
