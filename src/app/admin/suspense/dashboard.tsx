'use client'

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import getUserId  from '../../utils/auth/page';
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import DateTimeDisplay from '@/app/components/date';
import Image from 'next/image';


export default function Dashboard(){
    const userId = getUserId();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [countSKCK, setCountSKCK] = useState(0);
    const [countSIK, setCountSIK] = useState(0);
    const [countSLK, setCountSLK] = useState(0);
    const [countPM, setCountPM] = useState(0);
    const [role, setRole] = useState(null);
    const [open, setOpen] = useState(false); 
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour >= 4 && hour < 10) setGreeting("Selamat Pagi,");
        else if (hour >= 10 && hour < 15) setGreeting("Selamat Siang,");
        else if (hour >= 15 && hour < 18) setGreeting("Selamat Sore,");
        else setGreeting("Selamat Malam,");
    }, []);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            const role = localStorage.getItem('role');

            if (storedToken) {
                try {
                  const decoded = jwtDecode(storedToken) as { username?: string; sub?: string };
                  setName(decoded.username || decoded.sub || 'User');
                } catch (e) {
                    console.error("Invalid token", e);
                }
            }
  
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

            console.log("pm", allPm);
            
      
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

    return (
        <main className="lg:ml-[260px] pt-4 py-4 px-6 grid grid-rows-2 md:grid-cols-2 gap-4 over">
            <div className="flex justify-between items-center row-span-2 md:col-span-2 border-b-3 rounded-xl bg-yellow-100 dark:bg-gray-800 border-orange-400 py-4 px-8 text-gray-800 dark:text-white font-bold text-center">
                <div className="flex gap-4 items-center">
                    <Image className="object-cover w-10 md:w-20 h-auto" src="/images/polda_jatim.png" alt="" width={100} height={100} priority></Image>
                    <div className="flex flex-col items-start justify-center border-l-1 dark:border-yellow-50 border-gray-900">
                        <div className="px-4 md:px-6 text-sm md:text-2xl">
                            {greeting}
                        </div>
                        <div className="px-4 md:px-6 pt-1 md:pt-2 text-xs md:text-lg">
                            {name}
                        </div>
                    </div>
                </div>
                <DateTimeDisplay />
            </div>
            <Link href="/admin/layanan/skck" className="border-b-3 rounded-xl bg-yellow-100 dark:bg-gray-800 border-green-400 p-4 text-gray-800 dark:text-white font-bold grid grid-cols-2 gap-4 h-40 md:h-48">
              <div className="pt-2 md:pt-4 pl-2 md:pl-4 text-sm md:text-base">
                Permintaan SKCK
              </div>
              <div className="p-4 row-span-2 flex gap-6 items-center justify-evenly">
                <span className="text-7xl md:text-9xl">{countSKCK}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-8 md:w-12 h-auto"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10a1 1 0 001 1h10a1 1 0 001-1v-5" />
                </svg>
              </div>
              <div>
                <svg className="ml-2 -mt-2 w-12 md:w-18 h-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke='currentColor' d="m9.2 15.6l2.8-2.1l2.75 2.1l-1.05-3.4l2.8-2.2h-3.4L12 6.6L10.9 10H7.5l2.75 2.2zM12 22q-3.475-.875-5.737-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3m0-7.9" /></svg>
              </div>
            </Link>
            <Link href="/admin/layanan/izin_keramaian" className="border-b-3 rounded-xl bg-yellow-100 dark:bg-gray-800 border-red-400 p-4 text-gray-800 dark:text-white font-bold grid grid-cols-2 gap-4 h-40 md:h-48">
              <div className="pt-2 md:pt-4 pl-2 md:pl-4 text-sm md:text-base">
                Permintaan Surat Izin Keramaian
              </div>
              <div className="p-4 row-span-2 flex gap-6 justify-evenly items-center">
              <span className="text-7xl md:text-9xl">{countSIK}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-8 md:w-12 h-auto"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10a1 1 0 001 1h10a1 1 0 001-1v-5" />
                </svg>
              </div>
              <div className="ml-2 -mt-2">
                <svg className="w-12 md:w-18 h-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke='currentColor' d="M16.5 9.75q-.625 0-1.062-.437T15 8.25t.438-1.062T16.5 6.75t1.063.438T18 8.25t-.437 1.063t-1.063.437m-9 0q-.625 0-1.062-.437T6 8.25t.438-1.062T7.5 6.75t1.063.438T9 8.25t-.437 1.063T7.5 9.75M12 12.5q-.625 0-1.062-.437T10.5 11t.438-1.062T12 9.5t1.063.438T13.5 11t-.437 1.063T12 12.5M12 7q-.625 0-1.062-.437T10.5 5.5t.438-1.062T12 4t1.063.438T13.5 5.5t-.437 1.063T12 7m0 13q-.5 0-1.012-.075t-.988-.2V16.15q0-.875.588-1.512T12 14t1.413.638T14 16.15v3.575q-.475.125-.987.2T12 20m-3.5-.8q-.5-.2-.962-.45t-.888-.55q-.7-.5-1.112-1.3t-.413-1.7q0-.65-.137-1.212T4.5 12.925q-.25-.325-.937-.987T2.3 10.7q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.825 3.625q.5.45.738 1.063T8.5 15.25zm7 0v-3.95q0-.65.25-1.275t.725-1.05L20.3 9.3q.3-.275.713-.275t.687.275t.275.7t-.275.7q-.575.575-1.263 1.225t-.937 1q-.35.5-.488 1.063t-.137 1.212q0 .9-.413 1.713t-1.137 1.312q-.4.275-.862.525t-.963.45" /></svg>
              </div>
            </Link>
            <Link href="/admin/layanan/pengaduan" className="border-b-3 rounded-xl bg-yellow-100 dark:bg-gray-800 border-sky-400 p-4 text-gray-800 dark:text-white font-bold grid grid-cols-2 gap-4 h-40 md:h-48">
              <div className="pl-2 md:pl-4 pt-2 md:pt-4 text-sm md:text-base">
                Permintaan Surat Pengeduan Masyarakat
              </div>
              <div className="p-4 row-span-2 flex gap-6 justify-evenly items-center">
              <span className="text-7xl md:text-9xl">{countPM}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-8 md:w-12 h-auto"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10a1 1 0 001 1h10a1 1 0 001-1v-5" />
                </svg>
              </div>
              <div className="ml-2 -mt-2">
                <svg className="w-12 md:w-16 h-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 8a3 3 0 0 1 0 6m-8-6v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5" /><path d="m12 8l4.524-3.77A.9.9 0 0 1 18 4.922v12.156a.9.9 0 0 1-1.476.692L12 14H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /></g></svg>
              </div>
            </Link>
            <Link href="/admin/layanan/laporan_kehilangan" className="border-b-3 rounded-xl bg-yellow-100 dark:bg-gray-800 border-yellow-400 p-4 text-gray-800 dark:text-white font-bold grid grid-cols-2 gap-4 h-40 md:h-48">
              <div className="pl-2 md:pl-4 pt-2 md:pt-4 text-sm md:text-base">
                Permintaan Surat Laporan Kehilangan
              </div>
              <div className="p-4 row-span-2 flex gap-6 justify-evenly items-center">
              <span className="text-7xl md:text-9xl">{countSLK}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-8 md:w-12 h-auto"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10a1 1 0 001 1h10a1 1 0 001-1v-5" />
                </svg>
              </div>
              <div className="ml-2 -mt-4">
                <svg className="w-12 md:w-16 h-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke='currentColor' d="M11 10q.825 0 1.413-.587T13 8t-.587-1.412T11 6t-1.412.588T9 8t.588 1.413T11 10m0 4q1.125 0 2.113-.475t1.712-1.35q-.875-.575-1.837-.875T11 11t-1.987.3t-1.838.875q.725.875 1.712 1.35T11 14m9.6 7l-4.7-4.7q-1.025.8-2.262 1.25T11 18q-3.35 0-5.675-2.325T3 10t2.325-5.675T11 2t5.675 2.325T19 10q0 1.4-.45 2.638T17.3 14.9l4.7 4.7zM11 16q2.5 0 4.25-1.75T17 10t-1.75-4.25T11 4T6.75 5.75T5 10t1.75 4.25T11 16m0-6" /></svg>
              </div>
            </Link>
        </main>
    )
}