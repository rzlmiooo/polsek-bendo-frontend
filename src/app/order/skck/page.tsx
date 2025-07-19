import { Suspense } from "react";
import dynamic from "next/dynamic";
import SkckForm from "@/app/suspense/layanan/skck/skck-suspense";

export default function SkckPage() {
  return (
    <Suspense fallback={<div>Loading  skck...</div>}>
      <SkckForm />
    </Suspense>
  );
}
