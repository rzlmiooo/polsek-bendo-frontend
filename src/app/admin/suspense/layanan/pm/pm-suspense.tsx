"use client";

import axios from "axios";
import AdminNavbar from "@/app/components/adminnavbar";
import Footer from "../../../../components/footer";
import Navbar from "../../../../components/navbar";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from "@/app/utils/auth/page";

interface Pm {
    id: string;
    user_id: string;
    complainant_name: string;
    contact: string;
    complainant_address: string;
    complaint_category: string;
    complaint_title: string;
    complaint_content: string;
    proof: string;
    complaint_date: string;
    complaint_status: string;
}

interface EditedPm {
    complaint_status: string;
}
export default function KelolaPengaduanMasyarakat() {
    const router = useRouter();
    const officerId = getUserId();
    const [pmData, setPm] = useState<Pm[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null); 

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [currentPage, setCurrentPage] = useState(1);

    const userId = getUserId();

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pmData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pmData.length / itemsPerPage);

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
                setLoading(false);
            }
        }
    }, [router]);
    const fetchData = useCallback(async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const apiSlkUrl = `${baseUrl}pm`;
            const pmRes = await axios.get<Pm[]>(apiSlkUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setPm(pmRes.data || []);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError(err.response?.data?.message || 'Failed to fetch PM data.');
        } finally {
            setIsLoading(false);
        }
    }, [token, baseUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmitStatus = async (pmId: string, status: Pm['complaint_status']) => {
        if (!token || isLoading) {
            console.warn('Attempted submit without token or while loading.');
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const payload = {
            officer_in_charge : officerId,
            complaint_status: status,
        };

        try {
            const apiSlkUrl = `${baseUrl}pm/status/${pmId}`;


            await axios.put(apiSlkUrl, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (status === 'diterima') {
                setMessage({ type: 'success', text: 'Laporan diterima!' });
            } else if (status === 'selesai') {
                setMessage({ type: 'error', text: 'Laporan ditolak!' });
            } else if (status === 'investigasi') {
                setMessage({ type: 'success', text: 'Laporan dalam investigasi!' });
            }

            fetchData();
        } catch (err: any) {
            console.error('Error updating status:', err);
            setError(err.response?.data?.message || 'Gagal memperbarui status laporan.');
            setMessage({ type: 'error', text: err.response?.data?.message || 'Gagal memperbarui status laporan.' });
        } finally {
            setIsLoading(false);
        }
    };


    const [formData, setFormData] = useState<EditedPm>({
        complaint_status: "",
    });

    // if (isLoading) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             <p className="text-xl dark:text-white">Loading Kelola Pengaduan Masyarakat...</p>
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl text-red-500 dark:text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <AdminNavbar />

            <main className="lg:ml-[260px]">
                <section className="p-4 pt-6 bg-white py-24 md:py-4 antialiased dark:bg-gray-900">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 **lg:ml-[260px]**">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">List Pengaduan </h2>
                        </div>
                        {pmData.map((pm, index) => (
                            <div key={index} className="mt-4 sm:mt-6 flow-root">
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="flex flex-wrap items-start gap-4 py-6">
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">ID:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                <a href="#" className="hover:underline">{pm.id}</a>
                                            </dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Nama Pemohon:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                <a href="#" className="hover:underline">{pm.complainant_name}</a>
                                            </dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tanggal Komplain:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(pm.complaint_date).toLocaleDateString()}</dd>
                                        </dl>

                                        {/* Status Handling */}
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                            <dd
                                                className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium 
                                                ${pm.complaint_status === "diterima"
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                                        : pm.complaint_status === "investigasi"
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                        : pm.complaint_status === "selesai"
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                                                    }`}
                                            >
                                                {pm.complaint_status === "selesai" ? (
                                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                    </svg>
                                                ) : (
                                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                                    </svg>
                                                )}
                                                {pm.complaint_status.charAt(0).toUpperCase() + pm.complaint_status.slice(1)}
                                            </dd>
                                        </dl>

                                        <div className="mt-auto flex w-full flex-col gap-4 border-t border-gray-200 pt-4 dark:border-neutral-700 sm:flex-row sm:justify-end sm:pt-0">
                                            <button
                                                type="button"
                                                onClick={() => handleSubmitStatus(pm.id, 'investigasi')}
                                                disabled={isLoading}
                                                className={`flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}`}
                                            >
                                                {isLoading ? 'Processing...' : 'Terima & Proses'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSubmitStatus(pm.id, 'selesai')}
                                                disabled={isLoading}
                                                className={`flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-red-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}`}
                                            >
                                                {isLoading ? 'Processing...' : 'Selesai'}
                                            </button>


                                            <Link href={`/admin/layanan/pengaduan/edit-pm?pm_id=${pm.id}`} legacyBehavior>
                                                <button type="button" className="w-full rounded-lg border border-blue-700 px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900 lg:w-auto">Catatan</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-6 mb-50 flex items-center justify-center sm:mt-8" aria-label="Page navigation">
                            <ul className="flex h-8 items-center -space-x-px text-sm">
                                {/* Prev Button */}
                                <li>
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M15 19L8 12l7-7" />
                                        </svg>
                                    </button>
                                </li>

                                {/* Numbered Buttons */}
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`flex h-8 items-center justify-center border px-3 leading-tight ${currentPage === index + 1
                                                ? "z-10 border-primary-300 bg-primary-50 text-primary-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                                : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                {/* Next Button */}
                                <li>
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    )
}