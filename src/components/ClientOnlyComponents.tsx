'use client';
import dynamic from 'next/dynamic';

// These components use browser-only APIs (WebGL, Canvas) and must not run on the server.
// They are imported here in a Client Component so that ssr:false is valid.
export const HeroShader      = dynamic(() => import('./HeroShader'),      { ssr: false });
export const InteractiveOrbs = dynamic(() => import('./InteractiveOrbs'), { ssr: false });
export const ChatWidget      = dynamic(() => import('./ChatWidget'),      { ssr: false });
export const FloatingElements = dynamic(() => import('./FloatingElements'), { ssr: false });
