"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessMessage from "../../../components/successMessageAdmin";

interface SlkDetail {
    reporter_name: string;
    contact_reporter: string;
    item_type: string;
    date_lost: string;
    chronology: string;
}

export default function EditSlk() {
    const searchParams = useSearchParams();
    const slkId = searchParams.get("slk_id");
    const reporterName = searchParams.get("reporter_name");
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const [formData, setFormData] = useState<SlkDetail>({
        reporter_name: reporterName || "",
        contact_reporter: "",
        item_type: "",
        date_lost: "",
        chronology: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successDetails, setSuccessDetails] = useState<{
        title: string;
        description: string;
        farewell: string;
        backLinkHref: string;
        backLinkText: string;
    } | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) setToken(storedToken);
        }
    }, []);

    // console.log("Token:",token);
    // console.log("SLK:",slkId);
    // console.log("Reporter Name:",reporterName);

    useEffect(() => {

        const fetchSlkDetail = async () => {
            try {
                const response = await axios.get(`${baseUrl}slk/${slkId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = response.data;
                setFormData({
                    reporter_name: data.reporter_name,
                    contact_reporter: data.contact_reporter,
                    item_type: data.item_type,
                    date_lost: data.date_lost,
                    chronology: data.chronology,
                });
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSlkDetail();
    }, [token, slkId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (imageLoading) {
            setError("Please wait for image upload to complete.");
            return;
        }

        if (!formData.reporter_name || !formData.contact_reporter || !formData.chronology) {
            setError("Please complete all required fields.");
            return;
        }

        try {
            const payload = { ...formData };
            const response = await axios.patch(`${baseUrl}slk/${slkId}`, payload);

            if (response.status === 200 || response.status === 201) {
                setShowSuccessMessage(true);
                setSuccessDetails({
                    title: response.data?.message || "Berhasil Diedit!",
                    description: "Data Surat Kehilangan telah diperbarui.",
                    farewell: "Semoga harimu menyenangkan!",
                    backLinkHref: "/order/skck",
                    backLinkText: "KEMBALI",
                });
            }
        } catch (err: any) {
            console.error("Submit error:", err);
            setError(err.response?.data?.message || "Server error.");
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8">Loading data...</div>;
    }

    if (error) {
        return (
            <div className="p-8 text-red-600">
                <p>Error: {error}</p>
                <button onClick={() => router.back()} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded">
                    Kembali
                </button>
            </div>
        );
    }

    if (showSuccessMessage && successDetails) {
        return <SuccessMessage {...successDetails} />;
    }

    return (
        <div className="bg-white text-black min-h-screen p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Edit Surat Laporan Kehilangan</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="reporter_name">Nama Pelapor</label>
                        <input
                            type="text"
                            id="reporter_name"
                            name="reporter_name"
                            value={formData.reporter_name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="contact_reporter">Nomor Telepon</label>
                        <input
                            type="text"
                            id="contact_reporter"
                            name="contact_reporter"
                            value={formData.contact_reporter}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="item_type">Jenis Barang</label>
                        <input
                            type="text"
                            id="item_type"
                            name="item_type"
                            value={formData.item_type}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="date_lost">Tanggal Kehilangan</label>
                        <input
                            type="date"
                            id="date_lost"
                            name="date_lost"
                            value={formData.date_lost}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="chronology">Kronologi</label>
                        <textarea
                            id="chronology"
                            name="chronology"
                            value={formData.chronology}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </form>
            </div>
        </div>
    );
}
