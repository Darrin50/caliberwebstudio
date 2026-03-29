'use client';

import { useEffect, useRef } from 'react';

interface FloatEl {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'hexagon' | 'circle' | 'triangle' | 'diamond' | 'cross' | 'ring' | 'square' | 'dot-grid';
  color: string;
  opacity: number;
  dragging: boolean;
  offsetX: number;
  offsetY: number;
  floatPhase: number;
  floatAmplitude: number;
  baseY: number;
}

const SHAPES: FloatEl['shape'][] = ['hexagon', 'circle', 'triangle', 'diamond', 'cross', 'ring', 'square', 'dot-grid'];
const COLORS = ['#1e3d8f', '#2a52b0', '#a8b8c8', '#3a6fd8', '#1e3d8f'];

function drawShape(ctx: CanvasRenderingContext2D, el: FloatEl) {
  ctx.save();
  ctx.translate(el.x, el.y);
  ctx.rotate(el.rotation);
  ctx.globalAlpha = el.opacity;
  ctx.strokeStyle = el.color;
  ctx.lineWidth = 1.5;
  ctx.fillStyle = 'transparent';

  const s = el.size;

  switch (el.shape) {
    case 'hexagon': {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = Math.cos(angle) * s;
        const py = Math.sin(angle) * s;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      // Inner hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = Math.cos(angle) * (s * 0.5);
        const py = Math.sin(angle) * (s * 0.5);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.globalAlpha = el.opacity * 0.4;
      ctx.stroke();
      break;
    }
    case 'circle': {
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.stroke();
      // Cross inside
      ctx.globalAlpha = el.opacity * 0.3;
      ctx.beginPath();
      ctx.moveTo(-s * 0.5, 0); ctx.lineTo(s * 0.5, 0);
      ctx.moveTo(0, -s * 0.5); ctx.lineTo(0, s * 0.5);
      ctx.stroke();
      break;
    }
    case 'triangle': {
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'diamond': {
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.7, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.7, 0);
      ctx.closePath();
      ctx.stroke();
      // Horizontal line
      ctx.globalAlpha = el.opacity * 0.3;
      ctx.beginPath();
      ctx.moveTo(-s * 0.7, 0);
      ctx.lineTo(s * 0.7, 0);
      ctx.stroke();
      break;
    }
    case 'cross': {
      const w = s * 0.25;
      ctx.beginPath();
      ctx.moveTo(-w, -s); ctx.lineTo(w, -s); ctx.lineTo(w, -w);
      ctx.lineTo(s, -w); ctx.lineTo(s, w); ctx.lineTo(w, w);
      ctx.lineTo(w, s); ctx.lineTo(-w, s); ctx.lineTo(-w, w);
      ctx.lineTo(-s, w); ctx.lineTo(-s, -w); ctx.lineTo(-w, -w);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'ring': {
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2);
      ctx.globalAlpha = el.opacity * 0.5;
      ctx.stroke();
      break;
    }
    case 'square': {
      ctx.strokeRect(-s, -s, s * 2, s * 2);
      ctx.globalAlpha = el.opacity * 0.3;
      ctx.strokeRect(-s * 0.5, -s * 0.5, s, s);
      break;
    }
    case 'dot-grid': {
      const gap = s * 0.5;
      for (let gx = -1; gx <= 1; gx++) {
        for (let gy = -1; gy <= 1; gy++) {
          ctx.beginPath();
          ctx.arc(gx * gap, gy * gap, 2, 0, Math.PI * 2);
          ctx.fillStyle = el.color;
          ctx.globalAlpha = el.opacity * (0.3 + Math.random() * 0.3);
          ctx.fill();
        }
      }
      break;
    }
  }

  // Glow effect for dragging
  if (el.dragging) {
    ctx.globalAlpha = 0.15;
    ctx.shadowColor = el.color;
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(0, 0, s * 1.2, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

export default function FloatingElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<FloatEl[]>([]);
  const activeRef = useRef<FloatEl | null>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      canvas.width = window.innerWidth;
      canvas.height = pageHeight;
      canvas.style.height = pageHeight + 'px';
    };

    // Generate floating elements spread across the full page
    const generateElements = () => {
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const count = 14;
      const els: FloatEl[] = [];

      for (let i = 0; i < count; i++) {
        const isLeft = Math.random() > 0.5;
        const x = isLeft
          ? 40 + Math.random() * 160
          : window.innerWidth - 40 - Math.random() * 160;
        const y = (pageHeight / count) * i + Math.random() * (pageHeight / count) * 0.6 + 100;

        els.push({
          id: i,
          x,
          y,
          baseY: y,
          size: 14 + Math.random() * 22,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: 0.2 + Math.random() * 0.25,
          dragging: false,
          offsetX: 0,
          offsetY: 0,
          floatPhase: Math.random() * Math.PI * 2,
          floatAmplitude: 3 + Math.random() * 6,
        });
      }
      elementsRef.current = els;
    };

    resize();
    generateElements();

    // Re-measure page height periodically (sections may animate in)
    const resizeInterval = setInterval(() => {
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      if (canvas.height !== pageHeight) {
        canvas.height = pageHeight;
        canvas.style.height = pageHeight + 'px';
      }
    }, 2000);

    window.addEventListener('resize', () => {
      resize();
      generateElements();
    });

    // Hit test
    const hitTest = (mx: number, my: number): FloatEl | null => {
      for (let i = elementsRef.current.length - 1; i >= 0; i--) {
        const el = elementsRef.current[i];
        const dx = mx - el.x;
        const dy = my - el.y;
        if (Math.sqrt(dx * dx + dy * dy) < el.size * 2) {
          return el;
        }
      }
      return null;
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top + window.scrollY;
      const el = hitTest(mx, my);
      if (el) {
        el.dragging = true;
        el.offsetX = mx - el.x;
        el.offsetY = my - el.y;
        el.opacity = Math.min(el.opacity + 0.15, 0.6);
        activeRef.current = el;
        document.body.style.cursor = 'grabbing';
        e.preventDefault();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const el = activeRef.current;
      if (el && el.dragging) {
        const rect = canvas.getBoundingClientRect();
        el.x = e.clientX - rect.left - el.offsetX;
        el.y = e.clientY - rect.top + window.scrollY - el.offsetY;
        el.baseY = el.y;
        e.preventDefault();
      } else {
        // Hover cursor hint
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top + window.scrollY;
        const hovered = hitTest(mx, my);
        document.body.style.cursor = hovered ? 'grab' : '';
      }
    };

    const onMouseUp = () => {
      if (activeRef.current) {
        activeRef.current.dragging = false;
        activeRef.current.opacity = Math.max(activeRef.current.opacity - 0.1, 0.2);
        activeRef.current = null;
        document.body.style.cursor = '';
      }
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const mx = touch.clientX - rect.left;
      const my = touch.clientY - rect.top + window.scrollY;
      const el = hitTest(mx, my);
      if (el) {
        el.dragging = true;
        el.offsetX = mx - el.x;
        el.offsetY = my - el.y;
        el.opacity = Math.min(el.opacity + 0.15, 0.6);
        activeRef.current = el;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const el = activeRef.current;
      if (el && el.dragging) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        el.x = touch.clientX - rect.left - el.offsetX;
        el.y = touch.clientY - rect.top + window.scrollY - el.offsetY;
        el.baseY = el.y;
      }
    };

    const onTouchEnd = () => {
      if (activeRef.current) {
        activeRef.current.dragging = false;
        activeRef.current.opacity = Math.max(activeRef.current.opacity - 0.1, 0.2);
        activeRef.current = null;
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    // passive: true so these never block page scroll
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation loop
    let frame = 0;
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frame++;
      for (const el of elementsRef.current) {
        if (!el.dragging) {
          el.rotation += el.rotationSpeed;
          // Gentle floating
          el.y = el.baseY + Math.sin(frame * 0.015 + el.floatPhase) * el.floatAmplitude;
        }
        drawShape(ctx, el);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(resizeInterval);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    />
  );
}
