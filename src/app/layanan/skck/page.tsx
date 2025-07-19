import { Suspense } from "react";
import dynamic from "next/dynamic";
import SkckForm from "@/app/suspense/layanan/skck/skck-suspense";

export default function SKCKPage() {
  return (
    <Suspense fallback={<div>Loading  skck form...</div>}>
      <SkckForm/>
    </Suspense>
  );
}