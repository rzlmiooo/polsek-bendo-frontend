import { Suspense } from "react";
import dynamic from "next/dynamic";
import EditSlk from "@/app/suspense/order/slk/order-edit-slk-suspense";

export default function EditSlkPage() {
  return (
    <Suspense fallback={<div>Loading  edit surat laporan kehilangan...</div>}>
      <EditSlk />
    </Suspense>
  );
}
