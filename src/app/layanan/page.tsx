import { Suspense } from "react";
import dynamic from "next/dynamic";
import ListLayanan from "../suspense/layanan/list-layanan-suspense";

export default function LayananPage() {
  return (
    <Suspense fallback={<div>Loading  list layanan...</div>}>
      <ListLayanan/>
    </Suspense>
  );
}