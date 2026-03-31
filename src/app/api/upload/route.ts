import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { writeFile, mkdir } from 'fs/promises'

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/svg+xml',
])

const ALLOWED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.heic', '.svg',
])

const MAX_SIZE_BYTES = 20 * 1024 * 1024 // 20 MB

function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const slug = (formData.get('slug') as string | null) || 'uploads'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // ── Validate type ─────────────────────────────────────────────────────
    const ext = path.extname(file.name).toLowerCase()
    if (!ALLOWED_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        {
          error: `File type not allowed. Accepted: JPG, PNG, WebP, HEIC, SVG`,
        },
        { status: 400 }
      )
    }

    // ── Validate size ─────────────────────────────────────────────────────
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Max size is 20MB (file is ${(file.size / 1024 / 1024).toFixed(1)}MB)` },
        { status: 400 }
      )
    }

    // ── Sanitize filename ─────────────────────────────────────────────────
    const baseName = path.basename(file.name, ext)
    const safeBase = sanitizeFileName(baseName) || 'photo'
    const timestamp = Date.now()
    const fileName = `${safeBase}-${timestamp}${ext}`
    const safeSlug = sanitizeFileName(slug) || 'uploads'

    // ── TODO: Vercel Blob (preferred in production) ───────────────────────
    // Uncomment when @vercel/blob is installed and BLOB_READ_WRITE_TOKEN is set:
    //
    // if (process.env.BLOB_READ_WRITE_TOKEN) {
    //   const { put } = await import('@vercel/blob')
    //   const blob = await put(`onboarding/${safeSlug}/${fileName}`, file, {
    //     access: 'public',
    //   })
    //   return NextResponse.json({
    //     url: blob.url,
    //     fileName,
    //     fileSize: file.size,
    //   })
    // }

    // ── Local filesystem fallback ─────────────────────────────────────────
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', safeSlug)
    await mkdir(uploadDir, { recursive: true })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    const url = `/uploads/${safeSlug}/${fileName}`

    return NextResponse.json({
      url,
      fileName,
      fileSize: file.size,
    })
  } catch (err) {
    console.error('[upload] Error:', err)
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}

// Increase body size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}
