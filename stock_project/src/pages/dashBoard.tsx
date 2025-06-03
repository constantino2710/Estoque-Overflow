/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { Card } from "@/components/card";
import { StockedItems } from "./dashboardComponents/stockedItems";
import { HistoryItems } from "./dashboardComponents/historyItems";
import { IfAdmin } from "@/auth/ifAdmin";
import { Header } from "@/components/header";
import { StatusIcon } from "./dashboardComponents/statusIcon";

const MyIcon1 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package text-[var(--text)]">
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
    <path d="M12 22V12"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <path d="m7.5 4.27 9 5.15"/>
  </svg>
);

const MyIcon2 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-open text-[var(--text)]">
    <path d="M12 22v-9"/>
    <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0  0 1 0-3.36z"/>
    <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/>
    <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"/>
  </svg>
);

const MyIcon3 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive text-[var(--text)]">
    <rect width="20" height="5" x="2" y="3" rx="1"/>
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
    <path d="M10 12h4"/>
  </svg>
);

interface Summary {
  totalEntradas: number;
  totalSaidas: number;
  mesNome?: string;
  ano?: number;
}

function monthNumberFromName(name: string) {
  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];
  const lowerName = name.toLowerCase();
  return meses.indexOf(lowerName) + 1;
}

export function DashBoard() {
  const [total, setTotal] = useState<number | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [produtosAlerta, setProdutosAlerta] = useState<string[]>([]);
  const [produtosPerigo, setProdutosPerigo] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [resumo, totalQtd, alertas] = await Promise.all([
          Parse.Cloud.run("getMonthlyStockReport"),
          Parse.Cloud.run("getTotalQuantidade"),
          Parse.Cloud.run("getProdutosEmAlerta"),
        ]);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const resumoAtual = resumo.find((r: any) => {
          const mes = monthNumberFromName(r.mesNome || "");
          return r.ano === currentYear && mes === currentMonth;
        });

        setSummary(resumoAtual || { totalEntradas: 0, totalSaidas: 0 });
        setTotal(totalQtd);

        const danger = alertas.filter((p: any) => p.status === "danger").map((p: any) => p.name);
        const alert = alertas.filter((p: any) => p.status === "alert").map((p: any) => p.name);

        setProdutosPerigo(danger);
        setProdutosAlerta(alert);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--bg1)]">
        <span className="text-sm text-[var(--text)]">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:h-screen w-full bg-[var(--bg1)] transition-all duration-300">
      <Header title="Dashboard" />
      <div className="flex flex-col items-center w-full flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          <div className="col-span-2 sm:col-span-1">
            <Card
              title="Nº total de itens em estoque"
              content={total !== null ? `${total}` : "0"}
              icon={MyIcon1}
            />
          </div>

          <Card
            title={`Nº de saída de produtos (${summary?.mesNome || "mês"})`}
            content={summary ? `${summary.totalSaidas}` : "0"}
            icon={MyIcon2}
          />
          <Card
            title={`Nº de entrada de produtos (${summary?.mesNome || "mês"})`}
            content={summary ? `${summary.totalEntradas}` : "0"}
            icon={MyIcon3}
          />
          <Card
            title="Produtos em alerta"
            content={produtosAlerta.length.toString()}
            icon={<StatusIcon danger={false} alert={produtosAlerta.length > 0} />}
            variant={produtosAlerta.length > 0 ? "alert" : "default"}
            tooltip={produtosAlerta.length ? produtosAlerta.join(", ") : undefined}
          />
          <Card
            title="Produtos em perigo"
            content={produtosPerigo.length.toString()}
            icon={<StatusIcon danger={produtosPerigo.length > 0} alert={false} />}
            variant={produtosPerigo.length > 0 ? "danger" : "default"}
            tooltip={produtosPerigo.length ? produtosPerigo.join(", ") : undefined}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full h-full overflow-hidden">
          <div className="w-full h-full overflow-hidden">
            <div className="flex flex-col gap-4 w-full h-full bg-[var(--bg2)] rounded-xl p-4 border border-[var(--border)] transition-all duration-300">
              <h2 className="text-2xl text-[var(--text)] font-bold">Estoque Atual</h2>
              <StockedItems />
            </div>
          </div>
          <IfAdmin>
            <div className="w-full lg:w-[32rem] h-full overflow-hidden">
              <HistoryItems />
            </div>
          </IfAdmin>
        </div>
      </div>
    </div>
  );
}
