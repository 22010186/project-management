import { NavBar } from "@/components/header/nav";
import { Sidebar } from "@/components/sidebar";

export default function DashBoardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex w-full flex-col md:pl-64">
        <NavBar />

        {children}
      </main>
    </div>
  );
}
