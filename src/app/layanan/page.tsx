import { Suspense } from "react";
import ListLayanan from "../suspense/layanan/list-layanan-suspense";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polsek Bendo - Layanan Masyarakat",
  description: "Melayani pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
  verification: {
    google: 'kPptZ5boJ9QHlGWamNOX1TXLEPZruxtoGj-WHwaT-JI'
  }
};

export default function LayananPage() {
  return (
    <Suspense>
      <ListLayanan/>
    </Suspense>
  );
}