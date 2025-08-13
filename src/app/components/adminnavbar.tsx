'use client';

import { Suspense, useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import UserGreeting from './greetings';
import UserProfile from './foto';
import { usePathname, useRouter } from 'next/navigation';
import NotificationBell from './notificationBellAdmin';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { AuthService } from '../service/AuthService';

declare global {
  interface Window {
    HSStaticMethods: any;
  }
}

export default function AdminNavbar() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const href = isAdminPage ? '/admin' : '/';
  const profile = isAdminPage ? '/admin/profile' : '/settings/profile';
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
    <>
      <Suspense>
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white dark:bg-gray-900 text-sm py-2.5 lg:ps-65">
          <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
            {/* Mobile Toggle Button (outside sidebar) */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="hs-application-sidebar"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open sidebar</span>
              {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
            {/* End Mobile Toggle Button */}

            <div className="me-5 lg:me-0 lg:hidden">
              <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Preline">
                {/* Your logo goes here, e.g., <img src="/images/Polri_Logo.png" alt="Logo" /> */}
              </a>
            </div>

            <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
              <div className="hidden md:block">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  </div>
                  <input type="text" className="py-2 ps-10 pe-16 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                  <div className="hidden absolute inset-y-0 end-0 items-center z-20 pe-1">
                    <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600" aria-label="Close">
                      <span className="sr-only">Close</span>
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </button>
                  </div>
                  <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
                    <svg className="shrink-0 size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
                    <span className="mx-1">
                      <svg className="shrink-0 size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </span>
                    <span className="text-xs">/</span>
                  </div>
                </div>
                {/* End Search Input */}
              </div>

              <div className="flex flex-row items-center justify-end gap-1">
                {/* Dropdown */}
                <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                  <div className="flex justify-center items-center gap-6">
                    <NotificationBell />
                    <Link href={profile} className="flex justify-center items-center gap-3">
                         <h1 className="hidden sm:block font-bold text-gray-800 dark:text-sky-50">Hi, <UserGreeting /></h1>
                      <UserProfile />
                    </Link>
                    <button onClick={logout} className="flex justify-center gap-2 items-center md:py-2 md:px-6 hover:text-[#996515] md:border-l-1 border-black dark:border-white text-black dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    <h2 className="font-bold">Logout</h2>
                    </button>
                  </div>
                </div>
                {/* End Dropdown */}
              </div>
            </div>
          </nav>
        </header>

        {/* Sidebar */}
        <div
          id="hs-application-sidebar"
          className={`
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-all duration-300 transform
            w-65 h-full fixed inset-y-0 start-0 z-60 bg-white dark:bg-gray-900
            lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
            ${isMobileMenuOpen ? 'block' : 'hidden'} lg:!block
          `}
          role="dialog"
          aria-label="Sidebar"
        >
          <div className="relative flex flex-col h-full max-h-full">
            <div className="px-6 pt-4 flex items-center justify-between">
              {/* Logo */}
              <Link className="flex-none mb-4 rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="/admin" aria-label="Preline">
                <img src="/images/Polri_Logo.png" alt="Polri Logo" />
              </Link>
              {/* End Logo */}

              <div className="lg:hidden"> 
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setIsMobileMenuOpen(false)} 
                  aria-label="Close sidebar"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              {/* End close button */}

              <div className="hidden lg:block ms-2">
                {/* Additional content for larger screens if needed */}
              </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                <ul className="flex flex-col space-y-1">
                  <li><Link className="flex items-center gap-x-3.5 py-2 px-2.5 dark:bg-gray-900 text-sm text-gray-800 dark:text-white  rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden focus:bg-gray-100 focus:text-gray-900" href="/admin">
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    Dashboard
                  </Link></li>
                  <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden focus:bg-gray-100 focus:text-gray-900" href="/admin/articles">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                    Artikel
                  </Link></li>
                  <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden focus:bg-gray-100 focus:text-gray-900" href="/admin/structure">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                    Struktur
                  </Link></li>
                  <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden focus:bg-gray-100 focus:text-gray-900" href="/admin/layanan/skck">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke='currentColor' d="m9.2 15.6l2.8-2.1l2.75 2.1l-1.05-3.4l2.8-2.2h-3.4L12 6.6L10.9 10H7.5l2.75 2.2zM12 22q-3.475-.875-5.737-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3m0-7.9" /></svg>
                    Kelola Skck
                  </Link></li>
                  <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden focus:bg-gray-100 focus:text-gray-900" href="/admin/layanan/izin_keramaian">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke='currentColor' d="M16.5 9.75q-.625 0-1.062-.437T15 8.25t.438-1.062T16.5 6.75t1.063.438T18 8.25t-.437 1.063t-1.063.437m-9 0q-.625 0-1.062-.437T6 8.25t.438-1.062T7.5 6.75t1.063.438T9 8.25t-.437 1.063T7.5 9.75M12 12.5q-.625 0-1.062-.437T10.5 11t.438-1.062T12 9.5t1.063.438T13.5 11t-.437 1.063T12 12.5M12 7q-.625 0-1.062-.437T10.5 5.5t.438-1.062T12 4t1.063.438T13.5 5.5t-.437 1.063T12 7m0 13q-.5 0-1.012-.075t-.988-.2V16.15q0-.875.588-1.512T12 14t1.413.638T14 16.15v3.575q-.475.125-.987.2T12 20m-3.5-.8q-.5-.2-.962-.45t-.888-.55q-.7-.5-1.112-1.3t-.413-1.7q0-.65-.137-1.212T4.5 12.925q-.25-.325-.937-.987T2.3 10.7q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.825 3.625q.5.45.738 1.063T8.5 15.25zm7 0v-3.95q0-.65.25-1.275t.725-1.05L20.3 9.3q.3-.275.713-.275t.687.275t.275.7t-.275.7q-.575.575-1.263 1.225t-.937 1q-.35.5-.488 1.063t-.137 1.212q0 .9-.413 1.713t-1.137 1.312q-.4.275-.862.525t-.963.45" /></svg>
                    Kelola Izin Keramaian
                  </Link></li>
                  <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden focus:bg-gray-100 focus:text-gray-900" href="/admin/layanan/laporan_kehilangan">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke='currentColor' d="M11 10q.825 0 1.413-.587T13 8t-.587-1.412T11 6t-1.412.588T9 8t.588 1.413T11 10m0 4q1.125 0 2.113-.475t1.712-1.35q-.875-.575-1.837-.875T11 11t-1.987.3t-1.838.875q.725.875 1.712 1.35T11 14m9.6 7l-4.7-4.7q-1.025.8-2.262 1.25T11 18q-3.35 0-5.675-2.325T3 10t2.325-5.675T11 2t5.675 2.325T19 10q0 1.4-.45 2.638T17.3 14.9l4.7 4.7zM11 16q2.5 0 4.25-1.75T17 10t-1.75-4.25T11 4T6.75 5.75T5 10t1.75 4.25T11 16m0-6" /></svg>
                    Kelola Laporan Kehilangan
                  </Link></li>
                  <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden focus:bg-gray-100 focus:text-gray-900" href="/admin/layanan/pengaduan">
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 8a3 3 0 0 1 0 6m-8-6v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5" /><path d="m12 8l4.524-3.77A.9.9 0 0 1 18 4.922v12.156a.9.9 0 0 1-1.476.692L12 14H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /></g></svg>
                    Kelola Pengaduan Masyarakat
                  </Link></li>
                </ul>
              </nav>
            </div>
            {/* End Content */}
          </div>
        </div>
        {/* End Sidebar */}
      </Suspense>
    </>
  );
}