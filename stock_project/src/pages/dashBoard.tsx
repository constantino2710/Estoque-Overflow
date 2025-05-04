"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { StockedItems } from "./dashboardComponents/stockedItems";
import { HistoryItems } from "./dashboardComponents/historyItems";
import { IfAdmin } from "@/auth/ifAdmin";
import Parse from "@/api/parseClient";

const MyIcon1 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-icon lucide-package">
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
    <path d="M12 22V12"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <path d="m7.5 4.27 9 5.15"/>
  </svg>
);

const MyIcon2 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-open-icon lucide-package-open">
    <path d="M12 22v-9"/>
    <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"/>
    <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/>
    <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"/>
  </svg>
);

const MyIcon3 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive-icon lucide-archive">
    <rect width="20" height="5" x="2" y="3" rx="1"/>
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
    <path d="M10 12h4"/>
  </svg>
);

const MyIcon4 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert-icon lucide-circle-alert text-[var(--red)]">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

export function DashBoard() {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    async function fetchTotal() {
      try {
        const result = await Parse.Cloud.run("getTotalQuantidade");
        setTotal(result);
      } catch (error) {
        console.error("Erro ao buscar total:", error);
      }
    }
  
    fetchTotal();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen p-4">
      <h1 className="text-5xl">Dashboard</h1>
      <div className="flex flex-row gap-4 justify-center items-center mt-4 w-full h-[10rem]">
        <Card
          title="Nº total de itens em estoque"
          content={total !== null ? `${total}` : "Carregando..."}
          icon={MyIcon1}
        />
        <Card
          title="Retiradas (mês)"
          content="o"
          icon={MyIcon2}
        />
        <Card
          title="Devoluções (mês)"
          content="o"
          icon={MyIcon3}
        />
        <Card
          title="Produtos em alerta"
          content="o"
          icon={MyIcon4}
          variant="danger"
        />
      </div>
      <div className="flex flex-row gap-4 justify-center items-center mt-4 w-full h-full">
        <StockedItems />
        <IfAdmin>
          <HistoryItems />
        </IfAdmin>
      </div>
    </div>
  );
}
