"use client";

import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { QuantityModal } from "./quantityModal";
import { ActionMenuButton } from "./actionMenuButton";
import { IfAdmin } from "@/auth/ifAdmin";
import EditProductModal from "@/components/editProductModal";

type Product = {
  id: string;
  name: string;
  quantity: number;
  stockLimit: number;
  image?: string | null;
  expirationDate?: string | null;
};

interface ProductListProps {
  reloadKey: number;
  searchTerm: string;
}

function getBarColor(percentual: number) {
  if (percentual <= 9) return "bg-[var(--red)]";
  if (percentual <= 29) return "bg-[var(--alert)]";
  return "bg-[var(--primary)]";
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR");
}

function getTimeRemaining(dateStr: string) {
  const now = new Date();
  const exp = new Date(dateStr);
  const diff = exp.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return `vencido há ${Math.abs(days)} dia(s)`;
  if (days === 0) return "vence hoje";
  if (days === 1) return "vence amanhã";
  if (days < 30) return `faltam ${days} dias`;
  const months = Math.floor(days / 30);
  return `faltam ${months} mês(es)`;
}

export function ProductList({ reloadKey, searchTerm }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    product: null as Product | null,
    type: "add" as "add" | "remove",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
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
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
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

  if (loading) return <p className="p-4 text-[var(--text)]">Carregando produtos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="w-full max-h-full overflow-y-auto pr-2 grid gap-4 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      {filteredProducts.map((prod) => {
        const percentual = Math.round((prod.quantity / prod.stockLimit) * 100);
        const barColor = getBarColor(percentual);

        return (
          <div
            key={prod.id}
            className="bg-[var(--bg1)] rounded-2xl overflow-hidden flex flex-col transition min-h-[320px] border border-[var(--border)] hover:shadow-lg hover:border-[var(--primary)]"
          >
            <div className="h-40 bg-[var(--bg3)]">
              {prod.image ? (
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--text)] text-sm">
                  Sem imagem
                </div>
              )}
            </div>

            <div className="bg-[var(--bg2)] p-4 border-t border-[var(--border)] flex flex-col justify-between flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold text-[var(--text)] break-words line-clamp-2">
                  {prod.name}
                </h3>
                <div className="flex gap-2">
                  <IfAdmin>
                    <button
                      onClick={() => handleRemoveProduct(prod.id)}
                      className="text-[var(--red-100)] hover:text-[var(--red)] transition cursor-pointer"
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
                  <ActionMenuButton
                    onSelect={(type) => openQuantityModal(prod, type)}
                    onEdit={() => openEditModal(prod)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-2">
                <p className="text-sm text-[var(--text)]">
                  Quantidade: {prod.quantity}
                </p>
                <div className="w-full bg-[var(--bg4)] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${barColor}`}
                    style={{ width: `${Math.min(percentual, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--text)]">{percentual}% ocupado</p>
              </div>

              {prod.expirationDate && (
                <div className="text-xs text-[var(--text)] mt-auto">
                  <p className="font-medium">Validade: {formatDate(prod.expirationDate)}</p>
                  <p className="text-[var(--text)]">{getTimeRemaining(prod.expirationDate)}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {modalState.product && (
        <QuantityModal
          isOpen={modalState.isOpen}
          type={modalState.type}
          onClose={() => setModalState({ isOpen: false, product: null, type: "add" })}
          onConfirm={handleConfirm}
        />
      )}

      {selectedProduct && (
        <EditProductModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={{
            ...selectedProduct,
            expirationDate: selectedProduct.expirationDate ?? null,
            image: selectedProduct.image ?? null,
          }}
          onUpdate={() => {
            setSelectedProduct(null);
            setEditModalOpen(false);
            setProducts((prev) => [...prev]);
          }}
        />
      )}
    </div>
  );
}
