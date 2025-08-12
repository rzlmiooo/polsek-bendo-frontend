<<<<<<< HEAD

=======
>>>>>>> cd21765 (My changes)
"use client";

import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import getUserId from '@/app/utils/auth/page';
import SuccessMessage from "../../../components/successMessageAdmin";
import Head from 'next/head';


=======
import { LucideUser, LucideCalendar, LucideGlobe, LucideHeart, LucideBriefcase, LucideMapPin, LucideFrown, LucidePhone } from 'lucide-react';
import { useRouter } from "next/navigation";
// This import is assumed to be in the user's project, but will not work in this environment
// import getUserId from '@/app/utils/auth/page';
import Head from 'next/head';

>>>>>>> cd21765 (My changes)
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
<<<<<<< HEAD
}

=======
  complainant_job: string;
  complainant_religion: string;
  complainant_nationality: string;
  complainant_loss: string;
  sex: string;
}

// Mock getUserId function for demonstration purposes
const getUserId = () => "mock-user-123";
>>>>>>> cd21765 (My changes)

export default function PengaduanMasyarakatForm() {
  const router = useRouter();
  const userId = getUserId();

<<<<<<< HEAD
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
=======
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '';
>>>>>>> cd21765 (My changes)

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
<<<<<<< HEAD
=======
    complainant_job: '',
    complainant_religion: '',
    complainant_nationality: '',
    complainant_loss: '',
    sex: '',
>>>>>>> cd21765 (My changes)
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

<<<<<<< HEAD
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
=======
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
>>>>>>> cd21765 (My changes)
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
<<<<<<< HEAD
    setErrorMessage(null);;
=======
    setErrorMessage(null);
>>>>>>> cd21765 (My changes)
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

<<<<<<< HEAD
      console.log('Contents of FormData for Cloudinary:');
      for (const pair of cloudinaryFormData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

=======
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
>>>>>>> cd21765 (My changes)
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
<<<<<<< HEAD
      console.log("Upload successful:", resData);
=======
>>>>>>> cd21765 (My changes)

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

<<<<<<< HEAD

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
=======
    const requiredFields = [
      'complainant_name', 'contact', 'complainant_address', 'complaint_title',
      'complaint_content', 'proof', 'complaint_date', 'complainant_religion',
      'complainant_nationality', 'complainant_loss', 'sex', 'complainant_job'
    ];
    
    // Check if all required fields are filled
    const isFormValid = requiredFields.every(field => formData[field as keyof PMFormState]);

    if (!isFormValid) {
      setErrorMessage("Mohon lengkapi semua bidang yang wajib diisi.");
      setIsLoading(false);
>>>>>>> cd21765 (My changes)
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
<<<<<<< HEAD
      };
      const apiReportsUrl = `${baseApiUrl}reports`;
=======
        complainant_job: formData.complainant_job,
        complainant_religion: formData.complainant_religion,
        complainant_nationality: formData.complainant_nationality,
        complainant_loss: formData.complainant_loss,
        sex: formData.sex,
      };

      const apiReportsUrl = `${baseApiUrl}pm`;
>>>>>>> cd21765 (My changes)

      const response = await axios.post(apiReportsUrl, payload);

      if (response.status === 200 || response.status === 201) {
<<<<<<< HEAD
        console.log("API response SUCCESS (200 or 201):", response.data);
        setShowSuccessMessage(true);

=======
        setShowSuccessMessage(true);
>>>>>>> cd21765 (My changes)
        setSuccessDetails({
          title: response.data?.message || "Pengaduan Masyarakat berhasil diedit!",
          description: "Terima kasih telah membuat Informasi yang berguna.",
          farewell: "Semoga harimu Menyenangkan!",
          backLinkHref: "/layanan/pengaduan",
          backLinkText: "KEMBALI"
        });
        setFormData({
<<<<<<< HEAD
          complainant_name: "",
          contact: "",
          complainant_address: "",
          complaint_category: "",
          complaint_title: "",
          complaint_content: "",
          proof: "",
          complaint_date: "",
          complaint_status: "diterima",
=======
          complainant_name: "", contact: "", complainant_address: "",
          complaint_category: "", complaint_title: "", complaint_content: "",
          proof: "", complaint_date: "", complaint_status: "diterima",
          complainant_job: '', complainant_religion: '', complainant_nationality: '',
          complainant_loss: '', sex: '',
>>>>>>> cd21765 (My changes)
        });
      } else {
        const serverMessage = response.data?.message || `Server returned status ${response.status}.`;
        setErrorMessage(`Respon server tidak terduga: ${serverMessage}`);
<<<<<<< HEAD
        console.log("API response NOT SUCCESS:", response.status, response.data);
=======
>>>>>>> cd21765 (My changes)
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrorMessage("Terjadi kesalahan: " + (error.response?.data?.message || error.message || "Gagal membuat artikel."));
<<<<<<< HEAD
=======
    } finally {
      setIsLoading(false);
>>>>>>> cd21765 (My changes)
    }
  };

  if (showSuccessMessage && successDetails) {
<<<<<<< HEAD
    console.log("Rendering SuccessMessage component.");
    return <SuccessMessage {...successDetails} />;
  }

  return (
    <>
    <Head>
=======
    // Note: The SuccessMessage component is not provided, so this will only work in your environment
    // return <SuccessMessage {...successDetails} />;
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-green-600 mb-4">{successDetails.title}</h2>
          <p className="text-gray-700 mb-2">{successDetails.description}</p>
          <p className="text-gray-500 mb-6">{successDetails.farewell}</p>
          <button
            onClick={() => router.push(successDetails.backLinkHref)}
            className="bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {successDetails.backLinkText}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
>>>>>>> cd21765 (My changes)
        <title>Pengaduan Masyarakat</title>
        <meta name="description" content="Sampaikan pengaduan Anda ke Polsek Bendo secara langsung dan aman." />
        <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
        <meta name="author" content="Polsek Bendo" />
        <link rel="canonical" href="https://polsek-bendo.my.id/layanan/pm" />
<<<<<<< HEAD
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
            className="bg-[#00BFFF] text-white px-6 py-3 rounded-xl font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Edited...' : 'Edited Pengaduan Masyarakat Post'}
          </button>
        </div>
      </form>
    </div>
=======
      </Head>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Form Pengaduan Masyarakat</h2>

        <form onSubmit={handleSubmitClick} className="space-y-5">
          {errorMessage && <div className="text-red-600 font-medium mb-4">{errorMessage}</div>}
          
          {/* Section: Data Pelapor */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-3">Data Pribadi Pelapor</h3>
            
            {/* Nama Pelapor */}
            <div>
              <label htmlFor="complainant_name" className="block font-medium">Nama Pelapor</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LucideUser className="h-5 w-5 text-gray-400" /></span>
                <input
                  type="text"
                  id="complainant_name"
                  name="complainant_name"
                  value={formData.complainant_name}
                  onChange={handleChange}
                  className="w-full mt-1 border pl-10 p-2 rounded"
                  placeholder="Muhammad Rokiaten"
                  required
                />
              </div>
            </div>

            {/* Nomor Telepon */}
            <div>
              <label htmlFor="contact" className="block font-medium">Nomor Telepon</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LucidePhone className="h-5 w-5 text-gray-400" /></span>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full mt-1 border pl-10 p-2 rounded"
                  placeholder="081126349812"
                  required
                />
              </div>
            </div>
            
            {/* Alamat Pelapor */}
            <div>
              <label htmlFor="complainant_address" className="block font-medium">Alamat Pelapor</label>
              <div className="relative">
                <span className="absolute left-0 top-3 flex items-center pl-3"><LucideMapPin className="h-5 w-5 text-gray-400" /></span>
                <textarea
                  id="complainant_address"
                  name="complainant_address"
                  value={formData.complainant_address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 border pl-10 p-2 rounded"
                  placeholder="Desa Karanganyar, Kecamatan Karangpandan..."
                  required
                ></textarea>
              </div>
            </div>
            
            {/* Jenis Kelamin Dropdown */}
            <div>
              <label htmlFor="sex" className="block font-medium">Jenis Kelamin</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LucideUser className="h-5 w-5 text-gray-400" /></span>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full mt-1 border pl-10 p-2 rounded appearance-none"
                  required
                >
                  <option value="" disabled>Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                </div>
              </div>
            </div>

            {/* Kewarganegaraan Dropdown */}
            <div>
              <label htmlFor="complainant_nationality" className="block font-medium">Kewarganegaraan Pelapor</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LucideGlobe className="h-5 w-5 text-gray-400" /></span>
                <select
                  id="complainant_nationality"
                  name="complainant_nationality"
                  value={formData.complainant_nationality}
                  onChange={handleChange}
                  className="w-full mt-1 border pl-10 p-2 rounded appearance-none"
                  required
                >
                  <option value="" disabled>Pilih Kewarganegaraan</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapura">Singapura</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                </div>
              </div>
            </div>

            {/* Agama Dropdown */}
            <div>
              <label htmlFor="complainant_religion" className="block font-medium">Agama Pelapor</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LucideHeart className="h-5 w-5 text-gray-400" /></span>
                <select
                  id="complainant_religion"
                  name="complainant_religion"
                  value={formData.complainant_religion}
                  onChange={handleChange}
                  className="w-full mt-1 border pl-10 p-2 rounded appearance-none"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                </div>
              </div>
            </div>

            {/* Pekerjaan Dropdown */}
            <div>
              <label htmlFor="complainant_job" className="block font-medium">Pekerjaan Pelapor</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LucideBriefcase className="h-5 w-5 text-gray-400" /></span>
                <select
                  id="complainant_job"
                  name="complainant_job"
                  value={formData.complainant_job}
                  onChange={handleChange}
                  className="w-full mt-1 border pl-10 p-2 rounded appearance-none"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z"/></svg>
                </div>
              </div>
            </div>
            
          </div>

          {/* Section: Data Pengaduan */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-3">Detail Pengaduan</h3>
            
            {/* Kategori Pengaduan */}
            <div>
              <label htmlFor="complaint_category" className="block font-medium">Pilih Kategori</label>
              <div className="relative">
                <select
                  id="complaint_category"
                  name="complaint_category"
                  value={formData.complaint_category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Pengaduan Informatif">Pengaduan Informatif</option>
                  <option value="Pengaduan Penyimpangan">Pengaduan Penyimpangan</option>
                  <option value="Pengaduan terkait Pelayanan Publik">Pengaduan terkait Pelayanan Publik</option>
                </select>
              </div>
            </div>
            
            {/* Nama Pengaduan */}
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
            
            {/* Deskripsi Pengaduan */}
            <div>
              <label htmlFor="complaint_content" className="block font-medium">Deskripsikan Pengaduanmu</label>
              <textarea
                id="complaint_content"
                name="complaint_content"
                value={formData.complaint_content}
                onChange={handleChange}
                rows={4}
                className="w-full mt-1 border p-2 rounded"
                placeholder="Isi pengaduan"
                required
              ></textarea>
            </div>
            
            {/* Kerugian Pengadu */}
            <div>
              <label htmlFor="complainant_loss" className="block font-medium">Kerugian Pengadu</label>
              <input
                type="text"
                id="complainant_loss"
                name="complainant_loss"
                value={formData.complainant_loss}
                onChange={handleChange}
                className="w-full mt-1 border p-2 rounded"
                placeholder="Rp.20.000.000"
                required
              />
            </div>
            
            {/* Bukti Foto */}
            <div className="mb-4">
              <label htmlFor="proof_photo_upload" className="block font-medium mb-1">
                Bukti foto harus berformat jpg, png, dll.
              </label>
              <input
                className="inline-block px-4 py-2 text-sm font-medium text-black bg-gray-200 border border-gray-400 rounded cursor-pointer hover:bg-gray-300"
                type="file"
                id="proof_photo_upload"
                accept="image/*"
                onChange={handleFilePictureChange}
                disabled={imageLoading}
                required
              />
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
            
            {/* Tanggal Pengaduan */}
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
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Mengirim...' : 'Kirim Permohonan'}
          </button>
        </form>
      </div>
>>>>>>> cd21765 (My changes)
    </>
  );
}
