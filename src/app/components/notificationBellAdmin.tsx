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
  const [countSKCK, setCountSKCK] = useState(0);
  const [countSIK, setCountSIK] = useState(0);
  const [countSLK, setCountSLK] = useState(0);
  const [countPM, setCountPM] = useState(0);
  const total = countPM + countSIK + countSKCK + countSLK;
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false); 
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  useEffect(() => {
      setIsClient(true);
      if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('token');
   
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
        const apiUserUrl = `${baseUrl}users`;
        const apiSkckUrl = `${baseUrl}skck`;
        const apiSikUrl = `${baseUrl}sik`;
        const apiSlkUrl = `${baseUrl}slk`;
        const apiPmUrl = `${baseUrl}pm`;

        const [usersRes, skcksRes, sikRes, slkRes, pmRes] = await Promise.all([
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
          axios.get(apiSikUrl, {
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
          axios.get(apiPmUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        const users = usersRes.data || [];
        const allSkcks = skcksRes.data || [];
        const allSik = sikRes.data || [];
        const allSlk = slkRes.data || [];
        const allPm = pmRes.data || [];
  
        if (!userId) return;
  
        const pendingSkcks = allSkcks.filter(
          (b:any) =>
            b.verification_status === "proses" || b.verification_status === "pending" &&
            users.filter((user:any) => user.id === b.user_id)
        );

        const combinedData = pendingSkcks.map((skck:any) => {
          const user = users.find((u:any) => u.id === skck.officer_in_charge);
          return {
            ...skck,
            user,
          };
        });

        const pendingSik = allSik.filter(
          (b:any) =>
            b.status_handling === "diproses" || b.status_handling === "dipending" &&
            users.filter((user:any) => user.id === b.user_id)
        );

        const combinedDataSIK = pendingSik.map((sik:any) => {
          const user = users.find((u:any) => u.id === sik.officer_in_charge);
          return {
            ...sik,
            user,
          };
        });

        const pendingSlk = allSlk.filter(
          (b:any) =>
            b.status_handling === "diterima" || b.status_handling === "investigasi" &&
            users.filter((user:any) => user.id === b.user_id)
        );

        const combinedDataSLK = pendingSlk.map((slk:any) => {
          const user = users.find((u:any) => u.id === slk.officer_in_charge);
          return {
            ...slk,
            user,
          };
        });

        const pendingPm = allPm.filter(
          (b:any) =>
            b.complaint_status === "diterima" || b.complaint_status === "investigasi" &&
            users.filter((user:any) => user.id === b.user_id)
        );

        const combinedDataPM = pendingPm.map((pm:any) => {
          const user = users.find((u:any) => u.id === pm.officer_in_charge);
          return {
            ...pm,
            user,
          };
        });

        setCountSKCK(combinedData.length);
        setCountSIK(combinedDataSIK.length);
        setCountSLK(combinedDataSLK.length);
        setCountPM(combinedDataPM.length);
      } catch (err) {
        console.error('Gagal ambil skck baru:', err);
      }
    };

    fetchNewSkck();
    const interval = setInterval(fetchNewSkck, 10000);
    return () => clearInterval(interval);
  }, [token, role]);


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
            {total > 0 && (
              <>
                <BellIcon className="h-7 w-7 text-gray-900 dark:text-sky-50" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {total}
                </span>
              </>
            )}
            {total == 0 && (
              <>
                <BellIcon className="h-7 w-7 text-gray-900 dark:text-sky-50" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {total}
                </span>
              </>
            )}
        </div>

        {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl z-50 p-4 text-sm text-gray-500 dark:text-gray-50">
            {countSKCK > 0 ? (
                <>
                <p className="mb-2 mt-2 font-medium">{countSKCK} Permintaan SKCK</p>
                <Link
                    href="/admin/layanan/skck"
                    className="text-sky-500 hover:underline"
                >
                    Pergi ke Kelola SKCK
                </Link>
                </>
            ) : (
                <>
                <p className="mb-2 mt-2 text-gray-500 dark:text-gray-50">Belum ada Booking</p>
                <span className="text-gray-400 cursor-not-allowed">
                    Pergi ke Kelola SKCK
                </span>
                </>
            )}
            {countSIK > 0 ? (
                <>
                <p className="mb-2 mt-2 font-medium">{countSIK} Permintaan SIK</p>
                <Link
                    href="/admin/layanan/izin_keramaian"
                    className="text-sky-500 hover:underline"
                >
                    Pergi ke Kelola SIK
                </Link>
                </>
            ) : (
                <>
                <p className="mb-2 mt-2 text-gray-500 dark:text-gray-50">Belum ada Booking</p>
                <span className="text-gray-400 cursor-not-allowed">
                    Pergi ke Kelola SIK
                </span>
                </>
            )}
            {countPM > 0 ? (
                <>
                <p className="mb-2 mt-2 font-medium">{countPM} Aduan Masyarakat</p>
                <Link
                    href="/admin/layanan/pengaduan"
                    className="text-sky-500 hover:underline"
                >
                    Pergi ke Kelola Pengaduan
                </Link>
                </>
            ) : (
                <>
                <p className="mb-2 mt-2 text-gray-500 dark:text-gray-50">Belum ada Booking</p>
                <span className="text-gray-400 cursor-not-allowed">
                    Pergi ke Kelola Pengaduan
                </span>
                </>
            )}
            {countSLK > 0 ? (
                <>
                <p className="mb-2 mt-2 font-medium">{countSLK} Laporan Kehilangan</p>
                <Link
                    href="/admin/layanan/laporan_kehilangan"
                    className="text-sky-500 hover:underline"
                >
                    Pergi ke Kelola SLK
                </Link>
                </>
            ) : (
                <>
                <p className="mb-2 mt-2 text-gray-500 dark:text-gray-50">Belum ada Booking</p>
                <span className="text-gray-400 cursor-not-allowed">
                    Pergi ke Kelola SLK
                </span>
                </>
            )}
            </div>
        )}
        </div>    
      </Suspense>
    );
}