import { Suspense } from "react";
import dynamic from "next/dynamic";
import EditSikNotes from "@/app/admin/suspense/layanan/sik/edit-sik-notes-suspense";

export default function EditSIKPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      <EditSikNotes />
    </Suspense>
  );
}
