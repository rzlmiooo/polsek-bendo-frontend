"use client";

import axios from "axios";
import AdminNavbar from "@/app/components/adminnavbar";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from './../../../utils/auth/page';


interface SlkDetail{
  id : string;
  reporter_name: string;
  contact_reporter: string;
  item_type: string;
  date_lost: string;
  chronology: string;
  status_handling: string;
  successMessage: string | null;
  errorMessage: string | null;
}


export default function OrderSlk() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [slkData, setSlkData] = useState<SlkDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const userId = getUserId();
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {

            const storedToken = localStorage.getItem('token');
            console.log("Token", storedToken);
            const role = localStorage.getItem('role');

            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, [router]);


    useEffect(() => {
        const fetchData = async () => {
            try {    
                const apiSlkUrl = `${baseUrl}slk`;

                const slkRes = await axios.get(apiSlkUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const allslk = slkRes.data || [];

                const slkUser = allslk.filter(
                    (slk: any) => String(slk.user_id) === String(userId)
                );
                setSlkData(slkUser);
            }
            catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [searchParams]);

  return (
    <div >
    <div className="sm:flex sm:justify-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-yellow-500 sm:text-2x1 m-4">Surat Laporan Kehilangan</h3>
            </div>     
            {slkData.map((slk, index) => (
                <div key={index} className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-7 gap-y-8 py-10 border-b border-gray-700">
                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Nama:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{slk.reporter_name}</a>
                        </dd>
                    </dl>

                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tanggal Kehilangan:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(slk.date_lost).toDateString()}</dd>
                    </dl>

                    {slk.status_handling === "dipending" && (
                        <dl className="col-span-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                </svg>
                                Pending
                            </dd>
                        </dl>
                    )}

                    {slk.status_handling === "diproses" && (
                        <dl className="col-span-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                Diproses
                            </dd>
                        </dl>
                    )}

                    {slk.status_handling === "selesai" && (
                        <dl className="col-span-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                                Published
                            </dd>
                        </dl>
                    )}

                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Nomor Telepon:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{slk.contact_reporter}</a>
                        </dd>
                    </dl>

                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tipe:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{slk.item_type}</a>
                        </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-1 lg:flex lg:w-36 lg:items-center lg:justify-end gap-4">
                        <Link href={`/order/slk/edit-slk?slk_id=${slk.id}?reporter_name=${slk.reporter_name}`} legacyBehavior>
                            <button type="button" className="w-full rounded-lg border border-blue-700 px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900 lg:w-auto">Edit</button>
                        </Link>
                    </div>
                </div>
            ))}
      </div>
  );
}
