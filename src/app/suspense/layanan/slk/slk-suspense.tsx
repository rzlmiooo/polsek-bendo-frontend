
"use client";

import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
<<<<<<< HEAD
=======
import { LucideUser, LucideMail, LucideCalendar, LucideGlobe, LucideHeart , } from 'lucide-react';
>>>>>>> cd21765 (My changes)
import { useRouter } from "next/navigation";
import getUserId from '@/app/utils/auth/page';
import Head from 'next/head';


interface LPFormState {
  reporter_name: string;
  contact_reporter: string;
  item_type: string;
  date_lost: string;
  chronology: string;
  status_handling: string;
<<<<<<< HEAD
=======
  religion: string;
  job: string;
  address: string;
>>>>>>> cd21765 (My changes)
  successMessage: string | null;
  errorMessage: string | null;
}

export default function LaporanKehilanganForm() {
  const router = useRouter();
  const userId = getUserId();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<LPFormState>({
    reporter_name: "",
    contact_reporter: "",
    item_type: "",
    date_lost: "",
    chronology: "",
    status_handling: "diterima",
<<<<<<< HEAD
=======
    religion: "",
    job: "",
    address: "",
>>>>>>> cd21765 (My changes)
    successMessage: null,
    errorMessage: null,
  });

  useEffect(() => {
            setIsClient(true);
            if (typeof window !== 'undefined') {
    
                const storedToken = localStorage.getItem('token');
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errorMessage: null,
      successMessage: null,
    }));
  };

  const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData((prev) => ({ ...prev, successMessage: null, errorMessage: null }));

    if (
      !formData.reporter_name ||
      !formData.contact_reporter ||
      !formData.item_type ||
      !formData.date_lost ||
      !formData.chronology 
    ) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: "Please fill in all required fields.",
      }));
      return;
    }

    try {
      const payload = {
        user_id : userId,
        reporter_name: formData.reporter_name,
        contact_reporter: formData.contact_reporter,
        item_type: formData.item_type,
        date_lost: formData.date_lost,
        chronology: formData.chronology,
        status_handling: formData.status_handling,
<<<<<<< HEAD
=======
        religion: formData.religion,
        job: formData.job,
        address: formData.address
>>>>>>> cd21765 (My changes)
      };
  
      const apiSlkUrl = `${baseApiUrl}slk`;

      const response = await axios.post(apiSlkUrl, payload);

      if (response.status === 200 || response.status === 201) {
        setFormData((prev) => ({
          ...prev,
          successMessage: "SLK application submitted successfully!",
          errorMessage: null,
        }));
        console.log("SLK application submitted:", response.data);
      } else {
        setFormData((prev) => ({
          ...prev,
          errorMessage: response.data?.message || "Unexpected server response during submission.",
          successMessage: null,
        }));
      }
    } catch (error: any) {
      console.error("SLK submission error:", error);
      setFormData((prev) => ({
        ...prev,
        errorMessage: "Server error: " + (error.response?.data?.message || error.message || "An unknown error occurred."),
        successMessage: null,
      }));
    }
  };

  return (
    <>
    <Head>
        <title>Laporan Kehilangan</title>
        <meta name="description" content="Laporkan kehilangan barang secara resmi ke Polsek Bendo." />
        <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
        <meta name="author" content="Polsek Bendo" />
        <link rel="canonical" href="https://polsek-bendo.my.id/layanan/sik" />
    </Head>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Form Laporan Kehilangan</h2>
      <form onSubmit={handleSubmitClick} className="space-y-5">
        {/* Nama Pelapor */}
        <div>
          <label htmlFor="reporter_name" className="block font-medium">Nama Pelapor</label>
          <input
            type="text"
            id="reporter_name"
            name="reporter_name"
            value={formData.reporter_name}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Muhammad Rokiaten"
            required
          />
        </div>

        {/* contact_reporter */}
        <div>
          <label htmlFor="contact_reporter" className="block font-medium">Nomor Telepon</label>
          <input
            type="text"
            id="contact_reporter"
            name="contact_reporter"
            value={formData.contact_reporter}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="085627354627"
            required
          />
        </div>

        {/* date_lost */}
        <div>
          <label htmlFor="date_lost" className="block font-medium">Tanggal Kehilangan</label>
          <input
            type="date"
            id="date_lost"
            name="date_lost"
            value={formData.date_lost}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            required
          />
        </div>

        {/* Jenis Barang  */}
        <div>
          <label htmlFor="item_type" className="block font-medium">Jenis Barang</label>
          <input
            type="text"
            id="item_type"
            name="item_type"
            value={formData.item_type}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Dompet"
            required
          />
        </div>

        {/* chronology */}
        <div>
          <label htmlFor="chronology" className="block font-medium">Kronologi Kehilangan</label>
          <input
            type="text"
            id="chronology"
            name="chronology"
            value={formData.chronology}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            required
          />
        </div>
<<<<<<< HEAD
=======
        {/* Agama Dropdown */}
          <div>
            <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-1">
              Agama
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LucideHeart className="h-5 w-5 text-gray-400" />
              </span>
              <select
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition-colors"
                required
              >
                <option value="" disabled>Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

        {/* Jobs */}
        <div>
          <label htmlFor="job" className="block font-medium">Pekerjaan</label>
          <input
            type="text"
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Petani"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block font-medium">Alamat</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Jln.Pegangsaan No.50"
            required
          />
        </div>
>>>>>>> cd21765 (My changes)

        {formData.errorMessage && <p className="text-red-600 mb-4">{formData.errorMessage}</p>}
        {formData.successMessage && <p className="text-green-600 mb-4">{formData.successMessage}</p>}

        <div>
          <button
            type="submit"
            className="w-full bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
          >
            Kirim Permohonan
          </button>
        </div>
      </form>
    </div>
    </>
  );
}