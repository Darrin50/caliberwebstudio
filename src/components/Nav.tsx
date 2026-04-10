'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const toggle = toggleRef.current;
    if (!toggle) return;

    let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    let transitioning = false;

    const applyTheme = (theme: string) => {
      document.documentElement.setAttribute('data-theme', theme);
      currentTheme = theme;
      try { localStorage.setItem('caliber-theme-v2', theme); } catch(e) {}

      const knob    = toggle.querySelector('.toggle-icon')    as HTMLElement;
      const bgDark  = toggle.querySelector('.toggle-bg-dark') as HTMLElement;
      const bgLight = toggle.querySelector('.toggle-bg-light') as HTMLElement;
      const sun     = toggle.querySelector('.icon-sun')        as HTMLElement;
      const moon    = toggle.querySelector('.icon-moon')       as HTMLElement;

      if (theme === 'dark') {
        if (knob)    knob.style.transform   = 'translateX(38px)';
        if (bgDark)  bgDark.style.opacity   = '1';
        if (bgLight) bgLight.style.opacity  = '0';
        if (sun)     sun.style.opacity      = '0';
        if (moon)    moon.style.opacity     = '1';
      } else {
        if (knob)    knob.style.transform   = 'translateX(0)';
        if (bgDark)  bgDark.style.opacity   = '0';
        if (bgLight) bgLight.style.opacity  = '1';
        if (sun)     sun.style.opacity      = '1';
        if (moon)    moon.style.opacity     = '0';
      }
    };

    // Sync button state with current theme on mount
    applyTheme(currentTheme);

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

        if (p >= 0.5 && !applied) {
          applied = true;
          cb();
        }

        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          ring.style.cssText += 'width:8px;height:8px;background:rgba(160,120,255,0.9);border:none;opacity:1;transform:scale(1);';
          ring.style.left = cx - 4 + 'px';
          ring.style.top = cy - 4 + 'px';

          setTimeout(() => {
            ring.style.transition = 'opacity 0.25s,transform 0.25s';
            ring.style.opacity = '0';
            ring.style.transform = 'scale(3)';
          }, 30);

          setTimeout(() => {
            overlay.style.transition = 'opacity 0.2s';
            overlay.style.opacity = '0';
            setTimeout(() => {
              overlay.remove();
              ring.remove();
              transitioning = false;
            }, 200);
          }, 100);
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
      overlay.style.cssText = `position:fixed;inset:0;z-index:10000;pointer-events:none;background:radial-gradient(circle at ${cx}px ${cy}px,#fffbe0,#f5f5f7);clip-path:circle(0% at ${cx}px ${cy}px);`;
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

      setTimeout(() => {
        flash.style.transition = 'opacity 0.15s';
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 150);
      }, 80);

      const frame = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);

        overlay.style.clipPath = `circle(${eased * 160}% at ${cx}px ${cy}px)`;
        core.style.transform = `scale(${1 + eased * 12})`;
        core.style.opacity = String(Math.max(0, 1 - eased * 2));
        sw.style.transform = `scale(${1 + eased * 60})`;
        sw.style.opacity = String(Math.max(0, 1 - eased * 1.8));

        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          overlay.style.transition = 'opacity 0.2s';
          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.remove();
            core.remove();
            sw.remove();
            transitioning = false;
          }, 200);
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

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Our Work', href: '/case-studies' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="site-nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(16px, 4vw, 40px)', height: '72px', background: 'var(--nav-bg)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent', transition: 'background 0.4s ease, border-color 0.4s ease' }}>
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <Image src="/logo-mark-nav.png" alt="Caliber Web Studio" width={36} height={36} style={{ objectFit: 'contain', animation: 'logo-breathe 3s ease-in-out infinite' }} priority />
          <span className="nav-logo-text" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'linear-gradient(135deg, var(--chrome), var(--white), var(--chrome))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Caliber Web Studio</span>
        </Link>

        <ul className="nav-desktop" style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }}>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="text-hover-line" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* ── Phone ── */}
          <a href="tel:+13137992315" className="nav-phone-link" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'var(--dim)', textDecoration: 'none', transition: 'color 0.2s' }}>(313) 799-2315</a>
          {/* ── Theme toggle ── */}
          <button
            ref={toggleRef} id="themeToggle" title="Toggle theme"
            style={{
              position: 'relative', width: '72px', height: '36px',
              borderRadius: '18px', border: 'none', cursor: 'pointer',
              padding: 0, overflow: 'hidden', flexShrink: 0,
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.45), inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* ── DARK bg: deep night sky ── */}
            <span className="toggle-bg toggle-bg-dark" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(130deg, #0b1628 0%, #0f2044 60%, #162952 100%)',
              transition: 'opacity 0.35s', opacity: 1,
            }}>
              {/* Sparkle stars — left zone (where the moon is NOT) */}
              <svg width="72" height="36" viewBox="0 0 72 36" fill="none" style={{ position: 'absolute', inset: 0 }}>
                {/* 4-pointed sparkles */}
                <path d="M14 8 L15 12 L19 13 L15 14 L14 18 L13 14 L9 13 L13 12 Z" fill="white" opacity="0.95"/>
                <path d="M22 22 L22.8 25 L26 25.8 L22.8 26.6 L22 30 L21.2 26.6 L18 25.8 L21.2 25 Z" fill="white" opacity="0.7" transform="scale(0.6) translate(18,18)"/>
                <path d="M8 24 L8.5 26.5 L11 27 L8.5 27.5 L8 30 L7.5 27.5 L5 27 L7.5 26.5 Z" fill="white" opacity="0.8" />
                {/* tiny dot stars */}
                <circle cx="26" cy="8"  r="1"   fill="white" opacity="0.6"/>
                <circle cx="20" cy="28" r="0.7" fill="white" opacity="0.5"/>
                <circle cx="30" cy="20" r="0.8" fill="white" opacity="0.45"/>
                <circle cx="10" cy="15" r="0.6" fill="white" opacity="0.55"/>
              </svg>
            </span>

            {/* ── LIGHT bg: daytime sky ── */}
            <span className="toggle-bg toggle-bg-light" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(130deg, #6ec6f5 0%, #9dd8f8 50%, #c6ecff 100%)',
              transition: 'opacity 0.35s', opacity: 0,
            }}>
              {/* Clouds — right zone (where the sun is NOT) */}
              <svg width="72" height="36" viewBox="0 0 72 36" fill="none" style={{ position: 'absolute', inset: 0 }}>
                {/* Main cloud */}
                <ellipse cx="56" cy="24" rx="11" ry="6"   fill="white" opacity="0.95"/>
                <ellipse cx="52" cy="21" rx="7"  ry="5.5" fill="white" opacity="0.95"/>
                <ellipse cx="61" cy="21" rx="6"  ry="5"   fill="white" opacity="0.9"/>
                <ellipse cx="56" cy="18" rx="5"  ry="4"   fill="white" opacity="0.85"/>
                {/* Smaller background cloud */}
                <ellipse cx="44" cy="30" rx="7"  ry="4"   fill="white" opacity="0.6"/>
                <ellipse cx="40" cy="28" rx="5"  ry="3.5" fill="white" opacity="0.6"/>
                <ellipse cx="49" cy="28" rx="4"  ry="3"   fill="white" opacity="0.55"/>
              </svg>
            </span>

            {/* ── Knob ── */}
            <span className="toggle-icon" style={{
              position: 'absolute', top: '4px', left: '4px',
              width: '28px', height: '28px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.38s cubic-bezier(0.34,1.45,0.64,1)',
              transform: 'translateX(0)',
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)',
            }}>
              {/* ── Sun (shown in light mode) ── */}
              <svg className="icon-sun" width="28" height="28" viewBox="0 0 28 28" fill="none"
                style={{ position: 'absolute', transition: 'opacity 0.25s', opacity: 1 }}>
                <circle cx="14" cy="14" r="14" fill="#FFD000"/>
                <circle cx="14" cy="14" r="9"  fill="#FFE040"/>
                {/* subtle inner glow ring */}
                <circle cx="14" cy="14" r="6.5" fill="#FFEE80" opacity="0.6"/>
              </svg>

              {/* ── Moon (shown in dark mode) ── */}
              <svg className="icon-moon" width="28" height="28" viewBox="0 0 28 28" fill="none"
                style={{ position: 'absolute', transition: 'opacity 0.25s', opacity: 0 }}>
                {/* moon face — off-white circle */}
                <circle cx="14" cy="14" r="14" fill="#c8cfd8"/>
                <circle cx="14" cy="14" r="14" fill="url(#moon-grad)"/>
                {/* craters */}
                <circle cx="10" cy="10" r="3"   fill="#a8b0bc" opacity="0.8"/>
                <circle cx="18" cy="18" r="2.2" fill="#a8b0bc" opacity="0.7"/>
                <circle cx="17" cy="9"  r="1.6" fill="#a8b0bc" opacity="0.6"/>
                <defs>
                  <radialGradient id="moon-grad" cx="35%" cy="35%">
                    <stop offset="0%"   stopColor="#dde3ea"/>
                    <stop offset="100%" stopColor="#b0b8c4"/>
                  </radialGradient>
                </defs>
              </svg>
            </span>
          </button>

          <Link href="/contact" className="nav-btn nav-cta-desktop btn-chrome" style={{ textDecoration: 'none', padding: '12px 20px', fontSize: '13px', fontWeight: 600, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Get Your Free Mockup</Link>

          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px', width: '40px', height: '40px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--hamburger-color)', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--hamburger-color)', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--hamburger-color)', transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {menuOpen && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998 }} onClick={() => setMenuOpen(false)} />}

      <div className="nav-mobile-menu" style={{ position: 'fixed', top: '72px', right: 0, width: '280px', maxWidth: '80vw', height: 'calc(100vh - 72px)', background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderLeft: '1px solid var(--border)', zIndex: 999, transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease, background 0.4s ease', display: 'flex', flexDirection: 'column', padding: '32px 24px', gap: '8px' }}>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} onClick={handleLinkClick} style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim)', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid var(--border)', transition: 'color 0.2s' }}>{item.label}</Link>
        ))}
        <Link href="/contact" onClick={handleLinkClick} className="btn-chrome" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', fontWeight: 700, marginTop: '16px', display: 'block' }}>Get Your Free Mockup</Link>
      </div>

      <style>{`
        :root {
          --nav-bg: rgba(14,14,14,0.85);
          --hamburger-color: #D0D8E0;
        }

        [data-theme="light"] {
          --nav-bg: rgba(245,245,247,0.88);
          --hamburger-color: #1E3D8F;
        }

        .nav-hamburger span {
          background: #D0D8E0 !important;
        }

        [data-theme="light"] .nav-hamburger span {
          background: #1E3D8F !important;
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-phone-link { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-logo-text { font-size: 12px !important; }
        }
      `}</style>
    </>
  );
}
