import { Suspense } from "react";
import Login from "../suspense/auth/login-suspense";
import PathWrapper from "../components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Login",
    description: "Halaman Login layanan masyarakat Polsek Bendo.",
};


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading  login page...</div>}>
      {/* <PathWrapper /> */}
      <Login />
    </Suspense>
  );
}
