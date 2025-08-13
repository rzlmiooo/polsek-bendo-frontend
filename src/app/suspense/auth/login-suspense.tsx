"use client";

import { jwtDecode } from 'jwt-decode';
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../../service/AuthService";
import generateUsernameFromEmail from '../../utils/auth/generateUsernameFromEmail'
import Head from 'next/head';

interface DecodedToken {
    role: string;
    id?: string;
    [key: string]: any;
}

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    interface DecodedToken {
        role?: string;
        username?: string;
    }

    const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const token: string = await AuthService.login(email, password);

            const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

            const role = decoded.role;

            if (!role) throw new Error("Role not found in token");

            localStorage.setItem("role", role);
            localStorage.setItem("token", token);

            if (role === "admin") {
                router.push("/admin");
            } else {
                router.push("/order");
            }

        } catch (err: any) {
            console.error("Login error:", err?.response?.data || err.message);
            setError(err?.response?.data?.message || "Invalid credentials");
        }
    };
    return (
        <>
            {/* SEO */}
            <Head>
                <title>Login</title>
                <meta name="description" content="Masuk ke akun Anda untuk mengakses layanan online Polsek Bendo." />
                <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
                <meta name="author" content="Polsek Bendo" />
                <link rel="canonical" href="https://polsek-bendo.my.id/login" />
            </Head>
            <div>
                <div className="flex h-screen bg-yellow-700">
                    <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
                        <header>
                            <img className="w-20 mx-auto mb-5" src="/images/Polri_Logo.png" />
                        </header>
                        <form onSubmit={handleSubmitClick}>
                            <div>
                                <label className="block mb-2 text-yellow-700" htmlFor="email">email</label>
                                <input
                                    className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300"
                                    type="text"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-700" htmlFor="password">Password</label>
                                <input
                                    className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    className="w-full bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 mb-6 rounded"
                                    type="submit"
                                    value="Login"
                                />
                            </div>
                        </form>
                        <footer>
                            <a className="text-yellow-700 hover:text-yellow-500 text-sm float-left" href="#">Forgot Password?</a>
                            <a className="text-yellow-700 hover:text-yellow-500 text-sm float-right" href="/register">Buat Akun</a>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}