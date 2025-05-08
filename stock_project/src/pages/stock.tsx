"use client";

import { useState } from "react";
import { IfAdmin } from "@/auth/ifAdmin";
import { ModalCreate } from "@/components/modalCreate";
import { ProductList } from "./stockComponents/productList";
import { Header } from "@/components/header";

export function StockPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => setReloadKey((prev) => prev + 1);

  return (
    <div className="flex flex-col h-screen w-full bg-[var(--bg1)] overflow-hidden transition-all duration-300">
      <Header title="Estoque" />

      {/* Corpo abaixo do header */}
      <div className="flex flex-col flex-1 px-4 pb-4 pt-4 overflow-hidden gap-4">
        {/* Barra de busca + botão */}
        <div className="flex flex-row gap-2 w-full shrink-0">
          <div className="relative flex w-full">
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full border border-[var(--border)] resize-none rounded-xl h-[2.5rem] px-4 pr-14 bg-transparent text-[var(--text)] placeholder-[var(--text)] outline-none"
            />
            <div className="absolute inset-y-0 right-2 flex items-center gap-2">
              {/* Filtro */}
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-full h-full text-[var(--text)] cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
                </svg>
              </div>

              {/* Buscar */}
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-full h-full text-[var(--text)] cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
          </div>

          <IfAdmin>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[var(--primary)] rounded-xl h-[2.5rem] flex items-center justify-center px-4 hover:bg-[var(--secondary)] transition hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='text-[var(--text)]'>
                <path d="M16 16h6" />
                <path d="M19 13v6" />
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                <path d="m7.5 4.27 9 5.15" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" x2="12" y1="22" y2="12" />
              </svg>
            </button>
          </IfAdmin>
        </div>

        {/* Área scrollável da lista */}
        <div className="flex-1 overflow-hidden">
          <ProductList reloadKey={reloadKey} />
        </div>
      </div>

      <ModalCreate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleReload}
      />
    </div>
  );
}
