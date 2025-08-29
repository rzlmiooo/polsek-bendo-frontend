import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import Home from "./suspense/beranda/main-suspense";
import Script from 'next/script';

export default function MainPage() {
  return (
    <Suspense>
      <Analytics />
      <Home />
      <Script src="/node_modules/preline/preline.js" strategy="afterInteractive" />
    </Suspense>
  );
}
