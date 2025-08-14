import { Suspense } from 'react';
import type { Metadata } from "next";
import Dashboard from './suspense/dashboard';

export const metadata: Metadata = {
    title: "Admin - Dashboard",
    description: "Polisi daerah sekitar Kecamatan Bendo",
};

export default function AdminDasboard(){
    return(
        <div className="bg-white dark:bg-gray-900 h-screen">
            <Suspense>
                <Dashboard />
            </Suspense>
        </div>
    )
}