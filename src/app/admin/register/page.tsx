import { Suspense } from "react";
import Registration from "../suspense/auth/register-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading edit form...</div>}>
      <PathWrapper />
      <Registration />
    </Suspense>
  );
}
