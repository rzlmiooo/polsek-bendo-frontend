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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;


    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const apiNewsUrl = `${baseUrl}news`;

                const newsRes = await axios.get(apiNewsUrl, {
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
        <div className="bg-white text-black min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <div className="pt-18" >
                <section className="bg-[#f5b042] text-white py-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Polsek Bendo Blog</h1>
                    <p className="text-lg">Share your stories, ideas, and thoughts with the world.</p>
                </section>
            </div>
            {/* Blog Section */}
            <section className="p-8">
                <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((blog, index) => (
                        <div key={index} className="bg-[#f9f9f9] rounded-2xl p-6 shadow hover:shadow-lg transition">
                            <img src={blog.url_gambar_unggulan} alt="" />
                            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                            <p className="text-gray-700 mb-4">{blog.content.slice(0, 50)}</p>
                            <Link href={`/artikel/read-article?blog_id=${blog.id}`} legacyBehavior>
                                <a className="bg-[#f5b042] text-white px-4 py-2 rounded-xl inline-block">Read More</a>
                            </Link>                        
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}