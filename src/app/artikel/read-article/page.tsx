import { Suspense } from "react";
import type { Metadata } from "next";
import ReadArticle from "../../suspense/article/read-article-suspense";

export const metadata: Metadata = {
  title: "Polsek Bendo - Detail Artikel",
  description: "Baca artikel lengkap dan berita terbaru dari Polsek Bendo.",
  verification: {
    google: 'kPptZ5boJ9QHlGWamNOX1TXLEPZruxtoGj-WHwaT-JI'
  }
};

export default function ReadArticlePage() {
  return (
    <Suspense>
      <ReadArticle />
    </Suspense>
  );
}
