import { useNavigate } from "react-router-dom";
import Parse from "@/api/parseClient";
import { useAuth } from "@/auth/useAuth";

export function LogoutButton() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      refreshUser(); // limpa o usuário no contexto
      navigate("/login"); // redireciona para o login
    } catch (error: unknown) {
      console.error("Erro ao deslogar:", error);
      alert("Erro ao sair.");
    }
  };

  return (
    <button
    
      onClick={handleLogout}
      
      className=" px-4 py-2 text-[var(--red-600)] rounded transition cursor-pointer flex items-center justify-start gap-2 w-full"
    >
            <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 stroke-current"
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

      Sair
    </button>
  );
}
