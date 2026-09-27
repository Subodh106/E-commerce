import AdminSidebar from "@/components/web/admin/admin-sidebar";
import AdminHeader from "@/components/web/admin/admin-header";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <AdminSidebar />

      <div className="ml-64">
        <AdminHeader />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}