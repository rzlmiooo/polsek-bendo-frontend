"use client";

import axios from "axios";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface NewsArticle {
    id: string;
    title: string;
    content: string;
    url_gambar_unggulan: string;
    slug: string;
}

export default function Article() {
    const searchParams = useSearchParams();
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiNewsUrl = `${baseUrl}news`;

                const newsRes = await axios.get(apiNewsUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const fetchedNews = newsRes.data || [];
                setNews(fetchedNews);
                setFilteredNews(fetchedNews);
            }
            catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load news articles.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchParams, baseUrl]);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const results = news.filter(article =>
            article.title.toLowerCase().includes(lowercasedSearchTerm) ||
            article.content.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredNews(results);
    }, [searchTerm, news]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return (
            <div className="bg-white text-black min-h-screen flex items-center justify-center">
                <p>Loading news...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white text-black min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white text-black min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <div className="pt-18" >
                <section className="bg-[#f5b042] text-white py-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Polsek Bendo Blog</h1>
                    <p className="text-lg">Share your stories, ideas, and thoughts with the world.</p>
                </section>
            </div>
            
            <div className="mt-6 flex justify-center">
                <div className="w-full max-w-md min-w-[200px]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search news by title or content..."
                            className="p-3 rounded-xl w-full text-black focus:outline-none border-2 border-black focus:ring-2 focus:ring-[#f3f3f3]"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
        </div>

            {/* Blog Section */ }
            <section className="p-8">
                <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.length > 0 ? (
                        filteredNews.map((blog, index) => (
                            <div key={index} className="bg-[#f9f9f9] rounded-2xl p-6 shadow hover:shadow-lg transition">
                                <img src={blog.url_gambar_unggulan} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                <p className="text-gray-700 mb-4">{blog.content.slice(0, 100)}...</p>
                                <Link href={`/artikel/read-article?blog_id=${blog.id}`} legacyBehavior>
                                    <a className="bg-[#f5b042] text-white px-4 py-2 rounded-xl inline-block hover:bg-[#e0a030] transition duration-300">Read More</a>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-600">No news articles found matching your search.</p>
                    )}
                </div>
            </section>
            <Footer />
        </div >
    )
}