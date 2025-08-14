import { useEffect, useState } from 'react';
import getUserId from './../../../utils/auth/page';

export default function StatusChecker() {
  const [status, setStatus] = useState('diproses');

  const userId = getUserId();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/skck/status?userId=${userId}`)
        .then(res => res.json())
        .then(data => setStatus(data.status))
        .catch(console.error);
    }, 5000); 

    return () => clearInterval(interval);
  }, [userId]);

  return <div>Status Anda: <b>{status}</b></div>;
}
