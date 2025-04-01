import { useState } from "react";

export function Add() {
  const [value, setValue] = useState<number | ''>('');

  return (
    <div className="flex flex-col items-center h-screen">
      <div className=" w-[48.75rem] h-[20.75rem] p-6 flex flex-col gap-6 mt-[9rem]">
        
        {/* Linha: Nome do produto */}
        <div className="grid grid-cols-[10rem_1fr] items-center gap-4">
          <label htmlFor="descricao" className="">Nome do produto:</label>
          <textarea
            id="descricao"
            rows={1}
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
    </div>
  );
}
