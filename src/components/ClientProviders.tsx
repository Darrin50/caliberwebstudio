'use client';
import dynamic from 'next/dynamic';

const CursorSparkle = dynamic(() => import('@/components/CursorSparkle'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorSparkle />
      {children}
    </>
  );
}
