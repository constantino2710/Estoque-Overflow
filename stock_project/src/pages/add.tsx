import { useState } from "react";
import Parse from "@/api/index"; // ajuste conforme o path do seu Parse.initialize

export function Add() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = async () => {
    if (!name.trim() || quantity <= 0) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await Parse.Cloud.run("createProduct", { name, quantity });

      alert("Produto adicionado com sucesso!");
      setName("");
      setQuantity(0);
    } catch (error) {
      alert("Erro ao adicionar produto.");
      console.error("Erro ao chamar a Cloud Function:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-[40rem] p-4.8 flex flex-col gap-4.8 mt-[7.2rem]">

        {/* Nome */}
        <div className="flex items-center w-full gap-2">
          <label htmlFor="name" className="whitespace-nowrap">Nome do produto:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2.4 py-1.6 w-full"
            placeholder="Digite o nome do produto"
          />
        </div>

        {/* Quantidade */}
        <div className="flex items-center gap-2">
          <label htmlFor="quantity" className="whitespace-nowrap">Quantidade:</label>
          <input
            id="quantity"
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded px-1.6 py-0.8 w-[10rem]"
          />
        </div>

        {/* Botão */}
        <div className="flex justify-end mt-auto">
          <button
            onClick={handleSubmit}
            className="cursor-pointer bg-green-500 hover:bg-green-600 transition-colors w-[11.2rem] h-[3.2rem] rounded-lg text-white"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
