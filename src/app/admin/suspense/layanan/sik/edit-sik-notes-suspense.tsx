'use client';

import axios from 'axios';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import getUserId from '@/app/utils/auth/page'; 

interface SikDetail {
    id: string; 
    user_id: string; 
    organizer_name: string;
    event_name: string;
    event_description: string;
    event_start: string;
    event_end: string;
    location: string;
    guest_estimate: string;
    levy_fees: string;
    status_handling: string;
    form_creation: string;
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
    successMessage: string | null;
    errorMessage: string | null;
}

export default function EditSikNotes() {
    const searchParams = useSearchParams();
    const adminId = getUserId();
    const sikId = searchParams.get('sik_id');
    const router = useRouter();

    const [sikDetail, setSikDetail] = useState<SikDetail[]>([]);
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
        related_field: 'SIK',
        correction_link: sikId ? `/order/sik/edit-sik?sik_id=${sikId}` : '',
        successMessage: null,
        errorMessage: null,
    });

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
        if (!sikId) {
            setError("Surat Izin Keramaian ID not found in URL.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const apiSikUrl = `${baseUrl}sik/${sikId}`;

                const sikRes = await axios.get<SikDetail[]>(apiSikUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const fetchedSikArray = sikRes.data;

                if (fetchedSikArray && fetchedSikArray.length > 0) {
                    setSikDetail(fetchedSikArray); 
                    setFormData((prev) => ({ ...prev, user_id: fetchedSikArray[0].user_id }));
                } else {
                    setError("SIK detail not found for the given ID or the array was empty.");
                }
            } catch (err) {
                console.error('Error fetching SIK data:', err);
                if (axios.isAxiosError(err) && err.response) {
                    setError(`Error fetching SIK details: ${err.response.status} - ${err.response.data?.message || err.message}`);
                } else {
                    setError('Failed to load SIK details due to a network or unexpected error.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sikId, token, baseUrl]); 

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
                setFormData((prev) => ({
                    ...prev,
                    successMessage: response.data?.message || 'Notes submitted successfully!',
                }));
                router.push('/admin/layanan/izin_keramaian/success-message');
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

    if (loading) {
        return <div className="p-6 text-center text-gray-700">Loading SIK details...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    }

    if (sikDetail.length === 0) {
        return <div className="p-6 text-center text-gray-500">No SIK details found for this ID.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambahkan Catatan untuk Surat Izin Keramaian</h2>

                {sikDetail.map((sik, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                        <h3 className="text-xl font-semibold mb-2">SIK Detail:</h3>
                        <p>
                            <span className="font-medium">SIK ID:</span> {sik.id}
                        </p>
                        <p>
                            <span className="font-medium">User ID:</span> {sik.user_id} 
                        </p>
                        <p>
                            <span className="font-medium">Nama Penyelenggara:</span> {sik.organizer_name || 'N/A'}
                        </p>
                        <p>
                            <span className="font-medium">Nama Acara:</span> {sik.event_name || 'N/A'}
                        </p>
                        <p>
                            <span className="font-medium">Acara Dimulai:</span> {new Date(sik.event_start).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-medium">Acara Selesai:</span> {new Date(sik.event_end).toLocaleDateString()}
                        </p>
                    </div>
                ))}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {formData.errorMessage && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {formData.errorMessage}
                        </div>
                    )}
                    {formData.successMessage && (
                        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            {formData.successMessage}
                        </div>
                    )}

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
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Notes
                    </button>
                </form>
            </div>
        </div>
    );
}
