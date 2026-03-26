'use client';
import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    // ── BLOG PAGES: skip all ambient visual effects ──
    // Blog pages get a clean, distraction-free reading layout
    const isBlog = window.location.pathname.startsWith('/blog');
    if (isBlog) {
      // Hide the meteor/sun overlay divs injected by the root layout
      const meteorField = document.getElementById('meteorField');
      const sunParticles = document.getElementById('sunParticles');
      const cursorDot = document.getElementById('cursor-dot');
      const cursorOuter = document.getElementById('cursor-outer');
      if (meteorField) meteorField.style.display = 'none';
      if (sunParticles) sunParticles.style.display = 'none';
      if (cursorDot) cursorDot.style.display = 'none';
      if (cursorOuter) cursorOuter.style.display = 'none';

      // Scroll reveal only
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.fu').forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }

    // ── CURSOR ──
    const dot = document.getElementById('cursor-dot')!;
    const ring = document.getElementById('cursor-outer')!;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    const lerp = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(lerp);
    };
    lerp();
    document.querySelectorAll('button,.svc-card,.price-card,.card-3d,.nav-btn,nav ul a').forEach((el) => {
      (el as HTMLElement).addEventListener('mouseenter', () => { ring.style.width = '60px'; ring.style.height = '60px'; });
      (el as HTMLElement).addEventListener('mouseleave', () => { ring.style.width = '40px'; ring.style.height = '40px'; });
    });

    // ── CURSOR PARTICLE TRAIL ──
    const cvs = document.createElement('canvas');
    cvs.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none;';
    document.body.appendChild(cvs);
    const ctx = cvs.getContext('2d')!;
    let W: number, H: number;
    const resizeCvs = () => { W = cvs.width = window.innerWidth; H = cvs.height = window.innerHeight; };
    resizeCvs();
    window.addEventListener('resize', resizeCvs);
    interface Spark { x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number; color: number[]; }
    const sparks: Spark[] = [];
    let lastX = 0, lastY = 0, lastSpawn = 0;
    document.addEventListener('mousemove', (e) => {
      const now = performance.now();
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX = e.clientX; lastY = e.clientY;
      if (now - lastSpawn < 4 || speed < 2) return;
      lastSpawn = now;
      const count = Math.min(Math.floor(speed / 8) + 1, 4);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 8, y: e.clientY + (Math.random() - 0.5) * 8,
          vx: dx * 0.08 + (Math.random() - 0.5) * 1.5, vy: dy * 0.08 + (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1, decay: 0.015 + Math.random() * 0.02, size: Math.random() * 3 + 1.5,
          color: isDark
            ? (Math.random() > 0.4 ? [255, 200 + (Math.random() * 55 | 0), 60 + (Math.random() * 60 | 0)] : [80 + (Math.random() * 60 | 0), 140 + (Math.random() * 60 | 0), 255])
            : (Math.random() > 0.4 ? [30, 61, 143] : [255, 180, 40]),
        });
      }
    });
    const sparkFrame = () => {
      requestAnimationFrame(sparkFrame);
      ctx.clearRect(0, 0, W, H);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.vy += 0.03; s.vx *= 0.98; s.life -= s.decay;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        const a = s.life * 0.7;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a})`; ctx.fill();
        if (s.life > 0.3) {
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size * s.life * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a * 0.15})`; ctx.fill();
        }
      }
    };
    sparkFrame();

    // ── GENERATE METEORS ──
    const meteorField = document.getElementById('meteorField');
    if (meteorField) {
      for (let i = 0; i < 8; i++) {
        const m = document.createElement('div'); m.className = 'meteor';
        const h = Math.random() * 80 + 40; m.style.height = h + 'px';
        m.style.left = (Math.random() * 120 - 10) + '%';
        m.style.top = (Math.random() * -20) + '%';
        m.style.animationDuration = (Math.random() * 4 + 3) + 's';
        m.style.animationDelay = (Math.random() * 12) + 's';
        m.style.opacity = '0';
        meteorField.appendChild(m);
      }
    }

    // ── GENERATE SUN DOTS ──
    const sunParticles = document.getElementById('sunParticles');
    if (sunParticles) {
      for (let i = 0; i < 30; i++) {
        const d = document.createElement('div'); d.className = 'sun-dot';
        d.style.left = (Math.random() * 100) + '%';
        const sz = (Math.random() * 4 + 2) + 'px'; d.style.width = sz; d.style.height = sz;
        d.style.animationDuration = (Math.random() * 15 + 10) + 's';
        d.style.animationDelay = (Math.random() * 15) + 's';
        d.style.background = Math.random() > 0.5 ? 'rgba(255,200,80,0.4)' : 'rgba(30,61,143,0.15)';
        sunParticles.appendChild(d);
      }
    }

    // ── SCROLL REVEAL ──
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } }); },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fu').forEach((el) => obs.observe(el));

    // ── MAGNETIC BUTTONS ──
    const magnetBtns = document.querySelectorAll<HTMLElement>('.btn-chrome, .btn-line, .nav-btn');
    magnetBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const bx = rect.left + rect.width / 2, by = rect.top + rect.height / 2;
        const dx = e.clientX - bx, dy = e.clientY - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) / 2 + 120;
        if (dist < maxDist) { const pull = (1 - dist / maxDist) * 0.35; btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`; }
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0px, 0px)'; });
    });

    // ── AMBIENT SOUND ──
    let actx: AudioContext | null = null;
    let soundPlaying = false;
    const soundBtn = document.createElement('button');
    soundBtn.id = 'sound-toggle'; soundBtn.innerHTML = '🔇'; soundBtn.title = 'Toggle ambient sound';
    document.body.appendChild(soundBtn);
    interface SoundLayer { fadeIn: () => void; fadeOut: () => void; }
    let spaceSound: SoundLayer | null = null;
    let natureSound: SoundLayer | null = null;
    const createSpaceHum = (): SoundLayer => {
      const ctx2 = actx!;
      const o1 = ctx2.createOscillator(); o1.type = 'sine'; o1.frequency.value = 432;
      const g1 = ctx2.createGain(); g1.gain.value = 0; o1.connect(g1);
      const o2 = ctx2.createOscillator(); o2.type = 'sine'; o2.frequency.value = 216;
      const g2 = ctx2.createGain(); g2.gain.value = 0; o2.connect(g2);
      const bufSize = ctx2.sampleRate * 2; const nBuf = ctx2.createBuffer(1, bufSize, ctx2.sampleRate);
      const nd = nBuf.getChannelData(0); for (let i = 0; i < bufSize; i++) nd[i] = Math.random() * 2 - 1;
      const noise = ctx2.createBufferSource(); noise.buffer = nBuf; noise.loop = true;
      const nFilter = ctx2.createBiquadFilter(); nFilter.type = 'lowpass'; nFilter.frequency.value = 300;
      const gn = ctx2.createGain(); gn.gain.value = 0; noise.connect(nFilter); nFilter.connect(gn);
      const master = ctx2.createGain(); master.gain.value = 0;
      g1.connect(master); g2.connect(master); gn.connect(master); master.connect(ctx2.destination);
      o1.start(); o2.start(); noise.start();
      return {
        fadeIn() { const t = ctx2.currentTime; master.gain.setTargetAtTime(1, t, 0.5); g1.gain.setTargetAtTime(0.045, t, 0.8); g2.gain.setTargetAtTime(0.025, t, 0.8); gn.gain.setTargetAtTime(0.02, t, 0.8); },
        fadeOut() { master.gain.setTargetAtTime(0, ctx2.currentTime, 0.3); },
      };
    };
    const createNatureSound = (): SoundLayer => {
      const ctx2 = actx!;
      const o1 = ctx2.createOscillator(); o1.type = 'sine'; o1.frequency.value = 528;
      const g1 = ctx2.createGain(); g1.gain.value = 0; o1.connect(g1);
      const o2 = ctx2.createOscillator(); o2.type = 'sine'; o2.frequency.value = 1056;
      const g2 = ctx2.createGain(); g2.gain.value = 0; o2.connect(g2);
      const bufSize = ctx2.sampleRate * 2; const nBuf = ctx2.createBuffer(1, bufSize, ctx2.sampleRate);
      const nd = nBuf.getChannelData(0); for (let i = 0; i < bufSize; i++) nd[i] = Math.random() * 2 - 1;
      const wind = ctx2.createBufferSource(); wind.buffer = nBuf; wind.loop = true;
      const wFilter = ctx2.createBiquadFilter(); wFilter.type = 'bandpass'; wFilter.frequency.value = 800; wFilter.Q.value = 0.5;
      const gw = ctx2.createGain(); gw.gain.value = 0; wind.connect(wFilter); wFilter.connect(gw);
      const chGain = ctx2.createGain(); chGain.gain.value = 0;
      const master = ctx2.createGain(); master.gain.value = 0;
      g1.connect(master); g2.connect(master); gw.connect(master); chGain.connect(master); master.connect(ctx2.destination);
      o1.start(); o2.start(); wind.start();
      const chime = () => {
        if (!soundPlaying) return;
        const freqs = [528, 660, 792, 880, 1056];
        const o = ctx2.createOscillator(); o.type = 'sine'; o.frequency.value = freqs[Math.random() * 5 | 0];
        const g = ctx2.createGain(); g.gain.value = 0.012; g.gain.setTargetAtTime(0, ctx2.currentTime + 0.1, 0.8);
        o.connect(g); g.connect(chGain); o.start(); o.stop(ctx2.currentTime + 3);
        setTimeout(chime, 3000 + Math.random() * 5000);
      };
      const lfo = () => { if (!soundPlaying) return; wFilter.frequency.value = 600 + Math.sin(Date.now() * 0.0003) * 300; requestAnimationFrame(lfo); };
      return {
        fadeIn() { const t = ctx2.currentTime; master.gain.setTargetAtTime(1, t, 0.5); g1.gain.setTargetAtTime(0.04, t, 0.8); g2.gain.setTargetAtTime(0.015, t, 0.8); gw.gain.setTargetAtTime(0.03, t, 0.8); chGain.gain.setTargetAtTime(1, t, 0.5); lfo(); setTimeout(chime, 1000); },
        fadeOut() { master.gain.setTargetAtTime(0, ctx2.currentTime, 0.3); },
      };
    };
    const startSound = () => {
      if (!actx) actx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      soundPlaying = true;
      if (!spaceSound) spaceSound = createSpaceHum();
      if (!natureSound) natureSound = createNatureSound();
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (isDark) { spaceSound.fadeIn(); natureSound.fadeOut(); } else { natureSound.fadeIn(); spaceSound.fadeOut(); }
    };
    soundBtn.addEventListener('click', () => {
      if (soundPlaying) { soundPlaying = false; soundBtn.innerHTML = '🔇'; spaceSound?.fadeOut(); natureSound?.fadeOut(); }
      else { soundBtn.innerHTML = '🔊'; startSound(); }
    });
    const themeObserver = new MutationObserver(() => {
      if (!soundPlaying) return;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (isDark) { spaceSound?.fadeIn(); natureSound?.fadeOut(); } else { natureSound?.fadeIn(); spaceSound?.fadeOut(); }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => { themeObserver.disconnect(); cvs.remove(); soundBtn.remove(); };
  }, []);

  return null;
}
