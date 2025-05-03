import { useState } from "react";
import Parse from "@/api/parseClient";

export function AnalyticsPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Preencha usuário e senha.");
      return;
    }

    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("isAdmin", isAdmin);

    try {
      await user.signUp();
      setMessage("Usuário cadastrado com sucesso!");
      setUsername("");
      setPassword("");
      setIsAdmin(false);
    } catch (err: any) {
      setMessage("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-6">
      <div className="w-full max-w-[40rem] bg-[#2a2a2e] p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Cadastro de novos usuários
        </h1>

        {message && (
          <p className="text-sm text-[var(--green-500)] mb-4 text-center">
            {message}
          </p>
        )}

        {/* Nome de usuário */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-white mb-1">Nome de usuário:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o nome de usuário"
            className="w-full px-3 py-2 rounded border border-gray-600 bg-[#1e1e20] text-white"
          />
        </div>

        {/* Senha */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-1">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha"
            className="w-full px-3 py-2 rounded border border-gray-600 bg-[#1e1e20] text-white"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-6 text-white">
          <input
            id="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label htmlFor="isAdmin">É administrador?</label>
        </div>

        {/* Botão */}
        <div className="flex justify-end">
          <button
            onClick={handleRegister}
            className="bg-[var(--green-200)] hover:bg-[var(--green-300)] text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
