import { Suspense } from "react";
import dynamic from "next/dynamic";
import OrderSlk from "@/app/suspense/order/slk/order-slk-suspense";

export default function SlkPage() {
  return (
    <Suspense fallback={<div>Loading  surat laporan kehilangan...</div>}>
      <OrderSlk />
    </Suspense>
  );
}
