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

export function UserAdminList() {
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

  if (loading) return <p className="text-white">Carregando usuários...</p>;

  return (
    <div className="w-full bg-[var(--gray-800)] p-6 rounded-xl text-white h-[30rem]">
      <h2 className="text-2xl font-bold mb-4">Usuários Cadastrados</h2>
      <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100%-3rem)] pr-2 scrollbar-hide">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between gap-6 bg-[var(--gray-900)] rounded-lg p-4 shadow-sm border border-[var(--gray-800)] w-full"
          >
            {/* Imagem ou inicial */}
            <div className="flex-shrink-0">
              {u.profileImage ? (
                <img
                  src={u.profileImage}
                  alt={`Foto de ${u.username}`}
                  className="w-10 h-10 rounded-full object-cover border border-[var(--primary)]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[var(--gray-600)] flex items-center justify-center text-sm text-white">
                  {u.username[0].toUpperCase()}
                </div>
              )}
            </div>

            {/* Informações do usuário */}
            <div className="flex flex-row flex-wrap items-center justify-between w-full text-sm text-[var(--gray-200)]">
              <div className="w-[25%] font-semibold text-[var(--primary)]">{u.username}</div>
              <div className="w-[20%]">{u.isAdmin ? "Admin" : "Usuário"}</div>
              <div className="w-[30%]">Criado em: {new Date(u.createdAt).toLocaleDateString()}</div>
              <div className="w-[25%]">Criado por: {u.createdBy || "Desconhecido"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
