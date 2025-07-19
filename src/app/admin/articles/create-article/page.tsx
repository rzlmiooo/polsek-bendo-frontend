import { Suspense } from "react";
import CreateArticle from "../../suspense/article/create-article-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function CreateArticlePage() {
  return (
    <Suspense fallback={<div>Loading  create article...</div>}>
      <PathWrapper />
      <CreateArticle />
    </Suspense>
  );
}
