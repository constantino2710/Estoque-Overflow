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
    `${pathname === path ? "text-[var(--active)]" : "text-[var(--unactive)]"} 
     cursor-pointer text-base w-full rounded-lg h-[2.5rem] flex items-center justify-center gap-2 
     ${isOpen ? "justify-start px-4" : "justify-center"} 
     hover:bg-[var(--bg3)] transition`;

  return (
    <div
      className={`h-screen bg-[var(--bggreen)] text-white flex flex-col justify-between border-r-2 border-[var(--border)]
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
        <div className="pt-4 flex flex-col gap-1 intems-center justify-center">
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
      <div className="pb-4 px-4 ">
      <div
  className={`bg-[var(--bggreen2)] border border-[var(--active)] rounded-xl flex flex-col items-center transition-all duration-300 ${
    isOpen ? "px-3 py-2" : "p-2"
  }`}
>
  {userInfo && (
    <>
      <div
        className={`${
          isOpen
            ? "flex items-center gap-2 w-full"
            : "flex flex-col items-center justify-center"
        }`}
      >
        {/* Foto do usuário */}
        {userInfo.profileImage ? (
          <img
            src={userInfo.profileImage}
            alt="Avatar"
            className={`rounded-full object-cover border border-[var(--primary)] ${
              isOpen
                ? "w-[2.5rem] h-[2.5rem] min-w-[2.5rem] min-h-[2.5rem]"
                : "w-[2rem] h-[2rem] min-w-[2rem] min-h-[2rem]"
            }`}
          />
        ) : (
          <div
            className={`rounded-full bg-[var(--bg3)] flex items-center justify-center text-sm text-white ${
              isOpen ? "w-10 h-10" : "w-8 h-8"
            }`}
          >
            {userInfo.username[0].toUpperCase()}
          </div>
        )}

        {/* Nome + Admin (sidebar aberta) */}
        {isOpen && (
          <div className="flex flex-col text-sm text-[var(--text)] overflow-hidden">
            <p className="truncate max-w-[7rem]" title={userInfo.username}>
              {userInfo.username}
            </p>
            <IfAdmin>
              <p className="text-xs text-[var(--text)]">Admin</p>
            </IfAdmin>
          </div>
        )}
      </div>

      {/* Admin abaixo da foto (sidebar fechada) */}
      {!isOpen && (
        <IfAdmin>
          <p className="text-xs text-[var(--text)] mt-2">Adm</p>
        </IfAdmin>
      )}
    </>
  )}
</div>

        {/* Logout */}
        <LogoutButton isSidebarOpen={isOpen} />
      </div>
    </div>
  );
}
