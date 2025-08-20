import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import Home from "./suspense/beranda/main-suspense";
import Script from 'next/script';
import Head from "next/head";

export default function MainPage() {
  return (
    <Suspense fallback={<div>Redirect Home Page...</div>}>
      <Head>
        <head>
          <title>Polsek Bendo</title>
          <meta name="google-site-verification" content="kPptZ5boJ9QHlGWamNOX1TXLEPZruxtoGj-WHwaT-JI" />
        </head>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "PoliceStation",
              "name": "POLSEK Bendo",
              "image": "https://polsek-bendo.my.id/Polda_Jawa_Timur.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Raya Bendo No.209, Belotan Magetan",
                "addressLocality": "Magetan",
                "addressRegion": "Jawa Timur",
                "postalCode": "63352",
                "addressCountry": "ID"
              },
              "telephone": "+62 812-3461-9123",
              "url": "https://polsek-bendo.my.id"
            }
          `}
        </script>
      </Head>
      <Analytics />
      {/* <PathWrapper /> */}
      <Home />
      <Script src="/node_modules/preline/preline.js" strategy="afterInteractive" />
    </Suspense>
  );
}
