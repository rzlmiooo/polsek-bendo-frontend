import { Suspense } from "react";
import SkckDownloadPage from "../../../suspense/api/skck/download/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Cek Layanan Masyarakat",
    description: "Cek proses pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function SkckDownload() {
  return (
    <Suspense fallback={<div>Loading Skck Downloads...</div>}>
      <SkckDownloadPage/>
    </Suspense>
  );
}
