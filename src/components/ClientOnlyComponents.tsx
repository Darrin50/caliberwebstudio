'use client';
import dynamic from 'next/dynamic';

// These components use browser-only APIs (Three.js, Canvas) and must not run on the server.
// They are imported here in a Client Component so that ssr:false is valid.
export const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });
export const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });
export const FloatingElements = dynamic(() => import('./FloatingElements'), { ssr: false });
export const MuscleCar = dynamic(() => import('./MuscleCar'), { ssr: false });
