import { Suspense } from "react";
import IzinKeramaianForm from "@/app/suspense/layanan/sik/sik-suspense";
import PathWrapper from "@/app/components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengajuan Surat Izin Keramaian",
    description: "Melayani pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin keramaian form...</div>}>
      {/* <PathWrapper /> */}
      <IzinKeramaianForm/>
    </Suspense>
  );
}
