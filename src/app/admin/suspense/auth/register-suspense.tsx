"use client";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_NAME } from '../../../constants/apiConstants';

interface RegisterFormState {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    role: string;
    profile_picture: string; 
    successMessage: string | null;
    errorMessage: string | null;
}

export default function Registration() {
    const router = useRouter();

    const [formData, setFormData] = useState<RegisterFormState>({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        role: "admin", 
        profile_picture: "", 
        successMessage: null,
        errorMessage: null,
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(false); 
    const [imageError, setImageError] = useState<string>(""); 

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            errorMessage: null, 
        }));
    };

    
    const handleFilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setImageError("");
        setFormData((prev) => ({ ...prev, profile_picture: "" })); 

        const file = e.target.files ? e.target.files[0] : null;

        if (!file) {
            setImageError("No file selected.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setImageLoading(true); 

        console.log('Value of selectedFile (from event) before FormData:', file);

        try {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('image', file); 

            console.log('Contents of FormData for Cloudinary:');
            for (const pair of cloudinaryFormData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

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
            setFormData((prev) => ({ ...prev, profile_picture: resData.url }));
            console.log("Upload successful:", resData);

        } catch (err: any) {
            console.error("Full image upload error object:", err);
            console.error("Image upload error response data:", err?.response?.data);
            setImageError(err?.response?.data?.error || "Failed to upload image. Please try again.");
            setSelectedFile(null); 
        } finally {
            setImageLoading(false); 
        }
    };

    const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormData((prev) => ({ ...prev, successMessage: null, errorMessage: null }));

        if (formData.password !== formData.confirmPassword) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Passwords do not match",
            }));
            return;
        }

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

        if (!formData.profile_picture) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please upload a profile picture.",
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
                profile_picture: formData.profile_picture
            };

            const response = await axios.post('https://striking-vision-production-4ee1.up.railway.app/auth/signup', payload);

            if (response.status === 200 ) {
                localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                router.push("/admin/login");
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
        <div>
            <div>
                <div className="flex h-screen bg-yellow-700">
                    <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
                        <header>
                            <img className="w-20 mx-auto mb-5" src="/images/Polri_Logo.png" alt="Polri Logo" />
                        </header>
                        <form onSubmit={handleSubmitClick}>
                            <div>
                                <label className="block mb-2 text-yellow-700" htmlFor="username">username</label>
                                <input
                                    className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="text"
                                    name="username"
                                    placeholder="Enter Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-700" htmlFor="email">email</label>
                                <input
                                    className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="email" 
                                    name="email"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-700" htmlFor="password">Password</label>
                                <input
                                    className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-700" htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="password"
                                    name="confirmPassword" 
                                    placeholder="Enter Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-yellow-700" htmlFor="profile_picture">Your Profile Picture</label>
                                <input
                                    className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFilePictureChange} 
                                    disabled={imageLoading} 
                                />
                                {imageLoading && <p className="text-blue-600">Uploading image...</p>}
                                {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                                {formData.profile_picture && (
                                    <div className="text-green-600 mb-4">
                                        <p>Image uploaded successfully!</p>
                                    </div>
                                )}
                                {selectedFile && !imageLoading && !formData.profile_picture && !imageError && (
                                    <p className="text-gray-600">Ready to upload: {selectedFile.name}</p>
                                )}
                            </div>

                            {formData.errorMessage && <p style={{ color: 'red' }} className="mb-4">{formData.errorMessage}</p>}
                            {formData.successMessage && <p style={{ color: 'green' }} className="mb-4">{formData.successMessage}</p>}
                           
                            <div>
                                <input
                                    className="w-full bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 mb-6 rounded-md"
                                    type="submit"
                                    value={imageLoading ? "Uploading Image..." : "Register"} 
                                    disabled={imageLoading} 
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
    );
}