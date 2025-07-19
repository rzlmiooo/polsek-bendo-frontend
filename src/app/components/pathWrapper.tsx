'use client';

import dynamic from 'next/dynamic';

const PathTitle = dynamic(() => import('./PathTitle'), { ssr: false });

const PathWrapper = () => {
  return <PathTitle />;
};

export default PathWrapper;
