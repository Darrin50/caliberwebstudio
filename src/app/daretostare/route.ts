import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  const html = await readFile(
    path.join(process.cwd(), 'public', 'dare2stare-demo.html'),
    'utf-8'
  );
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
