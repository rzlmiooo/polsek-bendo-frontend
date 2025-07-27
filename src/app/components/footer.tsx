import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl px-22 py-6 lg:py-8">
                <div className="flex flex-col md:flex-row md:justify-between gap-8">
                    {/* Logo and Title */}
                    <div className="w-full md:w-1/2 mb-2">
                        <a href="/" className="flex items-center mb-4 md:mb-8">
                            <img
                                src="/images/Polda_Jawa_Timur.png"
                                className="h-8 me-3"
                                alt="Polda Jatim Logo"
                            />
                            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Polsek Bendo
                            </span>
                        </a>
                        <p className="dark:text-white/80 text-sm ">Polsek Bendo adalah bagian dari Polres Magetan yang bertugas menjaga keamanan dan ketertiban di wilayah Kecamatan Bendo. Kami berkomitmen memberikan pelayanan yang cepat, profesional, dan humanis kepada masyarakat. Bersama warga, kami membangun lingkungan yang aman, damai, dan tertib.</p>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Jelajah
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-2">
                                    <Link href="/" className="hover:underline">
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/artikel" className="hover:underline">
                                        Berita
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/profil/struktur" className="hover:underline">
                                        Profil
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/layanan" className="hover:underline">
                                        Layanan
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Ikuti kami
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-2"><a href="https://www.instagram.com/polsekbendo31?igsh=MWc2N3V4NHB5amZ2OA==" className="hover:underline">Instagram</a></li>
                                <li className="mb-2"><a href="https://wa.me/6281234619123" className="hover:underline">WhatsApp</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                ketentuan
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-2">
                                    <a href="#" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-700" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                    <span>
                        © 2025 <a href="/" className="hover:underline">Polsek Bendo™</a>. All Rights Reserved.
                    </span>
                    <span>
                        Website by <a href="https://lawu-digital.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold">Lawu Digital</a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
