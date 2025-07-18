'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Path from './pathname';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/224/solid';
import UserGreeting from './greetings'
import UserProfile from './foto'
import { usePathname } from 'next/navigation'
import NotificationBell from './notificationBellUser'


export default function NavbarUser() {
    const pathname = usePathname();
    const isUserPage = pathname.startsWith('/order');
    const href = isUserPage ? '/order' : '/';
    const profile = isUserPage ? '/profile' : '/settings/profile'

    useEffect(() => {
        if (typeof window !== 'undefined' && window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
        }
    }, []);

    return (
        <div>
            {/* navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg border-b border-[#996515] text-black">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Logo */}
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="/images/Lambang_Polda_Jatim.png"
                            className="h-8"
                            alt="Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                            POLSEK BENDO
                        </span>
                    </a>

                    {/* Navbar Links */}
                    <div className="hidden w-full md:flex md:w-auto items-center gap-4" id="navbar-dropdown">
                        <ul className="flex flex-col md:flex-row items-center md:space-x-8 mt-4 md:mt-0 font-medium">
                            <li>
                                <a href="/" className="block py-2 px-3 text-black hover:text-[#996515] md:p-0">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/artikel" className="block py-2 px-3 text-black hover:text-[#996515] md:p-0">
                                    Berita
                                </a>
                            </li>
                            <li className="relative">
                                <button
                                    id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    className="flex items-center justify-between w-full py-2 px-3 text-black hover:text-[#996515] md:p-0"
                                >
                                    Profil
                                    <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-200 rounded-lg shadow w-44">
                                    <ul className="py-2 text-sm text-black">
                                        <li>
                                            <a href="./profil/struktur" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                Struktur
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                Forkopimca
                                            </a>
                                        </li>
                                        <li>
                                            <a href="./profil/biografi" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                Biografi
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative">
                                <button
                                    id="dropdownLayananPublikLink"
                                    data-dropdown-toggle="dropdownLayananPublik"
                                    className="flex items-center justify-between w-full py-2 px-3 text-black hover:text-[#996515] md:p-0"
                                >
                                    Layanan
                                    <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <div
                                    id="dropdownLayananPublik"
                                    className="z-10 hidden font-normal bg-white divide-y divide-gray-200 rounded-lg shadow w-44"
                                >
                                    <ul className="py-2 text-sm text-black">
                                        <li>
                                            <a href="./layanan/skck" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                SKCK Online
                                            </a>
                                        </li>
                                        <li>
                                            <a href="./layanan/laporan_kehilangan" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                Laporan Kehilangan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="./layanan/pengaduan" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                Pengaduan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="./layanan/izin_keramaian" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                Surat Izin Keramaian
                                            </a>
                                        </li>
                                        <li>
                                            <a href="./layanan/rencana" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">
                                                Rencana Acara
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        {/* Logo Order */}
                        <div className="flex items-left gap-8 ms-8">
                            <a href="/order" className="block py-2 px-3 text-black hover:text-[#996515] md:p-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#505050" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m-4-4v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45L9.5 13.55zm3.525-3.525l-.475-.45l.925.925z" /></svg>
                            </a>
                        </div>
                        <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                            <div className="flex justify-center items-center gap-6">
                                <NotificationBell></NotificationBell>
                                <Link href={profile} className="flex justify-center items-center gap-3">
                                    <h1 className="hidden sm:block font-bold text-sky-50 dark:text-sky-50">Hi, <UserGreeting /></h1>
                                    <UserProfile />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}