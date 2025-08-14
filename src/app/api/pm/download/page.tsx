import { Suspense } from "react";
import PmDownload from "../../../suspense/api/pm/download/download-pm-suspense";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Cek Layanan Masyarakat",
    description: "Cek proses pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function PmDownloadPage() {
  return (
    <Suspense fallback={<div>Loading Downloads...</div>}>
      <PmDownload/>
    </Suspense>
  );
}
