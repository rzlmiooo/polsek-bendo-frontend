"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import SuccessMessage from "../../../components/successMessageAdmin";

interface EditedSkck {
    applicant_name: string;
    place_date_birth: string;
    complete_address: string;
    needs: string;
    id_number: string;
    submission_date: string;
    officer_notes: string;
    passport_photo: string;
    verification_status: string;
}

export default function EditSkck() {
    const searchParams = useSearchParams();
    const skckId = searchParams.get('skck_id');
    const applicantName = searchParams.get('applicant_name');
    const router = useRouter();
    const [skckData, setSkckData] = useState<EditedSkck | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const [formData, setFormData] = useState<EditedSkck>({
        applicant_name: `${applicantName}`,
        place_date_birth: "",
        complete_address: "",
        needs: "",
        id_number: "",
        verification_status: "s",
        officer_notes: "",
        passport_photo: "",
        submission_date: new Date().toISOString(),
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }
        if (!skckId) {
            setError("Skck ID not found in URL.");
            setLoading(false);
            return;
        }

        const fetchSkckDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiSkckUrl = `${baseUrl}skck/${skckId}`;

                const response = await axios.get(apiSkckUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const skckRes = response.data || [];;

                setSkckData(skckRes);

                setFormData({
                    applicant_name: skckRes.applicant_name,
                    place_date_birth: skckRes.place_date_birth,
                    complete_address: skckRes.complete_address,
                    needs: skckRes.needs,
                    id_number: skckRes.id_number,
                    submission_date: skckRes.submission_date,
                    officer_notes: skckRes.officer_notes,
                    passport_photo: skckRes.passport_photo,
                    verification_status: skckRes.verification_status,
                });
            } catch (err) {
                console.error(`Error fetching article ${skckId}:`, err);
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || `Failed to fetch skck. Skck not found or server error.`);
                } else {
                    setError('An unexpected error occurred while fetching the article.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSkckDetail();
    }, [skckId, token]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [imageError, setImageError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);


    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [successDetails, setSuccessDetails] = useState<{
        title: string;
        description: string;
        farewell: string;
        backLinkHref: string;
        backLinkText: string;
    } | null>(null);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrorMessage(null);
    };

    const handleFilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setImageError(null);

        const file = e.target.files ? e.target.files[0] : null;

        if (!file) {
            setImageError("No file selected.");
            setSelectedFile(null);
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
            return;
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        if (file.size > MAX_FILE_SIZE) {
            setImageError("File size exceeds 5MB limit.");
            setSelectedFile(null);
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setImageError("Only JPG, PNG, and GIF images are allowed.");
            setSelectedFile(null);
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
            return;
        }

        setSelectedFile(file);
        setImageLoading(true);


        try {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('image', file);

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

            setFormData((prev) => ({ ...prev, passport_photo: resData.url }));

        } catch (err: any) {
            console.error("Full image upload error object:", err);
            console.error("Image upload error response data:", err?.response?.data);
            setImageError(err?.response?.data?.error || "Failed to upload image. Please try again.");
            setSelectedFile(null);
            setFormData(prev => ({ ...prev, passport_photo: "" }));
        } finally {
            setImageLoading(false);
        }
    };
    const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setShowSuccessMessage(false);
        setIsLoading(true);

        setFormData((prev: any) => ({ ...prev, successMessage: null, errorMessage: null }));


        if (imageLoading) {
            setFormData((prev: any) => ({
                ...prev,
                errorMessage: "Please wait for the image to finish uploading.",
            }));
            return;
        }

        if (imageError) {
            setFormData((prev: any) => ({
                ...prev,
                errorMessage: `Image upload failed: ${imageError}. Please fix or re-upload.`,
            }));
            return;
        }

        if (!formData.passport_photo) {
            setFormData((prev: any) => ({
                ...prev,
                errorMessage: "Tolong unggah foto.",
            }));
            return;
        }

        if (!formData.applicant_name || !formData.complete_address || !formData.id_number) {
            setFormData((prev: any) => ({
                ...prev,
                errorMessage: "Tolong isi form yang belum.",
            }));
            return;
        }

        try {
            const payload = {
                applicant_name: formData.applicant_name,
                place_date_birth: formData.place_date_birth,
                complete_address: formData.complete_address,
                needs: formData.needs,
                id_number: formData.id_number,
                submission_date: formData.submission_date,
                officer_notes: formData.officer_notes,
                passport_photo: formData.passport_photo,
                verification_status: formData.verification_status
            };
            const apiSkckUrl = `${baseUrl}skck/${skckId}`;

            const response = await axios.patch(apiSkckUrl, payload);

            if (response.status === 200 || response.status === 201) {
                console.log("API response SUCCESS (200 or 201):", response.data);
                setShowSuccessMessage(true);
                console.log("showSuccessMessage set to true.");

                setSuccessDetails({
                    title: response.data?.message || "Artikel berhasil dipublikasikan!",
                    description: "Terima kasih telah membuat Informasi yang berguna.",
                    farewell: "Semoga harimu Menyenangkan!",
                    backLinkHref: "/order/skck",
                    backLinkText: "KEMBALI"
                });
                setFormData({
                    applicant_name: `${applicantName}`,
                    place_date_birth: "",
                    complete_address: "",
                    needs: "",
                    id_number: "",
                    verification_status: "s",
                    officer_notes: "",
                    passport_photo: "",
                    submission_date: new Date().toISOString(),
                });
            } else {
                response.data?.message || "Unexpected server response during registration.";
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            setFormData((prev: any) => ({
                ...prev,
                errorMessage: "Server error: " + (error.response?.data?.message || error.message),
                successMessage: null,
            }));
        }
    }

    if (loading) {
        return (
            <div className="bg-white text-black min-h-screen p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Loading SKCK Details...</h1>
                    <p>Please wait while we fetch the SKCK information.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white text-black min-h-screen p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Error</h1>
                    <p className="text-red-600">{error}</p>
                    <button onClick={() => router.back()} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (showSuccessMessage && successDetails) {
        console.log("Rendering SuccessMessage component.");
        return <SuccessMessage {...successDetails} />;
    }

    return (
        <div>
            <div className="bg-white text-black min-h-screen p-8">
                {loading && <p>Loading SKCK details...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {skckData && (
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">Edit a Skck</h1>
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
                                    pattern="[0-9]{16}"
                                    title="Nomor KTP harus 16 digit angka"
                                    required
                                />
                            </div>

                            {/* submission_date */}
                            <div>
                                <label htmlFor="submission_date" className="block font-medium">Tanggal Pengajuan formData</label>
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
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-[#00BFFF] text-white px-6 py-3 rounded-xl font-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Edited...' : 'Edit Skck Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}