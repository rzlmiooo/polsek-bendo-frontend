import { Suspense } from "react";
import Order from "../suspense/order/order-suspense";
import PathWrapper from "../components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Cek Layanan Masyarakat",
    description: "Cek proses pembuatan SKCK, laporan kehilangan, pengaduan masyarakat, rencana acara, dan izin keramaian.",
};

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading  order...</div>}>
      {/* <PathWrapper /> */}
      <Order />
    </Suspense>
  );
}
