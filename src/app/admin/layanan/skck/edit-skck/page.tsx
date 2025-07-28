import { Suspense } from "react";
import EditNotesSkck from "@/app/admin/suspense/layanan/skck/edit-skck-notes-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function EditSKCKPage() {
  return (
    <Suspense fallback={<div>Loading edit SKCK...</div>}>
      {/* <PathWrapper /> */}
      <EditNotesSkck />
    </Suspense>
  );
}
