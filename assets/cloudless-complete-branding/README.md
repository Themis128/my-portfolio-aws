# Cloudless.gr Complete Branding Package

## 📦 Package Contents

### 📁 logos/
| File | Format | Use Case |
|------|--------|----------|
| `cloudless-logo-light.svg` | SVG | Light backgrounds |
| `cloudless-logo-light.png` | PNG | Light backgrounds (800px) |
| `cloudless-logo-dark.svg` | SVG | Dark backgrounds |
| `cloudless-logo-dark.png` | PNG | Dark backgrounds (800px) |
| `cloudless-icon.svg` | SVG | Icon mark / app icon |
| `cloudless-icon-512.png` | PNG | High-res icon (512px) |

### 📁 favicons/
| File | Size | Use Case |
|------|------|----------|
| `favicon.ico` | 16,32,48 | Browser tab (legacy) |
| `favicon-16x16.png` | 16×16 | Browser tab |
| `favicon-32x32.png` | 32×32 | Taskbar |
| `favicon-48x48.png` | 48×48 | Desktop |
| `favicon-64x64.png` | 64×64 | High DPI |
| `favicon-128x128.png` | 128×128 | Chrome Web Store |
| `favicon-256x256.png` | 256×256 | Large icons |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `apple-touch-icon-152x152.png` | 152×152 | iPad |
| `apple-touch-icon-167x167.png` | 167×167 | iPad Pro |
| `android-chrome-192x192.png` | 192×192 | Android |
| `android-chrome-512x512.png` | 512×512 | Android splash |
| `mstile-150x150.png` | 150×150 | Windows tile |
| `mstile-310x310.png` | 310×310 | Windows large tile |
| `site.webmanifest` | JSON | PWA manifest |
| `browserconfig.xml` | XML | Windows config |
| `favicon-html.html` | HTML | Copy-paste snippet |

### 📁 social-media/
| File | Size | Platform |
|------|------|----------|
| `linkedin-banner-1584x396.svg/png` | 1584×396 | LinkedIn cover |
| `facebook-cover-820x312.svg/png` | 820×312 | Facebook cover |
| `twitter-header-1500x500.svg/png` | 1500×500 | Twitter/X header |
| `youtube-banner-2560x1440.svg/png` | 2560×1440 | YouTube banner |
| `instagram-profile-320x320.svg/png` | 320×320 | Instagram profile |
| `instagram-post-1080x1080.svg/png` | 1080×1080 | Instagram post |
| `whatsapp-profile-500x500.svg/png` | 500×500 | WhatsApp/Telegram |
| `email-signature-600x200.svg/png` | 600×200 | Email signature |

### 📁 colors/
| File | Format | Use Case |
|------|--------|----------|
| `brand-colors.css` | CSS | CSS custom properties |
| `tailwind-brand-colors.ts` | TypeScript | Tailwind config |

---

## 🎨 Brand Colors

### Primary Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Sky Blue | `#0284c7` | Primary accent |
| Light Sky | `#38bdf8` | Secondary accent |
| Deep Sky | `#0369a1` | Hover states |
| Dark Sky | `#0c4a6e` | Active states |

### Neutral Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Slate 50 | `#f8fafc` | Light backgrounds |
| Slate 800 | `#1e293b` | Primary text |
| Slate 900 | `#0f172a` | Dark backgrounds |

### Cloud Palette
| Color | Hex | Usage |
|-------|-----|-------|
| White | `#ffffff` | Cloud highlights |
| Light | `#f0f9ff` | Cloud midtones |
| Base | `#e0f2fe` | Cloud base |
| Shadow | `#94a3b8` | Cloud shadows |

---

## ✏️ Typography

**Font Family:** Plus Jakarta Sans  
**Fallback:** system-ui, sans-serif

### Usage
- **Logo "cloudless":** 700 (Bold)
- **Logo ".gr":** 600 (SemiBold)
- **Headings:** 600-700
- **Body:** 400-500

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🚀 Quick Start

### 1. Copy favicons to your public folder
```bash
cp -r favicons/* public/
```

### 2. Add to your HTML `<head>`
Copy contents from `favicons/favicon-html.html`

### 3. Import brand colors
```css
@import 'colors/brand-colors.css';
```

### 4. Configure Tailwind (optional)
```typescript
import { cloudlessColors } from './colors/tailwind-brand-colors';
```

---

## 📱 Social Media Sizes Reference

| Platform | Asset | Dimensions |
|----------|-------|------------|
| LinkedIn | Banner | 1584×396 |
| LinkedIn | Profile | 400×400 |
| Facebook | Cover | 820×312 |
| Facebook | Profile | 180×180 |
| Twitter/X | Header | 1500×500 |
| Twitter/X | Profile | 400×400 |
| Instagram | Profile | 320×320 |
| Instagram | Post | 1080×1080 |
| Instagram | Story | 1080×1920 |
| YouTube | Banner | 2560×1440 |
| YouTube | Profile | 800×800 |
| WhatsApp | Profile | 500×500 |

---

## 🏢 Brand Information

**Company:** Cloudless.gr  
**Type:** Digital Agency  
**Location:** Greece  

**Services:**
- Digital Transformation
- Cloud Computing
- Web Design
- Web Applications
- AI Bots & Automation
- Big Data Solutions
- Data Analytics

---

## 📄 License

All assets © Cloudless.gr. For internal use only.
