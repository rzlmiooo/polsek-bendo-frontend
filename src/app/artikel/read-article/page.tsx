import { Suspense } from "react";
import dynamic from "next/dynamic";
import ReadArticle from "../../suspense/article/read-article-suspense";

export default function ReadArticlePage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      <ReadArticle />
    </Suspense>
  );
}
