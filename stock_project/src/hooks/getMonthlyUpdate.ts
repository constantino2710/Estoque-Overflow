import { useEffect, useState } from "react";
import Parse from "parse";

type StockSummary = {
  mes: string;
  totalEntradas: number;
  totalSaidas: number;
};

export function useMonthlyStockSummary() {
  const [summary, setSummary] = useState<StockSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        const result = await Parse.Cloud.run("getMonthlyStockSummary") as StockSummary;
        setSummary(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Erro ao buscar resumo de estoque:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  return { summary, loading, error };
}
