"use client";

import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
<<<<<<< HEAD
=======
import { LucideUser, LucideMail, LucideCalendar, LucideGlobe, LucideHeart , } from 'lucide-react';
>>>>>>> cd21765 (My changes)
import { useRouter } from "next/navigation";
import getUserId from '@/app/utils/auth/page';
import Head from 'next/head';

interface SkckFormState {
  applicant_name: string;
  place_date_birth: string;
  complete_address: string;
  needs: string;
  id_number: string;
  submission_date: string;
  officer_notes: string;
  passport_photo: string;
  verification_status: string;
<<<<<<< HEAD
=======
  sex : string;
  nationality : string;
  religion : string;
>>>>>>> cd21765 (My changes)
  successMessage: string | null;
  errorMessage: string | null;
}

export default function SkckForm() {
  const router = useRouter();
  const userId = getUserId();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<SkckFormState>({
    applicant_name: "",
    place_date_birth: "",
    complete_address: "",
    needs: "",
    id_number: "",
    submission_date: "",
    verification_status: "pending",
    officer_notes: "null",
    passport_photo: "",
<<<<<<< HEAD
=======
    sex : "",
    nationality : "",
    religion : "",
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errorMessage: null,
      successMessage: null,
    }));
  };

  const handleFilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    setFormData((prev) => ({ ...prev, passport_photo: "" }));

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
      const apiCloudinaryUrl = `${baseApiUrl}upload`;


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
      setFormData((prev) => ({ ...prev, passport_photo: resData.secure_url || resData.url }));
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

    setFormData((prev) => ({ ...prev, successMessage: null, errorMessage: null }));

    if (imageLoading) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: "Please wait for the image to finish uploading.",
      }));
      return;
    }

    if (imageError) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: `Image upload failed: ${imageError}. Please fix or re-upload.`,
      }));
      return;
    }

    if (!formData.passport_photo) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: "Please upload a profile picture.",
      }));
      return;
    }

    if (
      !formData.applicant_name ||
      !formData.place_date_birth ||
      !formData.complete_address ||
      !formData.id_number ||
      !formData.needs ||
      !formData.submission_date
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
        applicant_name: formData.applicant_name,
        place_date_birth: formData.place_date_birth,
        complete_address: formData.complete_address,
        needs: formData.needs,
        id_number: formData.id_number,
        submission_date: formData.submission_date,
        verification_status: formData.verification_status,
        officer_notes: formData.officer_notes,
        passport_photo: formData.passport_photo,
<<<<<<< HEAD
=======
        sex : formData.sex,
        nationality : formData.nationality,
        religion : formData.religion,
>>>>>>> cd21765 (My changes)
      };
      const apiSkckUrl = `${baseApiUrl}skck`;


      const response = await axios.post(apiSkckUrl, payload);

      if (response.status === 200 || response.status === 201) {
        setFormData((prev) => ({
          ...prev,
          successMessage: "SKCK application submitted successfully!",
          errorMessage: null,
        }));
        console.log("SKCK application submitted:", response.data);
      } else {
        setFormData((prev) => ({
          ...prev,
          errorMessage: response.data?.message || "Unexpected server response during submission.",
          successMessage: null,
        }));
      }
    } catch (error: any) {
      console.error("SKCK submission error:", error);
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
        <title>Pengajuan SKCK</title>
        <meta name="description" content="Ajukan pembuatan SKCK secara online dengan mudah dan cepat." />
        <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
        <meta name="author" content="Polsek Bendo" />
        <link rel="canonical" href="https://polsek-bendo.my.id/layanan/skck" />
      </Head>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Formulir Pengajuan SKCK Online - WNI</h1>
        <form onSubmit={handleSubmitClick} className="space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label htmlFor="applicant_name" className="block font-medium">Nama Lengkap</label>
            <input
              type="text"
              id="applicant_name"
              name="applicant_name"
              value={formData.applicant_name}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Muhammad Rokiaten"
              required
            />
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label htmlFor="complete_address" className="block font-medium">Alamat Lengkap</label>
            <input
              type="text"
              id="complete_address"
              name="complete_address"
              value={formData.complete_address}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Madiun , Jln.Kemuning No.5"
              required
            />
          </div>

          {/* Nomor KTP */}
          <div>
            <label htmlFor="id_number" className="block font-medium">Nomor KTP</label>
            <input
              type="text"
              id="id_number"
              name="id_number"
              value={formData.id_number}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="35202513062007002"
              pattern="[0-9]{16}"
              title="Nomor KTP harus 16 digit angka"
              required
            />
          </div>

          {/* submission_date */}
          <div>
            <label htmlFor="submission_date" className="block font-medium">Tanggal Pengajuan SKCK</label>
            <input
              type="date"
              id="submission_date"
              name="submission_date"
              value={formData.submission_date}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              required
            />
          </div>

          {/* Kebutuhan */}
          <div>
            <label htmlFor="needs" className="block font-medium">Kebutuhan</label>
            <input
              type="text"
              id="needs"
              name="needs"
              value={formData.needs}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Keperluan melamar CPNS"
              required
            />
          </div>

          {/* Tempat Tanggal Lahir */}
          <div>
            <label htmlFor="place_date_birth" className="block font-medium">Tempat Tanggal Lahir</label>
            <input
              type="text"
              id="place_date_birth"
              name="place_date_birth"
              value={formData.place_date_birth}
              onChange={handleChange}
              className="w-full mt-1 border p-2 rounded"
              placeholder="Surabaya, 17 Januari 2000"
              required
            />
          </div>

<<<<<<< HEAD
=======
          {/* Jenis Kelamin Dropdown */}
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kelamin
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LucideUser className="h-5 w-5 text-gray-400" />
              </span>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition-colors"
                required
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Kewarganegaraan Dropdown */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              Kewarganegaraan
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LucideGlobe className="h-5 w-5 text-gray-400" />
              </span>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer transition-colors"
                required
              >
                <option value="" disabled>Pilih Kewarganegaraan</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapura">Singapura</option>
                <option value="Amerika Serikat">Amerika Serikat</option>
                <option value="Jepang">Jepang</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

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

>>>>>>> cd21765 (My changes)
          {/* Pas Foto */}
          <div className="mb-4">
            <label htmlFor="passport_photo_upload" className="block font-medium mb-1">
              Pas Foto 4x6 (6 lembar, latar belakang merah)
            </label>
            <div className="flex items-center space-x-3">
              <input
                className="inline-block px-4 py-2 text-sm font-medium text-black bg-gray-200 border border-gray-400 rounded cursor-pointer hover:bg-gray-300"
                type="file"
                id="passport_photo_upload"
                accept="image/*"
                onChange={handleFilePictureChange}
                disabled={imageLoading}
                required
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Foto harus berpakaian sopan, tidak menggunakan aksesoris wajah, dan tampak muka utuh.
            </p>
            {imageLoading && <p className="text-blue-600 mt-2">Uploading image...</p>}
            {imageError && <p className="text-red-600 mt-2">{imageError}</p>}
            {formData.passport_photo && !imageLoading && (
              <div className="text-green-600 mt-2">
                <p>Image uploaded successfully!</p>
              </div>
            )}
            {selectedFile && !imageLoading && !formData.passport_photo && !imageError && (
              <p className="text-gray-600 mt-2">Ready to upload: {selectedFile.name}</p>
            )}
          </div>

          {formData.errorMessage && <p className="text-red-600 mb-4">{formData.errorMessage}</p>}
          {formData.successMessage && <p className="text-green-600 mb-4">{formData.successMessage}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              disabled={imageLoading}
            >
              Kirim Permohonan
            </button>
          </div>
        </form>
      </div>
    </>
  );
}