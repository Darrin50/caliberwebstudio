'use client';

/**
 * ScrambleText — kinetic letter scramble driven by cursor (desktop) or
 * touch + scroll (mobile).
 *
 * Desktop: characters start scrambled; they resolve to real text as the
 * cursor moves near them. Once fully resolved, 1 char subtly re-scrambles
 * every ~3 s when cursor leaves, to keep the text alive.
 *
 * Mobile: three layers of interaction —
 *   1. Initial auto-resolve: ~800 ms left-to-right reveal on first viewport entry.
 *   2. Touch proximity: touchstart/move resolves chars within ~90 px of the finger.
 *      On lift, 1 random char re-scrambles every ~1.5 s (subtle alive feel).
 *   3. Scroll progress: as the hero scrolls out, chars progressively resolve.
 *      By the time the hero has scrolled 40 % of viewport height, all are resolved.
 *      Scrolling back up gradually re-scrambles chars in reverse.
 *   Touch takes priority; scroll maintains baseline state when no touch is active.
 *   All touch/scroll listeners are { passive: true } — never blocks scroll.
 *
 * Accessibility: aria-label on the wrapper always contains the real text.
 * The scramble span is aria-hidden — screen readers see the resolved headline.
 *
 * prefers-reduced-motion: renders fully resolved immediately, no animation.
 * SSR: renders real text (no hydration mismatch; scramble starts on first effect).
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties, ElementType } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
const rndChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)];

interface ScrambleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Extra ms before starting auto-resolve on mobile */
  resolveDelay?: number;
}

export default function ScrambleText({
  text,
  as: Tag = 'div',
  className,
  style,
  resolveDelay = 120,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState<string[]>(() => text.split(''));
  const resolvedRef = useRef<boolean[]>(text.split('').map(() => true));
  const elemRef     = useRef<HTMLElement | null>(null);
  const mouseRef    = useRef({ x: -9999, y: -9999 });
  const rafRef      = useRef(0);

  const resolveChar = useCallback((idx: number, chars: string[]) => {
    if (resolvedRef.current[idx]) return;
    resolvedRef.current[idx] = true;
    setDisplay(prev => {
      const next = [...prev];
      next[idx] = chars[idx];
      return next;
    });
  }, []);

  const scrambleAll = useCallback((chars: string[]) => {
    resolvedRef.current = chars.map(() => false);
    setDisplay(chars.map(c => (c === ' ' ? ' ' : rndChar())));
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars     = text.split('');

    if (isReduced) {
      resolvedRef.current = chars.map(() => true);
      setDisplay(chars);
      return;
    }

    const isDesktop =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      window.innerWidth >= 768;

    scrambleAll(chars);

    if (isDesktop) {
      /* ── Desktop: cursor-proximity resolve (unchanged) ─────────────────── */
      const onMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      window.addEventListener('mousemove', onMouseMove);

      const tick = () => {
        const elem = elemRef.current;
        if (!elem) { rafRef.current = requestAnimationFrame(tick); return; }

        const rect = elem.getBoundingClientRect();
        const { x: mx, y: my } = mouseRef.current;
        const near =
          mx > rect.left - 120 && mx < rect.right  + 120 &&
          my > rect.top  - 120 && my < rect.bottom + 120;

        if (near) {
          let bestIdx = -1, bestDist = Infinity;
          for (let i = 0; i < chars.length; i++) {
            if (resolvedRef.current[i] || chars[i] === ' ') continue;
            const cx = rect.left + ((i + 0.5) / chars.length) * rect.width;
            const cy = rect.top  + rect.height * 0.5;
            const d  = Math.hypot(mx - cx, my - cy);
            if (d < bestDist) { bestDist = d; bestIdx = i; }
          }
          const solvesThisFrame = bestDist < 120 ? 2 : 1;
          let solved = 0, scanIdx = bestIdx;
          while (solved < solvesThisFrame && scanIdx >= 0) {
            if (!resolvedRef.current[scanIdx] && chars[scanIdx] !== ' ') {
              resolveChar(scanIdx, chars);
              solved++;
            }
            scanIdx = scanIdx > 0 ? scanIdx - 1 : -1;
          }
        }

        const away = mx < rect.left - 200 || mx > rect.right  + 200 ||
                     my < rect.top  - 200 || my > rect.bottom + 200;
        if (away && Math.random() < 0.003) {
          const picks = chars.map((c, i) => i).filter(i => chars[i] !== ' ' && resolvedRef.current[i]);
          if (picks.length) {
            const i = picks[Math.floor(Math.random() * picks.length)];
            resolvedRef.current[i] = false;
            setDisplay(prev => { const n = [...prev]; n[i] = rndChar(); return n; });
          }
        }

        setDisplay(prev => {
          const next = [...prev];
          let changed = false;
          for (let i = 0; i < chars.length; i++) {
            if (!resolvedRef.current[i] && chars[i] !== ' ') {
              next[i] = rndChar(); changed = true;
            }
          }
          return changed ? next : prev;
        });

        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('mousemove', onMouseMove);
      };

    } else {
      /* ── Mobile: touch proximity + scroll driven ────────────────────────── */
      const totalNonSpace = chars.filter(c => c !== ' ').length;
      let initialResolveDone = false;
      let prevScrollTarget   = 0;
      let liftInterval: ReturnType<typeof setInterval> | null = null;
      let scrollRafId        = 0;

      /* Single pulse loop — sole renderer on mobile.
         resolvedRef is the source of truth; this just syncs it to display. */
      const pulse = () => {
        const anyUnresolved = resolvedRef.current.some((r, i) => !r && chars[i] !== ' ');
        if (anyUnresolved) {
          setDisplay(
            chars.map((c, i) =>
              c === ' ' ? ' ' : resolvedRef.current[i] ? c : rndChar(),
            ),
          );
        }
        rafRef.current = requestAnimationFrame(pulse);
      };
      rafRef.current = requestAnimationFrame(pulse);

      /* Auto-resolve over ~800 ms — only mutates resolvedRef; pulse renders */
      const autoResolve = (delay: number, onDone?: () => void) => {
        let frame = 0;
        const total = 48;
        const step = () => {
          const target = Math.round(((frame + 1) / total) * totalNonSpace);
          const already = resolvedRef.current.filter(Boolean).length;
          for (let n = 0; n < target - already; n++) {
            const idx = resolvedRef.current.findIndex((r, i) => !r && chars[i] !== ' ');
            if (idx !== -1) resolvedRef.current[idx] = true;
          }
          frame++;
          if (frame < total) rafRef.current = requestAnimationFrame(step);
          else onDone?.();
        };
        setTimeout(() => { rafRef.current = requestAnimationFrame(step); }, delay);
      };

      /* Touch: resolve all chars within ~90 px of the finger */
      const resolveByTouch = (clientX: number, clientY: number) => {
        const elem = elemRef.current;
        if (!elem) return;
        const rect = elem.getBoundingClientRect();
        for (let i = 0; i < chars.length; i++) {
          if (resolvedRef.current[i] || chars[i] === ' ') continue;
          const cx = rect.left + ((i + 0.5) / chars.length) * rect.width;
          const cy = rect.top  + rect.height * 0.5;
          if (Math.hypot(clientX - cx, clientY - cy) < 90) {
            resolvedRef.current[i] = true;
          }
        }
      };

      /* Touch lift: re-scramble 1 resolved char every 1.5 s (subtle alive feel) */
      const startLiftReScramble = () => {
        if (liftInterval) clearInterval(liftInterval);
        liftInterval = setInterval(() => {
          const pool = chars.map((_, i) => i).filter(i => chars[i] !== ' ' && resolvedRef.current[i]);
          if (!pool.length) { clearInterval(liftInterval!); liftInterval = null; return; }
          resolvedRef.current[pool[Math.floor(Math.random() * pool.length)]] = false;
          // pulse loop will render the re-scrambled char automatically
        }, 1500);
      };

      const onTouchStart = (e: TouchEvent) => {
        if (liftInterval) { clearInterval(liftInterval); liftInterval = null; }
        resolveByTouch(e.touches[0].clientX, e.touches[0].clientY);
      };
      const onTouchMove = (e: TouchEvent) => {
        resolveByTouch(e.touches[0].clientX, e.touches[0].clientY);
      };
      const onTouchEnd = () => { startLiftReScramble(); };

      /* Scroll: resolve based on how far hero has scrolled out of viewport */
      const onScroll = () => {
        cancelAnimationFrame(scrollRafId);
        scrollRafId = requestAnimationFrame(() => {
          const elem = elemRef.current;
          if (!elem) return;
          const rect      = elem.getBoundingClientRect();
          const scrolledPx = Math.max(0, -rect.top);
          const ratio      = Math.min(1, scrolledPx / (window.innerHeight * 0.4));
          const target     = Math.round(ratio * totalNonSpace);

          if (target >= prevScrollTarget) {
            /* Scrolling down — resolve chars up to target */
            let resolved = 0;
            for (let i = 0; i < chars.length; i++) {
              if (chars[i] === ' ') continue;
              if (resolved < target && !resolvedRef.current[i]) {
                resolvedRef.current[i] = true;
              }
              if (resolvedRef.current[i]) resolved++;
            }
          } else {
            /* Scrolling up — gradually re-scramble chars beyond target
               (unscramble up to 2 chars per scroll frame so it feels gradual) */
            const toUnresolve = Math.min(2, prevScrollTarget - target);
            let unresolved = 0;
            for (let i = chars.length - 1; i >= 0 && unresolved < toUnresolve; i--) {
              if (chars[i] !== ' ' && resolvedRef.current[i]) {
                resolvedRef.current[i] = false;
                unresolved++;
              }
            }
          }
          prevScrollTarget = target;
        });
      };

      /* IntersectionObserver — re-scramble + re-resolve on viewport re-entry */
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && initialResolveDone) {
            scrambleAll(chars);
            prevScrollTarget = 0;
            autoResolve(resolveDelay);
          }
        },
        { threshold: 0.1 },
      );
      if (elemRef.current) io.observe(elemRef.current);

      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove',  onTouchMove,  { passive: true });
      window.addEventListener('touchend',   onTouchEnd,   { passive: true });
      window.addEventListener('scroll',     onScroll,     { passive: true });

      autoResolve(resolveDelay, () => { initialResolveDone = true; });

      return () => {
        cancelAnimationFrame(rafRef.current);
        cancelAnimationFrame(scrollRafId);
        if (liftInterval) clearInterval(liftInterval);
        io.disconnect();
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove',  onTouchMove);
        window.removeEventListener('touchend',   onTouchEnd);
        window.removeEventListener('scroll',     onScroll);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      ref={elemRef as React.RefObject<never>}
      className={className}
      style={style}
      aria-label={text}
    >
      <span aria-hidden="true" style={{ color: 'inherit' }}>
        {display.join('')}
      </span>
    </Tag>
  );
}
