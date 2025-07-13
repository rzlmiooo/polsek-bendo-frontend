'use client'
import { usePathname } from "next/navigation"

export default function Path(){
    const path = usePathname();
    let pathName = '';
    if (path == '/home') {
        pathName = 'Beranda';
    } if (path == '/home/assessment') {
        pathName = 'Assessment';
    } if (path == '/home/recommendation') {
        pathName = 'Rekomendasi';
    } if (path == '/home/chat') {
        pathName = 'Chat Konselor';
    } if (path == '/home/chat/booking') {
        pathName = 'Booking';
    } if (path == '/home/chat/booking/create-booking') {
        pathName = 'Mulai Booking';
    } if (path == '/home/chat/booking/history-booking') {
        pathName = 'Riwayat Booking';
    } if (path == '/home/chat/booking/success-booking') {
        pathName = 'Sukses Booking';
    } if (path == '/home/chat/booking/booking-status') {
        pathName = 'Status Booking';
    } if (path == '/home/chat/find-conselor') {
        pathName = 'Cari Konselor';
    } if (path == '/home/chat/chat-pelajar') {
        pathName = 'Chat';
    } if (path == '/home/settings') {
        pathName = 'Pengaturan';
    } if (path == '/home/settings/profile') {
        pathName = 'Profil Saya';

    } if (path == '/konselor') {
        pathName = 'Dashboard';
    } if (path == '/konselor/bookings') {
        pathName = 'Booking';
    } if (path == '/konselor/chat-konselor') {
        pathName = 'Chat';
    } if (path == '/konselor/kelola-jadwal') {
        pathName = 'Kelola Jadwal';
    } if (path == '/konselor/riwayat-konsultasi') {
        pathName = 'Riwayat Konsultasi';
    } if (path == '/konselor/profile') {
        pathName = 'Profil Konselor';
    }

    return pathName; 
}