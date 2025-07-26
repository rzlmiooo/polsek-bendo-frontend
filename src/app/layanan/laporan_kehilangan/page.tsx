import { Suspense } from "react";
import LaporanKehilanganForm from "@/app/suspense/layanan/slk/slk-suspense";
import PathWrapper from "@/app/components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengajuan Laporan Kehilangan",
    description: "Melayani pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function SLKPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin keramaian form...</div>}>
      {/* <PathWrapper /> */}
      <LaporanKehilanganForm/>
    </Suspense>
  );
}

