import { Suspense } from "react";
import Unauthorized from "./suspense/auth/unauthorized-suspense";
import PathWrapper from "./components/pathWrapper";
import Home from "./suspense/beranda/main-suspense";

export default function MainPage() {
  return (
    <Suspense fallback={<div>Redirect Home Page...</div>}>
      <PathWrapper />
        <Home/>
    </Suspense>
  );
}
