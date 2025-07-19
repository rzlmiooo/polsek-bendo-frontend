import { Suspense } from "react";
import dynamic from "next/dynamic";
import Login from "../suspense/auth/login-suspense";
import Registration from "../suspense/auth/register-suspense";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading edit form...</div>}>
      <Registration />
    </Suspense>
  );
}
