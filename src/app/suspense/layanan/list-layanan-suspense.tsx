"use client";

import Link from 'next/link';
import NavbarUser from '@/app/components/navbarUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faExclamationTriangle, faBullhorn, faUsers } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/footer';
import Head from 'next/head';
import Back from '@/app/components/back';

export default function ListLayanan() {
    return (
        <>
         {/* SEO */}
            <Head>
                <title>Layanan Publik</title>
                <meta name="description" content="Lihat semua layanan publik yang tersedia di Polsek Bendo." />
                <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
                <meta name="author" content="Polsek Bendo" />
                <link rel="canonical" href="https://polsek-bendo.my.id/layanan" />
            </Head>
        <div>
            <NavbarUser />
            <div className="bg-gray-500 min-h-screen flex items-center justify-center pt-20 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 md:p-10 lg:p-12">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Kategori Layanan</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-8">

                        <Link href={`/layanan/skck`}>
                            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:bg-yellow-300 cursor-pointer">
                                <div className="text-gray-600 text-5xl mb-4 transition duration-300 group-hover:text-gray-800">
                                    <FontAwesomeIcon icon={faFileAlt} />
                                </div>
                                <p className="text-gray-800 text-lg font-semibold">SKCK</p>
                            </div>
                        </Link>

                        <Link href={`/layanan/laporan_kehilangan`}>
                            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:bg-yellow-300 cursor-pointer">
                                <div className="text-gray-600 text-5xl mb-4 transition duration-300 group-hover:text-gray-800">
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                </div>
                                <p className="text-gray-800 text-lg font-semibold">Laporan Kehilangan</p>
                            </div>
                        </Link>

                        <Link href={`/layanan/pengaduan`}>
                            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:bg-yellow-300 cursor-pointer">
                                <div className="text-gray-600 text-5xl mb-4 transition duration-300 group-hover:text-gray-800">
                                    <FontAwesomeIcon icon={faBullhorn} />
                                </div>
                                <p className="text-gray-800 text-lg font-semibold">Pengaduan Masyarakat</p>
                            </div>
                        </Link>

                        <Link href={`/layanan/izin_keramaian`}>
                            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:bg-yellow-300 cursor-pointer">
                                <div className="text-gray-600 text-5xl mb-4 transition duration-300 group-hover:text-gray-800">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <p className="text-gray-800 text-lg font-semibold">Izin Keramaian</p>
                            </div>
                        </Link>

                    </div>

                    <Back/>
                </div>
            </div>
            <Footer />
        </div>
    </>
    )
}