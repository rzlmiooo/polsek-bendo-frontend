// hooks/usePageTitle.ts
'use client'

import { usePathname } from "next/navigation";

export default function usePageTitle() {
  const path = usePathname();

  const titleMap: Record<string, string> ={
    '/': 'Beranda',
    '/artikel': 'Article',
    '/artikel/read-article': 'Detail Article',
    '/login': 'Halaman Login',
    '/register': 'Halaman Register',
    '/layanan': 'List Layanan',
    '/layanan/izin_keramaian': 'Form Surat Izin Keramaian',
    '/layanan/laporan_kehilangan': 'Form Surat Laporan Kehilangan',
    '/layanan/pengaduan': 'Form Pengaduan Masyarakat',
    '/layanan/skck': 'Form SKCK',
    '/layanan/booking/booking-status': 'Status Booking',
    '/layanan/find-conselor': 'Cari Konselor',
    '/layanan/chat-pelajar': 'Chat',
    '/order/note': 'Catatan dari Polisi',
    '/order': 'List Surat Yang Dibuat',
    '/order/pm': 'List Pengaduan Masyarakat',
    '/order/sik': 'List Surat Izin Keramaian',
    '/order/skck': 'List SKCK',
    '/order/slk': 'List Surat Laporan Kehilangan',

    '/admin/login': 'Halaman Login Admin',
    '/admin/register': 'Halaman Register Admin',
    '/admin/artikel': 'Article List',
    '/admin/artikel/create-article': 'Membuat Article',
    '/admin/artikel/edit-article': 'Mengedit Article',
    '/admin': 'Dashboard',
    '/admin/layanan': 'List  Layanan',
    '/admin/layanan/izin_keramaian': 'Form Surat Izin Keramaian',
    '/admin/layanan/laporan_kehilangan': 'Form Surat Laporan Kehilangan',
    '/admin/layanan/pengaduan': 'Form Pengaduan Masyarakat',
    '/admin/layanan/skck': 'Form SKCK',
    '/admin/layanan/izin_keramaian/edit-sik': 'Form Catatan Surat Izin Keramaian',
    '/admin/layanan/laporan_kehilangan/edit-slk': 'Form Catatan Surat Laporan Kehilangan',
    '/admin/layanan/pengaduan/edit-pm': 'Form Catatan Pengaduan Masyarakat',
    '/admin/layanan/skck/edit-skck': 'Form Catatan SKCK',
  };

  
  const pathName = titleMap[path] || '';

  return <h1>{pathName}</h1>;
}
