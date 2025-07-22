import { Suspense } from "react";
import KelolaIzinKeramaian from "../../suspense/layanan/sik/sik-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  sik...</div>}>
      {/* < PathWrapper /> */}
      <KelolaIzinKeramaian />
    </Suspense>
  );
}
