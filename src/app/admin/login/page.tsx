import { Suspense } from "react";
import dynamic from "next/dynamic";
import Login from "../suspense/auth/login-suspense";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading edit form...</div>}>
      <Login />
    </Suspense>
  );
}
