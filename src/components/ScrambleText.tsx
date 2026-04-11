'use client';

/**
 * ScrambleText — kinetic letter scramble driven by cursor (desktop) or viewport entry (mobile).
 *
 * Desktop: characters start scrambled; they resolve to real text as the cursor
 * moves near them (closest-to-cursor resolves first). Once fully resolved the
 * text stays readable; if the cursor leaves the hero entirely a single random
 * character subtly re-scrambles every ~3 s to keep things alive.
 *
 * Mobile / touch: characters start scrambled on each viewport entry and
 * auto-resolve over ~800 ms via IntersectionObserver + rAF.
 *
 * Accessibility: aria-label on the wrapper always contains the real text so
 * screen readers read the correct headline. The scrambled spans are aria-hidden.
 *
 * prefers-reduced-motion: renders fully resolved immediately, no animation.
 *
 * SSR: renders real text on the server (correct for SEO). Scramble starts on
 * the client after mount, so there is no hydration mismatch.
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
  /** Extra ms to wait before starting auto-resolve on mobile */
  resolveDelay?: number;
}

export default function ScrambleText({
  text,
  as: Tag = 'div',
  className,
  style,
  resolveDelay = 120,
}: ScrambleTextProps) {
  // SSR: start with real text to avoid hydration mismatch
  const [display, setDisplay] = useState<string[]>(() => text.split(''));
  const resolvedRef  = useRef<boolean[]>(text.split('').map(() => true));
  const elemRef      = useRef<HTMLElement | null>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const rafRef       = useRef(0);
  const isDesktopRef = useRef(false);

  /* Resolve a single character index */
  const resolveChar = useCallback(
    (idx: number, chars: string[]) => {
      if (resolvedRef.current[idx]) return;
      resolvedRef.current[idx] = true;
      setDisplay(prev => {
        const next = [...prev];
        next[idx] = chars[idx];
        return next;
      });
    },
    [],
  );

  /* Scramble the whole string (preserving spaces) */
  const scrambleAll = useCallback((chars: string[]) => {
    resolvedRef.current = chars.map(() => false);
    setDisplay(chars.map(c => (c === ' ' ? ' ' : rndChar())));
  }, []);

  useEffect(() => {
    /* All logic runs client-side only */
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars     = text.split('');

    if (isReduced) {
      /* Stay fully resolved */
      resolvedRef.current = chars.map(() => true);
      setDisplay(chars);
      return;
    }

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
                      window.innerWidth >= 768;
    isDesktopRef.current = isDesktop;

    /* Initial scramble */
    scrambleAll(chars);

    if (isDesktop) {
      /* ── Desktop: cursor-proximity resolve ────────────────────────────── */
      const onMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      window.addEventListener('mousemove', onMouseMove);

      const tick = () => {
        const elem = elemRef.current;
        if (!elem) { rafRef.current = requestAnimationFrame(tick); return; }

        const rect = elem.getBoundingClientRect();
        const { x: mx, y: my } = mouseRef.current;

        /* Padding: cursor within 120 px of element triggers resolve */
        const near =
          mx > rect.left - 120 && mx < rect.right  + 120 &&
          my > rect.top  - 120 && my < rect.bottom + 120;

        if (near) {
          /* Find unresolved char closest to cursor */
          let bestIdx = -1, bestDist = Infinity;
          for (let i = 0; i < chars.length; i++) {
            if (resolvedRef.current[i] || chars[i] === ' ') continue;
            /* Approximate char x = left + fraction of total width */
            const cx = rect.left + ((i + 0.5) / chars.length) * rect.width;
            const cy = rect.top  + rect.height * 0.5;
            const d  = Math.hypot(mx - cx, my - cy);
            if (d < bestDist) { bestDist = d; bestIdx = i; }
          }

          /* Resolve up to 2 chars per frame (faster when cursor is close) */
          const solvesThisFrame = bestDist < 120 ? 2 : 1;
          let solved = 0;
          let scanIdx = bestIdx;
          while (solved < solvesThisFrame && scanIdx >= 0) {
            if (!resolvedRef.current[scanIdx] && chars[scanIdx] !== ' ') {
              resolveChar(scanIdx, chars);
              solved++;
            }
            /* Spiral outward from bestIdx to find next unresolved */
            scanIdx = scanIdx > 0 ? scanIdx - 1 : -1;
          }
        }

        /* If cursor is away from element, gently re-scramble 1 char ~every 3 s */
        const away = mx < rect.left - 200 || mx > rect.right + 200 ||
                     my < rect.top  - 200 || my > rect.bottom + 200;
        if (away && Math.random() < 0.003) {
          const candidates = chars
            .map((c, i) => ({ c, i }))
            .filter(({ c, i }) => c !== ' ' && resolvedRef.current[i]);
          if (candidates.length) {
            const { i } = candidates[Math.floor(Math.random() * candidates.length)];
            resolvedRef.current[i] = false;
            setDisplay(prev => {
              const next = [...prev];
              next[i] = rndChar();
              return next;
            });
          }
        }

        /* Pulse unresolved chars: randomise them each frame so they feel alive */
        setDisplay(prev => {
          const next = [...prev];
          let changed = false;
          for (let i = 0; i < chars.length; i++) {
            if (!resolvedRef.current[i] && chars[i] !== ' ') {
              next[i] = rndChar();
              changed = true;
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
      /* ── Mobile / touch: IntersectionObserver auto-resolve ────────────── */
      const totalNonSpace = chars.filter(c => c !== ' ').length;
      /* ~800 ms over 48 frames @ 60 fps → resolve 1 char every ~1.1 frames */
      const framesTotal = 48;

      const startResolve = () => {
        cancelAnimationFrame(rafRef.current);
        let frameCount = 0;

        const step = () => {
          /* Number to resolve this frame based on progress */
          const target = Math.round(((frameCount + 1) / framesTotal) * totalNonSpace);
          const already = resolvedRef.current.filter(Boolean).length;
          const toResolve = target - already;

          for (let n = 0; n < toResolve; n++) {
            /* Find next unresolved char left-to-right */
            const idx = resolvedRef.current.findIndex(
              (r, i) => !r && chars[i] !== ' ',
            );
            if (idx === -1) break;
            resolveChar(idx, chars);
          }

          /* Keep pulsing unresolved chars */
          setDisplay(prev => {
            const next = [...prev];
            let changed = false;
            for (let i = 0; i < chars.length; i++) {
              if (!resolvedRef.current[i] && chars[i] !== ' ') {
                next[i] = rndChar();
                changed = true;
              }
            }
            return changed ? next : prev;
          });

          frameCount++;
          if (frameCount < framesTotal) {
            rafRef.current = requestAnimationFrame(step);
          }
        };

        setTimeout(() => {
          rafRef.current = requestAnimationFrame(step);
        }, resolveDelay);
      };

      /* Start immediately (first render) */
      startResolve();

      /* Re-scramble + re-resolve on each subsequent viewport entry */
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            scrambleAll(chars);
            startResolve();
          }
        },
        { threshold: 0.1 },
      );
      if (elemRef.current) io.observe(elemRef.current);

      return () => {
        cancelAnimationFrame(rafRef.current);
        io.disconnect();
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
      {/* Scrambled visible text — rendered as a single string, hidden from a11y.
          Single text node avoids -webkit-text-fill-color inheritance issues
          that occur with deeply nested per-char spans in Chrome. */}
      <span aria-hidden="true" style={{ color: 'inherit' }}>
        {display.join('')}
      </span>
    </Tag>
  );
}
