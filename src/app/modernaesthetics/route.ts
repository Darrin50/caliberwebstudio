import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  let html = await readFile(
    path.join(process.cwd(), 'public', 'modernaesthetics', 'index.html'),
    'utf-8'
  );
  html = html.replace('<head>', '<head><base href="/modernaesthetics/">');
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
