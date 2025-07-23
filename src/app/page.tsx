import { Suspense } from "react";
import Unauthorized from "./suspense/auth/unauthorized-suspense";
import PathWrapper from "./components/pathWrapper";
import { Analytics } from "@vercel/analytics/next";
import Home from "./suspense/beranda/main-suspense";
import Script from 'next/script';
import { Metadata } from 'next';

export const metadata: Metadata = {
  other: {
    'google-site-verification': 'kPptZ5boJ9QHlGWamNOX1TXLEPZruxtoGj-WHwaT-JI',
  },
};

export default function MainPage() {
  return (
    <Suspense fallback={<div>Redirect Home Page...</div>}>
      <Analytics />
      {/* <PathWrapper /> */}
        <Home/>
        <Script src="/node_modules/preline/preline.js" strategy="afterInteractive" />
    </Suspense>
  );
}
