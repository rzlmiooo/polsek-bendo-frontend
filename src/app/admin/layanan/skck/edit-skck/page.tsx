import { Suspense } from "react";
import EditNotesSkck from "@/app/admin/suspense/layanan/skck/edit-skck-notes-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function EditSIKPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      <PathWrapper />
      <EditNotesSkck />
    </Suspense>
  );
}
