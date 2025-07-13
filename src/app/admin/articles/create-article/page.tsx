"use client";

import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getStudentId } from "../../../utils/auth/page";

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
  successMessage: string | null;
  errorMessage: string | null;
}

export default function CreateArticle() {

  const router = useRouter();
  const studentId = getStudentId();

  const redirectToSuccessMessage = () => {
    router.push(`/admin/articles/success-message`);
  };

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
    successMessage: null,
    errorMessage: null,
  });

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

    if (!formData.url_gambar_unggulan) {
      setFormData((prev: any) => ({
        ...prev,
        errorMessage: "Please upload a profile picture.",
      }));
      return;
    }

    if (!formData.title || !formData.content || !formData.category_id) {
      setFormData((prev: any) => ({
        ...prev,
        errorMessage: "Please fill in all required fields.",
      }));
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
        created_at : formData.created_at,
        updated_at : formData.updated_at
      };

      const response = await axios.post('https://striking-vision-production-4ee1.up.railway.app/api/news', payload);

      if (response.status === 200) {
        response.data?.message || "Blog post created successfully"
        router.push("/admin/articles/success-message");
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
  };
  return (
    <div className="bg-white text-black min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
            <form className="space-y-6" onSubmit={handleSubmitClick}>
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
                />
                {imageLoading && <p className="text-blue-600">Uploading image...</p>}
                {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                {formData.url_gambar_unggulan && (
                  <div className="text-green-600 mb-4">
                    <p>Image uploaded successfully!</p>
                  </div>
                )}
                {selectedFile && !imageLoading && !formData.url_gambar_unggulan && !imageError && (
                  <p className="text-gray-600">Ready to upload: {selectedFile.name}</p>
                )}
              </div>

              {formData.errorMessage && <p style={{ color: 'red' }} className="mb-4">{formData.errorMessage}</p>}
              {formData.successMessage && <p style={{ color: 'green' }} className="mb-4">{formData.successMessage}</p>}

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
              >
                <option value="">Pilih Kategori</option>
                <option value="1">Artikel</option>
                <option value="2">Cerpen</option>
                <option value="3">Liputan</option>
              </select>
              <div>
                <label className="block font-semibold mb-2"></label>
                <input
                  id="excerpt"
                  name="excerpt"
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-xl"
                  placeholder="Masukkan Sumber"
                  value={formData.excerpt}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" onClick={redirectToSuccessMessage} className="bg-[#00BFFF] text-white px-6 py-3 rounded-xl font-semibold">Publish</button>
            </form>
      </div>
    </div>
  );
}