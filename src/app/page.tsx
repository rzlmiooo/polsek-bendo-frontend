"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "flowbite";
import "daisyui";
import WhatsAppPopup from "./components/popup";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
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

export default function Home() {
  const searchParams = useSearchParams();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const newsRes = await axios.get('https://striking-vision-production-4ee1.up.railway.app/api/news', {
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
    <>
      {/* navbar */}
      <Navbar />

      <div className="bg-cover bg-center background-color: transparent;">
        <img
          src="/images/depan_ada_tugu_polsek.jpg"
          className="w-full object-cover"
          alt="slide1"
        />
      </div>
      <div className="pt-24">

        <div className="flex flex-col space-y-0 px-0 py-0 max-w-screen-xl mx-auto">

          {/* Tentang Kami & Info Kegiatan */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 m-10">
            <div>
              <h2 className="text-xl font-semibold mb-2 my-6 m-8">Tentang Kami</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Polsek Bendo adalah bagian dari Polres Madiun yang bertugas menjaga keamanan dan ketertiban di wilayah Kecamatan Bendo. Kami berkomitmen memberikan pelayanan yang cepat, profesional, dan humanis kepada masyarakat. Bersama warga, kami membangun lingkungan yang aman, damai, dan tertib.
              </p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 my-6 m-8">Info</h2>
              <div className="overflow-x-auto">

              </div>
            </div>
          </section>

          <section className="py-10 bg-white">
            {/* Trend Carousel */}
            <h4 className="text-2xl font-bold mb-10 text-left text-gray-800 m-4">Ikuti Topik yang Sedang Tren</h4>
            <div className="carousel rounded-box grid grid-cols-4 gap-6">
              {news.map((blog, index) => (
                <div className="carousel-item">
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="artikel">
                      <img className="rounded-t-lg" src={blog.url_gambar_unggulan} alt="" />
                    </a>
                    <div className="p-5">
                      <Link href={`/artikel/read-article?blog_id=${blog.id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                      </Link>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.content.slice(0, 50)}</p>
                      <Link href={`/artikel/read-article?blog_id=${blog.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div>
            </div>
          </div>

            <div className="m-20">
              <h2 className="text-2xl font-bold my-3 mb-10 text-center text-gray-800 ">Layanan Kami</h2>
              <div className="flex flex-wrap justify-center gap-8 ">

                {/* Item 1 */}
                <a href="./layanan/skck" className="flex items-center gap-3 hover:text-yellow-700 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-sm">
                    <img src="/icons/icon-skck.svg" alt="SKCK" className="w-6 h-6" />
                  </div>
                  <span className="text-base font-semibold text-gray-700">SKCK ONLINE</span>
                </a>

                {/* Item 2 */}
                <a href="./layanan/laporan_kehilangan" className="flex items-center gap-3 hover:text-yellow-700 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-sm">
                    <img src="/icons/icon-laporan.svg" alt="Laporan" className="w-6 h-6" />
                  </div>
                  <span className="text-base font-semibold text-gray-700">Laporan Kehilangan</span>
                </a>

                {/* Item 3 */}
                <a href="./layanan/pengaduan" className="flex items-center gap-3 hover:text-yellow-700 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-sm">
                    <img src="/icons/icon-pengaduan.svg" alt="Pengaduan" className="w-6 h-6" />
                  </div>
                  <span className="text-base font-semibold text-gray-700">Pengaduan Masyarakat</span>
                </a>

                {/* Item 4 */}
                <a href="./layanan/rencana" className="flex items-center gap-3 hover:text-yellow-700 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-sm">
                    <img src="/icons/icon-rencana.svg" alt="SIM" className="w-6 h-6" />
                  </div>
                  <span className="text-base font-semibold text-gray-700">Rencana Acara</span>
                </a>

                {/* Item 5 */}
                <a href="./layanan/izin_keramaian" className="flex items-center gap-3 hover:text-yellow-700 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-sm">
                    <img src="/icons/icon-izin.svg" alt="Keramaian" className="w-6 h-6" />
                  </div>
                  <span className="text-base font-semibold text-gray-700">Izin Keramaian</span>
                </a>

              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <WhatsAppPopup />
    </>
  );
}