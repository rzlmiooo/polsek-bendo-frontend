import { Suspense } from "react";
import dynamic from "next/dynamic";
import OrderSik from "@/app/suspense/order/sik/order-sik-suspense";

export default function SikPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin kehilangan...</div>}>
      <OrderSik />
    </Suspense>
  );
}
