import { Suspense } from "react";
import PengaduanMasyarakatForm from "@/app/suspense/layanan/pm/pm-suspense";
import PathWrapper from "@/app/components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengajuan Pengaduan Masyarakat",
    description: "Melayani pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function PMPage() {
  return (
    <Suspense fallback={<div>Loading  pengaduan masyarakat form...</div>}>
      {/* <PathWrapper /> */}
      <PengaduanMasyarakatForm/>
    </Suspense>
  );
}