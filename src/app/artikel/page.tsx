import { Suspense } from "react";
import Article from "../suspense/article/article-suspense";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Berita",
    description: "Update berita terbaru dari Divisi Humas Polsek Bendo",
    verification: {
      google: 'kPptZ5boJ9QHlGWamNOX1TXLEPZruxtoGj-WHwaT-JI'
    }
};

export default function ArticlePage() {
  return (
    <Suspense>
      <Article />
    </Suspense>
  );
}
