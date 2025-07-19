import { Suspense } from "react";
import dynamic from "next/dynamic";
import EditNotesSkck from "@/app/admin/suspense/layanan/skck/edit-skck-notes-suspense";

export default function EditSIKPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      <EditNotesSkck />
    </Suspense>
  );
}
