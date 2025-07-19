import { Suspense } from "react";
import dynamic from "next/dynamic";
import KelolaIzinKeramaian from "../../suspense/layanan/sik/sik-suspense";

export default function SIKPage() {
  return (
    <Suspense fallback={<div>Loading  sik...</div>}>
      <KelolaIzinKeramaian />
    </Suspense>
  );
}
