'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import getUserId  from '../utils/auth/page';
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
    if (!token || role !== 'konselor') return;

    const fetchNewBookings = async () => {
      try {
        const [usersRes, bookingsRes] = await Promise.all([
          axios.get('https://sejiwa.onrender.com/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get('https://sejiwa.onrender.com/api/bookings', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        const users = usersRes.data || [];
        const allBookings = bookingsRes.data || [];
  
        // 2. Ambil userId dari token / localStorage / context
        if (!userId) return;
  
        // 3. Filter hanya booking yang pending dan milik si konselor ini
        const pendingBookings = allBookings.filter(
          (b:any) =>
            b.status === "pending" &&
            b.counselor_id === userId
        );
  
        // 4. Gabungkan data pelajar ke masing-masing booking
        const combinedData = pendingBookings.map((booking:any) => {
          const user = users.find((u:any) => u.id === booking.student_id);
          return {
            ...booking,
            user,
          };
        });

        setCount(combinedData.length);
      } catch (err) {
        console.error('Gagal ambil booking baru:', err);
      }
    };

    fetchNewBookings();
    const interval = setInterval(fetchNewBookings, 10000);
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
                    href="/konselor/bookings"
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
    );
}