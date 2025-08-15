"use client";

import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import getUserId from '@/app/utils/auth/page';
import SuccessMessage from "../../../../components/successMessageAdmin";
import Back from "@/app/components/back";

interface SkckDetail {
    id: string;
    user_id: string;
    applicant_name: string;
    submission_date: string;
    passport_photo: string;
    officer_note: string;
    verification_status: string;
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

export default function EditSkckNotes() {
    const searchParams = useSearchParams();
    const adminId = getUserId();
    const skckId = searchParams.get('skck_id');
    const router = useRouter();

    const [skck, setSkckDetail] = useState<SkckDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [officerName, setOfficerName] = useState<string | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState<NotesFormData>({
        user_id: '',
        officer_id: adminId || '',
        officer_name: '',
        officer_note: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        related_field: 'SKCK',
        correction_link: skckId ? `/order/skck/edit-skck?skck_id=${skckId}` : '',
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            const storedOfficerName = localStorage.getItem('username');

            if (storedToken) {
                setToken(storedToken);
            }
            if (storedOfficerName) {
                setOfficerName(storedOfficerName);
                setFormData((prev) => ({ ...prev, officer_name: storedOfficerName }));
            } else {
                console.warn("Officer name not found in localStorage. Please ensure 'username' is set.");
            }
        }
    }, []);

    useEffect(() => {
        if (!skckId) {
            setError("SKCK ID not found in URL.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const apiSkckUrl = `${baseUrl}skck/${skckId}`;

                const skckRes = await axios.get<SkckDetail[]>(apiSkckUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const fetchedSkckArray = skckRes.data;

                if (fetchedSkckArray && fetchedSkckArray.length > 0) {
                    setSkckDetail(fetchedSkckArray);
                    setFormData((prev) => ({ ...prev, user_id: fetchedSkckArray[0].user_id }));
                } else {
                    setError("skck detail not found for the given ID or the array was empty.");
                }
            } catch (err) {
                console.error('Error fetching skck data:', err);
                if (axios.isAxiosError(err) && err.response) {
                    setError(`Error fetching skck details: ${err.response.status} - ${err.response.data?.message || err.message}`);
                } else {
                    setError('Failed to load skck details due to a network or unexpected error.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [skckId, token, baseUrl]);

    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

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
        e.preventDefault();
        setErrorMessage(null);
        setShowSuccessMessage(false);
        setIsLoading(true);

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
                    title: response.data?.message || "Catatan berhasil dikirim!",
                    description: "Terima kasih telah membuat Informasi yang berguna.",
                    farewell: "Semoga harimu Menyenangkan!",
                    backLinkHref: "/admin/layanan/skck",
                    backLinkText: "KEMBALI"
                });
                setFormData({
                    user_id: '',
                    officer_id: adminId || '',
                    officer_name: '',
                    officer_note: '',
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                    related_field: 'SKCK',
                    correction_link: skckId ? `/order/skck/edit-skck?skck_id=${skckId}` : '',
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

    if (skck.length === 0) {
        return <div className="p-6 text-center text-gray-500">No SKCK details found for this ID.</div>;
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambahkan Catatan untuk Surat Izin Keramaian</h2>

                {skck.map((skck, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                        <h3 className="text-xl font-semibold mb-2">skck Detail:</h3>
                        <p>
                            <span className="font-medium">skck ID:</span> {skck.id}
                        </p>
                        <p>
                            <span className="font-medium">Nama :</span> {skck.applicant_name || 'N/A'}
                        </p>
                        <p>
                            <span className="font-medium">Tanggal Diajukan:</span> {new Date(skck.submission_date).toLocaleDateString()}
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

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 cursor-auto text-white px-6 py-3 rounded-xl font-semibold"
                        >
                            Kirim Catatan ke Pemohon
                        </button>
                        <Back/>
                    </div>
                </form>
            </div>
        </div>
    )
}