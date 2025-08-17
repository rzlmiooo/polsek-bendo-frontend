'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import formatTanggalIndonesia from "@/app/components/formatTanggal";
import formatJamIndonesia from "@/app/components/formatJamIndonesia";
import Back from "@/app/components/back";
import Image from "next/image";

interface Sik {
    id: string;
    user_id: string;
    organizer_name: string;
    event_name: string;
    event_description: string;
    event_start: string;
    event_end: string;
    location: string;
    guest_estimate: string;
    levy_fees: string;
    status_handling: string;
    form_creation: string;
}

interface User {
    id: string;
    ktp: string;
}

export default function ProsesSik(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const sikId = searchParams.get("sik_id");
    const [sikData, setsik] = useState<Sik[]>([]);
    const [userData, setUser] = useState<User[]>([]);
    const [token, setToken] = useState<string | null>(null);
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    let start = new Date();
    let expiration = new Date(start.getTime() + (182 * 24 * 60 * 60 * 1000));

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
                const apisikUrl = `${baseUrl}sik`;
                const apiUserUrl = `${baseUrl}users`;
                const sikRes = await axios.get<Sik[]>(apisikUrl, {
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
                const filtered = sikRes.data.filter(item => String(item.id) === sikId);
                const userKTP = userRes.data.filter(user => user.id === filtered[0].user_id)
                setsik(filtered);
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
            {sikData.map((item:any) => (
                <div
                key={item.id}
                className="bg-white shadow-lg border border-black w-[400px] sm:w-[794px] p-10 text-sm mb-8"
                >
                <div className="flex items-center justify-start gap-8">
                    <h1 className="font-bold text-2xl">Cek Kelengkapan Data Pemohon Surat Izin Keramaian</h1>
                    <Back/>
                </div>
                {/* Data Pemohon */}
                <div className="my-6">
                    <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                        <td className="align-top font-bold">Nama Penyelenggara</td>
                        <td>: {item.organizer_name}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Nama Acara</td>
                        <td>: {item.event_name}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Deskripsi Acara</td>
                        <td>: {item.event_description}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Acara Dimulai</td>
                        <td>: {formatJamIndonesia(item.event_start)}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Acara Selesai</td>
                        <td>: {formatJamIndonesia(item.event_end)}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Lokasi</td>
                        <td>: {item.location}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Estimasi Tamu</td>
                        <td>: {item.guest_estimate}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Biaya Retribusi</td>
                        <td>: {item.levy_fees}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Tanggal Pengajuan</td>
                        <td>: {formatTanggalIndonesia(item.form_creation)}</td>
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