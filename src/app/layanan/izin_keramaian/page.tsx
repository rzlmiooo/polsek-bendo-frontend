import { Suspense } from "react";
import dynamic from "next/dynamic";
import IzinKeramaianForm from "@/app/suspense/layanan/sik/sik-suspense";
export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin keramaian form...</div>}>
      <IzinKeramaianForm/>
    </Suspense>
  );
}
