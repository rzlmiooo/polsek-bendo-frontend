import { Suspense } from "react";
import dynamic from "next/dynamic";
import KelolaSkck from "@/app/admin/suspense/layanan/skck/skck-suspense";

export default function EditSIKPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      <KelolaSkck />
    </Suspense>
  );
}
