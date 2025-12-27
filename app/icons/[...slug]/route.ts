import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest, context: { params: { slug: string[] } | Promise<{ slug: string[] }>; }) {
  const paramsObj = context.params instanceof Promise ? await context.params : context.params;
  const slugParts = paramsObj.slug || [];
  const filename = slugParts.join('/');
  const iconsDir = path.join(process.cwd(), 'public', 'icons');
  const filePath = path.join(iconsDir, filename + '.svg');

  try {
    if (fs.existsSync(filePath)) {
      const svg = fs.readFileSync(filePath, 'utf8');
      return new NextResponse(svg, { status: 200, headers: { 'Content-Type': 'image/svg+xml' } });
    }
  } catch {
    // ignore and fall through to placeholder
  }

  // Generic placeholder SVG
  const placeholder = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="20" height="20" rx="3" ry="3" fill="#e6eef8" stroke="#cbdff0"/>
  <path d="M7 12h10M7 8h10M7 16h10" stroke="#4b5563" />
</svg>`;

  return new NextResponse(placeholder, { status: 200, headers: { 'Content-Type': 'image/svg+xml' } });
}
