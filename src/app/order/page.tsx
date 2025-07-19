import { Suspense } from "react";
import dynamic from "next/dynamic";
import Article from "../suspense/article/article-suspense";
import Order from "../suspense/order/order-suspense";

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading  order...</div>}>
      <Order />
    </Suspense>
  );
}
