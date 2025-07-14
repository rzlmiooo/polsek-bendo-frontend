"use client";

import axios from "axios";
import AdminNavbar from "@/app/components/adminnavbar";
import Footer from "../components/footer";
import NavbarUser from "../components/navbarUser";
import OrderSkck from "./skck/page";
import OrderSik from "./sik/page";
import OrderPm from "./pm/page";
import OrderSlk from "./slk/page";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import getUserId from './../utils/auth/page';
import Link from 'next/link';

export default function Order() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const userId = getUserId();

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {

            const storedToken = localStorage.getItem('token');
            console.log("Token", storedToken);
            const role = localStorage.getItem('role');

            if (role !== 'user') {
                router.replace('/unauthorized');
                return;
            }

            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, [router]);
    return (
        <div>
            <NavbarUser />
            <div className="absolute top-18 right-6 m-6">
                <a href="./layanan">
                    <button type="button" className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                </a>
            </div>
            <section className="bg-white py-24 antialiased dark:bg-gray-900 md:py-18">
                <div className="sm:flex sm:justify-center m-8">
                    <h2 className=" text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">List Surat Yang Sedang Dibuat</h2>
                </div>
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        </div>
                        <div className="mt-6 flow-root sm:mt-8">
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                <OrderSkck/>
                                <OrderSik/>
                                <OrderPm/>
                                <OrderSlk/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}