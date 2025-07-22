import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg border-b border-[#996515] text-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/images/Lambang_Polda_Jatim.png"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              POLSEK BENDO
            </span>
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-dropdown"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Nav Links */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:items-center md:space-x-8 w-full md:w-auto mt-4 md:mt-0 font-medium`}
            id="navbar-dropdown"
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 w-full">
              <li>
                <a href="/" className="block py-2 px-3 hover:text-[#996515]">
                  Home
                </a>
              </li>
              <li>
                <a href="/artikel" className="block py-2 px-3 hover:text-[#996515]">
                  Berita
                </a>
              </li>

              {/* Profil dropdown - mobile behavior optional */}
              <li>
                <a href="/profil/struktur" className="block py-2 px-3 hover:text-[#996515]">
                  Profil
                </a>
              </li>
              <li>
                <a href="/layanan/skck" className="block py-2 px-3 hover:text-[#996515]">
                  Layanan
                </a>
              </li>
            </ul>

            {/* Order Icon */}
            <div className="flex justify-center md:ms-8 mt-4 md:mt-0">
              <a href="/order" className="block py-2 px-3 hover:text-[#996515]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#505050"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m-4-4v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45L9.5 13.55zm3.525-3.525l-.475-.45l.925.925z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
