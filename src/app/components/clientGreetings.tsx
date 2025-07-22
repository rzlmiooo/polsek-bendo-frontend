'use client';

import { useEffect, useState } from 'react';
import UserGreeting from './greetings'; 

export default function ClientGreeting() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); 
  }, []);

  if (!hasMounted) {
    return null; 
  }

  return <UserGreeting />;
}