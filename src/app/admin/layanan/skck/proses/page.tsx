import { Suspense } from "react";
import ProsesSKCK from "@/app/admin/suspense/layanan/skck/proses-suspense";

export default function Proses(){
    return (
        <Suspense fallback={<div>Loading edit SKCK...</div>}>
            <ProsesSKCK/>
        </Suspense>
    )
}