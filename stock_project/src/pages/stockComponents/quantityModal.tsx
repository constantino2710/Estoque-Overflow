"use client";

import { useRef, useEffect, useState } from "react";

interface QuantityModalProps {
  isOpen: boolean;
  type: "add" | "remove";
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export function QuantityModal({
  isOpen,
  type,
  onClose,
  onConfirm,
}: QuantityModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setValue(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (value > 0) {
      onConfirm(value);
      onClose();
    } else {
      alert("Digite um valor válido.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition">
      <div className="bg-[var(--bg2)] p-6 rounded-xl max-w-sm w-full mx-4 shadow-xl border border-[var(--border)] animate-fade-in">
        <h2 className="text-lg text-[var(--text)] font-semibold mb-4">
          {type === "add" ? "Adicionar ao estoque" : "Remover do estoque"}
        </h2>

        <input
          type="number"
          ref={inputRef}
          min={1}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          className="w-full mb-5 p-2 rounded bg-white text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[var(--red-100)] text-white hover:bg-[var(--red)] transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--secondary)] transition cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
