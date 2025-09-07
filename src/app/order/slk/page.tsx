import { Suspense } from "react";
import OrderSlk from "@/app/suspense/order/slk/order-slk-suspense";

export default function SlkPage() {
  return (
    <Suspense>
      <OrderSlk />
    </Suspense>
  );
}
