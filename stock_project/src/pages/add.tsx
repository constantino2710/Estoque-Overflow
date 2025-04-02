import { useState } from "react";

export function Add() {
  const [value, setValue] = useState<number | ''>('');
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("OPME");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:8080/add", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: descricao,
          quantidade: value,
          tipo: tipo,
        }),
      });

      if(response.ok){
        alert("Produto adicionado com sucesso!");
        setDescricao("");
        setValue("");
        setTipo("OPME");
      } else {
        alert("Erro ao adicionar produto");
      }
    } catch(error){
      console.error("Erro :", error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center h-screen">
      <div className=" w-[48.75rem] h-[20.75rem] p-6 flex flex-col gap-6 mt-[9rem]">
        
        {/* Linha: Nome do produto */}
        <div className="grid grid-cols-[10rem_1fr] items-center gap-4">
          <label htmlFor="descricao" className="">Nome do produto:</label>
          <textarea
            id="descricao"
            rows={1}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border rounded px-3 py-2 resize-none w-full"
            placeholder="Digite o nome do produto"
          />
        </div>

        {/* Linha: Quantidade */}
        <div className="grid grid-cols-[10rem_1fr] items-center gap-4">
          <label htmlFor="quantity" className="text-right">Quantidade:</label>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              setValue(newValue === '' ? '' : Number(newValue));
            }}
            className="border rounded px-2 py-1 w-[6.5625rem]"
          />
        </div>

        {/*TODO: adicionar o campo de selecionar tipo pfvr */}

        {/* Botão */}
        <div className="flex justify-end mt-auto">
          <button
            type="submit"
            className="cursor-pointer bg-[var(--green-200)] w-[14rem] h-[4rem] rounded-lg text-white"
          >
            Adicionar
          </button>
        </div>
      </div>
    </form>
  );
}
