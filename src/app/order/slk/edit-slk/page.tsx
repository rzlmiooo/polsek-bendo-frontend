import { Suspense } from "react";
import EditSlk from "@/app/suspense/order/slk/order-edit-slk-suspense";
import PathWrapper from "@/app/components/pathWrapper";


export default function EditSlkPage() {
  return (
    <Suspense fallback={<div>Loading  edit surat laporan kehilangan...</div>}>
      <PathWrapper />
      <EditSlk />
    </Suspense>
  );
}
