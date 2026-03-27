import { Suspense } from 'react';
import PreviewClient from './PreviewClient';

export const metadata = {
  title: 'Website Preview | Caliber Web Studio',
  description: 'Preview your custom business website — built by Caliber Web Studio.',
};

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            background: '#0a0a0a',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 16,
          }}
        >
          Loading preview…
        </div>
      }
    >
      <PreviewClient />
    </Suspense>
  );
}
