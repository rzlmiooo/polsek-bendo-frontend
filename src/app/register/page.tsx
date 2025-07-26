import { Suspense } from "react";
import Registration from "../suspense/auth/register-suspense";
import PathWrapper from "../components/pathWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Polsek Bendo - Register",
    description: "Buat akun baru agar bisa menggunakan layanan kami.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading  register page...</div>}>
      {/* <PathWrapper /> */}
      <Registration />
    </Suspense>
  );
}
