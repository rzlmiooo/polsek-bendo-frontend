'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import getUserId from '../utils/auth/page';
import { useRouter } from "next/navigation";

export default function NotificationBell() {
  const userId = getUserId();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [count, setCount] = useState(0);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const userRole = localStorage.getItem('role'); 
      if (userRole !== 'user') {
        router.replace('/unauthorized');
        return;
      }
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const apiSkckUrl = `${baseUrl}skck`;
        const apiSikUrl = `${baseUrl}sik`;
        const apiPmUrl = `${baseUrl}pm`;
        const apiSlkUrl = `${baseUrl}slk`;

        const [skcksRes, sikRes, pmRes, slkRes] = await Promise.all([
          axios.get(apiSkckUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(apiSikUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(apiPmUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(apiSlkUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        const allSkck = skcksRes.data || [];
        const allSik = sikRes.data || [];
        const allPm = pmRes.data || [];
        const allSlk = slkRes.data || [];

        const skckWithNotes = allSkck.filter((item: any) => item.officer_notes && item.officer_notes.trim() !== '');
        const sikWithNotes = allSik.filter((item: any) => item.officer_notes && item.officer_notes.trim() !== '');
        const pmWithNotes = allPm.filter((item: any) => item.officer_notes && item.officer_notes.trim() !== '');
        const slkWithNotes = allSlk.filter((item: any) => item.officer_notes && item.officer_notes.trim() !== '');

        const combinedNotifications = [
          ...skckWithNotes,
          ...sikWithNotes,
          ...pmWithNotes,
          ...slkWithNotes,
        ];

        setCount(combinedNotifications.length);

      } catch (err) {
        console.error('Gagal ambil notifikasi:', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [token, role, baseUrl]); 

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-pointer">
        <BellIcon className="h-7 w-7 text-gray-600" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl z-50 p-4 text-sm">
          {count > 0 ? (
            <>
              <p className="mb-2 font-medium">{count} Pesan dari Polisi terbaru</p>
              <Link
                href="/order/note"
                className="text-sky-500 hover:underline"
              >
                Pergi ke Catatan
              </Link>
            </>
          ) : (
            <>
              <p className="mb-2 text-gray-500">Belum ada Catatan</p>
              <span className="text-gray-400 cursor-not-allowed">
                Pergi ke Catatan
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}