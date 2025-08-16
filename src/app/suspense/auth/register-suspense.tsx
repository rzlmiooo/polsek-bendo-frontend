"use client";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import Head from "next/head";

interface RegisterFormState {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    role: string;
    profile_picture: string; 
    ktp: string
    successMessage: string | null;
    errorMessage: string | null;
}

export default function Registration() {
    const router = useRouter();

    const baseAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState<RegisterFormState>({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        role: "user", 
        profile_picture: "", 
        ktp: "",
        successMessage: null,
        errorMessage: null,
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(false); 
    const [imageError, setImageError] = useState<string>(""); 

    const [loading, setLoading] = useState({
        profile_picture: false,
        ktp: false
    });
    
    const [error, setError] = useState({
        profile_picture: "",
        ktp: ""
    });

    const [preview, setPreview] = useState({
        profile_picture: "",
        ktp: ""
    });
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            errorMessage: null, 
        }));
    };
    
    const handleFilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setError((prev) => ({ ...prev, profile_picture: "" }));
        setFormData((prev) => ({ ...prev, profile_picture: "" }));
    
        const file = e.target.files?.[0];
        if (!file) {
            setError((prev) => ({ ...prev, profile_picture: "No file selected." }));
            return;
        }
    
        // bikin preview dari file lokal
        setPreview((prev) => ({ ...prev, profile_picture: URL.createObjectURL(file) }));
    
        setLoading((prev) => ({ ...prev, profile_picture: true }));
    
        try {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("image", file);
    
            const apiUrl = `${baseApiUrl}upload`;
            const response = await axios.post(apiUrl, cloudinaryFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            setFormData((prev) => ({ ...prev, profile_picture: response.data.url }));
        } catch (err: any) {
            setError((prev) => ({
                ...prev,
                profile_picture: err?.response?.data?.error || "Failed to upload image."
            }));
        } finally {
            setLoading((prev) => ({ ...prev, profile_picture: false }));
        }
    };
    
    
    const handleFileKtpChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setError((prev) => ({ ...prev, ktp: "" }));
        setFormData((prev) => ({ ...prev, ktp: "" }));
    
        const file = e.target.files?.[0];
        if (!file) {
            setError((prev) => ({ ...prev, ktp: "No file selected." }));
            return;
        }
    
        // bikin preview dari file lokal
        setPreview((prev) => ({ ...prev, ktp: URL.createObjectURL(file) }));
    
        setLoading((prev) => ({ ...prev, ktp: true }));
    
        try {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("image", file);
    
            const apiUrl = `${baseApiUrl}upload`;
            const response = await axios.post(apiUrl, cloudinaryFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            setFormData((prev) => ({ ...prev, ktp: response.data.url }));
        } catch (err: any) {
            setError((prev) => ({
                ...prev,
                ktp: err?.response?.data?.error || "Failed to upload image."
            }));
        } finally {
            setLoading((prev) => ({ ...prev, ktp: false }));
        }
    };
    
    

    const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormData((prev) => ({ ...prev, successMessage: null, errorMessage: null }));

        if (formData.password !== formData.confirmPassword) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Password tidak cocok.",
            }));
            return;
        }

        if (imageLoading) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Sedang mengunggah gambar...",
            }));
            return;
        }

        if (imageError) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: `Upload gambar gagal: ${imageError}. Tolong upload lagi.`,
            }));
            return;
        }

        if (!formData.profile_picture) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please upload a profile picture.",
            }));
            return;
        }

        if (!formData.ktp) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please upload your identity card.",
            }));
            return;
        }

        if (!formData.email || !formData.password || !formData.username || !formData.role) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please fill in all required fields.",
            }));
            return;
        }

        try {
            const payload = {
                email: formData.email,
                password: formData.password,
                username: formData.username,
                role: formData.role,
                profile_picture: formData.profile_picture,
                ktp: formData.ktp
            };

            const authUrl = `${baseAuthUrl}signup`;

            const response = await axios.post(authUrl, payload);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                router.push("/login");
            } else {
                 response.data?.message || "Unexpected server response during registration.";
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Server error: " + (error.response?.data?.message || error.message),
                successMessage: null,
            }));
        }
    };

    return (
        <>
        {/* SEO */}
            <Head>
                <title>Register</title>
                <meta name="description" content="Daftar untuk menggunakan layanan digital dari Polsek Bendo." />
                <meta name="keywords" content="Polsek Bendo, SKCK Online, Kepolisian Bendo, Pelayanan Kepolisian, Magetan" />
                <meta name="author" content="Polsek Bendo" />
                <link rel="canonical" href="https://polsek-bendo.my.id/register" />
            </Head>
        <div>
            <div>
                <div className="flex h-screen bg-yellow-700 overflow-auto">
                    <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
                        <header>
                            <img className="w-20 mx-auto mb-5" src="/images/Polri_Logo.png" alt="Polri Logo" />
                        </header>
                        <form onSubmit={handleSubmitClick}>
                            <div>
                                <label className="block mb-2 text-yellow-800 text-sm" htmlFor="username">Username</label>
                                <input
                                    className="w-full p-2 mb-4 text-yellow-700 border-b-2 text-sm border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="text"
                                    name="username"
                                    placeholder="Buat Username"
                                    autoComplete="off"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-800 text-sm" htmlFor="email">Email</label>
                                <input
                                    className="w-full p-2 mb-4 text-yellow-700 border-b-2 text-sm border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="email" 
                                    name="email"
                                    placeholder="Masukkan Email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-800 text-sm" htmlFor="password">Password</label>
                                <input
                                    className="w-full p-2 mb-4 text-yellow-700 border-b-2 text-sm border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="password"
                                    name="password"
                                    placeholder="Buat Password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-800 text-sm" htmlFor="confirmPassword">Konfirmasi Password</label>
                                <input
                                    className="w-full p-2 mb-4 text-yellow-700 border-b-2 text-sm border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="password"
                                    name="confirmPassword" 
                                    placeholder="Konfirmasi Password"
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-800 text-sm" htmlFor="profile_picture">Upload Foto Profil</label>
                                <input
                                    className="w-full p-2 mb-4 text-yellow-700 border-b-2 text-sm border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFilePictureChange}
                                    disabled={loading.profile_picture}
                                />
                                {preview.profile_picture && (
                                    <img
                                        src={preview.profile_picture}
                                        alt="Preview Profile"
                                        className="w-24 h-24 object-cover mt-2 rounded-full border"
                                    />
                                )}
                                {loading.profile_picture && <p className="text-blue-600">Uploading profile picture...</p>}
                                {error.profile_picture && <p className="text-red-600">{error.profile_picture}</p>}
                                {formData.profile_picture && (
                                    <div className="text-green-600 mb-4">
                                        <p>Image uploaded successfully!</p>
                                    </div>
                                )}
                                {selectedFile && !loading.profile_picture && !formData.profile_picture && !error.ktp && (
                                    <p className="text-gray-600">Ready to upload: {selectedFile.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-800 text-sm" htmlFor="ktp">Upload Foto KTP</label>
                                <input
                                    className="w-full p-2 mb-4 text-yellow-700 border-b-2 text-sm border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileKtpChange} 
                                    disabled={loading.ktp} 
                                />
                                {preview.ktp && (
                                    <img
                                        src={preview.ktp}
                                        alt="Preview KTP"
                                        className="w-32 h-20 object-cover mt-2 border"
                                    />
                                )}
                                {loading.ktp && <p className="text-blue-600">Uploading image...</p>}
                                {error.ktp && <p style={{ color: 'red' }}>{error.ktp}</p>}
                                {formData.ktp && (
                                    <div className="text-green-600 mb-4">
                                        <p>Image uploaded successfully!</p>
                                    </div>
                                )}
                                {selectedFile && !loading.ktp && !formData.ktp && !error.ktp && (
                                    <p className="text-gray-600">Ready to upload: {selectedFile.name}</p>
                                )}
                            </div>

                            {formData.errorMessage && <p style={{ color: 'red' }} className="mb-4">{formData.errorMessage}</p>}
                            {formData.successMessage && <p style={{ color: 'green' }} className="mb-4">{formData.successMessage}</p>}
                           
                            <div>
                                <input
                                    className="w-full bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 mb-4 rounded-md"
                                    type="submit"
                                    value={loading.ktp && loading.profile_picture ? "Uploading Image..." : "Register"} 
                                    disabled={loading.ktp && loading.profile_picture} 
                                />
                            </div>
                        </form>
                        <footer>
                            <a className="text-yellow-700 hover:text-yellow-500 text-sm float-left" href="/admin/login">Sudah Punya Akun?</a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}