'use client';

import { useEffect } from 'react';

// CSS injected once into <head>
const STYLE = `
@keyframes sparkle-fade {
  0%   { opacity: 1; transform: scale(1) rotate(var(--r)); }
  100% { opacity: 0; transform: scale(0) rotate(var(--r)); }
}
.cursor-sparkle {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: var(--sz);
  height: var(--sz);
  margin-left: calc(var(--sz) / -2);
  margin-top: calc(var(--sz) / -2);
  animation: sparkle-fade 600ms ease-out forwards;
}
`;

function injectStyle() {
  if (document.getElementById('cursor-sparkle-style')) return;
  const tag = document.createElement('style');
  tag.id = 'cursor-sparkle-style';
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}

// SVG star/diamond shape
function createSparkleEl(x: number, y: number) {
  const size = 7 + Math.random() * 5; // 7–12 px
  const rotation = Math.floor(Math.random() * 360);
  const delay = Math.random() * 40; // slight stagger

  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('class', 'cursor-sparkle');
  el.setAttribute('viewBox', '0 0 16 16');
  el.setAttribute('fill', 'none');
  el.style.cssText = [
    `--sz:${size}px`,
    `--r:${rotation}deg`,
    `left:${x}px`,
    `top:${y}px`,
    `animation-delay:${delay}ms`,
  ].join(';');

  // 4-point star: two diamond paths — outer blue, inner white core
  el.innerHTML = `
    <path d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z"
      fill="#2563eb"
      filter="drop-shadow(0 0 3px #2563eb)"
      opacity="0.95"/>
    <circle cx="8" cy="8" r="1.5" fill="#ffffff" opacity="0.9"/>
  `;

  return el;
}

let lastSpawnTime = 0;
let lastX = -999;
let lastY = -999;

export default function CursorSparkle() {
  useEffect(() => {
    // Skip on touch/coarse-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    injectStyle();

    const onMove = (e: MouseEvent) => {
      const now = performance.now();

      // Throttle to ~60fps and require meaningful movement
      if (now - lastSpawnTime < 16) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 25) return; // moved < 5px — skip

      lastSpawnTime = now;
      lastX = e.clientX;
      lastY = e.clientY;

      // Spawn 2–3 sparkles per event
      const count = 2 + (Math.random() > 0.6 ? 1 : 0);
      for (let i = 0; i < count; i++) {
        const jx = e.clientX + (Math.random() - 0.5) * 12;
        const jy = e.clientY + (Math.random() - 0.5) * 12;
        const el = createSparkleEl(jx, jy);
        document.body.appendChild(el);
        // Remove after animation (600ms + max delay 40ms + buffer)
        setTimeout(() => el.remove(), 700);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}
