import { Suspense } from "react";
import dynamic from "next/dynamic";
import EditArticle from "../../suspense/article/edit-article-suspense";

export default function EditArticlePage() {
  return (
    <Suspense fallback={<div>Loading edit form...</div>}>
      <EditArticle />
    </Suspense>
  );
}
