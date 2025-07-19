"use client";

import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import getStudentId from "../../../utils/auth/page";
import SuccessMessage from "../../../components/successMessageAdmin";

interface CreateArticleFormState {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author_id: string;
    category_id: string;
    published_at: string;
    status: 'draft' | 'published';
    url_gambar_unggulan: string;
    created_at: string;
    updated_at: string;
}

export default function CreateArticle() {
    const router = useRouter();
    const studentId = getStudentId();
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState<CreateArticleFormState>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author_id: studentId || "",
        category_id: "",
        published_at: new Date().toISOString(),
        status: "draft",
        url_gambar_unggulan: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [imageError, setImageError] = useState<string | null>(null);

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
            setFormData((prev) => ({ ...prev, url_gambar_unggulan: resData.url }));

        } catch (err: any) {
            console.error("Full image upload error object:", err);
            console.error("Image upload error response data:", err?.response?.data);
            setImageError(err?.response?.data?.error || "Failed to upload image. Please try again.");
            setSelectedFile(null);
            setFormData(prev => ({ ...prev, url_gambar_unggulan: "" }));
        } finally {
            setImageLoading(false);
        }
    };

    const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setShowSuccessMessage(false);
        setIsLoading(true);

        if (imageLoading) {
            setErrorMessage("Please wait for the image to finish uploading.");
            setIsLoading(false);
            return;
        }

        if (imageError) {
            setErrorMessage(`Image upload failed: ${imageError}. Please fix or re-upload.`);
            setIsLoading(false);
            return;
        }

        if (!formData.url_gambar_unggulan) {
            setErrorMessage("Please upload a featured image.");
            setIsLoading(false);
            return;
        }

        if (!formData.title || !formData.content || !formData.category_id) {
            setErrorMessage("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        try {
            const payload = {
                title: formData.title,
                slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                excerpt: formData.excerpt,
                content: formData.content,
                author_id: formData.author_id,
                category_id: formData.category_id,
                published_at: formData.published_at,
                status: formData.status,
                url_gambar_unggulan: formData.url_gambar_unggulan,
                created_at: formData.created_at,
                updated_at: formData.updated_at
            };

            const apiArticleUrl = `${baseUrl}news`;

            const response = await axios.post(apiArticleUrl, payload);

            if (response.status === 200 || response.status === 201) {
                console.log("API response SUCCESS (200 or 201):", response.data);
                setShowSuccessMessage(true);
                console.log("showSuccessMessage set to true.");

                setSuccessDetails({
                    title: response.data?.message || "Artikel berhasil dipublikasikan!",
                    description: "Terima kasih telah membuat Informasi yang berguna.",
                    farewell: "Semoga harimu Menyenangkan!",
                    backLinkHref: "/admin/articles/",
                    backLinkText: "KEMBALI"
                });
                console.log("successDetails set to:", successDetails);
                setFormData({
                    title: "", slug: "", excerpt: "", content: "",
                    author_id: studentId || "", category_id: "", published_at: new Date().toISOString(),
                    status: "draft", url_gambar_unggulan: "", created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                });

            } else {
                const serverMessage = response.data?.message || `Server returned status ${response.status}.`;
                setErrorMessage(`Respon server tidak terduga: ${serverMessage}`);
                console.log("API response NOT SUCCESS:", response.status, response.data);
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            setErrorMessage("Terjadi kesalahan: " + (error.response?.data?.message || error.message || "Gagal membuat artikel."));
        } finally {
            setIsLoading(false);
        }
    };

    console.log("Current showSuccessMessage:", showSuccessMessage, "Current successDetails:", successDetails);
    if (showSuccessMessage && successDetails) {
        console.log("Rendering SuccessMessage component.");
        return <SuccessMessage {...successDetails} />;
    }

    return (
        <div className="bg-white text-black min-h-screen p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
                <form className="space-y-6" onSubmit={handleSubmitClick}>
                    {errorMessage && (
                        <p style={{ color: 'red' }} className="mb-4">
                            {errorMessage}
                        </p>
                    )}

                    <div>
                        <label className="block font-semibold mb-2">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded-xl"
                            placeholder="Enter blog title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Slug</label>
                        <input
                            id="slug"
                            name="slug"
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded-xl"
                            placeholder="Masukkan Judul Link"
                            value={formData.slug}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.url_gambar_unggulan && (
                        <div>
                            <label className="block font-semibold mb-2">Featured Image Preview</label>
                            <img
                                src={formData.url_gambar_unggulan}
                                alt="Featured Image Preview"
                                className="max-w-full h-auto rounded-md border border-gray-200"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block font-semibold mb-2">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            className="w-full border border-gray-300 p-3 rounded-xl h-60"
                            placeholder="Write your story..."
                            value={formData.content}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block mb-2 text-yellow-700" htmlFor="profile_picture">Your Profile Picture</label>
                        <input
                            className="w-full p-2 mb-6 text-yellow-700 border-b-2 border-yellow-500 outline-none focus:bg-gray-300 rounded-md"
                            type="file"
                            accept="image/*"
                            onChange={handleFilePictureChange}
                            disabled={imageLoading}
                            required
                        />
                        {imageLoading && <p className="text-blue-600">Uploading image...</p>}
                        {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                        {formData.url_gambar_unggulan && !imageLoading && !imageError && (
                            <div className="text-green-600 mb-4">
                                <p>Image uploaded successfully!</p>
                            </div>
                        )}
                        {selectedFile && !imageLoading && !formData.url_gambar_unggulan && !imageError && (
                            <p className="text-gray-600">Ready to upload: {selectedFile.name}</p>
                        )}
                    </div>

                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Pilih Kategori
                    </label>
                    <select
                        id="category"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="1">Artikel</option>
                        <option value="2">Cerpen</option>
                        <option value="3">Liputan</option>
                    </select>
                    <div>
                        <label className="block font-semibold mb-2">Sumber (Excerpt)</label>
                        <input
                            id="excerpt"
                            name="excerpt"
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded-xl"
                            placeholder="Masukkan Sumber (e.g., nama majalah, situs web)"
                            value={formData.excerpt}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#00BFFF] text-white px-6 py-3 rounded-xl font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Blog Post'}
                    </button>

                </form>
            </div>
        </div>
    );
}