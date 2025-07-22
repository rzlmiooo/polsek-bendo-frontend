import { Suspense } from "react";
import Order from "../suspense/order/order-suspense";
import PathWrapper from "../components/pathWrapper";


export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading  order...</div>}>
      {/* <PathWrapper /> */}
      <Order />
    </Suspense>
  );
}
