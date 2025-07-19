import { Suspense } from "react";
import SkckForm from "@/app/suspense/layanan/skck/skck-suspense";
import PathWrapper from "@/app/components/pathWrapper";


export default function SkckPage() {
  return (
    <Suspense fallback={<div>Loading  skck...</div>}>
      <PathWrapper/>
      <SkckForm />
    </Suspense>
  );
}
