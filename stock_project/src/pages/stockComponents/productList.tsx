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
  searchTerm: string;
}

function getBarColor(percentual: number) {
  if (percentual <= 10) return "bg-[var(--red)]";
  if (percentual <= 30) return "bg-[var(--alert)]";
  return "bg-[var(--primary)]";
}

export function ProductList({ reloadKey, searchTerm }: ProductListProps) {
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

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openQuantityModal = (product: Product, type: "add" | "remove") => {
    setModalState({ isOpen: true, product, type });
  };

  const handleConfirm = async (value: number) => {
    const product = modalState.product;
    if (!product) return;

    if (value <= 0) {
      alert("Informe um valor maior que zero.");
      return;
    }

    const delta = modalState.type === "add" ? value : -value;
    const newQuantity = product.quantity + delta;

    if (newQuantity < 0 || newQuantity > product.stockLimit) {
      alert("Valor fora do limite de estoque.");
      return;
    }

    try {
      await Parse.Cloud.run("updateProductQuantity", {
        productId: product.id,
        amount: value,
        type: modalState.type,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: newQuantity } : p
        )
      );
    } catch (err: unknown) {
      console.error("Erro ao atualizar produto:", err);
      if (err instanceof Error) {
        alert(err.message || "Erro ao atualizar produto.");
      } else {
        alert("Erro ao atualizar produto.");
      }
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

  if (loading) return <p className="p-4 text-[var(--text)]">Carregando produtos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="w-full h-full bg-[var(--bg2)] flex flex-col rounded-xl overflow-hidden px-2 scrollbar-hide border border-[var(--border)] transition-all duration-300">
      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-1 flex flex-col gap-3 scrollbar-hide">
        {filteredProducts.map((prod) => {
          const percentual = Math.round((prod.quantity / prod.stockLimit) * 100);
          const barColor = getBarColor(percentual);

          return (
            <div
              key={prod.id}
              className="relative rounded-xl shadow-sm px-4 py-3 bg-[var(--bg1)] hover:shadow-md transition cursor-default text-sm border border-[var(--border)] transition-all duration-300"
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

              <h3 className="text-[1.5rem] font-semibold text-[var(--text)] mb-1">{prod.name}</h3>
              <p className="text-[var(--text)]">Quantidade: {prod.quantity}</p>
              <p className="text-[var(--text)]">Limite de Estoque: {prod.stockLimit}</p>

              <div className="mt-2">
                <div className="w-full bg-[var(--bg4)] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${barColor} transition-all duration-300`}
                    style={{ width: `${Math.min(percentual, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--text)] mt-1">
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
    </div>
  );
}
