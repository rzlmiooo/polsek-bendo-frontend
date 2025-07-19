"use client";

import axios from "axios";
import AdminNavbar from "@/app/components/adminnavbar";
import Footer from "@/app/components/footer";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from "@/app/utils/auth/page";
import SuccessMessage from "../../../../components/successMessageAdmin";


interface PmDetail {
    id: string;
    user_id: string;
    complainant_name: string;
    contact: string;
    complainant_address: string;
    complainant_date: string;
    complaint_status: string;
}

interface NotesFormData {
    user_id: string;
    officer_id: string;
    officer_name: string;
    officer_note: string;
    date: string;
    time: string;
    related_field: string;
    correction_link: string;
}

export default function EditedNotesPm() {
    const adminId = getUserId();
    const router = useRouter();
    const [pmData, setPmDetail] = useState<PmDetail[]>([]);
    const searchParams = useSearchParams();
    const pmId = searchParams.get('pm_id');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);

    const userId = getUserId();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;


    const [formData, setFormData] = useState<NotesFormData>({
        user_id: '',
        officer_id: adminId || '',
        officer_name: '',
        officer_note: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        related_field: 'PM',
        correction_link: pmId ? `/order/pm/edit-pm?pm_id=${pmId}` : '',
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [successDetails, setSuccessDetails] = useState<{
        title: string;
        description: string;
        farewell: string;
        backLinkHref: string;
        backLinkText: string;
    } | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    useEffect(() => {
        if (!pmId) {
            setError("pm ID not found in URL.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const apiPmUrl = `${baseUrl}pm/${pmId}`;

                const pmRes = await axios.get<PmDetail[]>(apiPmUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const fetchedPmArray = pmRes.data;

                if (fetchedPmArray && fetchedPmArray.length > 0) {
                    setPmDetail(fetchedPmArray);
                    setFormData((prev) => ({ ...prev, user_id: fetchedPmArray[0].user_id }));
                } else {
                    setError("pm detail not found for the given ID or the array was empty.");
                }
            } catch (err) {
                console.error('Error fetching pm data:', err);
                if (axios.isAxiosError(err) && err.response) {
                    setError(`Error fetching pm details: ${err.response.status} - ${err.response.data?.message || err.message}`);
                } else {
                    setError('Failed to load pm details due to a network or unexpected error.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pmId, token, baseUrl]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            errorMessage: null,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setErrorMessage(null);
        setShowSuccessMessage(false);
        setIsLoading(true);
        e.preventDefault();

        setFormData((prev) => ({ ...prev, successMessage: null, errorMessage: null }));

        if (!formData.officer_note || !formData.date || !formData.time || !formData.related_field) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: 'Please fill in all required fields.',
            }));
            return;
        }

        if (!formData.officer_id || !formData.officer_name) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: 'Officer ID or Name is missing. Please ensure you are logged in correctly.',
            }));
            return;
        }

        if (!formData.user_id) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: 'User ID for SIK is missing. Please ensure SIK details loaded correctly.',
            }));
            return;
        }

        try {
            const payload = {
                user_id: formData.user_id,
                officer_id: formData.officer_id,
                officer_name: formData.officer_name,
                officer_note: formData.officer_note,
                date: formData.date,
                time: formData.time,
                related_field: formData.related_field,
                correction_link: formData.correction_link,
            };

            const apiNotesUrl = `${baseUrl}notes`;

            const response = await axios.post(apiNotesUrl, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                setShowSuccessMessage(true);

                setSuccessDetails({
                    title: response.data?.message || " berhasil dipublikasikan!",
                    description: "Terima kasih telah membuat Informasi yang berguna.",
                    farewell: "Semoga harimu Menyenangkan!",
                    backLinkHref: "/admin/layanan/pengaduan",
                    backLinkText: "KEMBALI"
                });
                console.log("successDetails set to:", successDetails);
                setFormData({
                    user_id: '',
                    officer_id: adminId || '',
                    officer_name: '',
                    officer_note: '',
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                    related_field: 'PM',
                    correction_link: pmId ? `/order/pm/edit-pm?pm_id=${pmId}` : '',
                });

            } else {
                setFormData((prev) => ({
                    ...prev,
                    errorMessage: response.data?.message || 'Unexpected server response.',
                }));
            }
        } catch (error: any) {
            console.error('Notes submission error:', error);
            setFormData((prev) => ({
                ...prev,
                errorMessage:
                    'Server error: ' + (error.response?.data?.message || error.message),
                successMessage: null,
            }));
        }
    };

    if (showSuccessMessage && successDetails) {
            console.log("Rendering SuccessMessage component.");
            return <SuccessMessage {...successDetails} />;
    }

    if (loading) {
        return <div className="p-6 text-center text-gray-700">Loading SIK details...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    }

    if (pmData.length === 0) {
        return <div className="p-6 text-center text-gray-500">No SKCK details found for this ID.</div>;
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambahkan Catatan untuk Surat Izin Keramaian</h2>

                {pmData.map((pm, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                        <h3 className="text-xl font-semibold mb-2">pm Detail:</h3>
                        <p>
                            <span className="font-medium">pm ID:</span> {pm.id}
                        </p>
                        <p>
                            <span className="font-medium">Nama :</span> {pm.complainant_name || 'N/A'}
                        </p>
                        <p>
                            <span className="font-medium">Alamat :</span> {pm.complainant_address || 'N/A'}
                        </p>
                        <p>
                            <span className="font-medium">Tanggal Diajukan:</span> {new Date(pm.complainant_date).toLocaleDateString()}
                        </p>
                    </div>
                ))}

                <form onSubmit={handleSubmit} className="space-y-4">
                   
                    <div>
                        <label htmlFor="officer_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Petugas:
                        </label>
                        <input
                            type="text"
                            id="officer_name"
                            name="officer_name"
                            value={formData.officer_name}
                            onChange={handleChange}
                            required
                            placeholder="Masukkan Namamu..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            aria-label="Officer Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="officer_note" className="block text-sm font-medium text-gray-700 mb-1">
                            Catatan Petugas: <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="officer_note"
                            name="officer_note"
                            rows={5}
                            value={formData.officer_note}
                            onChange={handleChange}
                            placeholder="Masukkan Catatanmu disini..."
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                Tanggal Pembuatan: <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                                Waktu Pembuatan: <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="related_field" className="block text-sm font-medium text-gray-700 mb-1">
                            Bidang Terkait: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="related_field"
                            name="related_field"
                            value={formData.related_field}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="correction_link" className="block text-sm font-medium text-gray-700 mb-1">
                            Tautan Koreksi:
                        </label>
                        <input
                            type="text"
                            id="correction_link"
                            name="correction_link"
                            value={formData.correction_link}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                   <button
                        type="submit"
                        className="bg-[#00BFFF] text-white px-6 py-3 rounded-xl font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Sended Pengaduan Masyarakat Notes'}
                    </button>
                </form>
            </div>
        </div>
    )
}