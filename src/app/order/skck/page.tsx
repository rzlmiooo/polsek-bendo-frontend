import { Suspense } from "react";
import Skck from "@/app/suspense/order/skck/order-skck-suspense";

export default function SkckPage() {
  return (
    <Suspense>
      <Skck />
    </Suspense>
  );
}
