'use client';

import { useEffect, useRef } from 'react';

/**
 * DetroitFrameSequencer (exported as DetroitScrollVideo for import compatibility)
 *
 * Apple-style scroll-driven frame animation.
 * 120 JPEG frames extracted from the detroit-manifesto.mp4 truck assembly
 * sequence are painted frame-by-frame onto a canvas as the user scrolls.
 * No <video> element — pure image sequence.
 *
 * Frames live in public/images/detroit-frames/frame-0000.jpg … frame-0119.jpg
 * Generated once via: node scripts/extract-detroit-frames.mjs
 */

const TOTAL_FRAMES = 120;
const FRAME_BASE   = '/images/detroit-frames/frame-';

function frameUrl(i: number) {
  return `${FRAME_BASE}${String(i).padStart(4, '0')}.jpg`;
}

export default function DetroitScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const rafRef       = useRef<number>(0);
  const lastIdx      = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Resize canvas to viewport ──────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw current frame after resize so it fills the new size
      if (lastIdx.current >= 0) drawFrame(lastIdx.current);
    };
    resize();

    // ── Load all frames ────────────────────────────────────────────
    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = frameUrl(i);
      img.onload = () => {
        if (i === 0) drawFrame(0);   // Paint first frame the instant it arrives
      };
      return img;
    });
    framesRef.current = images;

    // ── Cover-fill draw helper ────────────────────────────────────
    function drawFrame(idx: number) {
      const img = framesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const scale = Math.max(
        canvas!.width  / img.naturalWidth,
        canvas!.height / img.naturalHeight,
      );
      const w = img.naturalWidth  * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas!.width  - w) / 2;
      const y = (canvas!.height - h) / 2;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(img, x, y, w, h);
      lastIdx.current = idx;
    }

    // ── Scrub on scroll ────────────────────────────────────────────
    const scrub = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect       = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const progress   = Math.max(0, Math.min(1, -rect.top / scrollable));
      const idx        = Math.round(progress * (TOTAL_FRAMES - 1));
      if (idx !== lastIdx.current) drawFrame(idx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(scrub);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    scrub(); // Initial draw in case page loads scrolled

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: '350vh' }}
    >
      {/* Sticky viewport — canvas stays pinned while container scrolls past */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}
