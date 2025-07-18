import { Suspense } from "react";
import dynamic from "next/dynamic";

const EditArticle = dynamic(() => import("./EditArticle"), { ssr: false });

export default function EditArticlePage() {
  return (
    <Suspense fallback={<div>Loading edit form...</div>}>
      <EditArticle />
    </Suspense>
  );
}
