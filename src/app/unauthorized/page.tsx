import { Suspense } from "react";
import Unauthorized from "../suspense/auth/unauthorized-suspense";
import PathWrapper from "../components/pathWrapper";

export default function UnauthorizedPage() {
  return (
    <Suspense fallback={<div>Redirect Unauthorized Page...</div>}>
      <PathWrapper />
        <Unauthorized />
    </Suspense>
  );
}
