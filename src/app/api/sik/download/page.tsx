import { Suspense } from "react";
import PmDownload from "../../../suspense/api/sik/download/download-sik-suspense";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Cek Layanan Masyarakat",
    description: "Cek proses pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function SikDownloadPage() {
  return (
    <Suspense fallback={<div>Loading Downloads...</div>}>
      <SikDownloadPage/>
    </Suspense>
  );
}
