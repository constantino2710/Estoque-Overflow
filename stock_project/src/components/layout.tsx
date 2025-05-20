import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar/sidebar";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const layoutCols = isMobile
    ? "grid-cols-[4.5rem_1fr]"
    : sidebarOpen
    ? "grid-cols-[15rem_1fr]"
    : "grid-cols-[4.5rem_1fr]";

  return (
    <div
      className={`grid h-screen transition-all duration-300 ${layoutCols}`}
    >
      <Sidebar
        isOpen={isMobile ? false : sidebarOpen}
        toggle={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="max-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
