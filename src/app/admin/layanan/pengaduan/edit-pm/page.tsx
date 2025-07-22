import { Suspense } from "react";
import EditPm from "@/app/admin/suspense/layanan/pm/edit-pm-notes-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function EditPmPage() {
  return (
    <Suspense fallback={<div>Loading  edit pengaduan masyarakat...</div>}>
      {/* <PathWrapper /> */}
      <EditPm />
    </Suspense>
  );
}
