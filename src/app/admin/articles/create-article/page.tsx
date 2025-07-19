import { Suspense } from "react";
import dynamic from "next/dynamic";
import CreateArticle from "../../suspense/article/create-article-suspense";

export default function CreateArticlePage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      <CreateArticle />
    </Suspense>
  );
}
