"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from './../../../utils/auth/page';
import Head from "next/head";
import formatTanggalIndonesia from "@/app/components/formatTanggal";

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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
                    (skck: any) => skck.user_id == userId
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
    }, [searchParams, baseUrl, token, userId]);
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-yellow-500 sm:text-xl my-4 mt-8">SKCK</h3>
            </div>
            {skckData.map((skck, index) => (
              <div
                key={index}
                className="flex flex-wrap items-start gap-6 py-5 border-b border-gray-700"
              >
                {/* Nama */}
                <dl className="w-56 flex-none">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Nama:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    <a href="#" className="hover:underline">
                      {skck.applicant_name}
                    </a>
                  </dd>
                </dl>

                {/* Tanggal */}
                <dl className="w-38 flex-none">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Tanggal Pembuatan:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {formatTanggalIndonesia(
                      new Date(skck.submission_date).toDateString()
                    )}
                  </dd>
                </dl>

                {/* TTL */}
                <dl className="w-48 flex-none">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Tempat Tanggal Lahir:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {skck.place_date_birth}
                  </dd>
                </dl>

                {/* Alamat */}
                <dl className="w-38 flex-none">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Alamat Lengkap:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {skck.complete_address}
                  </dd>
                </dl>

                {/* Keperluan */}
                <dl className="w-48 flex-none">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Keperluan:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {skck.needs}
                  </dd>
                </dl>

                {/* Status */}
                <dl className="w-20 flex-none">
                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Status:
                  </dt>
                  {skck.verification_status === "pending" && (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-100">
                      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                      </svg>
                      Pending
                    </dd>
                  )}
                  {skck.verification_status === "proses" && (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                      </svg>
                      Diproses
                    </dd>
                  )}
                  {skck.verification_status === "selesai" && (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                      </svg>
                      Selesai
                    </dd>
                  )}
                </dl>

                {/* Tombol */}
                <div className="flex-1 flex justify-center lg:justify-end">
                  <Link
                    href={`/order/skck/edit-skck?skck_id=${skck.id}&applicant_name=${skck.applicant_name}`}
                  >
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-blue-700 text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white transition dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white"
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}

        </div>
    </>
    )
}