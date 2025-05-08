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
    <div className="flex flex-col w-full max-w-[32rem] h-full bg-[var(--bg2)] rounded-xl p-4 border border-[var(--border)] overflow-hidden transition-all duration-300">
      <h2 className="text-xl font-bold text-[var(--text)] mb-2">Histórico de Atualizações</h2>

      <div className="flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-hide h-full ">
        {loading ? (
          <p className="text-[var(--text)]">Carregando...</p>
        ) : updates.length === 0 ? (
          <p className="text-text-[var(--text)] text-sm">Nenhuma atualização registrada.</p>
        ) : (
          updates.map((u, index) => (
            <div
              key={index}
              className="transition-all duration-300 flex items-center gap-3 bg-[var(--bg1)] text-sm text-white rounded-lg px-3 py-2 border border-[var(--border)]"
            >
              {/* Avatar */}
              {u.user.profileImage ? (
                <img
                  src={u.user.profileImage}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[var(--primary)]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--text)] flex items-center justify-center text-xs text-white font-bold">
                  {u.user.username[0].toUpperCase()}
                </div>
              )}

              {/* Texto */}
              <div className="flex-1 flex flex-col justify-center ">
                <p className="text-[var(--text)] leading-none">{u.productName}</p>
                <p
                  className={`font-semibold leading-tight ${
                    u.action === "add"
                      ? "text-[var(--primary)]"
                      : "text-[var(--red)]"
                  }`}
                >
                  {u.action === "add" ? "Adicionado" : "Retirado"} {u.quantity} unidade(s)
                </p>
                <p className="text-[var(--text)] text-xs leading-tight">
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
