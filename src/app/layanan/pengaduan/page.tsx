import { Suspense } from "react";
import PengaduanMasyarakatForm from "@/app/suspense/layanan/pm/pm-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function PMPage() {
  return (
    <Suspense fallback={<div>Loading  pengaduan masyarakat form...</div>}>
      {/* <PathWrapper /> */}
      <PengaduanMasyarakatForm/>
    </Suspense>
  );
}