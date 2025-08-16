'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import formatTanggalIndonesia from "@/app/components/formatTanggal";
import Back from "@/app/components/back";

interface Skck {
    id: string;
    user_id: string;
    applicant_name: string;
    submission_date: string;
    passport_photo: string;
    verification_status: string;
    id_number: string;
    complete_address: string;
    place_date_birth: string;
    sex: string;
    needs: string;
    nationality: string;
    religion: string;
}

interface User {
    id: string;
    ktp: string;
}

export default function ProsesSKCK(){
    const searchParams = useSearchParams();
    const router = useRouter();
    const skckId = searchParams.get("skck_id");
    const [skckData, setSkck] = useState<Skck[]>([]);
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
                const apiSkckUrl = `${baseUrl}skck`;
                const apiUserUrl = `${baseUrl}users`;
                const skckRes = await axios.get<Skck[]>(apiSkckUrl, {
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
                const filtered = skckRes.data.filter(item => String(item.id) === skckId);
                const userKTP = userRes.data.filter(user => user.id === filtered[0].user_id)
                setSkck(filtered);
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
            {skckData.map((item:any) => (
                <div
                key={item.id}
                className="bg-white shadow-lg border border-black w-[400px] sm:w-[794px] p-10 text-sm mb-8"
                >
                <div className="flex items-center justify-start gap-8">
                    <h1 className="font-bold text-2xl">Cek Kelengkapan Data Pemohon SKCK</h1>
                    <Back/>
                </div>
                {/* Data Pemohon */}
                <div className="my-6">
                    <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                        <td className="align-top font-bold">Nama</td>
                        <td>: {item.applicant_name}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Jenis Kelamin</td>
                        <td>: {item.sex}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Kebangsaan</td>
                        <td>: {item.nationality}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Agama</td>
                        <td>: {item.religion}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Tempat / Tanggal Lahir</td>
                        <td>: {item.place_date_birth}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Alamat</td>
                        <td>: {item.complete_address}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Pekerjaan</td>
                        <td>: -</td>
                        </tr>
                        <tr>
                        <td className="font-bold">NIK</td>
                        <td>: {item.id_number}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Keperluan</td>
                        <td>: {item.needs}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Tanggal dibuat</td>
                        <td>: {formatTanggalIndonesia(start.toISOString())}</td>
                        </tr>
                        <tr>
                        <td className="font-bold">Berlaku sampai dengan</td>
                        <td>: {formatTanggalIndonesia(expiration.toISOString())}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                {/* Pas Foto */}
                <div className="flex flex-col justify-start mb-6">
                    <div className="border border-black w-24 h-32 flex items-center justify-center">
                    {item.passport_photo ? (
                        <Image
                            src={item.passport_photo}
                            alt="Pas Foto"
                            width={200}
                            height={100}
                            priority
                        />
                    ) : (
                        <span className="text-xs">Pas Foto</span>
                    )}
                    </div>
                    <span className="mt-2">Pas Foto</span>
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