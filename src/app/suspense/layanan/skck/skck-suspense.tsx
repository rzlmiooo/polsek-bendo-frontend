"use client";

import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import getUserId from '@/app/utils/auth/page';
import Head from 'next/head';
import { ArrowLeftIcon } from 'lucide-react';
import SuccessPopUp from '@/app/components/successPopUp';
import ErrorPopUp from '@/app/components/errorPopUp';

interface SkckFormState {
  applicant_name: string;
  place_date_birth: string;
  complete_address: string;
  needs: string;
  id_number: string;
  submission_date: string;
  passport_photo: string;
  verification_status: string;
  successMessage: string | null;
  errorMessage: string | null;
  sex: string;
  nationality: string;
  religion: string;
  job: string;
}

const sexOptions = ["Laki-laki", "Perempuan"];

const religionOptions = [
  "Islam",
  "Kristen",
  "Katolik",
  "Hindu",
  "Budha",
  "Konghucu",
];

const countryOptions = [
  "Afganistan",
  "Afrika Selatan",
  "Albania",
  "Aljazair",
  "Amerika Serikat",
  "Andorra",
  "Angola",
  "Arab Saudi",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belanda",
  "Belgia",
  "Bhutan",
  "Brasil",
  "Brunei Darussalam",
  "Bulgaria",
  "Ceko",
  "Chili",
  "China",
  "Denmark",
  "Ekuador",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Filipina",
  "Finlandia",
  "Hongaria",
  "India",
  "Indonesia", // default
  "Inggris",
  "Iran",
  "Irak",
  "Irlandia",
  "Islandia",
  "Israel",
  "Italia",
  "Jamaika",
  "Jepang",
  "Jerman",
  "Kanada",
  "Kamboja",
  "Kazakhstan",
  "Kenya",
  "Kirgistan",
  "Kolombia",
  "Korea Selatan",
  "Korea Utara",
  "Kosta Rika",
  "Kroasia",
  "Kuwait",
  "Laos",
  "Latvia",
  "Lebanon",
  "Libanon",
  "Libya",
  "Lituania",
  "Luksemburg",
  "Madagaskar",
  "Malaysia",
  "Maladewa",
  "Malawi",
  "Mali",
  "Malta",
  "Maroko",
  "Mauritius",
  "Mesir",
  "Meksiko",
  "Monako",
  "Mongolia",
  "Myanmar",
  "Nepal",
  "Nigeria",
  "Norwegia",
  "Oman",
  "Pakistan",
  "Palestina",
  "Panama",
  "Perancis",
  "Peru",
  "Polandia",
  "Portugal",
  "Qatar",
  "Rumania",
  "Rusia",
  "Selandia Baru",
  "Senegal",
  "Serbia",
  "Singapura",
  "Siprus",
  "Slovakia",
  "Slovenia",
  "Spanyol",
  "Sri Lanka",
  "Sudan",
  "Suriah",
  "Swedia",
  "Swiss",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor Leste",
  "Tiongkok",
  "Tunisia",
  "Turki",
  "Turkmenistan",
  "Ukraina",
  "Uni Emirat Arab",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yaman",
  "Yordania",
  "Yunani",
  "Zambia",
  "Zimbabwe",
];

export default function SkckForm() {
  const router = useRouter();
  const userId = getUserId();
  const [token, setToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);

  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<SkckFormState>({
    applicant_name: "",
    place_date_birth: "",
    complete_address: "",
    needs: "",
    id_number: "",
    submission_date: "",
    verification_status: "pending",
    passport_photo: "",
    successMessage: null,
    errorMessage: null,
    sex: "",
    nationality: "Indonesia",
    religion: "",
    job: "",
  });


  useEffect(() => {
    if (typeof window !== 'undefined') {

      const storedToken = localStorage.getItem('token') || token;
      const role = localStorage.getItem('role');

      if (role !== 'user') {
        router.replace('/unauthorized');
        return;
      }

      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [router, token]);

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
      !formData.sex ||
      !formData.nationality ||
      !formData.religion ||
      !formData.job ||
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
        sex: formData.sex,
        nationality: formData.nationality,
        religion: formData.religion,
        id_number: formData.id_number,
        submission_date: formData.submission_date,
        verification_status: formData.verification_status,
        job: formData.job,
        passport_photo: formData.passport_photo,
      };
      const apiSkckUrl = `${baseApiUrl}skck`;

      const response = await axios.post(apiSkckUrl, payload);

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setFormData((prev) => ({
          ...prev,
          successMessage: null,
          errorMessage: null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          errorMessage: null,
          successMessage: null,
        }));
      }
    } catch (error: any) {
      setFailed(true);
      console.error("SKCK submission error:", error);
      setFormData((prev) => ({
        ...prev,
        errorMessage: null,
        successMessage: null,
      }));
    }
  };

  return (
    <div>
      {/* alert */}
      <SuccessPopUp open={submitted} close={() => setSubmitted(false)} label="Formulir Anda telah terkirim. Silahkan kembali ke menu utama"/>
      <ErrorPopUp open={failed} close={() => setFailed(false)} label='Error: Terdeteksi duplikat Nomor Induk Kependudukan (NIK). 1 NIK hanya boleh melakukan permintaan SKCK 1 kali' />
      {/* SEO */}
      <Head>
        <title>Pengajuan SKCK</title>
        <meta name="description" content="Ajukan pembuatan SKCK secara online dengan mudah dan cepat." />
        <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
        <meta name="author" content="Polsek Bendo" />
        <link rel="canonical" href="https://polsek-bendo.my.id/layanan/skck" />
      </Head>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Formulir Pengajuan SKCK Online - WNI</h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-3 py-2 bg-sky-600 hover:bg-sky-500 text-sky-50 rounded-xl transition"
          >
            <ArrowLeftIcon className="w-4 h-auto" />
            <span className="text-sm hidden sm:block">Kembali</span>
          </button>
        </div>
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

          {/* Sex */}
          <div>
            <label className="block mb-2">Jenis Kelamin</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="">-- Pilih Jenis Kelamin --</option>
              {sexOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Nationality */}
          <div>
            <label className="block mb-2">Kewarganegaraan</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              {countryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Religion */}
          <div>
            <label className="block mb-2">Agama</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="">-- Pilih Agama --</option>
              {religionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
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

          {/* Pekerjaan */}
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
            {formData.passport_photo && !imageLoading && (
              <div className="mt-3">
                <img
                  src={formData.passport_photo}
                  alt="Uploaded Pas Foto"
                  className="mt-2 w-40 h-auto rounded border"
                />
              </div>
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
    </div>
  );
}