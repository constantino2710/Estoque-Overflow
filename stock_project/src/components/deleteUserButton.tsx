/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Parse from "parse/dist/parse.min.js";

interface DeleteUserButtonProps {
  userId: string;
  onSuccess?: () => void;
}

export function DeleteUserButton({ userId, onSuccess }: DeleteUserButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Agora vamos USAR o error!

  async function handleDelete() {
    const confirmDelete = confirm("Tem certeza que deseja deletar este usuário?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError(null);

      const response = await Parse.Cloud.run("removeUser", { userId });

      if (response.success) {
        alert(response.message);
        if (onSuccess) onSuccess();
      } else {
        setError("Não foi possível remover o usuário.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido ao remover o usuário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-2 text-[var(--red-100)] hover:text-[var(--red)] rounded-full transition duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer"
        title="Deletar Usuário"
      >
        {loading ? (
          <span className="text-xs">...</span> // Enquanto carrega
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        )}
      </button>

      {/* Erro exibido bonitinho */}
      {error && (
        <p className="text-xs text-red-500 mt-1 text-center max-w-[150px]">{error}</p>
      )}
    </div>
  );
}
