import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUsername } from "@/services/userService";
import { LogoutButton } from "../logoutButton";
import logo from "@/assets/image.png";
import logoSimbolo from "@/assets/logo.png";
import { IfAdmin } from "@/auth/ifAdmin";
import { SidebarToggle } from "./sidebarToggle";
import { LucideHome, LucideLayers, LucideChartBar } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsername() {
      const user = await getCurrentUsername();
      setUsername(user);
    }
    fetchUsername();
  }, []);

  const linkClass = (path: string) =>
    `${
      pathname === path ? "text-[var(--green-300)]" : "text-[var(--gray-300)]"
    } 
    cursor-pointer text-base w-full rounded-lg h-[2.5rem] flex items-center gap-2 
    ${isOpen ? "justify-start px-4" : "justify-center"} 
    hover:bg-[var(--gray-500)] transition`;

  return (
    <div
      className={`h-screen bg-[var(--gray-600)] text-white flex flex-col justify-between 
      ${isOpen ? "w-[15rem]" : "w-[4.5rem]"} transition-all duration-300`}
    >
      {/* Topo com toggle e logo */}
      <div className="flex flex-col w-full">
        {/* Toggle no topo */}
        <div className={`w-full flex ${isOpen ? "justify-end pr-4" : "justify-center"} pt-4`}>
          <SidebarToggle isOpen={isOpen} toggle={toggle} />
        </div>

        {/* Logo abaixo do toggle */}
        <div className="w-full flex justify-center py-2">
          <img
            src={isOpen ? logo : logoSimbolo}
            alt="Logo"
            className={`object-contain ${isOpen ? "h-[3rem]" : "h-[2.5rem]"}`}
          />
        </div>

        {/* Navegação */}
        <div className="pt-4 flex flex-col gap-1">
          <button className={linkClass("/")} onClick={() => navigate("/")}>
            <LucideHome size={20} />
            {isOpen && "Dashboard"}
          </button>

          <button className={linkClass("/stock")} onClick={() => navigate("/stock")}>
            <LucideLayers size={20} />
            {isOpen && "Estoque"}
          </button>

          <button className={linkClass("/analytics")} onClick={() => navigate("/analytics")}>
            <LucideChartBar size={20} />
            {isOpen && "Análises"}
          </button>
        </div>
      </div>

      {/* Rodapé com admin, nome do usuário e logout */}
      <div className="pb-4 px-4">
        {/* Exibição de Admin */}
        {isOpen ? (
          <div className="text-sm mb-1">
            <IfAdmin>Admin</IfAdmin>
          </div>
        ) : (
          <div className="text-center text-sm mb-1">
            <IfAdmin>Admin</IfAdmin>
          </div>
        )}

        {/* Nome do usuário */}
        {isOpen ? (
          <p className="text-[var(--gray-300)] mb-2">
            {username || "Carregando..."}
          </p>
        ) : null}

        {/* Logout */}
        <LogoutButton isSidebarOpen={isOpen} />
      </div>
    </div>
  );
}
