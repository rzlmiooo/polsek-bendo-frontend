import { Suspense } from "react";
import ReadArticle from "../../suspense/article/read-article-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function ReadArticlePage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      <PathWrapper />
      <ReadArticle />
    </Suspense>
  );
}
