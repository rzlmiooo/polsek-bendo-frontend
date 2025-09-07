"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from '../../../utils/auth/page';
import Head from "next/head";
import formatTanggalIndonesia from "@/app/components/formatTanggal";

interface SikDetail {
    id: string;
    organizer_name: string;
    event_name: string;
    event_description: string;
    event_start: string;
    event_end: string;
    location: string;
    guest_estimate: string;
    levy_fees: string;
    status_handling: string;
    form_creation: string;
    successMessage: string | null;
    errorMessage: string | null;
}

export default function OrderSik() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [sikData, setSikData] = useState<SikDetail[]>([]);
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

            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, [router]);

    useEffect(() => {

        const fetchSikData = async () => {
            try {
                const apiSikUrl = `${baseUrl}sik`;
                const response = await axios.get(apiSikUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const allSik = response.data || [];

                const userSik = allSik.filter(
                    (sik: any) => sik.user_id == userId
                );

                setSikData(userSik);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchSikData();
    }, [token, userId, baseUrl]);

    function formatRupiah(value: string | number): string {
        const num = typeof value === "string" ? parseInt(value, 10) : value;
        if (isNaN(num)) return "Rp 0";
      
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(num);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading data...</p>
            </div>
        );
    }
    return (
        <>
          <Head>
                <title>Surat Izin Keramaian Saya</title>
                <meta name="description" content="Daftar pengajuan surat izin keramaian Anda.Riwayat pengaduan masyarakat yang telah Anda buat." />
                <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
                <meta name="author" content="Polsek Bendo" />
                <link rel="canonical" href="https://polsek-bendo.my.id/order/sik" />
            </Head>
        <div>
            <div className="sm:flex sm:justify-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-yellow-500 sm:text-2xl my-4 mt-8">Surat Izin Keramaian</h3>
            </div>
            {sikData.map((sik, index) => (
                <div key={index} className="flex flex-wrap items-start gap-6 py-5 border-b border-gray-700">

                    <dl className="w-36 flex-none">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Nama Acara:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{sik.event_name}</dd>
                    </dl>


                    <dl className="w-38 flex-none">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Deskripsi:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{sik.event_description.slice(0, 20)}</dd>
                    </dl>


                    <dl className="w-30 flex-none">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Anggaran:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatRupiah(sik.levy_fees)}</dd>
                    </dl>

                    {sik.status_handling === "dipending" && (
                        <dl className="w-20 flex-none">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                </svg>
                                Pending
                            </dd>
                        </dl>
                    )}

                    {sik.status_handling === "diproses" && (
                        <dl className="w-20 flex-none">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                Diproses
                            </dd>
                        </dl>
                    )}

                    {sik.status_handling === "selesai" && (
                        <dl className="w-20 flex-none">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                                Selesai
                            </dd>
                        </dl>
                    )}

                    <dl className="w-32 flex-none">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Acara Dimulai:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatTanggalIndonesia(new Date(sik.event_start).toDateString())}</dd>
                    </dl>

                    <dl className="w-32 flex-none">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Acara Berakhir:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatTanggalIndonesia(new Date(sik.event_end).toDateString())}</dd>
                    </dl>

                    <dl className="w-48 flex-none">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Lokasi:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{sik.location}</dd>
                    </dl>

                    <div className="flex-1 flex justify-center lg:justify-end">
                        <Link href={`/order/sik/edit-sik?sik_id=${sik.id}`}>
                            <button type="button" className="w-full rounded-lg border border-blue-700 px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900 lg:w-auto">Edit</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </>
    )
}