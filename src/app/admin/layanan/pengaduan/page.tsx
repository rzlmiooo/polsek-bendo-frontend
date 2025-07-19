import { Suspense } from "react";
import dynamic from "next/dynamic";
import KelolaPm from "@/app/admin/suspense/layanan/pm/pm-suspense";

export default function EditPmPage() {
  return (
    <Suspense fallback={<div>Loading  edit pengaduan masyarakat...</div>}>
      <KelolaPm />
    </Suspense>
  );
}
