"use client";

import { useEffect, useState } from "react";
import Parse from "@/api/parseClient";

interface ProdutoComPercentual {
  name: string;
  quantity: number;
  stockLimit: number;
  percentual: number;
}

function getBarColor(percentual: number) {
  if (percentual <= 10) return "bg-[var(--red)]";
  if (percentual <= 30) return "bg-[var(--alert)]";
  return "bg-[var(--primary)]";
}

export function StockedItems() {
  const [dados, setDados] = useState<ProdutoComPercentual[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Parse.Cloud.run("getPercentualOcupacao");
        setDados(result);
      } catch (error) {
        console.error("Erro ao buscar ocupação:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-[var(--gray-800)] rounded-xl p-4 overflow-auto border border-[var(--gray-200)]">
      <h2 className="text-2xl text-white font-bold">Estoque Atual</h2>

      {loading && <p className="text-white">Carregando ocupação...</p>}

      {!loading && dados.length === 0 && (
        <p className="text-white">Nenhum item com limite definido.</p>
      )}

      {!loading &&
        dados.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-white w-full min-w-0"
          >
            <div className="flex-[2] truncate font-medium">{item.name}</div>
            <div className="flex-[1] text-sm whitespace-nowrap text-right">
              {item.quantity} / {item.stockLimit} ({item.percentual}%)
            </div>
            <div className="flex-[3] h-3 bg-gray-700 rounded overflow-hidden">
              <div
                className={`${getBarColor(item.percentual)} h-full transition-all duration-500`}
                style={{ width: `${item.percentual}%` }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
