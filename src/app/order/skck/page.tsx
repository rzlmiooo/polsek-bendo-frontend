import { Suspense } from "react";
import Skck from "@/app/suspense/order/skck/order-skck-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function SkckPage() {
  return (
    <Suspense fallback={<div>Loading  skck...</div>}>
      {/* <PathWrapper/> */}
      <Skck />
    </Suspense>
  );
}
