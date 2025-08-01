"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "flowbite";
import "daisyui";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import WhatsAppPopup from "../../components/popup";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";

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

  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiNewsUrl = `${baseApiUrl}news`;

        const newsRes = await axios.get(apiNewsUrl, {
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

  console.log("Isi Berita:", news)

  return (
    <>
      {/* navbar */}
      <Navbar />

      <div className="w-full">
        {/* Hero Image */}
        <div className="w-full">
          <Image
            src="/images/depan_ada_tugu_polsek.jpg"
            alt="Background Landing Page"
            width={2100}
            height={1100}
            priority
          />
        </div>

        {/* Main Content */}
        <div className="pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">

            {/* Tentang Kami & Info */}
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center py-12 px-10 md:px-40">
              <Image src="/images/polda_jatim.png" alt="Polda Jatim" height={300} width={300} className="size-50 object-contain mb-10 md:mb-0"></Image>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Tentang POLSEK BENDO</h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  Polsek Bendo adalah bagian dari Polres Magetan yang bertugas menjaga keamanan dan ketertiban di wilayah Kecamatan Bendo. Kami berkomitmen memberikan pelayanan yang cepat, profesional, dan humanis kepada masyarakat. Bersama warga, kami membangun lingkungan yang aman, damai, dan tertib.
                </p>
              </div>
            </section>

            {/* Trending Carousel */}
            <section className="py-12">
              <h4 className="px-10 md:px-16 text-2xl font-bold mb-6 text-gray-800">Ikuti Topik yang Sedang Tren</h4>
              <div className="w-full px-4 md:px-8 lg:px-16 py-6">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  navigation
                  pagination={{
                    el: '.custom-swiper-pagination',
                    clickable: true,
                    renderBullet: (index, className) => {
                      return `<span class="${className} w-3 h-3 bg-gray-300 rounded-full inline-block mx-1 transition-all duration-300"></span>`;
                    },
                  }}
                  
                  loop={news.length > 4}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {news.map((blog, index) => (
                    <SwiperSlide key={index} className="h-full">
                      <div className="flex flex-col h-full bg-white border rounded-lg shadow-sm overflow-hidden">
                        <a href="/artikel">
                          <img
                            src={blog.url_gambar_unggulan}
                            alt={blog.title}
                            className="w-full h-48 md:h-56 lg:h-64 object-cover"
                          />
                        </a>
                        <div className="p-4 flex flex-col flex-grow">
                          <Link href={`/artikel/read-article?blog_id=${blog.id}`}>
                            <h5 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {blog.title}
                            </h5>
                          </Link>
                          <p className="text-gray-700 mb-4 flex-grow line-clamp-3">
                            {blog.content.slice(0, 100)}...
                          </p>
                          <Link
                            href={`/artikel/read-article?blog_id=${blog.id}`}
                            className="inline-flex items-center justify-start px-3 py-2 text-sm font-medium text-white bg-yellow-600 rounded hover:bg-yellow-700 transition"
                          >
                            Read more
                            <svg
                              className="w-4 h-4 ml-2 rtl:rotate-180"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="custom-swiper-pagination mt-4 flex justify-center" />
              </div>

            </section>

            {/* Layanan Kami */}
            <section className="py-12">
              <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Layanan Kami</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { href: "./layanan/skck", icon: "icon-skck", label: "SKCK ONLINE" },
                  { href: "./layanan/laporan_kehilangan", icon: "icon-laporan", label: "Laporan Kehilangan" },
                  { href: "./layanan/pengaduan", icon: "icon-pengaduan", label: "Pengaduan Masyarakat" },
                  { href: "./layanan/rencana", icon: "icon-rencana", label: "Rencana Acara" },
                  { href: "./layanan/izin_keramaian", icon: "icon-izin", label: "Izin Keramaian" },
                ].map((layanan, idx) => (
                  <a
                    key={idx}
                    href={layanan.href}
                    className="flex items-center gap-3 hover:text-yellow-700 transition-colors"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-sm">
                      <img src={`/icons/${layanan.icon}.svg`} alt={layanan.label} className="w-6 h-6" />
                    </div>
                    <span className="text-base font-semibold text-gray-700">{layanan.label}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppPopup />
    </>
  );
}