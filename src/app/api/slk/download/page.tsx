import { Suspense } from "react";
import SlkDownloadPage from "../../../suspense/api/slk/download/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Cek Layanan Masyarakat",
    description: "Cek proses pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function SlkDownload() {
  return (
    <Suspense fallback={<div>Loading Slk Downloads...</div>}>
      <SlkDownloadPage/>
    </Suspense>
  );
}
