"use client";

import { useState } from "react";
import { createProduct } from "@/services/productService";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalCreate({ isOpen, onClose }: ModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [stockLimit, setStockLimit] = useState(1000);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name.trim() || quantity <= 0 || stockLimit <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (quantity > stockLimit) {
      alert("A quantidade não pode ser maior que o limite de estoque.");
      return;
    }

    try {
      await createProduct({ name, quantity, stockLimit });
      alert("Produto adicionado com sucesso!");
      setName("");
      setQuantity(0);
      setStockLimit(1000);
      onClose();
    } catch (error) {
      alert("Erro ao adicionar produto.");
      console.error("Erro ao chamar a API:", error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[var(--bgModal)] flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-[var(--gray-800)] rounded-xl p-8">
        <h2 className="text-2xl text-white mb-4">Adicionar Produto</h2>

        <div className="w-[40rem] p-6 flex flex-col gap-6 mt-6">
          <div className="flex items-center w-full gap-2">
            <label htmlFor="name" className="whitespace-nowrap text-white">
              Nome do produto:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-4 py-2 w-full bg-transparent text-white"
              placeholder="Digite o nome do produto"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="whitespace-nowrap text-white">
              Quantidade:
            </label>
            <input
              id="quantity"
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-4 py-2 w-[10rem] bg-transparent text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="stockLimit" className="whitespace-nowrap text-white">
              Limite de estoque:
            </label>
            <input
              id="stockLimit"
              type="number"
              min={0}
              value={stockLimit}
              onChange={(e) => setStockLimit(Number(e.target.value))}
              className="border rounded px-4 py-2 w-[10rem] bg-transparent text-white"
            />
          </div>

          <div className="flex justify-end mt-auto gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer bg-red-500 hover:bg-red-600 transition-colors w-[8rem] h-[3rem] rounded-lg text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="cursor-pointer bg-[var(--green-400)] hover:bg-[var(--green-500)] transition-colors w-[11rem] h-[3rem] rounded-lg text-white"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
