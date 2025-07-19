import { Suspense } from "react";
import dynamic from "next/dynamic";
import EditSkckNotes from "@/app/admin/suspense/layanan/skck/edit-skck-notes-suspense";

export default function SkckPage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      <EditSkckNotes/>
    </Suspense>
  );
}
