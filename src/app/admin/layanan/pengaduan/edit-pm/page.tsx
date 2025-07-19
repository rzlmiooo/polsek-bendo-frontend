import { Suspense } from "react";
import dynamic from "next/dynamic";
import EditPm from "@/app/admin/suspense/layanan/pm/edit-pm-notes-suspense";

export default function EditPmPage() {
  return (
    <Suspense fallback={<div>Loading  edit pengaduan masyarakat...</div>}>
      <EditPm />
    </Suspense>
  );
}
