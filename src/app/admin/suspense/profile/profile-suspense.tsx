"use client";

import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import getUserId from '@/app/utils/auth/page';
import { useRouter } from "next/navigation";
import { LucideXCircle, ArrowLeft } from 'lucide-react';
import BackLink from '@/app/components/BackLink';



interface User {
    username: string;
    email: string;
    profile_picture: string;
    created_at: string;
    updated_at: string;
}

export default function AdminProfile() {
    const officerId = getUserId();
    const router = useRouter();

    const [formData, setFormData] = useState<User>({
        username: "",
        email: "",
        profile_picture: "",
        created_at: "",
        updated_at: "",
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isDevMode, setIsDevMode] = useState<boolean>(false);
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            const role = localStorage.getItem('role');

            if (!storedToken || role !== 'admin') {
                router.replace('/unauthorized');
                return;
            }
            setToken(storedToken);
        }
    }, [router]);

    useEffect(() => {
        if (!officerId || !token) {
            if (!officerId) {
                setErrorMessage("User ID not found.");
                setLoading(false);
            }
            return;
        }

        const fetchOfficersDetail = async () => {
            setLoading(true);
            setErrorMessage(null);
            setSuccessMessage(null);
            try {
                const apiOfficersUrl = `${baseUrl}users/${officerId}`;
                const response = await axios.get(apiOfficersUrl);

                const officersData = response.data[0];

                setFormData(officersData);
            } catch (err) {
                console.error(`Error fetching Officers ${officerId}:`, err);
                if (axios.isAxiosError(err)) {
                    setErrorMessage(err.response?.data?.message || "Failed to fetch user. User not found or server error.");
                } else {
                    setErrorMessage('An unexpected error occurred while fetching user data.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOfficersDetail();
    }, [officerId, token, baseUrl]);

    const toggleDevMode = () => {
        setIsDevMode(!isDevMode);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage(null);
        const file = e.target.files?.[0] || null;

        if (!file) {
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
            return;
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage("File size exceeds 5MB limit.");
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrorMessage("Only JPG, PNG, and GIF images are allowed.");
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
            return;
        }

        setImageLoading(true);
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append('image', file);

        try {
            const apiCloudinaryUrl = `${baseUrl}upload`;
            const response = await axios.post(apiCloudinaryUrl, cloudinaryFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const resData = response.data;
            setFormData((prev) => ({ ...prev, url_gambar_unggulan: resData.url }));
        } catch (err) {
            console.error("Image upload error:", err);
            setErrorMessage("Failed to upload image. Please try again.");
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
        } finally {
            setImageLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        if (!formData.username || !formData.email || !formData.profile_picture) {
            setErrorMessage("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                username: formData.username,
                email: formData.email,
                profile_picture: formData.profile_picture,
                updated_at: formData.updated_at
            };

            console.log("Isi payload:", payload)

            const apiUserUrl = `${baseUrl}users/${officerId}`;
            const response = await axios.patch(apiUserUrl, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 204) {
                setSuccessMessage("User data updated successfully!");
                setIsDevMode(false);
                setFormData(prev => ({ ...prev, updated_at: new Date().toISOString() }));
            } else {
                setErrorMessage(response.data?.message || "Unexpected server response.");
            }
        } catch (error) {
            console.error("Update error:", error);
            if (axios.isAxiosError(error)) {
                setErrorMessage("Server error: " + (error.response?.data?.message || error.message));
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-gray-500 dark:text-gray-400">Authenticating...</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-gray-500 dark:text-gray-400">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter">
            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <a
                        href='/admin'
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 dark:text-gray-400 dark:hover:text-white"
                        aria-label="Go Back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </a>
                    <section className="w-full overflow-hidden dark:bg-gray-900 ">
                        <div className="flex flex-col">
                            <img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxlYXJ0aHxlbnwwfDB8fHwxNzQ2NTM0MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="User Cover"
                                className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem] object-cover rounded-t-lg" />

                            <div className="sm:w-[80%] w-[90%] mx-auto flex flex-col sm:flex-row items-center relative lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem]">
                                <img src={formData.profile_picture || "https://placehold.co/200x200?text=Profile"}
                                    alt="User Profile"
                                    className="rounded-full lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem] outline-2 outline-offset-2 outline-blue-500 object-cover" />

                                {/* Username */}
                                <h1 className="w-full text-center sm:text-left sm:my-4 sm:mx-4 pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl text-xl font-serif mt-4">
                                    {formData.username}
                                </h1>
                            </div>

                            <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">
                                {(errorMessage || successMessage) && (
                                    <div className={`w-full p-4 text-sm rounded-lg flex items-center justify-between transition-opacity duration-300 ${errorMessage ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} role="alert">
                                        <span>{errorMessage || successMessage}</span>
                                        <button onClick={() => { setErrorMessage(null); setSuccessMessage(null); }} className="p-1">
                                            <LucideXCircle size={20} />
                                        </button>
                                    </div>
                                )}

                                {/* Dev Mode Toggle Button */}
                                <button
                                    onClick={toggleDevMode}
                                    className={`px-4 py-2 text-sm rounded-lg font-semibold transition-colors duration-200 ease-in-out ${isDevMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                >
                                    {isDevMode ? "Exit " : "Edit"}
                                </button>

                                <form onSubmit={handleSubmit} className="w-full">
                                    <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                                        <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">
                                            <div className="w-full">
                                                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                                    {/* Username */}
                                                    <div className="flex flex-col pb-3">
                                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Username</dt>
                                                        {isDevMode ? (
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                value={formData.username}
                                                                onChange={handleChange}
                                                                className="text-lg font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                required
                                                            />
                                                        ) : (
                                                            <dd className="text-lg font-semibold">{formData.username}</dd>
                                                        )}
                                                    </div>
                                                    {/* Email */}
                                                    <div className="flex flex-col py-3">
                                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                                        {isDevMode ? (
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                className="text-lg font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                required
                                                            />
                                                        ) : (
                                                            <dd className="text-lg font-semibold">{formData.email}</dd>
                                                        )}
                                                    </div>
                                                </dl>
                                            </div>
                                            <div className="w-full">
                                                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                                    {isDevMode && (
                                                        <div className="flex flex-col pb-3">
                                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Profile Picture</dt>
                                                            <input
                                                                type="file"
                                                                onChange={handleFilePictureChange}
                                                                className="text-lg font-semibold text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                disabled={imageLoading}
                                                            />
                                                            {imageLoading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col pt-3">
                                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Created At</dt>
                                                        <dd className="text-lg font-semibold">{new Date(formData.created_at).toLocaleDateString()}</dd>
                                                    </div>
                                                    <div className="flex flex-col pt-3">
                                                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Updated At</dt>
                                                        <dd className="text-lg font-semibold">{new Date(formData.updated_at).toLocaleDateString()}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                        {isDevMode && (
                                            <div className="flex justify-center mt-6">
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div >
        </div>
    )
}
