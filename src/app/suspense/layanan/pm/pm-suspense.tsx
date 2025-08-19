
"use client";

import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import getUserId from '@/app/utils/auth/page';
import SuccessMessage from "../../../components/successMessageAdmin";
import Head from 'next/head';


interface PMFormState {
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


export default function PengaduanMasyarakatForm() {
  const router = useRouter();
  const userId = getUserId();

  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PMFormState>({
    complainant_name: "",
    contact: "",
    complainant_address: "",
    complaint_category: "",
    complaint_title: "",
    complaint_content: "",
    proof: "",
    complaint_date: "",
    complaint_status: "diterima",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string>("");

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [successDetails, setSuccessDetails] = useState<{
    title: string;
    description: string;
    farewell: string;
    backLinkHref: string;
    backLinkText: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(null);;
  };

  const handleFilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    setFormData((prev) => ({ ...prev, proof: "" }));

    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      setImageError("No file selected.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setImageLoading(true);

    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('image', file);

      console.log('Contents of FormData for Cloudinary:');
      for (const pair of cloudinaryFormData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const apiCloudinaryUrl = `${baseUrl}upload`;

      const response = await axios.post(
        apiCloudinaryUrl,
        cloudinaryFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const resData = response.data;
      setFormData((prev) => ({ ...prev, proof: resData.secure_url || resData.url }));
      console.log("Upload successful:", resData);

    } catch (err: any) {
      console.error("Full image upload error object:", err);
      console.error("Image upload error response data:", err?.response?.data);
      setImageError(err?.response?.data?.error?.message || err?.response?.data?.error || "Failed to upload image. Please try again.");
      setSelectedFile(null);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowSuccessMessage(false);
    setIsLoading(true);

    setFormData((prev) => ({ ...prev, successMessage: null, errorMessage: null }));

    if (
      !formData.complainant_name ||
      !formData.contact ||
      !formData.complainant_address ||
      !formData.complaint_title ||
      !formData.complaint_content ||
      !formData.proof ||
      !formData.complaint_date
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
        complainant_name: formData.complainant_name,
        contact: formData.contact,
        complainant_address: formData.complainant_address,
        complaint_category: formData.complaint_category,
        complaint_title: formData.complaint_title,
        complaint_content: formData.complaint_content,
        proof: formData.proof,
        complaint_date: formData.complaint_date,
        complaint_status: formData.complaint_status,
      };
      const apiReportsUrl = `${baseApiUrl}pm`;

      const response = await axios.post(apiReportsUrl, payload);

      if (response.status === 200 || response.status === 201) {
        console.log("API response SUCCESS (200 or 201):", response.data);
        setShowSuccessMessage(true);

        setSuccessDetails({
          title: response.data?.message || "Pengaduan Masyarakat berhasil diedit!",
          description: "Terima kasih telah membuat Informasi yang berguna.",
          farewell: "Semoga harimu Menyenangkan!",
          backLinkHref: "/layanan/pengaduan",
          backLinkText: "KEMBALI"
        });
        setFormData({
          complainant_name: "",
          contact: "",
          complainant_address: "",
          complaint_category: "",
          complaint_title: "",
          complaint_content: "",
          proof: "",
          complaint_date: "",
          complaint_status: "diterima",
        });
      } else {
        const serverMessage = response.data?.message || `Server returned status ${response.status}.`;
        setErrorMessage(`Respon server tidak terduga: ${serverMessage}`);
        console.log("API response NOT SUCCESS:", response.status, response.data);
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrorMessage("Terjadi kesalahan: " + (error.response?.data?.message || error.message || "Gagal membuat artikel."));
    }
  };

  if (showSuccessMessage && successDetails) {
    console.log("Rendering SuccessMessage component.");
    return <SuccessMessage {...successDetails} />;
  }

  return (
    <>
    <Head>
        <title>Pengaduan Masyarakat</title>
        <meta name="description" content="Sampaikan pengaduan Anda ke Polsek Bendo secara langsung dan aman." />
        <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
        <meta name="author" content="Polsek Bendo" />
        <link rel="canonical" href="https://polsek-bendo.my.id/layanan/pm" />
    </Head>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Form Pengaduan Masyarakat</h2>
       
      <form onSubmit={handleSubmitClick} className="space-y-5">
        {/* Nama Pelapor */}
        <div>
          <label htmlFor="complainant_name" className="block font-medium">Nama Pelapor</label>
          <input
            type="text"
            id="complainant_name"
            name="complainant_name"
            value={formData.complainant_name}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Muhammad Rokiaten"
            required
          />
        </div>

        {/* contact */}
        <div>
          <label htmlFor="contact" className="block font-medium">Nomor Telepon</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="081126349812"
            required
          />
        </div>

        {/* date_lost */}
        <div>
          <label htmlFor="complainant_address" className="block font-medium">Alamat Pelapor</label>
          <input
            type="text"
            id="complainant_address"
            name="complainant_address"
            value={formData.complainant_address}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Desa Karanganyar, Kecamatan Karangpandan, Kabupaten Karanganyar, Jawa Tengah,577777 "
            required
          />
        </div>

        <label htmlFor="complaint_category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Pilih Kategori
        </label>
        <select
          id="complaint_category"
          name="complaint_category"
          value={formData.complaint_category}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Pilih Kategori</option>
          <option value="Pengaduan Informatif">Pengaduan Informatif</option>
          <option value="Pengaduan Penyimpangan">Pengaduan Penyimpangan</option>
          <option value="Pengaduan terkait Pelayanan Publik">Pengaduan terkait Pelayanan Publik</option>
        </select>

        {/* Jenis Barang  */}
        <div>
          <label htmlFor="complaint_title" className="block font-medium">Beri Nama Pengaduan</label>
          <input
            type="text"
            id="complaint_title"
            name="complaint_title"
            value={formData.complaint_title}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            placeholder="Pengaduan Pungutan Liar"
            required
          />
        </div>

        {/* chronology */}
        <label htmlFor="complaint_content" className="block font-medium">Deskripsikan Pengaduanmu</label>
        <input
          placeholder="Isi pengaduan"
          className="w-full px-4 py-2 border rounded text-sm"
          type="text"
          id="complaint_content"
          name="complaint_content"
          value={formData.complaint_content}
          onChange={handleChange}
        />

        {/* chronology */}
        <div className="mb-4">
          <label htmlFor="proof_photo_upload" className="block font-medium mb-1">
            Bukti foto harus berformat jpg , png , dll. bukan mov , mp3 , dll.
          </label>
          <div className="flex items-center space-x-3">
            <input
              className="inline-block px-4 py-2 text-sm font-medium text-black bg-gray-200 border border-gray-400 rounded cursor-pointer hover:bg-gray-300"
              type="file"
              id="proof_photo_upload"
              accept="image/*"
              onChange={handleFilePictureChange}
              disabled={imageLoading}
              required
            />
          </div>
          {imageLoading && <p className="text-blue-600 mt-2">Uploading image...</p>}
          {imageError && <p className="text-red-600 mt-2">{imageError}</p>}
          {formData.proof && !imageLoading && (
            <div className="text-green-600 mt-2">
              <p>Image uploaded successfully!</p>
            </div>
          )}
          {selectedFile && !imageLoading && !formData.proof && !imageError && (
            <p className="text-gray-600 mt-2">Ready to upload: {selectedFile.name}</p>
          )}
        </div>

        {/* Jenis Barang  */}
        <div>
          <label htmlFor="complaint_date" className="block font-medium">Tanggal Pengaduan</label>
          <input
            type="date"
            id="complaint_date"
            name="complaint_date"
            value={formData.complaint_date}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded"
            required
          />
        </div>

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
