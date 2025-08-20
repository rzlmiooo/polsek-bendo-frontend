import { useEffect, useState, Suspense, useRef } from 'react';
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

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const showDropdown = () => {
    clearTimeout(hideTimeout.current!);
    setIsNavbarOpen(true);
  };

  const scheduleHide = () => {
    hideTimeout.current = setTimeout(() => setIsNavbarOpen(false), 200); // delay biar gak ke-close langsung
  };

  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const hideProfilTimeout = useRef<NodeJS.Timeout | null>(null);

  const showProfilDropdown = () => {
    clearTimeout(hideProfilTimeout.current!);
    setIsProfilOpen(true);
  };

  const scheduleProfilHide = () => {
    hideProfilTimeout.current = setTimeout(() => setIsProfilOpen(false), 200); // delay biar gak ke-close langsung
  };

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
          <a href={href} className="flex items-center pl-4 space-x-3 rtl:space-x-reverse">
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
            <ul className="flex flex-col md:flex-row items-start md:items-center md:space-x-15 mt-4 md:mt-0 font-medium">
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
              <li>
                <button onClick={() => setIsProfilOpen(!isProfilOpen)} className="hidden py-2 md:block hover:text-[#996515]" onMouseEnter={showProfilDropdown} onMouseLeave={scheduleProfilHide}>
                  Profil
                </button>
                <a href="/layanan" className="block md:hidden py-2 px-3 hover:text-[#996515]">
                  Profil
                </a>
              </li>

              {/* Dropdown Layanan */}
              <li>
                <button onClick={() => setIsNavbarOpen(!isNavbarOpen)} className="hidden py-2 md:block hover:text-[#996515]" onMouseEnter={showDropdown} onMouseLeave={scheduleHide}>
                  Layanan
                </button>
                <a href="/layanan" className="block md:hidden py-2 px-3 hover:text-[#996515]">
                  Layanan
                </a>
              </li>
            </ul>

            {/* User Area */}
            <div className="flex gap-4 md:ms-8 mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row items-start md:items-center pl-4 md:pl-8 gap-4 md:gap-8 md:border-l-1 border-black">
                <NotificationBell />
                <Link href={profile} className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden sm:block">Hi, <UserGreeting /></span>
                  <UserProfile />
                </Link>
                <button onClick={logout} className="flex justify-center gap-2 items-center md:py-2 md:px-8 hover:text-[#996515] md:border-l-1 border-black">
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
      <section className={`fixed flex justify-center z-50 top-18 py-4 w-full bg-white shadow-lg transition-all duration-200 ${isNavbarOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`} onMouseEnter={showDropdown} onMouseLeave={scheduleHide}>
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
      <section className={`fixed flex justify-center z-50 top-18 py-4 w-full bg-white shadow-lg transition-all duration-200 ${isProfilOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`} onMouseEnter={showProfilDropdown} onMouseLeave={scheduleProfilHide}>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { href: "./profil/struktur", icon: "icon-struktur", label: "Struktur Organisasi" },
            { href: "./profil/forkopimca", icon: "icon-forkopimca", label: "FORKOPIMCA" },
            { href: "./profil/biografi", icon: "icon-biografi", label: "Biografi" },
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
    </Suspense>
  );
}
