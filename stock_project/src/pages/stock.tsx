import { useState } from "react";
import { IfAdmin } from "@/auth/ifAdmin";
import { ModalCreate } from "@/components/modalCreate";

export function StockPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="flex text-5xl">Estoque</h1>

      <div className="flex flex-row gap-2">
        <div className="relative flex w-full">
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full border resize-none rounded-xl h-[2.5rem] px-4 pr-14 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <div className="absolute inset-y-0 right-2 flex items-center gap-2">
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
              className="text-gray-400 cursor-pointer"
            >
              <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
            </svg>
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
              className="text-gray-400 cursor-pointer"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        <IfAdmin>
          <button
            className="bg-[var(--green-500)] rounded-xl h-[2.5rem] flex items-center justify-center px-4 whitespace-nowrap cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar Produto
          </button>
        </IfAdmin>
      </div>

      <div className="w-full h-[32rem] bg-[var(--gray-800)] flex flex-col items-center rounded-xl"></div>

      {/* Modal chamando o componente importado */}
      <ModalCreate isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
