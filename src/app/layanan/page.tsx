"use client";

import Link from 'next/link';
import getUserId from '../utils/auth/page';
import ReactDOM from 'react-dom';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faExclamationTriangle, faBullhorn, faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/footer';


export default function ListLayanan() {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-500 min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 md:p-10 lg:p-12">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Kategori Layanan</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">

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
                </div>
            </div>
            <Footer />
        </div>
    )
}