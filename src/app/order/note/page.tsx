"use client";

import axios from "axios";
import Footer from "../../components/footer";
import NavbarUser from "../../components/navbarUser";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import getUserId from './../../utils/auth/page';
import React from 'react';

interface Note {
    id: string;
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

export default function Note() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [noteData, setNoteData] = useState<Note[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const userId = getUserId();
    
    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, [router]);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {

            try {
                const apiNoteUrl = `${baseUrl}notes`;

                const notesRes = await axios.get(apiNoteUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const allNotes = notesRes.data || [];

                const notesUser = allNotes.filter(
                    (note: any) => String(note.user_id) === String(userId)
                );

                setNoteData(notesUser);
            }
            catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [searchParams]);
    return (
        <div>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-inter">
                <NavbarUser />
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="px-6 py-8 sm:px-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
                            Catatan Petugas untuk Izin Anda
                        </h2>

                        {noteData.length === 0 ? (
                            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
                                Belum ada catatan dari petugas. Surat Anda mungkin sedang ditinjau atau sudah selesai!
                            </p>
                        ) : (
                            <div className="space-y-6">
                                {noteData.map((note) => (
                                    <div
                                        key={note.id}
                                        className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm transition-all duration-300 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Officer: {note.officer_name}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(note.date).toISOString().split('T')[0]} {note.time}
                                            </span>
                                        </div>
                                        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-4">
                                            <span className="font-medium text-blue-600 dark:text-blue-400">Note:</span> {note.officer_note}
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Related Field: <span className="font-medium">{note.related_field}</span>
                                            </span>
                                            {note.correction_link && (
                                                <a
                                                    href={note.correction_link}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Go to Correction
                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}