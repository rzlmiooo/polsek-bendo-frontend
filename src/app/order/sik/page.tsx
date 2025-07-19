import { Suspense } from "react";
import OrderSik from "@/app/suspense/order/sik/order-sik-suspense";
import PathWrapper from "@/app/components/pathWrapper";


export default function SikPage() {
  return (
    <Suspense fallback={<div>Loading  surat izin kehilangan...</div>}>
      <PathWrapper />
      <OrderSik />
    </Suspense>
  );
}
