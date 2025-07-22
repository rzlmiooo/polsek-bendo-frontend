import { Suspense } from "react";
import OrderPm from "@/app/suspense/order/pm/order-pm-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function OrderPmPage() {
  return (
    <Suspense fallback={<div>Loading  Notes...</div>}>
      {/* <PathWrapper /> */}
      <OrderPm/>
    </Suspense>
  );
}
