import { Suspense } from "react";
import IzinKeramaianForm from "@/app/suspense/layanan/sik/sik-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin keramaian form...</div>}>
      <PathWrapper />
      <IzinKeramaianForm/>
    </Suspense>
  );
}
