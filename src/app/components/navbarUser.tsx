'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import UserGreeting from './clientGreetings';
import UserProfile from './foto';
import NotificationBell from './notificationBellUser';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { AuthService } from '../service/AuthService';
import { FormEvent } from 'react';

export default function NavbarUser() {
  const pathname = usePathname();
  const isUserPage = pathname.startsWith('/order');
  const href = isUserPage ? '/order' : '/';
  const profile = isUserPage ? '/profil/profile' : '/settings/profile';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, []);

  const logout = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
        await AuthService.logout(); 
        console.log("Logout Successful");
        await router.push("/"); 
    } catch (err: any) {
        console.error("Logout error:", err?.response?.data || err.message);
        setError(err?.response?.data?.message || "Logout failed");
    }
  } 

  return (
    <Suspense>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg border-b border-[#996515] text-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href={href} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/images/Polda_Jawa_Timur.png"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              POLSEK BENDO
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>

          {/* Nav Links */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto items-center gap-4`} id="navbar-dropdown">
            <ul className="flex flex-col md:flex-row items-start md:items-center md:space-x-8 mt-4 md:mt-0 font-medium">
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

              {/* Dropdown Profil */}
              <li className="relative group">
                <button className="flex items-center w-full py-2 px-3 text-black hover:text-[#996515] md:p-0">
                  Profil
                  <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul className="hidden group-hover:block absolute md:absolute md:top-full left-0 z-10 bg-white rounded-lg shadow-md mt-1 md:w-44 w-full divide-y divide-gray-200">
                  <li><a href="./profil/struktur" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">Struktur</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">Forkopimca</a></li>
                  <li><a href="./profil/biografi" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">Biografi</a></li>
                </ul>
              </li>

              {/* Dropdown Layanan */}
              <li className="relative group">
                <button className="flex items-center w-full py-2 px-3 text-black hover:text-[#996515] md:p-0">
                  Layanan
                  <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul className="hidden group-hover:block absolute md:absolute md:top-full left-0 z-10 bg-white rounded-lg shadow-md mt-1 md:w-44 w-full divide-y divide-gray-200">
                  <li><a href="./layanan/skck" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">SKCK Online</a></li>
                  <li><a href="./layanan/laporan_kehilangan" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">Laporan Kehilangan</a></li>
                  <li><a href="./layanan/pengaduan" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">Pengaduan</a></li>
                  <li><a href="./layanan/izin_keramaian" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">Surat Izin Keramaian</a></li>
                  <li><a href="./layanan/rencana" className="block px-4 py-2 hover:bg-[#996515] hover:text-white">Rencana Acara</a></li>
                </ul>
              </li>
            </ul>

            {/* User Area */}
            <div className="flex gap-4 md:ms-8 mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row items-start md:items-center pl-4 gap-4 md:border-l-1 border-black">
                <NotificationBell />
                <Link href={profile} className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden sm:block">Hi, <UserGreeting /></span>
                  <UserProfile />
                </Link>
                <button onClick={logout} className="flex justify-center gap-2 items-center md:py-2 md:px-6 hover:text-[#996515] md:border-l-1 border-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
                <h2 className="font-bold">Logout</h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Suspense>
  );
}
