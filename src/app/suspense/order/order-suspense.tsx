"use client";

import Footer from "../../components/footer";
import NavbarUser from "../../components/navbarUser";
import OrderSkck from "../../order/skck/page";
import OrderSik from "../../order/sik/page";
import OrderPm from "../../order/pm/page";
import OrderSlk from "../../order/slk/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function Order() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            const role = localStorage.getItem('role');

            if (role !== 'user') {
                router.replace('/unauthorized');
                return;
            }

            if (!storedToken) {
                router.replace('/login');
            }
        }
    }, [router]);
    return (
        <>
            {/* SEO */}
            <Head>
                <title>Surat Saya</title>
                <meta name="description" content="Daftar surat dan layanan yang telah Anda ajukan." />
                <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
                <meta name="author" content="Polsek Bendo" />
                <link rel="canonical" href="https://polsek-bendo.my.id/order" />
            </Head>
            <div className="flex flex-col min-h-screen">
                <NavbarUser />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                        <div className="px-4 py-6 sm:px-6 lg:px-8">
                            {/* Header Button */}
                            <div className="flex justify-end mb-12 pt-20 relative z-40">
                                <a href="./layanan">
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-base px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 dark:from-green-500 dark:to-green-400 dark:hover:from-green-600 dark:hover:to-green-500"
                                    >
                                        + Buat Surat Baru
                                    </button>
                                </a>
                            </div>

                            {/* Section Card */}
                            <section className="bg-white py-8 px-4 sm:px-6 md:px-8 rounded-lg shadow-md dark:bg-gray-800">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                                        Daftar Surat yang Sedang Dibuat
                                    </h2>
                                </div>

                                {/* Orders Container */}
                                <div className="mx-auto w-full max-w-6xl">
                                    <div className="mt-6 flow-root sm:mt-8">
                                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <OrderSkck />
                                            <OrderSik />
                                            <OrderPm />
                                            <OrderSlk />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <Footer />
                    </main>
                </div>
            </div>
        </>
    )
}