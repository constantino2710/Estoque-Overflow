import { useNavigate } from "react-router-dom";
import Parse from "@/api/parseClient";
import { useAuth } from "@/auth/useAuth";

interface LogoutButtonProps {
  isSidebarOpen: boolean;
}

export function LogoutButton({ isSidebarOpen }: LogoutButtonProps) {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      refreshUser();
      navigate("/login");
    } catch (error: unknown) {
      console.error("Erro ao deslogar:", error);
      alert("Erro ao sair.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`
    w-full h-[2.5rem] px-2 rounded transition cursor-pointer
    flex items-center ${
      isSidebarOpen ? "justify-start gap-2" : "justify-center"
    }
    bg-transparent
  `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 stroke-[var(--red)] flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      {isSidebarOpen && (
        <span className="text-[var(--red)] text-sm !text-[var(--red)]">
          Sair
        </span>
      )}
    </button>
  );
}
