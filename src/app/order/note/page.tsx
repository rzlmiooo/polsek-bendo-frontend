import { Suspense } from "react";
import dynamic from "next/dynamic";
import Note from "@/app/suspense/order/note-suspense";

export default function NotePage() {
  return (
    <Suspense fallback={<div>Loading  Notes...</div>}>
      <Note/>
    </Suspense>
  );
}
