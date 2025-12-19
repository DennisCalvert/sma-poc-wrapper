'use client';

import dynamic from 'next/dynamic';

// Only load DevTools in development mode
const DevTools = dynamic(() => import('./DevTools'), {
  ssr: false,
});

export default function DevToolsWrapper() {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <DevTools />;
}
