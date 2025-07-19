import { Suspense } from "react";
import KelolaPm from "@/app/admin/suspense/layanan/pm/pm-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function EditPmPage() {
  return (
    <Suspense fallback={<div>Loading  edit pengaduan masyarakat...</div>}>
      <PathWrapper />
      <KelolaPm />
    </Suspense>
  );
}
