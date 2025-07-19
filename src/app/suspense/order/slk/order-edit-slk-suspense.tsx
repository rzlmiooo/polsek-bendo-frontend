"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

interface EditedSlk {
    reporter_name: string;
    contact_reporter: string;
    item_type: string;
    date_lost: string;
    chronology: string;
    successMessage: string | null;
    errorMessage: string | null;
}

export default function EditSlk() {
    const searchParams = useSearchParams();
    const slkId = searchParams.get('slk_id');
    const reporterName = searchParams.get('reporter_name');
    const router = useRouter();
    const [slkData, setSlkData] = useState<EditedSlk | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const redirectToSuccessMessage = () => {
        router.push(`/admin/articles/success-message`);
    };

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const [formData, setFormData] = useState<EditedSlk>({
        reporter_name: `${reporterName}`,
        contact_reporter: "",
        item_type: "",
        date_lost: "",
        chronology: "",
        successMessage: null,
        errorMessage: null,
    });

    useEffect(() => {
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }
        if (!slkId) {
            setError("Slk ID not found in URL.");
            setLoading(false);
            return;
        }

        const fetchSkckDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://striking-vision-production-4ee1.up.railway.app/api/slk/${slkId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const slkRes = response.data || [];;

                setSlkData(slkRes);

                setFormData({
                    reporter_name: formData.reporter_name,
                    contact_reporter: formData.contact_reporter,
                    item_type: formData.item_type,
                    date_lost: formData.date_lost,
                    chronology: formData.chronology,
                    successMessage: null,
                    errorMessage: null,
                });
            } catch (err) {
                console.error(`Error fetching article ${slkId}:`, err);
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
    }, [slkId, token]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [imageError, setImageError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormError(null);
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

            const response = await axios.post(
                'https://striking-vision-production-4ee1.up.railway.app/api/upload',
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


        if (!formData.reporter_name || !formData.chronology || !formData.contact_reporter) {
            setFormData((prev: any) => ({
                ...prev,
                errorMessage: "Tolong isi form yang belum.",
            }));
            return;
        }

        try {
            const payload = {
                reporter_name: formData.reporter_name,
                contact_reporter: formData.contact_reporter,
                item_type: formData.item_type,
                date_lost: formData.date_lost,
                chronology: formData.chronology,
            };

            const response = await axios.put(`https://striking-vision-production-4ee1.up.railway.app/api/slk/${slkId}`, payload);

            if (response.status === 200 || response.status === 201) {
                response.data?.message || "Slk post created successfully"
                router.push("/admin/skck/success-message");
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
                    <h1 className="text-3xl font-bold mb-6">Loading Surat Laporan Kehilangan Details...</h1>
                    <p>Please wait while we fetch the Surat Laporan Kehilangan information.</p>
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

    return (
        <div>
            <div className="bg-white text-black min-h-screen p-8">
                {loading && <p>Loading SKCK details...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {slkData && (
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">Edit a Skck</h1>
                        <form onSubmit={handleSubmitClick} className="space-y-5">
                            {/* Nama Lengkap */}
                            <div>
                                <label htmlFor="reporter_name" className="block font-medium">Nama Lengkap</label>
                                <input
                                    type="text"
                                    id="reporter_name"
                                    name="reporter_name"
                                    value={formData.reporter_name}
                                    onChange={handleChange}
                                    className="w-full mt-1 border p-2 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contact_reporter" className="block font-medium">Nomor Telepon</label>
                                <input
                                    type="text"
                                    id="contact_reporter"
                                    name="contact_reporter"
                                    value={formData.contact_reporter}
                                    onChange={handleChange}
                                    className="w-full mt-1 border p-2 rounded"
                                    required
                                />
                            </div>

                            {/* Nomor KTP */}
                            <div>
                                <label htmlFor="item_type" className="block font-medium">Item Type</label>
                                <input
                                    type="text"
                                    id="item_type"
                                    name="item_type"
                                    value={formData.item_type}
                                    onChange={handleChange}
                                    className="w-full mt-1 border p-2 rounded"
                                    pattern="[0-9]{16}"
                                    title="Nomor KTP harus 16 digit angka"
                                    required
                                />
                            </div>

                            {/* submission_date */}
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

                            {/* Kebutuhan */}
                            <div>
                                <label htmlFor="chronology" className="block font-medium">Kronologi</label>
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
                                    disabled={imageLoading}
                                >
                                    Ubah Datamu
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}