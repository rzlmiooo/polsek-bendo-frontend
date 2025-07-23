
"use client";

import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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