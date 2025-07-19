import { Suspense } from "react";
import dynamic from "next/dynamic";
import LaporanKehilanganForm from "@/app/suspense/layanan/slk/slk-suspense";

export default function SLKPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin keramaian form...</div>}>
      <LaporanKehilanganForm/>
    </Suspense>
  );
}

