import { Suspense } from "react";
import ListLayanan from "../suspense/layanan/list-layanan-suspense";
import PathWrapper from "@/app/components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Layanan Masyarakat",
    description: "Melayani pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function LayananPage() {
  return (
    <Suspense fallback={<div>Loading  list layanan...</div>}>
      {/* <PathWrapper /> */}
      <ListLayanan/>
    </Suspense>
  );
}