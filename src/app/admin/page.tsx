import AdminNavbar from '@/app/components/adminnavbar';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin - Dashboard",
    description: "Polisi daerah sekitar Kecamatan Bendo",
};

export default function Admin() {
  return (
    <>
      <AdminNavbar />
      <main className="pt-20 py-10 px-4 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      </main>
    </>
  );
}