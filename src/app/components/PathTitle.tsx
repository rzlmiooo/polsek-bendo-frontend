'use client';

import usePath from '@/app/hooks/usePath';

const PathTitle = () => {
  const title = usePath();

  return <h1>{title}</h1>;
};

export default PathTitle;
