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
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-icon lucide-package text-[var(--text)]">
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
    <path d="M12 22V12"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <path d="m7.5 4.27 9 5.15"/>
  </svg>
);

const MyIcon2 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-open-icon lucide-package-open text-[var(--text)]">
    <path d="M12 22v-9"/>
    <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0  0 1 0-3.36z"/>
    <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/>
    <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"/>
  </svg>
);

const MyIcon3 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive-icon lucide-archive text-[var(--text)]">
    <rect width="20" height="5" x="2" y="3" rx="1"/>
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
    <path d="M10 12h4"/>
  </svg>
);


export function DashBoard() {
  const [total, setTotal] = useState<number | null>(null);
  const [summary, setSummary] = useState<{ totalEntradas: number; totalSaidas: number; mesNome?: string } | null>(null);
  const [alerta, setAlerta] = useState<{ status: "ok" | "alert" | "danger", itens: string[] }>({ status: "ok", itens: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Parse.Cloud.run("getMonthlyStockReport");
        setSummary(result?.[0] || { totalEntradas: 0, totalSaidas: 0 });
      } catch (error) {
        console.error("Erro ao buscar resumo de estoque por produtos:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const total = await Parse.Cloud.run("getTotalQuantidade");
        setTotal(total);
      } catch (error) {
        console.error("Erro ao buscar total de estoque:", error);
      }
    }

    fetchTotal();
  }, []);

  useEffect(() => {
    async function fetchAlerta() {
      try {
        const result = await Parse.Cloud.run("getProdutosEmAlerta");
        const danger = result.filter((p: { status: string; name: string }) => p.status === "danger");
        const alert = result.filter((p: { status: string; }) => p.status === "alert");

        if (danger.length > 0) {
            setAlerta({ status: "danger", itens: danger.map((p: { name: string }) => p.name) });
        } else if (alert.length > 0) {
            setAlerta({ status: "alert", itens: alert.map((p: { name: string }) => p.name) });
        } else {
          setAlerta({ status: "ok", itens: [] });
        }
      } catch (e) {
        console.error("Erro ao buscar produtos em alerta:", e);
      }
    }

    fetchAlerta();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[var(--bg1)] transition-all duration-300">
      <Header title="Dashboard" />
      <div className="flex flex-col items-center w-full h-screen overflow-hidden p-4">
        <div className="flex flex-row gap-4 justify-center items-center w-full h-[10rem]">
          <Card
            title="Nº total de itens em estoque"
            content={total !== null ? `${total}` : "Carregando..."}
            icon={MyIcon1}
          />
          <Card
            title={`Nº de saída de produtos (${summary?.mesNome || "mês"})`}
            content={summary ? `${summary.totalSaidas}` : "Carregando..."}
            icon={MyIcon2}
          />
          <Card
            title={`Nº de entrada de produtos (${summary?.mesNome || "mês"})`}
            content={summary ? `${summary.totalEntradas}` : "Carregando..."}
            icon={MyIcon3}
          />
            <Card
              title="Nº de produtos em alerta"
              content={alerta.status === "ok" ? "Nenhum" : `${alerta.itens.length}`}
              icon={
                <StatusIcon
                  danger={alerta.status === "danger"}
                  alert={alerta.status === "alert"}
                />
              }
              variant={
                alerta.status === "danger"
                  ? "danger"
                  : alerta.status === "alert"
                  ? "alert"
                  : "default"
              }
              tooltip={alerta.itens.length > 0 ? alerta.itens.join(", ") : undefined}
            />

        </div>

        <div className="flex flex-row gap-4 justify-center items-stretch mt-4 w-full max-w-full h-full overflow-hidden">
          <div className="w-full h-full overflow-hidden">
            <div className="flex flex-col gap-4 w-full h-full bg-[var(--bg2)] rounded-xl p-4 border border-[var(--border)] transition-all duration-300">
              <h2 className="text-2xl text-[var(--text)] font-bold">Estoque Atual</h2>
              <StockedItems />
            </div>
          </div>
          <IfAdmin>
            <div className="w-[32rem] h-full overflow-hidden">
              <HistoryItems />
            </div>
          </IfAdmin>
        </div>
      </div>
    </div>
  );
}