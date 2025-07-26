import { Suspense } from "react";
import Article from "../suspense/article/article-suspense";
import PathWrapper from "../components/pathWrapper";
import usePageTitle from "../hooks/usePath";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Berita",
    description: "Polisi daerah sekitar Kecamatan Bendo",
};

export default function ArticlePage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      {/* <PathWrapper /> */}
      <Article />
    </Suspense>
  );
}
