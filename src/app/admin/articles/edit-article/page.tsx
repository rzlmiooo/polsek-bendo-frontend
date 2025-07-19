import { Suspense } from "react";
import EditArticle from "../../suspense/article/edit-article-suspense";
import PathWrapper from "@/app/components/pathWrapper";


export default function EditArticlePage() {
  return (
    <Suspense fallback={<div>Loading edit form...</div>}>
      < PathWrapper />
      <EditArticle />
    </Suspense>
  );
}
