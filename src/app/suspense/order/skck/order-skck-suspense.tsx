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
import Head from "next/head";

interface SkckDetail {
    id: string;
    applicant_name: string;
    place_date_birth: string;
    complete_address: string;
    needs: string;
    id_number: string;
    submission_date: string;
    officer_notes: string;
    passport_photo: string;
    verification_status: string;
    successMessage: string | null;
    errorMessage: string | null;
}

export default function OrderSkck() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [skckData, setSkckData] = useState<SkckDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const userId = getUserId();


    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = skckData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(skckData.length / itemsPerPage);

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

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiSkckUrl = `${baseUrl}skck`;

                const skckRes = await axios.get(apiSkckUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const allSkck = skckRes.data || [];

                const skckUser = allSkck.filter(
                    (skck: any) => String(skck.user_id) === String(userId)
                );
                setSkckData(skckUser);
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
        <>
        <Head>
                <title>SKCK Saya</title>
                <meta name="description" content="Riwayat pengajuan SKCK Anda." />
                <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
                <meta name="author" content="Polsek Bendo" />
                <link rel="canonical" href="https://polsek-bendo.my.id/order/skck" />
        </Head>
        <div>
            <div className="sm:flex sm:justify-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-yellow-500 sm:text-2x1 m-4">Skck</h3>
            </div>
            {skckData.map((skck, index) => (
                <div key={index} className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-7 gap-y-8 py-10 border-b border-gray-700">
                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Nama:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{skck.applicant_name}</a>
                        </dd>
                    </dl>

                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tanggal Pembuatan:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(skck.submission_date).toDateString()}</dd>

                    </dl>

                    {skck.verification_status === "dipending" && (
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

                    {skck.verification_status === "diproses" && (
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

                    {skck.verification_status === "selesai" && (
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
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tempat Tanggal Lahir:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{skck.place_date_birth}</a>
                        </dd>
                    </dl>

                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Alamat Lengkap:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{skck.complete_address}</a>
                        </dd>
                    </dl>

                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Keperluan:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{skck.needs}</a>
                        </dd>
                    </dl>

                    <dl className="col-span-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Catatan Dari Polisi:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">{skck.officer_notes}</a>
                        </dd>
                    </dl>

                    <div className="col-span-full flex justify-center lg:justify-end">
                        <Link href={`/order/skck/edit-skck?skck_id=${skck.id}&applicant_name=${skck.applicant_name}`} legacyBehavior>
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg border border-blue-700 text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white transition dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white"
                            >
                                Edit
                            </button>
                        </Link>
                    </div>


                    <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
                        <div className="mt-6 mb-10 flex items-center justify-center sm:mt-8" aria-label="Page navigation">
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
                    </nav>
                </div>
            ))}
        </div>
    </>
    )
}