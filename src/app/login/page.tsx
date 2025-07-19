import { Suspense } from "react";
import Login from "../suspense/auth/login-suspense";
import PathWrapper from "../components/pathWrapper";


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      <PathWrapper />
      <Login />
    </Suspense>
  );
}
