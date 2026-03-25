'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggle = toggleRef.current;
    if (!toggle) return;

    let currentTheme = 'dark';
    let transitioning = false;

    const applyTheme = (theme: string) => {
      document.documentElement.setAttribute('data-theme', theme);
      currentTheme = theme;
      const icon = toggle.querySelector('.toggle-icon') as HTMLSpanElement;
      if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    };

    const blackholeSuck = (cx: number, cy: number, cb: () => void) => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;pointer-events:none;background:#0a0a0e;';
      document.body.appendChild(overlay);
      const ring = document.createElement('div');
      ring.style.cssText = `position:fixed;z-index:10001;pointer-events:none;border-radius:50%;width:40px;height:40px;border:2px solid rgba(100,60,200,0.6);left:${cx - 20}px;top:${cy - 20}px;box-shadow:0 0 20px rgba(80,40,180,0.5);opacity:0;`;
      document.body.appendChild(ring);
      const maxR = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) * 1.3;
      const duration = 500;
      const start = performance.now();
      let applied = false;
      const frame = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = Math.pow(p, 1.8);
        const r = maxR * (1 - eased);
        const feather = Math.max(r * 0.12, 6);
        const mask = `radial-gradient(circle ${r}px at ${cx}px ${cy}px, transparent ${Math.max(0, r - feather)}px, black ${r + feather}px)`;
        overlay.style.webkitMaskImage = mask;
        (overlay.style as any).maskImage = mask;
        if (p > 0.05) {
          ring.style.opacity = String(Math.min(p * 3, 0.8) * (1 - Math.max(0, (p - 0.6) / 0.4)));
          ring.style.transform = `scale(${1 + (1 - p) * 1.5}) rotate(${p * 540}deg)`;
        }
        if (p >= 0.5 && !applied) { applied = true; cb(); }
        if (p < 1) { requestAnimationFrame(frame); }
        else {
          ring.style.cssText += 'width:8px;height:8px;background:rgba(160,120,255,0.9);border:none;opacity:1;transform:scale(1);';
          ring.style.left = (cx - 4) + 'px'; ring.style.top = (cy - 4) + 'px';
          setTimeout(() => { ring.style.transition = 'opacity 0.25s,transform 0.25s'; ring.style.opacity = '0'; ring.style.transform = 'scale(3)'; }, 30);
          setTimeout(() => { overlay.style.transition = 'opacity 0.2s'; overlay.style.opacity = '0'; setTimeout(() => { overlay.remove(); ring.remove(); transitioning = false; }, 200); }, 100);
        }
      };
      requestAnimationFrame(frame);
    };

    const solarBurst = (cx: number, cy: number, cb: () => void) => {
      const flash = document.createElement('div');
      flash.style.cssText = 'position:fixed;inset:0;z-index:10002;pointer-events:none;background:white;opacity:0;';
      document.body.appendChild(flash);
      flash.offsetWidth;
      flash.style.transition = 'opacity 0.06s';
      flash.style.opacity = '1';
      const overlay = document.createElement('div');
      overlay.style.cssText = `position:fixed;inset:0;z-index:10000;pointer-events:none;background:radial-gradient(circle at ${cx}px ${cy}px,#fffbe0,#F6F7FB);clip-path:circle(0% at ${cx}px ${cy}px);`;
      document.body.appendChild(overlay);
      const core = document.createElement('div');
      core.style.cssText = `position:fixed;z-index:10001;pointer-events:none;border-radius:50%;width:20px;height:20px;left:${cx - 10}px;top:${cy - 10}px;background:radial-gradient(circle,#fff 30%,#ffe060 60%,#ff8800 100%);box-shadow:0 0 60px #fff,0 0 120px #ffcc40,0 0 200px rgba(255,150,20,0.6);opacity:1;`;
      document.body.appendChild(core);
      const sw = document.createElement('div');
      sw.style.cssText = `position:fixed;z-index:10001;pointer-events:none;border-radius:50%;width:10px;height:10px;left:${cx - 5}px;top:${cy - 5}px;border:3px solid rgba(255,220,100,0.8);opacity:1;`;
      document.body.appendChild(sw);
      cb();
      const duration = 450;
      const start = performance.now();
      setTimeout(() => { flash.style.transition = 'opacity 0.15s'; flash.style.opacity = '0'; setTimeout(() => flash.remove(), 150); }, 80);
      const frame = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        overlay.style.clipPath = `circle(${eased * 160}% at ${cx}px ${cy}px)`;
        core.style.transform = `scale(${1 + eased * 12})`; core.style.opacity = String(Math.max(0, 1 - eased * 2));
        sw.style.transform = `scale(${1 + eased * 60})`; sw.style.opacity = String(Math.max(0, 1 - eased * 1.8));
        if (p < 1) { requestAnimationFrame(frame); }
        else {
          overlay.style.transition = 'opacity 0.2s'; overlay.style.opacity = '0';
          setTimeout(() => { overlay.remove(); core.remove(); sw.remove(); transitioning = false; }, 200);
        }
      };
      requestAnimationFrame(frame);
    };

    const handleToggle = (e: MouseEvent) => {
      if (transitioning) return;
      transitioning = true;
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      const rect = toggle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (newTheme === 'dark') {
        blackholeSuck(cx, cy, () => applyTheme('dark'));
      } else {
        solarBurst(cx, cy, () => applyTheme('light'));
      }
    };

    toggle.addEventListener('click', handleToggle as any);
    return () => toggle.removeEventListener('click', handleToggle as any);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: '72px',
      background: 'rgba(14,14,14,0.85)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid var(--border)',
    }}>
      <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
        <Image
          src="/logo-mark-nav.png"
          alt="Caliber Web Studio"
          width={36}
          height={36}
          style={{ objectFit: 'contain' }}
          priority
        />
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '14px',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          background: 'linear-gradient(135deg, var(--chrome), #fff, var(--chrome))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Caliber Web Studio
        </span>
      </Link>

      <ul style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }}>
        {[
          { label: 'Services', href: '#services' },
          { label: 'Process', href: '#process' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Work', href: '#work' },
          { label: 'Blog', href: '/blog' },
        ].map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: '11px',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(208,216,224,0.5)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(208,216,224,0.5)')}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Theme Toggle */}
        <button
          ref={toggleRef}
          id="themeToggle"
          title="Toggle theme"
          style={{
            width: '52px', height: '28px', borderRadius: '14px', border: 'none',
            background: 'rgba(168,184,200,0.15)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', padding: '3px',
            transition: 'background 0.3s',
          }}
        >
          <span
            className="toggle-icon"
            style={{
              width: '22px', height: '22px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffcc40, #ff8800)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', transition: 'transform 0.3s',
              transform: 'translateX(24px)',
            }}
          >
            🌙
          </span>
        </button>

        <Link href="#contact" className="nav-btn" style={{
          fontFamily: "'Space Mono', monospace", fontSize: '11px',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--bg)', background: 'var(--chrome)',
          padding: '11px 26px', border: 'none',
          textDecoration: 'none', fontWeight: 700,
          transition: 'transform 0.15s ease-out',
          display: 'inline-block',
        }}>
          Start a Project
        </Link>
      </div>
    </nav>
  );
}
