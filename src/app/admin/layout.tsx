import AdminNavbar from '@/app/components/adminnavbar';

export default function AdminRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AdminNavbar/>
            {children}
        </div>
    );
}
