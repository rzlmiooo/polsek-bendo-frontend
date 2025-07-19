import { Suspense } from "react";
import dynamic from "next/dynamic";
import PengaduanMasyarakatForm from "@/app/suspense/layanan/pm/pm-suspense";

export default function PMPage() {
  return (
    <Suspense fallback={<div>Loading  pengaduan masyarakat form...</div>}>
      <PengaduanMasyarakatForm/>
    </Suspense>
  );
}