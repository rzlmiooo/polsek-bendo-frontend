import { Suspense } from "react";
import dynamic from "next/dynamic";
import KelolaLaporanKehilangan from "@/app/admin/suspense/layanan/slk/slk-suspense";

export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  sik...</div>}>
      <KelolaLaporanKehilangan />
    </Suspense>
  );
}
