'use client';
import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // Already scrolled past — reveal instantly, no animation
    if (rect.bottom <= 0) {
      el.style.transition = 'none';
      el.classList.add('visible');
      return;
    }

    // In viewport on mount — reveal immediately with animation
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), delay);
      return;
    }

    // Below fold — use IntersectionObserver with generous pre-trigger margin
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function ScrollRevealGroup({ children, className = '', stagger = 120 }: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const kids = Array.from(container.children) as HTMLElement[];
    kids.forEach((child) => {
      child.classList.add('reveal');
    });

    const rect = container.getBoundingClientRect();

    // Already scrolled past — reveal instantly
    if (rect.bottom <= 0) {
      kids.forEach((child) => {
        child.style.transition = 'none';
        child.classList.add('visible');
      });
      return;
    }

    // In viewport on mount — stagger reveal
    if (rect.top < window.innerHeight) {
      kids.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * stagger);
      });
      return;
    }

    // Below fold — observe with generous pre-trigger margin
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          kids.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * stagger);
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 200px 0px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
