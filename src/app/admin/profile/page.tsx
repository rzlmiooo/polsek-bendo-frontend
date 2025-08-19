import { Suspense } from "react";
import AdminProfile from "../suspense/profile/profile-suspense";

import PathWrapper from "@/app/components/pathWrapper";

export default function ArticlePage() {
  return (
    <Suspense fallback={<div>Loading  profile page...</div>}>
      <AdminProfile/>
    </Suspense>
  );
}
