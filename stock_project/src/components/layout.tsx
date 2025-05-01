import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar/sidebar";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`grid h-screen transition-all duration-300 
        ${sidebarOpen ? "grid-cols-[15rem_1fr]" : "grid-cols-[4.5rem_1fr]"}`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="max-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
