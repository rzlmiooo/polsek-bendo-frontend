import { Suspense } from "react";
import Note from "@/app/suspense/order/note-suspense";
import PathWrapper from "@/app/components/pathWrapper";

export default function NotePage() {
  return (
    <Suspense fallback={<div>Loading  Notes...</div>}>
      {/* <PathWrapper /> */}
      <Note/>
    </Suspense>
  );
}
