import { useState } from "react";

export function Remove() {
  const [value, setValue] = useState<number | ''>('');

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-[40rem] h-[16.6rem] p-4.8 flex flex-col gap-4.8 mt-[7.2rem] gap-4">

        {/* Linha: Nome do produto */}
		<div className="flex items-center w-[40rem] gap-2">
  			<label htmlFor="descricao" className="whitespace-nowrap">
    			Nome do produto:
  			</label>
		<textarea
			id="descricao"
			rows={1}
			className="border rounded px-2.4 py-1.6 resize-none w-full"
			placeholder="Digite o nome do produto"
		/>
		</div>

        {/* Linha: Quantidade */}
        <div className="flex items-center ">
          <label htmlFor="quantity" className="text-right">Quantidade:</label>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              setValue(newValue === '' ? '' : Number(newValue));
            }}
            className="border rounded px-1.6 py-0.8 w-[5.25rem]"
          />
        </div>

        {/* Botão */}
        <div className="flex justify-end mt-auto">
          <button
            type="submit"
            className="cursor-pointer bg-[var(--green-200)] w-[11.2rem] h-[3.2rem] rounded-lg text-white"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
