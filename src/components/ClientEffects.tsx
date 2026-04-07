'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientEffects() {
  const pathname = usePathname();

  // Route-change: reveal .fu elements + toggle ambient overlay
  useEffect(() => {
    const isContentPage =
      pathname.startsWith('/blog') ||
      pathname === '/terms' ||
      pathname === '/privacy' ||
      pathname === '/about' ||
      pathname.startsWith('/case-studies') ||
      pathname === '/faq' ||
      pathname === '/pricing';

    const meteorField = document.getElementById('meteorField');
    const sunParticles = document.getElementById('sunParticles');

    if (isContentPage) {
      if (meteorField) meteorField.style.display = 'none';
      if (sunParticles) sunParticles.style.display = 'none';
    } else {
      if (meteorField) meteorField.style.display = '';
      if (sunParticles) sunParticles.style.display = '';
    }

    document.querySelectorAll('.fu').forEach((el) => el.classList.add('on'));
    document.documentElement.classList.add('js-ready');
  }, [pathname]);

  // One-time setup
  useEffect(() => {
    // ── METEORS ──
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

    // ── SUN DOTS ──
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

    // ── SCROLL PROGRESS BAR ──
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.width = '100%';
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });

    // ── MOUSE-FOLLOW GLOW ──
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.left = '-300px';
    glow.style.top = '-300px';
    document.body.appendChild(glow);

    let glowX = -300, glowY = -300;
    let targetX = -300, targetY = -300;
    let rafId: number;

    const animateGlow = () => {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      rafId = requestAnimationFrame(animateGlow);
    };
    animateGlow();

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── MAGNETIC BUTTONS ──
    const applyMagnetic = () => {
      const magnetBtns = document.querySelectorAll<HTMLElement>('.btn-chrome, .btn-line, .nav-btn');
      magnetBtns.forEach((btn) => {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const bx = rect.left + rect.width / 2, by = rect.top + rect.height / 2;
          const dx = e.clientX - bx, dy = e.clientY - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.max(rect.width, rect.height) / 2 + 80;
          if (dist < maxDist) {
            const pull = (1 - dist / maxDist) * 0.3;
            btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
            // Ripple position
            const rx = ((e.clientX - rect.left) / rect.width) * 100;
            const ry = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty('--rx', `${rx}%`);
            btn.style.setProperty('--ry', `${ry}%`);
          }
        };
        const onLeave = () => { btn.style.transform = 'translate(0px, 0px)'; };
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
      });
    };
    // Apply after DOM settles
    setTimeout(applyMagnetic, 500);

    // ── 3D CARD TILT ──
    const applyTilt = () => {
      const tiltCards = document.querySelectorAll<HTMLElement>('.tilt-card');
      tiltCards.forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / (rect.width / 2);
          const dy = (e.clientY - cy) / (rect.height / 2);
          card.style.transform = `perspective(600px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg) translateY(-4px)`;
        };
        const onLeave = () => {
          card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)';
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    };
    setTimeout(applyTilt, 500);

    // ── COUNTER ANIMATIONS ──
    const animateCounters = () => {
      const counters = document.querySelectorAll<HTMLElement>('[data-count]');
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.dataset.counted) return;
          el.dataset.counted = '1';
          const target = parseInt(el.dataset.count || '0', 10);
          const duration = 1800;
          const start = performance.now();
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          const frame = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
          counterObserver.unobserve(el);
        });
      }, { threshold: 0.5 });

      counters.forEach((el) => counterObserver.observe(el));
      return counterObserver;
    };
    const counterObserver = animateCounters();

    // Re-apply tilt and magnetic on DOM mutations (dynamic content)
    const mutationObs = new MutationObserver(() => {
      applyMagnetic();
      applyTilt();
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('mousemove', onMouseMove);
      mutationObs.disconnect();
      counterObserver.disconnect();
      progressBar.remove();
      glow.remove();
    };
  }, []);

  return null;
}
