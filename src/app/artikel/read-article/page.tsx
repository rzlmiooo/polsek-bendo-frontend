"use client"; 

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '../../components/navbar'; 
import Footer from '../../components/footer'; 

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

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      setError("Authentication token not found. Please log in.");
      setLoading(false);
      return;
    }
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
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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
  }, [articleId, token]); 

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
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      {article.map((article, index) => (
      <div key={index} className="max-w-4xl mt-14 mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <img src={article.url_gambar_unggulan} alt={article.title || "Article featured image"} className="w-full h-80 object-cover rounded-lg mb-6" />
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 text-sm mb-6">
          Published: {new Date(article.published_at).toLocaleDateString()} 
        </p>
        <div className="prose lg:prose-lg text-gray-800 leading-relaxed">
          {/* It's crucial to be careful when rendering raw HTML content.
              If `article.content` contains HTML tags, use dangerouslySetInnerHTML,
              but ensure the content is sanitized to prevent XSS attacks.
              For plain text, just render directly.
          */}
          <p>{article.content}</p> {/* If content is plain text */}
          {/* <div dangerouslySetInnerHTML={{ __html: article.content }} /> */} {/* If content is HTML */}
        </div>
        {article.excerpt && (
            <p className="mt-8 text-sm text-gray-500">Source/Excerpt: {article.excerpt}</p>
        )}
      </div>
    ))}
      <Footer />
    </div>
  );
}