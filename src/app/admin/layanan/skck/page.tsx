import { Suspense } from "react";
import KelolaSkck from "@/app/admin/suspense/layanan/skck/skck-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function EditSIKPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      <PathWrapper />
      <KelolaSkck />
    </Suspense>
  );
}
