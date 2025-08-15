'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import formatTanggalIndonesia from "@/app/components/formatTanggal";
import formatJamIndonesia from "@/app/components/formatJamIndonesia";
import Back from "@/app/components/back";
import WhatsAppButton from "@/app/components/whatsappLink";

interface Slk {
    id: string;
    reporter_name: string;
    contact_reporter: string;
    item_type: string;
    date_lost: string;
    chronology: string;
    status_handling: 'diterima' | 'investigasi' | 'selesai' | 'ditolak';
  }

export default function ProsesSLK(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const slkId = searchParams.get("slk_id");
    const [slkData, setslk] = useState<Slk[]>([]);
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
                const apislkUrl = `${baseUrl}slk`;
                const slkRes = await axios.get<Slk[]>(apislkUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const filtered = slkRes.data.filter(item => String(item.id) === slkId);

                setslk(filtered);

                console.log("Filtered slk:", filtered); 
                console.log("slk: ", slkRes);
                
            } catch (err: any) {
                console.error('Error fetching data:', err);
            }
        }, [token, baseUrl]);
    
        useEffect(() => {
            fetchData();
        }, [fetchData]);

    function handleMessage(item_type:string) {
        if (item_type == "Mouse") {
            return `Halo, ${greeting}.\n\n

            Kami dari Polsek Bendo, berdasarkan permohonan Surat Laporan Kehilangan atas 
            Tipe Barang Hilang = KTP, meminta persyaratan berikut:\n\n

            1. Foto Surat Keterangan dari Desa\n
            2. Foto KTP (fotokopi atau asli)\n\n
            
            Jika pesan tidak dibalas dalam 1 minggu kedepan, maka permohonan laporan kehilangan kami anggap hangus`;
        }
    }

    return (
        <div className="lg:ml-[260px]">
            <div className="bg-gray-200 py-10 flex flex-col items-center overflow-hidden">
            {slkData.map((item:any) => (
                <div
                key={item.id}
                className="bg-white shadow-lg border border-black w-[400px] sm:w-[794px] p-10 text-sm mb-8"
                >
                <div className="flex items-center justify-start gap-8">
                    <h1 className="font-bold text-2xl">Cek Kelengkapan Data Pemohon Surat Laporan Kehilangan</h1>
                    <Back/>
                </div>
                {/* Data Pemohon */}
                <div className="my-6">
                    <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                        <td className="align-top font-bold">Nama Pelapor</td>
                        <td>: {item.reporter_name}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Tanggal Kehilangan</td>
                        <td>: {formatJamIndonesia(item.date_lost)}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Jenis Barang</td>
                        <td>: {item.item_type}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Kronologi Kehilangan</td>
                        <td>: {item.chronology}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Nomor Telepon</td>
                        <td>: {item.contact_reporter}</td>
                        <WhatsAppButton
                            phone={item.contact_reporter}
                            message={handleMessage(item.item_type)}
                        />
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}