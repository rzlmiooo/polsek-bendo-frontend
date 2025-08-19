"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from "@/app/utils/auth/page";
import { Plus, Calendar, Clock, MapPin } from 'lucide-react';


interface NewsArticle {
    id: string;
    title: string;
    content: string;
    url_gambar_unggulan: string;
    slug: string;
    excerpt: string;
    category: string;
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
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <main className="flex-1 transition-all duration-300 pt-16 lg:pt-0 lg:ps-64">
                <div className="bg-white text-black min-h-screen p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">All Posts</h1>

                    {loading ? (
                        <div className="text-center text-gray-500">Loading articles...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {/* New Post Card */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center p-6 text-center transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
                                <Link href="/admin/articles/create-article">
                                    <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                                        <Plus className="w-10 h-10 text-gray-500" />
                                    </div>
                                        <span className="text-xl font-semibold text-gray-700">New Post</span>
                                </Link>
                            </div>

                            {news.map(article => (
                                <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                                    {/* Image Section */}
                                    <div className="w-full h-48 bg-gray-200 relative">
                                        <img src={article.url_gambar_unggulan} alt={article.title} className="w-full h-full object-cover" />
                                        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{article.category}</span>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h2>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

                                        <div className="flex items-center text-gray-500 text-sm mb-1">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span>{new Date(article.published_at).toDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm mb-1">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span>{new Date(article.published_at).toLocaleTimeString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span>Location</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-center ">
                                        <Link href={`/admin/articles/edit-article?blog_id=${article.id}`}>
                                            <button className="text-blue-600 font-semibold hover:underline transition">
                                                View Details
                                            </button>    
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}