import { Suspense } from "react";
import Article from "../suspense/article/article-suspense";
import PathWrapper from "../components/pathWrapper";


export default function ArticlePage() {
  return (
    <Suspense fallback={<div>Loading  article...</div>}>
      <PathWrapper />
      <Article />
    </Suspense>
  );
}
