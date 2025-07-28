import { Suspense } from "react";
import KelolaSkck from "@/app/admin/suspense/layanan/skck/skck-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function SKCKPage() {
  return (
    <Suspense fallback={<div>Loading SKCK...</div>}>
      {/* <PathWrapper /> */}
      <KelolaSkck />
    </Suspense>
  );
}
