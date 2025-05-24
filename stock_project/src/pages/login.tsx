import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "@/api/parseClient";
import { useAuth } from "@/auth/useAuth";
import logo from '@/assets/image.png';

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Preencha usuário e senha.");
      return;
    }

    try {
      await Parse.User.logIn(username, password);
      refreshUser();
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Parse.Error) {
        alert("Erro ao fazer login: " + err.message);
      } else {
        alert("Erro ao fazer login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg1)] p-4">
      <div className='flex flex-col items-center gap-6 w-full max-w-md'>
        <img 
          src={logo} 
          alt="Logo" 
          className="w-48 h-auto object-contain sm:w-64 md:w-80 lg:w-96"
        />
        <div className="bg-[var(--bg2)] p-6 rounded shadow-md w-full border border-[var(--border)]">
          <h2 className="text-xl font-semibold mb-4 text-[var(--text)]">Login</h2>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 p-2 border rounded border-[var(--border)] text-[var(--text)]"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded border-[var(--border)] text-[var(--text)]"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[var(--primary)] text-[var(--text)] py-2 rounded hover:bg-[var(--secondary)] transition cursor-pointer"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
} 
