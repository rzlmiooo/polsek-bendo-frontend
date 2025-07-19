import { Suspense } from "react";
import ListLayanan from "../suspense/layanan/list-layanan-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function LayananPage() {
  return (
    <Suspense fallback={<div>Loading  list layanan...</div>}>
      <PathWrapper />
      <ListLayanan/>
    </Suspense>
  );
}