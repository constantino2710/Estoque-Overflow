import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";

export function MainLayout() {
  return (
    <div className="grid grid-cols-[208px_1fr] gap-8 items-start h-screen">
      <Sidebar />
      <div className="p-4">
        <Outlet /> {/* Aqui as rotas aninhadas são renderizadas */}
      </div>
    </div>
  );
}
