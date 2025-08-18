"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import purify from 'isomorphic-dompurify';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Image from 'next/image';
import Head from 'next/head';

interface DetailedNewsArticle {
  id: string;
  title: string;
  content: string;
  url_gambar_unggulan: string;
  excerpt: string;
  author_id: string;
  category_id: string;
  published_at: string;
}

export default function ReadArticle() {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<DetailedNewsArticle[]>([]);
  const articleId = searchParams.get('blog_id');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!articleId) {
      setError("Article ID not found in URL.");
      setLoading(false);
      return;
    }

    const fetchArticleDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiNewsUrl = `${baseUrl}news/${articleId}`;
        const response = await axios.get(apiNewsUrl, {
        });

        const articleRes = response.data || [];;

        setArticle(articleRes);
      } catch (err) {
        console.error(`Error fetching article ${articleId}:`, err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || `Failed to fetch article. Article not found or server error.`);
        } else {
          setError('An unexpected error occurred while fetching the article.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [articleId]);

  if (loading) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <p className="text-xl text-blue-600">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Article not found.</p>
      </div>
    );
  }

  return (
    <>
      {/* SEO */}
      <Head>
        <title>Detail Artikel</title>
        <meta name="description" content="Baca artikel lengkap dan berita terbaru dari Polsek Bendo." />
        <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
        <meta name="author" content="Polsek Bendo" />
        <link rel="canonical" href="https://polsek-bendo.my.id/artikel/read-article" />
      </Head>
      <div className="bg-white text-black min-h-screen">
        <Navbar />
        {article.map((article, index) => (
          <div key={index} className="max-w-4xl mt-14 mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <img
              src={article.url_gambar_unggulan}
              alt={article.title || "Article featured image"}
              width={800}
              height={400}
            />
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600 text-sm mb-6">
              Published: {new Date(article.published_at).toLocaleDateString()}
            </p>
            <div className="prose lg:prose-lg text-gray-800 leading-relaxed">
      
              <div dangerouslySetInnerHTML={{ __html: purify.sanitize(article.content) }} />
            </div>
            {article.excerpt && (
              <p className="mt-8 text-sm text-gray-500">Source/Excerpt: {article.excerpt}</p>
            )}
          </div>
        ))}
        <Footer />
      </div>
    </>
  );
}