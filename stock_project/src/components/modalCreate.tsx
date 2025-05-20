"use client";

import { useState } from "react";
import { createProduct } from "@/services/productService";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalCreate({ isOpen, onClose, onSuccess }: ModalProps) {
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
      onSuccess();
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
      className="fixed inset-0 bg-[var(--bgModal)] flex items-center justify-center z-50 px-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[var(--bg2)] rounded-xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-2xl text-[var(--text)] mb-4">Adicionar Produto</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label htmlFor="name" className="text-[var(--text)] min-w-[10rem]">
              Nome do produto:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-4 py-2 w-full bg-transparent text-[var(--text)]"
              placeholder="Digite o nome do produto"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label htmlFor="stockLimit" className="text-[var(--text)] min-w-[10rem]">
              Limite de estoque:
            </label>
            <input
              id="stockLimit"
              type="number"
              min={0}
              value={stockLimit}
              onChange={(e) => setStockLimit(Number(e.target.value))}
              className="border rounded px-4 py-2 w-full sm:w-[10rem] bg-transparent text-[var(--text)]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label htmlFor="quantity" className="text-[var(--text)] min-w-[10rem]">
              Quantidade:
            </label>
            <input
              id="quantity"
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-4 py-2 w-full sm:w-[10rem] bg-transparent text-[var(--text)]"
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 transition-colors w-full sm:w-[8rem] h-[3rem] rounded-lg text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[var(--primary)] hover:bg-[var(--secondary)] transition-colors w-full sm:w-[11rem] h-[3rem] rounded-lg text-white"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
