import { Suspense } from "react";
import Unauthorized from "./suspense/auth/unauthorized-suspense";
import PathWrapper from "./components/pathWrapper";
import { Analytics } from "@vercel/analytics/next";
import Home from "./suspense/beranda/main-suspense";
import Script from 'next/script';
import { Metadata } from 'next';
import Head from "next/head";


export default function MainPage() {
  return (
    <Suspense fallback={<div>Redirect Home Page...</div>}>
      <Head>
        <head>
          <title>Polsek Bendo</title>
          <meta name="google-site-verification" content="kPptZ5boJ9QHlGWamNOX1TXLEPZruxtoGj-WHwaT-JI" />        
        </head>
      </Head>
      <Analytics />
      {/* <PathWrapper /> */}
      <Home />
      <Script src="/node_modules/preline/preline.js" strategy="afterInteractive" />
    </Suspense>
  );
}
