"use client";

import axios from "axios";
import AdminNavbar from "@/app/components/adminnavbar";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from "@/app/utils/auth/page";

interface NewsArticle {
    id: string;
    title: string;
    content: string;
    url_gambar_unggulan: string;
    slug: string;
    published_at: string;
    status: string;
}

export default function Article() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [currentPage, setCurrentPage] = useState(1);

    const userId = getUserId();

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(news.length / itemsPerPage);

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

        const fetchData = async () => {
            const apiUrl = `${baseUrl}news`;

            try {
                const newsRes = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const news = newsRes.data || [];

                setNews(news);
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
        <div>
            {/* <AdminNavbar /> */}
            <main className="lg:ml-[260px]">
                <section className="p-2 pt-4 bg-white antialiased dark:bg-gray-900 py-24 md:py-4">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 **lg:ml-[260px]**">
                        <div className="mx-auto max-w-5xl">
                            <div className="gap-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">List Artikel</h2>
                                <div className="">
                                    <Link href="./articles/create-article">
                                        <button
                                            type="button"
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Buat Artikel
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            
                            {news.map((blog, index) => (
                                <div key={index} className="mt-6 flow-root sm:mt-8">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="flex flex-wrap items-start gap-y-4 py-6">
                                        <dl className="w-full sm:w-1/2 lg:w-1/4 pr-4">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Title:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a href="#" className="hover:underline">{blog.title}</a>
                                        </dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-1/6 pr-4">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Post ID:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a href="#" className="hover:underline">{blog.id}</a>
                                        </dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-1/6 pr-4">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            {new Date(blog.published_at).toLocaleDateString()}
                                        </dd>
                                        </dl>

                                        {blog.status === "draft" && (
                                        <dl className="w-1/2 sm:w-1/4 lg:w-1/6 pr-4">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                            <svg className="me-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                            </svg>
                                            Draft
                                            </dd>
                                        </dl>
                                        )}

                                        {blog.status === "published" && (
                                        <dl className="w-1/2 sm:w-1/4 lg:w-1/6 pr-4">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                            <svg className="me-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                            Published
                                            </dd>
                                        </dl>
                                        )}

                                        <div className="w-full sm:w-auto lg:w-1/6 flex justify-end">
                                        <Link href={`/admin/articles/edit-article?blog_id=${blog.id}`}>
                                            <button
                                            type="button"
                                            className="w-full sm:w-auto rounded-lg border border-blue-700 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900">
                                            Edit
                                            </button>
                                        </Link>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            ))}

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
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}