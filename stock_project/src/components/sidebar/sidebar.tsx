import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Parse from "@/api/parseClient";
import { LogoutButton } from "../logoutButton";
import logo from "@/assets/image.png";
import logoSimbolo from "@/assets/logo.png";
import { IfAdmin } from "@/auth/ifAdmin";
import { SidebarToggle } from "./sidebarToggle";
import { LucideHome, LucideLayers, Lock } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [userInfo, setUserInfo] = useState<{ username: string; profileImage: string | null } | null>(null);

  useEffect(() => {
    const user = Parse.User.current();
    if (user) {
      const username = user.get("username") || "";
      const image = user.get("profileImage");
      const profileImage = image ? image.url() : null;
      setUserInfo({ username, profileImage });
    }
  }, []);

  const linkClass = (path: string) =>
    `${
      pathname === path ? "text-[var(--secondary)]" : "text-[var(--gray-300)]"
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
        <div className={`w-full flex ${isOpen ? "justify-end pr-4" : "justify-center"} pt-4`}>
          <SidebarToggle isOpen={isOpen} toggle={toggle} />
        </div>

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

          <IfAdmin>
            <button className={linkClass("/admin")} onClick={() => navigate("/admin")}>
              <Lock size={20} />
              {isOpen && "Admin"}
            </button>
          </IfAdmin>
        </div>
      </div>

      {/* Rodapé com admin, nome e avatar */}
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

        {/* Foto + nome */}
        {userInfo && (
          <div className={`flex items-center gap-2 mb-2 ${isOpen ? "" : "justify-center"}`}>
            {userInfo.profileImage ? (
              <img
                src={userInfo.profileImage}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border border-[var(--primary)]"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[var(--gray-500)] flex items-center justify-center text-xs text-white">
                {userInfo.username[0].toUpperCase()}
              </div>
            )}
            {isOpen && (
              <p className="text-[var(--gray-300)] text-sm truncate">{userInfo.username}</p>
            )}
          </div>
        )}

        {/* Logout */}
        <LogoutButton isSidebarOpen={isOpen} />
      </div>
    </div>
  );
}
