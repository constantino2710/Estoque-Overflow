"use client";

import { useEffect, useState } from "react";
import { getLastStockUpdates } from "@/services/stockService";

interface StockUpdate {
  productName: string;
  quantity: number;
  action: "add" | "remove";
  user: {
    id: string;
    username: string;
    profileImage?: string | null;
  };
  createdAt: string;
}

export function HistoryItems() {
  const [updates, setUpdates] = useState<StockUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const result = await getLastStockUpdates();
        setUpdates(result);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpdates();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[32rem] h-full bg-[var(--gray-800)] rounded-xl p-4 border border-[var(--gray-200)] overflow-hidden">
      <h2 className="text-xl font-bold text-white mb-2">Histórico de Atualizações</h2>

      <div className="flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-hide h-full">
        {loading ? (
          <p className="text-white">Carregando...</p>
        ) : updates.length === 0 ? (
          <p className="text-white text-sm">Nenhuma atualização registrada.</p>
        ) : (
          updates.map((u, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-[var(--gray-900)] text-sm text-white rounded-lg px-3 py-2 border border-[var(--gray-200)]"
            >
              {/* Avatar */}
              {u.user.profileImage ? (
                <img
                  src={u.user.profileImage}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[var(--primary)]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--gray-500)] flex items-center justify-center text-xs text-white font-bold">
                  {u.user.username[0].toUpperCase()}
                </div>
              )}

              {/* Texto */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[var(--gray-300)] leading-none">{u.productName}</p>
                <p
                  className={`font-semibold leading-tight ${
                    u.action === "add"
                      ? "text-[var(--primary)]"
                      : "text-[var(--red)]"
                  }`}
                >
                  {u.action === "add" ? "Adicionado" : "Retirado"} {u.quantity} unidade(s)
                </p>
                <p className="text-[var(--gray-400)] text-xs leading-tight">
                  Por: {u.user.username} –{" "}
                  {new Date(u.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}{" "}
                  {new Date(u.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
