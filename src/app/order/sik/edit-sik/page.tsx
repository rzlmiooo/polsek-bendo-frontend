import { Suspense } from "react";
import OrderEditSik from "@/app/suspense/order/sik/order-edit-sik";
import PathWrapper from "@/app/components/pathWrapper";


export default function EditSikPage() {
  return (
    <Suspense fallback={<div>Loading  edit surat izin kehilangan..</div>}>
      {/* <PathWrapper/> */}
      <OrderEditSik />
    </Suspense>
  );
}
