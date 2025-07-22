export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl px-4 py-6 lg:py-8">
                <div className="flex flex-col md:flex-row md:justify-between gap-8">
                    {/* Logo and Title */}
                    <div>
                        <a href="/" className="flex items-center mb-4 md:mb-0">
                            <img
                                src="/images/Polda_Jawa_Timur.png"
                                className="h-8 me-3"
                                alt="Polda Jatim Logo"
                            />
                            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Polsek Bendo
                            </span>
                        </a>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Resources
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-2">
                                    <a href="https://flowbite.com/" className="hover:underline">
                                        Flowbite
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">
                                        Tailwind CSS
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Follow us
                            </h2>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-2"><a href="#" className="hover:underline">Instagram</a></li>
                                <li className="mb-2"><a href="#" className="hover:underline">Facebook</a></li>
                                <li><a href="#" className="hover:underline">TikTok</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Legal
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
                    <div className="flex flex-wrap justify-center gap-4">
                        {/* Social icons */}
                        {/* You can insert your SVG icons here like before */}
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                            <span className="sr-only">Facebook</span>
                            <svg className="w-4 h-4" />
                        </a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                            <span className="sr-only">Twitter</span>
                            <svg className="w-4 h-4" />
                        </a>
                        {/* Add more icons as needed */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
