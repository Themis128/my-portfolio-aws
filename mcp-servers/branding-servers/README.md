# Cloudless.gr Branding Servers

This directory contains MCP servers for generating all the branding assets needed for your cloudless.gr brand.

## Available Servers

### 1. Auto-Favicon Server (`auto-favicon/`)
Generates complete favicon sets and website assets from your logo.

**Tools:**
- `generate_favicon_set` - Creates favicon files in multiple sizes and formats
- `generate_website_assets` - Creates header, footer, mobile, and theme variants

**Usage:**
```bash
cd mcp-servers/branding-servers/auto-favicon
npm install
npm start
```

### 2. Image Generation Server (`image-gen/`)
Generates social media banners, print assets, and marketing materials.

**Tools:**
- `generate_social_media_banners` - Creates banners for LinkedIn, Twitter, Facebook, Instagram, YouTube
- `generate_print_assets` - Creates business cards, letterhead, brochures, flyers
- `generate_marketing_assets` - Creates email headers, presentation templates, ads, thumbnails

**Usage:**
```bash
cd mcp-servers/branding-servers/image-gen
npm install
npm start
```

## Asset Generation Workflow

### High Priority Assets (Start Here)
1. **Favicon & Website Assets** - Essential for immediate brand recognition
   - Use `auto-favicon` server
   - Generates: favicon.ico, PNG favicons, header/footer logos, mobile logos, dark/light variants

### Medium Priority Assets
2. **Social Media Banners** - Crucial for professional networking
   - Use `image-gen` server
   - Generates: LinkedIn banners, Twitter headers, Facebook covers, Instagram assets, YouTube art

### Low Priority Assets
3. **Print & Merchandise** - For when digital presence is established
   - Use `image-gen` server
   - Generates: Business cards, letterhead, brochures, flyers, merchandise templates

## Example Usage

### Generate Favicon Set
```javascript
// MCP Tool Call
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

### Generate Social Media Banners
```javascript
// MCP Tool Call
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

### Generate Print Assets
```javascript
// MCP Tool Call
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

## Generated Assets

### Favicon Set
- `favicon-16x16.png`, `favicon-32x32.png`, etc.
- `favicon.ico` (multi-size)
- `logo-header.png`, `logo-footer.png`, `logo-mobile.png`
- `logo-dark.png`, `logo-light.png`

### Social Media Banners
- `linkedin-company-banner.png` (1128x376)
- `linkedin-profile-cover.png` (1584x396)
- `twitter-header.png` (1500x500)
- `facebook-page-cover.png` (820x312)
- `instagram-profile.png` (320x320)
- `youtube-channel-art.png` (2560x1440)

### Print Assets
- `business-card.pdf` (3.5x2 inches)
- `letterhead.pdf` (A4)
- `brochure.pdf` (A5)
- `flyer.pdf` (A4)

### Marketing Assets
- `email-header.png` (600x200)
- `presentation-template.png` (1920x1080)
- `webinar-banner.png` (1920x1080)
- `youtube-thumbnail.png` (1280x720)

## Integration with Your Portfolio

The generated assets are designed to integrate seamlessly with your Next.js portfolio:

1. **Favicons** go in `public/` directory
2. **Social media banners** can be used in meta tags
3. **Print assets** are ready for professional printing
4. **Marketing assets** can be used in email campaigns and presentations

## Brand Consistency

All generated assets maintain:
- Consistent sky gradient colors from your main logo
- Proper typography using Inter font family
- Brand colors: #3B82F6 (primary), #1D4ED8 (secondary)
- Professional appearance suitable for B2B and tech companies

[Response interrupted by user]
