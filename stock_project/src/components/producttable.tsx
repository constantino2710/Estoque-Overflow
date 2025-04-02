import React from "react";

type ProductRecord = {
  nome: string;
  idProduto: string;
  quantidade: number;
  idFuncionario: string;
  data: string;
  hora: string;
};

type ProductTableProps = {
  dados: ProductRecord[];
};

export const ProductTable: React.FC<ProductTableProps> = ({ dados }) => {
  return (
    <div className="overflow-x-auto rounded-2xl p-4 mt-[6rem]">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-sm font-semibold text-gray-800">
            <th className="border border-gray-400 px-4 py-2 text-left">Nome dos produtos</th>
            <th className="border border-gray-400 px-4 py-2 text-left">ID-Produto</th>
            <th className="border border-gray-400 px-4 py-2 text-left">Quantidade</th>
            <th className="border border-gray-400 px-4 py-2 text-left">ID-Funcionário</th>
            <th className="border border-gray-400 px-4 py-2 text-left">Data</th>
            <th className="border border-gray-400 px-4 py-2 text-left">Hora</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, idx) => (
            <tr key={idx} className="bg-white hover:bg-gray-100 text-sm">
              <td className="border border-gray-400 px-4 py-2">{item.nome}</td>
              <td className="border border-gray-400 px-4 py-2">{item.idProduto}</td>
              <td className="border border-gray-400 px-4 py-2">{item.quantidade}</td>
              <td className="border border-gray-400 px-4 py-2">{item.idFuncionario}</td>
              <td className="border border-gray-400 px-4 py-2">{item.data}</td>
              <td className="border border-gray-400 px-4 py-2">{item.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
