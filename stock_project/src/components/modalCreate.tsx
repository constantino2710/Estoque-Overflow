"use client";

import { useState } from "react";
import Parse from "@/api/parseClient";
import { createProduct } from "@/services/productService";
import { ImageUpload } from "@/components/imgUpload";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalCreate({ isOpen, onClose, onSuccess }: ModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [stockLimit, setStockLimit] = useState(1000);
  const [expirationDate, setExpirationDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Erro ao converter imagem");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!name.trim() || quantity <= 0 || stockLimit <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (quantity > stockLimit) {
      alert("A quantidade não pode ser maior que o limite de estoque.");
      return;
    }

    let parseFile: InstanceType<typeof Parse.File> | undefined = undefined;

    if (imageFile) {
      try {
        const base64 = await fileToBase64(imageFile);
        const base64Data = base64.split(",")[1];
        parseFile = new Parse.File(imageFile.name, { base64: base64Data });
        await parseFile.save();
      } catch (err) {
        console.error("Erro ao enviar imagem:", err);
        alert("Erro ao enviar a imagem.");
        return;
      }
    }

    try {
      await createProduct({
        name,
        quantity,
        stockLimit,
        expirationDate,
        image: parseFile,
      });
      alert("Produto adicionado com sucesso!");
      setName("");
      setQuantity(0);
      setStockLimit(1000);
      setExpirationDate("");
      setImageFile(null);
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
      className="fixed inset-0 bg-[var(--bgModal)] flex items-center justify-center z-50 px-2 sm:px-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[var(--bg2)] rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto max-h-[95vh]">
        <h2 className="text-xl sm:text-2xl text-[var(--text)] mb-4">Adicionar Produto</h2>

        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <label htmlFor="name" className="text-[var(--text)] min-w-[8rem] sm:min-w-[10rem] text-sm sm:text-base">
              Nome do produto:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-1.5 w-full bg-transparent text-[var(--text)] text-sm"
              placeholder="Digite o nome do produto"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <label htmlFor="stockLimit" className="text-[var(--text)] min-w-[8rem] sm:min-w-[10rem] text-sm sm:text-base">
              Limite de estoque:
            </label>
            <input
              id="stockLimit"
              type="number"
              min={0}
              value={stockLimit}
              onChange={(e) => setStockLimit(Number(e.target.value))}
              className="border rounded px-3 py-1.5 w-full sm:w-[10rem] bg-transparent text-[var(--text)] text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <label htmlFor="quantity" className="text-[var(--text)] min-w-[8rem] sm:min-w-[10rem] text-sm sm:text-base">
              Quantidade:
            </label>
            <input
              id="quantity"
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-3 py-1.5 w-full sm:w-[10rem] bg-transparent text-[var(--text)] text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <label htmlFor="expirationDate" className="text-[var(--text)] min-w-[8rem] sm:min-w-[10rem] text-sm sm:text-base">
              Data de validade:
            </label>
            <input
              id="expirationDate"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="border rounded px-3 py-1.5 w-full sm:w-[12rem] bg-transparent text-[var(--text)] text-sm"
            />
          </div>

          <div className="flex justify-center">
            <ImageUpload onUpload={handleImageUpload} />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 transition-colors w-full sm:w-[8rem] h-[2.5rem] rounded-lg text-white text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[var(--primary)] hover:bg-[var(--secondary)] transition-colors w-full sm:w-[11rem] h-[2.5rem] rounded-lg text-white text-sm"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
