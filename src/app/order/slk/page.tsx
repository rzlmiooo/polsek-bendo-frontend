import { Suspense } from "react";
import OrderSlk from "@/app/suspense/order/slk/order-slk-suspense";
import PathWrapper from "@/app/components/pathWrapper";


export default function SlkPage() {
  return (
    <Suspense fallback={<div>Loading  surat laporan kehilangan...</div>}>
      <PathWrapper />
      <OrderSlk />
    </Suspense>
  );
}
