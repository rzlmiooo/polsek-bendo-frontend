import { Suspense } from "react";
import Login from "../suspense/auth/login-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      {/* < PathWrapper /> */}
      <Login />
    </Suspense>
  );
}
