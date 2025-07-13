"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [pictureUrl, setPictureUrl] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setError("");
        }
    };

    const handleSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        console.log('Value of selectedFile before FormData:', selectedFile);

        if (!selectedFile) {
            setError("Please select an image file to upload.");
            setLoading(false);
            return; 
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            console.log('Contents of FormData:');
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            const response = await axios.post(
                'https://striking-vision-production-4ee1.up.railway.app/api/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const resData = response.data;
            setPictureUrl(resData.url);
            console.log("Upload successful:", resData);

        } catch (err: any) {
            console.error("Full upload error object:", err); 
            console.error("Error response data:", err?.response?.data); 
            setError(err?.response?.data?.error || "Failed to upload image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmitClick}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange} 
            />
            <button type="submit" disabled={loading || !selectedFile}>
                {loading ? "Uploading..." : "Upload Image"}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {pictureUrl && (
                <div>
                    <p>Image uploaded successfully!</p>
                    <img src={pictureUrl} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    <p>URL: {pictureUrl}</p>
                </div>
            )}
        </form>
    );
};

export default ImageUploadForm;