import { Suspense } from "react";
import KelolaLaporanKehilangan from "@/app/admin/suspense/layanan/slk/slk-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  sik...</div>}>
      <PathWrapper />
      <KelolaLaporanKehilangan />
    </Suspense>
  );
}
