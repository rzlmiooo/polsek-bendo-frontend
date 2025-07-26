import { Suspense } from "react";
import SkckForm from "@/app/suspense/layanan/skck/skck-suspense";
import PathWrapper from "@/app/components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengajuan SKCK",
    description: "Melayani pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function SKCKPage() {
  return (
    <Suspense fallback={<div>Loading  skck form...</div>}>
      {/* <PathWrapper /> */}
      <SkckForm/>
    </Suspense>
  );
}