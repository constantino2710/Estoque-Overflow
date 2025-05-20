"use client";

import { useEffect, useState } from "react";
import Parse from "@/api/parseClient";

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
  createdBy: string | null;
  profileImage: string | null;
}

interface UserAdminListProps {
  onOpenModal: () => void;
}

export function UserAdminList({ onOpenModal }: UserAdminListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await Parse.Cloud.run("getAllUsers");
        setUsers(result);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
      {/* Título e botão */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shrink-0">
        <h2 className="text-2xl font-bold text-[var(--text)]">Usuários Cadastrados</h2>
        <button
          onClick={onOpenModal}
          className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white px-4 py-2 text-sm rounded-lg font-medium shadow transition duration-200 ease-in-out cursor-pointer"
        >
          Cadastrar novo usuário
        </button>
      </div>

      {loading && <p className="text-[var(--text)]">Carregando usuários...</p>}

      {!loading && (
        <div className="flex flex-col gap-3 overflow-y-auto grow min-h-0 pr-1 scrollbar-thin scrollbar-thumb-[var(--primary)] scrollbar-track-[var(--bg4)] pb-[4px]">
          {users.length === 0 && (
            <p className="text-white">Nenhum usuário encontrado.</p>
          )}
          {users.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-4 bg-[var(--bg1)] p-4 rounded-lg border border-[var(--border)] shadow-sm w-full transition-all duration-300"
            >
              <div className="flex-shrink-0">
                {u.profileImage ? (
                  <img
                    src={u.profileImage}
                    alt={`Foto de ${u.username}`}
                    className="w-10 h-10 rounded-full object-cover border border-[var(--primary)]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[var(--bg4)] flex items-center justify-center text-sm text-white">
                    {u.username[0].toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex flex-col text-sm text-white w-full min-w-0">
                <div className="flex flex-col xs:flex-row justify-between gap-1 xs:items-center w-full">
                  <span
                    className="font-semibold text-[var(--primary)] truncate"
                    title={u.username}
                  >
                    {u.username}
                  </span>
                  <span className="text-[var(--text)] whitespace-nowrap">
                    {u.isAdmin ? "Admin" : "Usuário"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-1 text-[var(--text)] text-xs pt-1 w-full">
                  <span className="truncate">Criado em: {new Date(u.createdAt).toLocaleDateString()}</span>
                  <span className="truncate">Criado por: {u.createdBy || "Desconhecido"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
