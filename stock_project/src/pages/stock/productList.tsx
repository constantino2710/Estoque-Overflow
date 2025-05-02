"use client";

import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";

type Product = {
  id: string;
  name: string;
  quantity: number;
  stockLimit: number;
};

interface ProductListProps {
  reloadKey: number;
}

export function ProductList({ reloadKey }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p className="p-4">Carregando produtos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-3 p-3 w-full overflow-y-auto scrollbar-hide">
      {products.map((prod) => (
        <div
          key={prod.id}
          className="rounded-xl shadow-sm px-4 py-3 bg-[var(--gray-600)] hover:shadow-md transition cursor-default text-sm"
        >
          <h3 className="text-base font-semibold text-white mb-1">{prod.name}</h3>
          <p className="text-white">
            <span className="font-medium">Quantidade:</span> {prod.quantity}
          </p>
          <p className="text-white">
            <span className="font-medium">Limite de Estoque:</span> {prod.stockLimit}
          </p>
          <div className="mt-2">
            <div className="w-full bg-[var(--gray-500)] rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (prod.quantity / prod.stockLimit) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-300 mt-1">
              {Math.round((prod.quantity / prod.stockLimit) * 100)}% ocupado
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
