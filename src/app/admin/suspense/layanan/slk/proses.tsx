'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import formatTanggalIndonesia from "@/app/components/formatTanggal";
import Back from "@/app/components/back";
import WhatsAppButton from "@/app/components/whatsappLink";
import Image from "next/image";

interface Slk {
    id: string;
    user_id: string;
    reporter_name: string;
    contact_reporter: string;
    item_type: string;
    date_lost: string;
    chronology: string;
    status_handling: 'diterima' | 'investigasi' | 'selesai' | 'ditolak';
}

interface User {
    id: string;
    ktp: string;
}

type ItemType =
  | "stnk"
  | "ktp"
  | "akte"
  | "buku_rekening"
  | "sim"
  | "sim_card"
  | "bpkb"
  | "ijazah"
  | "surat_nikah"
  | "surat_lainnya"
  | "surat_tanah"
  | "kk";

const itemTypeMap: Record<ItemType, string> = {
    stnk: "STNK",
    ktp: "KTP",
    akte: "Akta Kelahiran",
    buku_rekening: "Buku Rekening / ATM",
    sim: "SIM",
    sim_card: "SIM Card HP",
    bpkb: "BPKB",
    ijazah: "Ijazah",
    surat_nikah: "Surat Nikah",
    surat_lainnya: "Surat Berharga Lainnya",
    surat_tanah: "Sertifikat Tanah",
    kk: "Kartu Keluarga",
};

export default function ProsesSLK(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const slkId = searchParams.get("slk_id");
    const [slkData, setslk] = useState<Slk[]>([]);
    const [userData, setUser] = useState<User[]>([]);
    const [token, setToken] = useState<string | null>(null);
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [greeting, setGreeting] = useState("");
    
    useEffect(() => {
        const hour = new Date().getHours();

        if (hour >= 4 && hour < 10) setGreeting("Selamat Pagi.");
        else if (hour >= 10 && hour < 15) setGreeting("Selamat Siang.");
        else if (hour >= 15 && hour < 18) setGreeting("Selamat Sore.");
        else setGreeting("Selamat Malam.");
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
            const apiUserUrl = `${baseUrl}users`;
            const slkRes = await axios.get<Slk[]>(apislkUrl, {
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
            const filtered = slkRes.data.filter(item => String(item.id) === slkId);
            const userKTP = userRes.data.filter(user => user.id === filtered[0].user_id)
            setslk(filtered);
            setUser(userKTP);
        } catch (err: any) {
            console.error('Error fetching data:', err);
        }
    }, [token, baseUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    function formatItemType(item_type: string): string {
        if (itemTypeMap[item_type as ItemType]) {
          return itemTypeMap[item_type as ItemType];
        }
        return item_type
          .split("_")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }

    function handleMessage(item_type: string) {
        const templates: Record<string, string> = {
          ktp: `1. Foto Surat Keterangan dari Desa\n2. Foto Kartu Keluarga (fotokopi atau asli)`,
          kk: `1. Foto Surat Keterangan dari Desa\n2. Foto KTP (fotokopi atau asli)`,
          buku_rek_atm: `1. Foto KTP (fotokopi atau asli)\n2. Nomor rekening Bank yang hilang`,
          sim: `1. Foto KTP (fotokopi atau asli)\n2. Nomor SIM jika ada (opsional)`,
          sim_card: `1. Foto Surat Keterangan dari Desa\n2. Foto KTP (fotokopi atau asli)`,
        };
      
        // kalau item_type termasuk yg dialihkan ke Polres
        const polresItems = ["stnk", "bpkb", "ijazah", "surat_nikah", "surat_lainnya"];
      
        if (templates[item_type]) {
          return `Halo, ${greeting}.\n\n
            Kami dari Polsek Bendo, berdasarkan permohonan Surat Laporan Kehilangan atas 
            Tipe Barang Hilang = ${formatItemType(item_type)}, kami meminta Anda untuk mengirim:\n\n
            ${templates[item_type]}\n\n
            Jika pesan tidak dibalas dalam 1 minggu kedepan, maka permohonan laporan kehilangan kami anggap hangus`;
        } else if (polresItems.includes(item_type)) {
          const formattedType = formatItemType(item_type);
          return `Halo, ${greeting}.\n\n
            Kami dari Polsek Bendo, berdasarkan permohonan Surat Laporan Kehilangan atas 
            Tipe Barang Hilang = ${formattedType}, menginformasikan untuk sekarang pelayanan atas kehilangan ${formattedType} dialihkan ke Polres Magetan`;
        } else {
          return `Halo, ${greeting}.\n\n
            Kami dari Polsek Bendo, berdasarkan permohonan Surat Laporan Kehilangan atas 
            Tipe Barang Hilang = ${formatItemType(item_type)}, kami meminta Anda untuk mengirim:\n\n
            1. Foto struk/nota pembelian barang atau foto bukti kuat kepemilikan barang\n
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
                        <td>: {formatTanggalIndonesia(item.date_lost)}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Jenis Barang</td>
                        <td>: {formatItemType(item.item_type)}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Kronologi Kehilangan</td>
                        <td>: {item.chronology}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Nomor Telepon</td>
                        <td>: {item.contact_reporter}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                    <WhatsAppButton
                        phone={item.contact_reporter}
                        message={handleMessage(item.item_type)}
                    />
                <div className="flex flex-col justify-start my-6">
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