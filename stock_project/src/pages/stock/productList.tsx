"use client";

import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { QuantityModal } from "./quantityModal";
import { ActionMenuButton } from "./actionMenuButton";
import { IfAdmin } from "@/auth/ifAdmin";

type Product = {
  id: string;
  name: string;
  quantity: number;
  stockLimit: number;
};

interface ProductListProps {
  reloadKey: number;
}

function getBarColor(percentual: number) {
  if (percentual <= 10) return "bg-[var(--red)]";
  if (percentual <= 30) return "bg-[var(--alert)]";
  return "bg-[var(--primary)]";
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

  const handleRemoveProduct = async (productId: string) => {
    const confirm = window.confirm("Tem certeza que deseja remover este produto?");
    if (!confirm) return;

    try {
      await Parse.Cloud.run("removeProduct", { productId });
      setProducts((prev) => prev.filter((prod) => prod.id !== productId));
    } catch (err) {
      console.error("Erro ao remover produto:", err);
      alert("Erro ao remover produto.");
    }
  };

  if (loading) return <p className="p-4">Carregando produtos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-3 px-3 pt-3 pb-1 w-full overflow-y-auto relative scrollbar-hide">
      {products.map((prod) => {
        const percentual = Math.round((prod.quantity / prod.stockLimit) * 100);
        const barColor = getBarColor(percentual);

        return (
          <div
            key={prod.id}
            className="relative rounded-xl shadow-sm px-4 py-3 bg-[var(--gray-600)] hover:shadow-md transition cursor-default text-sm"
          >
            <div className="absolute top-2 right-2 flex gap-2">
              <ActionMenuButton
                onSelect={(type) => openQuantityModal(prod, type)}
              />

              <IfAdmin>
                <button
                  onClick={() => handleRemoveProduct(prod.id)}
                  className="text-red-400 hover:text-red-600 transition cursor-pointer"
                  title="Remover produto"
                >
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
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
              </IfAdmin>
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
