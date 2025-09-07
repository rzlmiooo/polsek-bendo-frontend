import { Suspense } from "react";
import OrderSik from "@/app/suspense/order/sik/order-sik-suspense";

export default function SikPage() {
  return (
    <Suspense>
      <OrderSik />
    </Suspense>
  );
}
