import { Suspense } from "react";
import dynamic from "next/dynamic";
import Article from "../suspense/article/article-suspense";

export default function ArticlePage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      <Article />
    </Suspense>
  );
}
