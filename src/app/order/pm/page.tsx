import { Suspense } from "react";
import dynamic from "next/dynamic";
import OrderPm from "@/app/suspense/order/pm/order-pm-suspense";

export default function OrderPmPage() {
  return (
    <Suspense fallback={<div>Loading  Notes...</div>}>
      <OrderPm/>
    </Suspense>
  );
}
