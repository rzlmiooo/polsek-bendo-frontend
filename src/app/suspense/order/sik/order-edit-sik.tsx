"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

interface EditedSik {
    organizer_name: string;
    event_name: string;
    event_description: string;
    event_start: string;
    event_end: string;
    location: string;
    guest_estimate: string;
    levy_fees: string;
    status_handling: string;
    form_creation: string;
    successMessage: string | null;
    errorMessage: string | null;
}

export default function OrderEditSik() {
    const searchParams = useSearchParams();
    const sikId = searchParams.get('sik_id');
    const applicantName = searchParams.get('applicant_name');
    const router = useRouter();
    const [sikData, setSikData] = useState<EditedSik | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const redirectToSuccessMessage = () => {
        router.push(`/admin/articles/success-message`);
    };

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const [formData, setFormData] = useState<EditedSik>({
        organizer_name: "",
        event_name: "",
        event_description: "",
        event_start: "",
        event_end: "",
        location: "s",
        guest_estimate: "",
        levy_fees: "",
        status_handling: "",
        form_creation: "",
        successMessage: null,
        errorMessage: null,
    });

    useEffect(() => {
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }
        if (!sikId) {
            setError("Skck ID not found in URL.");
            setLoading(false);
            return;
        }

        const fetchSkckDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://striking-vision-production-4ee1.up.railway.app/api/skck/${sikId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const sikRes = response.data || [];;

                setSikData(sikRes);

                setFormData({
                    organizer_name: sikRes.organizer_name,
                    event_name: sikRes.event_name,
                    event_description: sikRes.event_description,
                    event_start: sikRes.event_start,
                    event_end: sikRes.event_end,
                    location: sikRes.location,
                    guest_estimate: sikRes.guest_estimate,
                    levy_fees: sikRes.levy_fees,
                    status_handling: sikRes.status_handling,
                    form_creation: sikRes.form_creation,
                    successMessage: null,
                    errorMessage: null,
                });
            } catch (err) {
                console.error(`Error fetching article ${sikId}:`, err);
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
    }, [sikId, token]);

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

        if (!formData.organizer_name || !formData.event_name || !formData.event_end) {
            setFormData((prev: any) => ({
                ...prev,
                errorMessage: "Tolong isi form yang belum.",
            }));
            return;
        }

        try {
            const payload = {
                organizer_name: formData.organizer_name,
                event_name: formData.event_name,
                event_description: formData.event_description,
                event_start: formData.event_start,
                event_end: formData.event_end,
                location: formData.location,
                guest_estimate: formData.guest_estimate,
                levy_fees: formData.levy_fees,
                status_handling: formData.status_handling,
                form_creation: formData.form_creation
            };

            const response = await axios.put(`https://striking-vision-production-4ee1.up.railway.app/api/sik/${sikId}`, payload);

            if (response.status === 200 || response.status === 201) {
                response.data?.message || "Skck post created successfully"
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

    return (
        <div>
            <div className="bg-white text-black min-h-screen p-8">
                {loading && <p>Loading SKCK details...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {sikData && (
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">Edit a Skck</h1>
                        <form onSubmit={handleSubmitClick} className="space-y-5">
                            {/* Nama Lengkap */}
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