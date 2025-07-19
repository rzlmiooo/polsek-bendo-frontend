'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import getUserId  from '../utils/auth/page';
import { useRouter } from "next/navigation";
import { Suspense } from 'react';

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
              console.log("Token", storedToken);
              const role = localStorage.getItem('role');
  
              if (role !== 'admin') {
                  router.replace('/unauthorized');
                  return;
              }
  
              if (storedToken) {
                  setToken(storedToken);
              }
          }
  }, [router]);

  useEffect(() => {
    const fetchNewSkck = async () => {
      try {
        const apiSkckUrl = `${baseUrl}skck`;
        const apiUserUrl = `${baseUrl}users`;

        const [usersRes, skcksRes] = await Promise.all([
          axios.get(apiUserUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(apiSkckUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        const users = usersRes.data || [];
        const allSkcks = skcksRes.data || [];
  
        if (!userId) return;
  
        const pendingSkcks = allSkcks.filter(
          (b:any) =>
            b.status === "pending" &&
            b.counselor_id === userId
        );
  
        const combinedData = pendingSkcks.map((skck:any) => {
          const user = users.find((u:any) => u.id === skck.officer_in_charge);
          return {
            ...skck,
            user,
          };
        });

        setCount(combinedData.length);
      } catch (err) {
        console.error('Gagal ambil skck baru:', err);
      }
    };

    fetchNewSkck();
    const interval = setInterval(fetchNewSkck, 10000);
    return () => clearInterval(interval);
  }, [token, role]);

  if (role === null || token === null) return null;
  if (role !== 'konselor') return null;
  

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
        <Suspense>
        <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <div className="cursor-pointer">
            <BellIcon className="h-7 w-7 text-sky-50" />
            {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
            </span>
            )}
        </div>

        {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl z-50 p-4 text-sm">
            {count > 0 ? (
                <>
                <p className="mb-2 font-medium">{count} Booking terbaru</p>
                <Link
                    href="/admin/order"
                    className="text-sky-500 hover:underline"
                >
                    Pergi ke Booking
                </Link>
                </>
            ) : (
                <>
                <p className="mb-2 text-gray-500">Belum ada Booking</p>
                <span className="text-gray-400 cursor-not-allowed">
                    Pergi ke Booking
                </span>
                </>
            )}
            </div>
        )}
        </div>    
      </Suspense>
    );
}