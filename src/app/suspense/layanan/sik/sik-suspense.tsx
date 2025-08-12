"use client";

import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from "react";
<<<<<<< HEAD
=======
import { LucideUser, LucideCalendar, LucideGlobe, LucideHeart, LucideBriefcase, LucideMapPin } from 'lucide-react';
>>>>>>> cd21765 (My changes)
import { useRouter } from "next/navigation";
import getUserId from '@/app/utils/auth/page';
import Head from 'next/head';


interface SIKFormState {
  organizer_name: string;
  event_name: string;
  event_description: string;
  event_start: string;
  event_end: string;
  location: string;
  guest_estimate: string;
  levy_fees: string;
  form_creation: string;
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

export default function IzinKeramaianForm() {
  const router = useRouter();
  const userId = getUserId();
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<SIKFormState>({
    organizer_name: "",
    event_name: "",
    event_description: "",
    event_start: "",
    event_end: "",
    location: "",
    guest_estimate: "",
    levy_fees: "",
    form_creation: "",
    status_handling: "dipending",
<<<<<<< HEAD
=======
    religion: "",
    job: "",
    address: "",
>>>>>>> cd21765 (My changes)
    successMessage: null,
    errorMessage: null,
  });

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
      !formData.organizer_name ||
      !formData.event_name ||
      !formData.event_description ||
      !formData.event_start ||
      !formData.event_end ||
      !formData.location ||
      !formData.guest_estimate ||
      !formData.levy_fees ||
<<<<<<< HEAD
      !formData.form_creation
=======
      !formData.form_creation ||
      !formData.religion ||
      !formData.job ||
      !formData.address 
>>>>>>> cd21765 (My changes)
    ) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: "Please fill in all required fields.",
      }));
      return;
    }

    try {
      const payload = {
        user_id: userId,
        organizer_name: formData.organizer_name,
        event_name: formData.event_name,
        event_description: formData.event_description,
        event_start: formData.event_start,
        event_end: formData.event_end,
        location: formData.location,
        guest_estimate: formData.guest_estimate,
        levy_fees: formData.levy_fees,
        form_creation: formData.form_creation,
<<<<<<< HEAD
=======
        religion: formData.religion,
        job: formData.job,
        address: formData.address
>>>>>>> cd21765 (My changes)
      };

      const apiSikUrl = `${baseApiUrl}sik`;

      const response = await axios.post(apiSikUrl, payload);

      if (response.status === 200 || response.status === 201) {
        setFormData((prev) => ({
          ...prev,
          successMessage: "SIK application submitted successfully!",
          errorMessage: null,
        }));
        console.log("SIK application submitted:", response.data);
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
      {/* SEO */}
      <Head>
        <title>Surat Izin Keramaian</title>
        <meta name="description" content="Ajukan surat izin keramaian secara online melalui Polsek Bendo." />
        <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
        <meta name="author" content="Polsek Bendo" />
        <link rel="canonical" href="https://polsek-bendo.my.id/layanan/izin_keramaian" />
      </Head>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Form Izin Keramaian</h2>
        <form onSubmit={handleSubmitClick} className="space-y-5">
          {/* Nama Pelapor */}
          <div>
            <label htmlFor="organizer_name" className="block font-medium">Nama Penyelenggara</label>
            <input
              type="text"
              id="organizer_name"
              name="organizer_name"
              value={formData.organizer_name}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Muhammad Rokiaten"
              required
            />
          </div>

          {/* contact_reporter */}
          <div>
            <label htmlFor="event_name" className="block font-medium">Nama Acara</label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="HUT RI ke 80"
              required
            />
          </div>

          {/* date_lost */}
          <div>
            <label htmlFor="event_description" className="block font-medium">Deskripsi Acara</label>
            <input
              type="text"
              id="event_description"
              name="event_description"
              value={formData.event_description}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Rangkaian acara meliputi upacara bendera, lomba tradisional, pawai, pertunjukan seni, dan pesta rakyat. "
              required
            />
          </div>

          {/* Jenis Barang  */}
          <div>
            <label htmlFor="event_start" className="block font-medium">Acara Dimulai</label>
            <input
              type="date"
              id="event_start"
              name="event_start"
              value={formData.event_start}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              required
            />
          </div>

          {/* Jenis Barang  */}
          <div>
            <label htmlFor="event_end" className="block font-medium">Acara Selesai</label>
            <input
              type="date"
              id="event_end"
              name="event_end"
              value={formData.event_end}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              required
            />
          </div>

          {/* chronology */}
          <div>
            <label htmlFor="location" className="block font-medium">Lokasi</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Lapangan Kecamatan Bendo"
              required
            />
          </div>

          {/* chronology */}
          <div>
            <label htmlFor="guest_estimate" className="block font-medium">Estimasi Tamu</label>
            <input
              type="text"
              id="guest_estimate"
              name="guest_estimate"
              value={formData.guest_estimate}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="100"
              required
            />
          </div>

          <div>
            <label htmlFor="levy_fees" className="block font-medium">Biaya Retribusi</label>
            <input
              type="text"
              id="levy_fees"
              name="levy_fees"
              value={formData.levy_fees}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="10000000"
              title="Hanya berupa angka tidak boleh ada titik, koma, petik dll!"
              required
            />
          </div>

          <div>
            <label htmlFor="form_creation" className="block font-medium">Tanggal Pengajuan</label>
            <input
              type="date"
              id="form_creation"
              name="form_creation"
              value={formData.form_creation}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              required
            />
          </div>

<<<<<<< HEAD
=======
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

          {/* Pekerjaan Dropdown */}
          <div>
            <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-1">
              Pekerjaan
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LucideBriefcase className="h-5 w-5 text-gray-400" />
              </span>
              <select
                id="job"
                name="job"
                value={formData.job}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition-colors"
                required
              >
                <option value="" disabled>Pilih Pekerjaan</option>
                <option value="Pegawai Negeri Sipil">Pegawai Negeri Sipil</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Wiraswasta">Wiraswasta</option>
                <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
                <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
                <option value="Lainnya">Lainnya</option>
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
