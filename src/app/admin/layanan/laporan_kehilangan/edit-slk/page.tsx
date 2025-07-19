import { Suspense } from "react";
import EditSlk from "@/app/admin/suspense/layanan/slk/edit-slk-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  sik...</div>}>
      <PathWrapper/>
      <EditSlk />
    </Suspense>
  );
}
