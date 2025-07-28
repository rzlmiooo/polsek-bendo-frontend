import AdminNavbar from "@/app/components/adminnavbar"

export default function AdminDasboard(){
    return(
        <div className="bg-white dark:bg-gray-900 h-screen">
            <AdminNavbar/>
            <main className="lg:ml-[260px] pt-10 py-8 px-6">
                <h1 className="text-2xl font-bold text-white z-50">Dashboard Admin</h1>
            </main>
        </div>
    )
}