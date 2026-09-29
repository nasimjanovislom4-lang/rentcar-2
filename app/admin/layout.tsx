import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin CRM & Fleet Management — AutoRent Pro",
  description: "Avtopark boshqaruvi, GPS monitoring, tushumlar tahlili va buyurtmalar nazorati",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <AdminSidebar />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {children}
      </div>
    </div>
  );
}
