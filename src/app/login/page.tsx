import { Suspense } from "react";
import Login from "../suspense/auth/login-suspense";
import PathWrapper from "../components/pathWrapper";


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading  login page...</div>}>
      {/* <PathWrapper /> */}
      <Login />
    </Suspense>
  );
}
