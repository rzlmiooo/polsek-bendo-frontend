import { Suspense } from "react";
import EditSikNotes from "@/app/admin/suspense/layanan/sik/edit-sik-notes-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function EditSIKPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      {/* < PathWrapper /> */}
      <EditSikNotes />
    </Suspense>
  );
}
