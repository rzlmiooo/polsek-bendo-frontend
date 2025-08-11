import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polsek Bendo",
  description: "Website Layanan Masyarakat dari Kepolisian Sektor Kecamatan Bendo",
  verification: {
    google: 'kPptZ5boJ9QHlGWamNOX1TXLEPZruxtoGj-WHwaT-JI'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900`}
      >
        {children}
        <Script src="/node_modules/preline/preline.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
