/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Parse from "@/api/parseClient";
import { ImageUpload } from "@/components/imgUpload";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    quantity: number;
    stockLimit: number;
    expirationDate: string | null;
    image: string | null;
  };
  onUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product, onUpdate }) => {
  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [stockLimit, setStockLimit] = useState(product.stockLimit);
  const [expirationDate, setExpirationDate] = useState(product.expirationDate || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const handleSubmit = async () => {
    const params: any = {
      productId: product.id,
      name,
      quantity,
      stockLimit,
      expirationDate,
    };

    if (removeImage) {
      params.image = null;
    } else if (imageFile) {
      const parseFile = new Parse.File(imageFile.name, imageFile);
      await parseFile.save();
      params.image = parseFile;
    }

    await Parse.Cloud.run("editProduct", params);
    onUpdate();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bgModal)] px-4 sm:px-6 py-6 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[var(--bg2)] rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--text)] hover:text-[var(--primary)]"
          aria-label="Fechar modal"
        >
          &times;
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-4">Editar Produto</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className="w-full border rounded px-3 py-2 bg-transparent text-[var(--text)]"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantidade"
            className="w-full border rounded px-3 py-2 bg-transparent text-[var(--text)]"
          />
          <input
            type="number"
            value={stockLimit}
            onChange={(e) => setStockLimit(Number(e.target.value))}
            placeholder="Limite de Estoque"
            className="w-full border rounded px-3 py-2 bg-transparent text-[var(--text)]"
          />
          <input
            type="date"
            value={expirationDate.slice(0, 10)}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-transparent text-[var(--text)]"
          />

          {product.image && !removeImage && (
            <div className="flex flex-col items-center gap-2">
              <img src={product.image} alt="Imagem atual" className="w-32 h-32 object-cover rounded border border-[var(--border)]" />
              <button
                onClick={() => setRemoveImage(true)}
                className="text-sm cursor-pointer h-[2rem] bg-red-500 px-3 text-white rounded hover:bg-red-600 transition"
              >
                Remover imagem atual
              </button>
            </div>
          )}

          {(removeImage || !product.image) && (
            <div className="flex justify-center">
              <ImageUpload onUpload={setImageFile} />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white py-2 rounded mt-2 sm:mt-4"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
