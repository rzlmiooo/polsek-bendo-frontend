
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

const polresItems = [
  "stnk",
  "bpkb",
  "ijazah",
  "surat_nikah",
  "surat_tanah",
  "surat_lainnya"
];

const polsekItemsMessage: Record<string, string[]> = {
  ktp: [
    "1. Surat Keterangan dari Desa",
    "2. Fotokopi Kartu Keluarga Pelapor",
    "3. Fotokopi KTP hilang (jika ada)",
  ],
  kk: [
    "1. Surat Pengantar dari Desa",
    "2. Fotokopi KTP Pelapor",
  ],
  buku_rekening: [
    "1. Fotokopi KTP Pelapor",
    "2. Nomor rekening dari Buku Rekening/ATM yang hilang",
  ],
  sim: [
    "1. Fotokopi KTP Pelapor",
    "2. Nomor SIM (jika ada)",
  ],
  sim_card: [
    "1. Fotokopi KTP Pelapor",
    "2. Nomor telepon yang hilang",
  ],
  akte: [
    "1. Surat Keterangan dari Desa",
    "2. Fotokopi KTP Pelapor",
  ],
};

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

  function formatItemType(item_type: string): string {
    if (itemTypeMap[item_type as ItemType]) {
      return itemTypeMap[item_type as ItemType];
    }
    return item_type
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

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
        {/* <div>
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
        </div> */}
        <div>
          <label htmlFor="item_type" className="block font-medium">Jenis Barang</label>
          <select
            id="item_type"
            name="item_type"
            value={formData.item_type}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            required
          >
            <option value="">-- Pilih Dokumen --</option>
            {Object.entries(itemTypeMap).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {polresItems.includes(formData.item_type) && (
            <p className="text-base text-red-600 mt-1">
              Pelayanan atas kehilangan <span className="font-bold">{formatItemType((formData.item_type))}</span> dialihkan ke <span className="font-bold">Polres Magetan</span>
            </p>
          )}
          {formData.item_type in polsekItemsMessage && (
            <div className="text-base text-gray-700 mt-2">
              <p className="font-medium text-red-600 mb-1">
                Persyaratan untuk kehilangan{" "}
                <span className="font-bold">
                  {formatItemType(formData.item_type)}
                </span>:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {polsekItemsMessage[formData.item_type].map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
              <p className="font-medium text-red-600 mt-1">Harap membawa dokumen diatas saat pengambilan surat laporan di Polsek.</p>
            </div>
          )}
        </div>

        {formData.item_type === "surat_lainnya" && (
          <div className="mt-3">
            <label htmlFor="surat_lainnya_detail" className="block text-sm font-medium">
              Jenis Surat Lainnya
            </label>
            <input
              type="text"
              id="surat_lainnya_detail"
              name="surat_lainnya_detail"
              value=""
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Contoh: Surat Tanah, Surat Warisan, dll"
            />
          </div>
        )}

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
          disabled={polresItems.includes(formData.item_type)}
          className={`w-full mt-4 px-4 py-2 font-bold rounded text-white ${
            polresItems.includes(formData.item_type)
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-700 hover:bg-yellow-500"
          }`}
        >
          Kirim Permohonan
        </button>
        </div>
      </form>
    </div>
    </>
  );
}