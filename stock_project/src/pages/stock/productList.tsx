"use client";

import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { QuantityModal } from "./quantityModal";
import { ActionMenuButton } from "./actionMenuButton";

type Product = {
  id: string;
  name: string;
  quantity: number;
  stockLimit: number;
};

interface ProductListProps {
  reloadKey: number;
}

// 🔧 Função para definir cor com base no percentual
function getBarColor(percentual: number) {
  if (percentual <= 10) return "bg-[var(--red)]";
  if (percentual <= 30) return "bg-[var(--alert)]";
  return "bg-[var(--green-500)]";
}

export function ProductList({ reloadKey }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    product: Product | null;
    type: "add" | "remove";
  }>({
    isOpen: false,
    product: null,
    type: "add",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: Product[] = await Parse.Cloud.run("getAllProducts");
        setProducts(response);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [reloadKey]);

  const openQuantityModal = (product: Product, type: "add" | "remove") => {
    setModalState({ isOpen: true, product, type });
  };

  const handleConfirm = async (value: number) => {
    const product = modalState.product;
    if (!product) return;

    const delta = modalState.type === "add" ? value : -value;
    const newQuantity = product.quantity + delta;

    if (newQuantity < 0 || newQuantity > product.stockLimit) {
      alert("Valor fora do limite de estoque.");
      return;
    }

    try {
      await Parse.Cloud.run("updateProductQuantity", {
        productId: product.id,
        quantity: newQuantity,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: newQuantity } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto.");
    } finally {
      setModalState({ isOpen: false, product: null, type: "add" });
    }
  };

  if (loading) return <p className="p-4">Carregando produtos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-3 p-3 w-full overflow-y-auto scrollbar-hide relative">
      {products.map((prod) => {
        const percentual = Math.round((prod.quantity / prod.stockLimit) * 100);
        const barColor = getBarColor(percentual);

        return (
          <div
            key={prod.id}
            className="relative rounded-xl shadow-sm px-4 py-3 bg-[var(--gray-600)] hover:shadow-md transition cursor-default text-sm"
          >
            <div className="absolute top-2 right-2">
              <ActionMenuButton
                onSelect={(type) => openQuantityModal(prod, type)}
              />
            </div>

            <h3 className="text-base font-semibold text-white mb-1">
              {prod.name}
            </h3>
            <p className="text-white">
              <span className="font-medium">Quantidade:</span> {prod.quantity}
            </p>
            <p className="text-white">
              <span className="font-medium">Limite de Estoque:</span>{" "}
              {prod.stockLimit}
            </p>

            <div className="mt-2">
              <div className="w-full bg-[var(--gray-500)] rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${barColor} transition-all duration-300`}
                  style={{
                    width: `${Math.min(percentual, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-300 mt-1">
                {percentual}% ocupado
              </p>
            </div>
          </div>
        );
      })}

      {modalState.product && (
        <QuantityModal
          isOpen={modalState.isOpen}
          type={modalState.type}
          onClose={() =>
            setModalState({ isOpen: false, product: null, type: "add" })
          }
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
