import { Suspense } from "react";
import EditSkckNotes from "@/app/admin/suspense/layanan/skck/edit-skck-notes-suspense";
import PathWrapper from "@/app/components/pathWrapper";


export default function SkckPage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      <PathWrapper/>
      <EditSkckNotes/>
    </Suspense>
  );
}
