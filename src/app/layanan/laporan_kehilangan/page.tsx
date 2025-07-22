import { Suspense } from "react";
import LaporanKehilanganForm from "@/app/suspense/layanan/slk/slk-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function SLKPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin keramaian form...</div>}>
      {/* <PathWrapper /> */}
      <LaporanKehilanganForm/>
    </Suspense>
  );
}

