'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import formatTanggalIndonesia from "@/app/components/formatTanggal";
import Image from "next/image";
import Back from "@/app/components/back";
import WhatsAppButton from "@/app/components/whatsappLink";

interface Pm {
    id: string;
    user_id: string;
    complainant_name: string;
    contact: string;
    complainant_address: string;
    complaint_category: string;
    complaint_title: string;
    complaint_content: string;
    proof: string;
    complaint_date: string;
    complaint_status: string;
}

interface User {
    id: string;
    ktp: string;
}

export default function ProsesPM(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const pmId = searchParams.get("pm_id");
    const [pmData, setpm] = useState<Pm[]>([]);
    const [userData, setUser] = useState<User[]>([]);
    const [token, setToken] = useState<string | null>(null);
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    let start = new Date();
    let expiration = new Date(start.getTime() + (182 * 24 * 60 * 60 * 1000));

    const [greeting, setGreeting] = useState("");
    
    useEffect(() => {
        const hour = new Date().getHours();

        if (hour >= 4 && hour < 10) setGreeting("Selamat Pagi,");
        else if (hour >= 10 && hour < 15) setGreeting("Selamat Siang,");
        else if (hour >= 15 && hour < 18) setGreeting("Selamat Sore,");
        else setGreeting("Selamat Malam,");
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            const role = localStorage.getItem('role');

            if (role !== 'admin') {
                router.replace('/unauthorized');
                return;
            }

            if (storedToken) {
                setToken(storedToken);
            } else {
                router.replace('/login');
            }
        }
    }, [router]);

    const fetchData = useCallback(async () => {
        if (!token) {
            return;
        }
        try {
            const apipmUrl = `${baseUrl}pm`;
            const apiUserUrl = `${baseUrl}users`;
            const pmRes = await axios.get<Pm[]>(apipmUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const userRes = await axios.get<User[]>(apiUserUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            const filtered = pmRes.data.filter(item => String(item.id) === pmId);
            const userKTP = userRes.data.filter(user => user.id === filtered[0].user_id)
            setpm(filtered);
            setUser(userKTP);
        } catch (err: any) {
            console.error('Error fetching data:', err);
        }
    }, [token, baseUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="lg:ml-[260px]">
            <div className="bg-gray-200 py-10 flex flex-col items-center overflow-hidden">
            {pmData.map((item:any) => (
                <div
                key={item.id}
                className="bg-white shadow-lg border border-black w-[400px] sm:w-[794px] p-10 text-sm mb-8"
                >
                <div className="flex items-center justify-start gap-8">
                    <h1 className="font-bold text-2xl">Cek Kelengkapan Data Pengaduan Masyarakat</h1>
                    <Back/>
                </div>
                {/* Data Pemohon */}
                <div className="my-6">
                    <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                        <td className="align-top font-bold">Nama Pelapor</td>
                        <td>: {item.complainant_name}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Nomor Telepon</td>
                        <td>: {item.contact}</td>
                        </tr>
                        <tr>
                        <td className="align-top font-bold">Alamat Pelapor</td>
                        <td className="align-top">: {item.complainant_address}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Kategori</td>
                        <td>: {item.complaint_category}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Judul Pengaduan</td>
                        <td>: {item.complaint_title}</td>
                        </tr>
                        <tr>
                        <td className="align-top font-bold">Penjelasan Pengaduan</td>
                        <td className="align-top">: {item.complaint_content}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Bukti Foto :</td>
                        <td><Image src={item.proof} alt="" width={500} height={500} className="m-4 w-full h-auto"/></td>
                        </tr>
                        <tr>
                        <td className="font-bold">Tanggal Pengaduan</td>
                        <td>: {formatTanggalIndonesia(item.complaint_date)}</td>
                        </tr>
                        <tr>
                            <td className="py-4">
                                <WhatsAppButton
                                    phone={item.contact}
                                    message=""
                                />
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="flex flex-col justify-start mb-6">
                    <div className="border border-black w-fit h-auto flex items-center justify-center">
                    {userData[0] ? (
                        <Image
                            src={userData[0].ktp}
                            alt="KTP"
                            width={500}
                            height={500}
                        />
                    ) : (
                        <span className="text-xs">Foto KTP</span>
                    )}
                    </div>
                    <span className="mt-2">Foto KTP</span>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}