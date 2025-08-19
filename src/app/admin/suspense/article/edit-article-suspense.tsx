"use client";

import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation";
import getUserId from '@/app/utils/auth/page';
import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { Save, Upload, User, Globe, Bold, Italic, Underline, Strikethrough, Link, Unlink, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, ListOrdered, List, Indent, Outdent, Code, Quote, Calendar, ArrowLeft } from "lucide-react";

interface EditedNewsArticle {
    id: number;
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

export default function EditArticlePage() {
    const searchParams = useSearchParams();
    const articleId = searchParams.get('blog_id');
    const officerId = getUserId();
    const router = useRouter();

    const [formData, setFormData] = useState<EditedNewsArticle>({
        id: 0,
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author_id: officerId,
        category_id: "",
        published_at: "",
        status: "draft",
        url_gambar_unggulan: "",
        created_at: "",
        updated_at: "",
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (!articleId || !token) {
            if (!articleId) {
                setErrorMessage("Article ID not found in URL.");
                setLoading(false);
            }
            return;
        }

        const fetchArticleDetail = async () => {
            setLoading(true);
            setErrorMessage(null);
            try {
                const apiArticleUrl = `${baseUrl}news/${articleId}`;
                const response = await axios.get(apiArticleUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const articleData = response.data[0];
                console.log("Fetched article data:", articleData);

                setFormData(articleData);
            } catch (err) {
                console.error(`Error fetching article ${articleId}:`, err);
                if (axios.isAxiosError(err)) {
                    setErrorMessage(err.response?.data?.message || "Failed to fetch article. Article not found or server error.");
                } else {
                    setErrorMessage('An unexpected error occurred while fetching the article.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchArticleDetail();
    }, [articleId, token, baseUrl]);

    useEffect(() => {
        if (editorRef.current && formData.content) {
            editorRef.current.innerHTML = formData.content;
        }
    }, [formData.content]);


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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

    const handleEditorImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleEditorImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage(null);
        const file = e.target.files?.[0] || null;

        if (!file) {
            setErrorMessage("No file selected.");
            return;
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage("File size exceeds 5MB limit.");
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrorMessage("Only JPG, PNG, and GIF images are allowed.");
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
            const imageUrl = response.data.url;
            if (editorRef.current) {
                editorRef.current.focus();
                document.execCommand('insertImage', false, imageUrl);
            }
        } catch (err) {
            console.error("Editor image upload error:", err);
            setErrorMessage("Failed to upload editor image.");
        } finally {
            setImageLoading(false);
        }
    };

    const handleEditorChange = () => {
        setFormData((prev) => ({
            ...prev,
            content: editorRef.current?.innerHTML ?? "",
        }));
    };

    const formatDoc = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value || undefined);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        if (!formData.title || !formData.content || !formData.category_id || !formData.url_gambar_unggulan) {
            setErrorMessage("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                ...formData,
                updated_at: new Date().toISOString(),
            };

            const apiArticleUrl = `${baseUrl}news/${articleId}`;

            const response = await axios.patch(apiArticleUrl, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 204) {
                alert("Article updated successfully!");
                router.push('/admin/articles');
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

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-800 items-center justify-center">
                <p className="text-xl text-gray-700 dark:text-gray-300">Loading article data...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <main className="flex-1 transition-all duration-300 pt-16 lg:pt-0 lg:ps-64">
                <div className="bg-white text-black min-h-screen p-8">
                    <a
                        href='/admin/articles'
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 dark:text-gray-400 dark:hover:text-white"
                        aria-label="Go Back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </a>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold">Edit Post</h1>
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
                                        disabled={isSubmitting || imageLoading}
                                    >
                                        <Upload className="h-4 w-4" />
                                        <span>{isSubmitting ? "Updating..." : "Update"}</span>
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
                                            <option value="">Select a category</option>
                                            <option value="1">Event</option>
                                            <option value="2">Announcement</option>
                                            <option value="3">News</option>
                                        </select>
                                    </div>

                                    <div className="mb-6">
                                        {formData.url_gambar_unggulan ? (
                                            <img
                                                src={formData.url_gambar_unggulan}
                                                alt="Featured"
                                                className="w-full h-auto rounded-lg shadow-md mb-4"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                                <p className="text-gray-500">Image Preview</p>
                                            </div>
                                        )}
                                        <label className="block text-gray-700 font-semibold mb-2">Change Featured Image</label>
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

                                    <div>
                                        <h1 className="text-4xl font-extrabold mb-4">
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Post Title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="w-full font-extrabold p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                            />
                                        </h1>
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
                                                    <button type="button" className="p-2 rounded hover:bg-gray-200" title="Link" onClick={() => {
                                                        const url = window.prompt('Enter the URL:');
                                                        if (url) formatDoc('createLink', url);
                                                    }}>
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
                                            <div id="contentEditor" contentEditable="true" ref={editorRef} onInput={handleEditorChange} className="rich-text-editor bg-white rounded-b-lg focus:ring-blue-500 focus:border-blue-500 p-4 border border-gray-300 min-h-[300px]" />
                                            {errorMessage && (
                                                <p className="text-red-600 mt-2">{errorMessage}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-80">
                                    <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4">
                                        <h2 className="text-lg font-bold">Properties</h2>

                                        <div className="flex items-center space-x-2">
                                            <Globe className="h-6 w-6 text-gray-500" />
                                            <input
                                                type="text"
                                                name="excerpt"
                                                placeholder="Excerpt"
                                                value={formData.excerpt}
                                                onChange={handleChange}
                                                className="w-full p-2 rounded-md border border-gray-300"
                                            />
                                        </div>

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
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleEditorImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </main>
        </div>
    );
}