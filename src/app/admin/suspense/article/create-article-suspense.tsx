"use client";

import axios from "axios";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import getStudentId from "../../../utils/auth/page";
import SuccessMessage from "../../../components/successMessageAdmin";
import { ChevronDown, Calendar, Clock, MapPin, Link as LinkIcon, Save, Upload, User, Globe, Bold, Italic, Underline, Strikethrough, Link, Unlink, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, ListOrdered, List, Indent, Outdent, Code, Quote } from "lucide-react";

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

export default function CreateArticlePage() {
    const router = useRouter();
    const studentId = getStudentId();
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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


    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
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


    const handleEditorChange = () => {
        if (editorRef.current) {
            setFormData((prev) => ({
                ...prev,
                content: editorRef.current?.innerHTML || '',
            }));
        }
    };
    const handleEditorImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleEditorImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setImageError(null);
        const file = e.target.files ? e.target.files[0] : null;

        if (!file) {
            setImageError("No file selected.");
            return;
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        if (file.size > MAX_FILE_SIZE) {
            setImageError("File size exceeds 5MB limit.");
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setImageError("Only JPG, PNG, and GIF images are allowed.");
            return;
        }

        setSelectedFile(file);
        setImageLoading(true);

        const simulateImageUpload = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                const imageUrl = `https://placehold.co/600x400/808080/FFFFFF?text=Editor+Image`;
                resolve(imageUrl);
            }, 1500); 
        });

        try {
            const imageUrl = await simulateImageUpload;
            if (editorRef.current) {
                editorRef.current.focus();
                document.execCommand('insertImage', false, imageUrl);
            }
        } catch (err) {
            console.error("Image upload error:", err);
            setImageError("Failed to upload image. Please try again.");
        } finally {
            setImageLoading(false);
        }
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

    const formatDoc = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value || undefined);
        if (editorRef.current) {
            editorRef.current.focus();
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
            const editorContent = editorRef.current?.innerHTML || "";

            const payload = {
                ...formData,
                content: editorContent,
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


    if (showSuccessMessage && successDetails) {
        return <SuccessMessage {...successDetails} />;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <main className="flex-1 transition-all duration-300 pt-16 lg:pt-0 lg:ps-64">
                <div className="bg-white text-black min-h-screen p-8">
                    <form onSubmit={handleSubmitClick}>
                        <div className="">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold">New Post</h1>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition ${formData.status === 'draft' ? 'bg-gray-300 text-gray-800' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                    >
                                        <Save className="h-4 w-4" />
                                        <span>Save Draft</span>
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                        disabled={isLoading || imageLoading}
                                    >
                                        <Upload className="h-4 w-4" />
                                        <span>{isLoading ? "Publishing..." : "Publish"}</span>
                                    </button>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className="relative mb-6">
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 sr-only">Category</label>
                                        <select
                                            id="category"
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option value="1">Acara</option>
                                            <option value="2">Pengumuman</option>
                                            <option value="3">Berita</option>
                                        </select>
                                    </div>

                                    {/* Featured Image */}
                                    <div className="mb-6">
                                        {formData.url_gambar_unggulan ? (
                                            <img
                                                src={formData.url_gambar_unggulan}
                                                alt="Featured"
                                                className="w-full h-auto rounded-lg shadow-md mb-4"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                                <p className="text-gray-500">Pratinjau Gambar</p>
                                            </div>
                                        )}
                                        <label className="block text-gray-700 font-semibold mb-2">Ubah Gambar Unggulan</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFilePictureChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {imageLoading && (
                                            <p className="text-blue-600 mt-2">Uploading image...</p>
                                        )}
                                    </div>

                                    {/* Title and Content Section */}
                                    <div>
                                        <h1 className="text-4xl font-extrabold mb-4">
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Judul"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="w-full font-extrabold p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                            />
                                        </h1>
                                        {/* Rich Text Editor */}
                                        <div className="mt-8">
                                            <div className="flex items-center justify-between border border-gray-300 rounded-t-lg bg-gray-50 p-4">
                                                <div className="flex space-x-3 text-gray-600 flex-wrap rich-text-toolbar-buttons">
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Bold" onClick={() => formatDoc('bold')}>
                                                        <Bold className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Italic" onClick={() => formatDoc('italic')}>
                                                        <Italic className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Underline" onClick={() => formatDoc('underline')}>
                                                        <Underline className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Strikethrough" onClick={() => formatDoc('strikeThrough')}>
                                                        <Strikethrough className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Link" onClick={() => formatDoc('createLink', prompt('Enter URL:'))}>
                                                        <Link className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Unlink" onClick={() => formatDoc('unlink')}>
                                                        <Unlink className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Insert Image" onClick={handleEditorImageClick}>
                                                        <ImageIcon className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Left" onClick={() => formatDoc('justifyLeft')}>
                                                        <AlignLeft className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Center" onClick={() => formatDoc('justifyCenter')}>
                                                        <AlignCenter className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Right" onClick={() => formatDoc('justifyRight')}>
                                                        <AlignRight className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Justify" onClick={() => formatDoc('justifyFull')}>
                                                        <AlignJustify className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Ordered List" onClick={() => formatDoc('insertOrderedList')}>
                                                        <ListOrdered className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Unordered List" onClick={() => formatDoc('insertUnorderedList')}>
                                                        <List className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Indent" onClick={() => formatDoc('indent')}>
                                                        <Indent className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Outdent" onClick={() => formatDoc('outdent')}>
                                                        <Outdent className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Code" onClick={() => formatDoc('formatBlock', 'pre')}>
                                                        <Code className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Quote" onClick={() => formatDoc('formatBlock', 'blockquote')}>
                                                        <Quote className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div id="contentEditor" contentEditable="true" ref={editorRef} onInput={handleEditorChange} className="rich-text-editor bg-white rounded-b-lg focus:ring-blue-500 focus:border-blue-500 p-4 border border-gray-300 min-h-[300px]"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Sidebar - Properties */}
                                <div className="w-full md:w-80">
                                    <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4">
                                        <h2 className="text-lg font-bold">Properties</h2>

                                        {/* Excerpt */}
                                        <div className="flex items-center space-x-2">
                                            <Globe className="h-6 w-6 text-gray-500" />
                                            <input
                                                type="text"
                                                name="excerpt"
                                                placeholder="Ringkasan"
                                                value={formData.excerpt}
                                                onChange={handleChange}
                                                className="w-full p-2 rounded-md border border-gray-300"
                                            />
                                        </div>

                                        {/* Published Date */}
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-6 w-6 text-gray-500" />
                                            <input
                                                type="datetime-local"
                                                name="published_at"
                                                value={formData.published_at}
                                                onChange={handleChange}
                                                className="w-full p-2 rounded-md border border-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
