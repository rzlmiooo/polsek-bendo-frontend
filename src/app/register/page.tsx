import { Suspense } from "react";
import Registration from "../suspense/auth/register-suspense";
import PathWrapper from "../components/pathWrapper";


export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading  edit sik...</div>}>
      <PathWrapper />
      <Registration />
    </Suspense>
  );
}
