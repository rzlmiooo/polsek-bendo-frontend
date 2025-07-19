import { Suspense } from "react";
import dynamic from "next/dynamic";
import OrderEditSik from "@/app/suspense/order/sik/order-edit-sik";

export default function EditSikPage() {
  return (
    <Suspense fallback={<div>Loading  edit surat izin kehilangan..</div>}>
      <OrderEditSik />
    </Suspense>
  );
}
