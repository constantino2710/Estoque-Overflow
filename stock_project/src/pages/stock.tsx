import { ProductTable } from "@/components/producttable"
import { IfAdmin } from "@/auth/ifAdmin";


const dadosMock = [
	{
	  nome: "Produto A",
	  idProduto: "123",
	  quantidade: 10,
	  idFuncionario: "001",
	  data: "2025-04-02",
	  hora: "14:35",
	},
	{
	  nome: "Produto B",
	  idProduto: "124",
	  quantidade: 5,
	  idFuncionario: "002",
	  data: "2025-04-02",
	  hora: "15:00",
	},
	{
	  nome: "Produto C",
	  idProduto: "125",
	  quantidade: 8,
	  idFuncionario: "003",
	  data: "2025-04-01",
	  hora: "13:15",
	},
	{
	  nome: "Produto D",
	  idProduto: "126",
	  quantidade: 12,
	  idFuncionario: "004",
	  data: "2025-03-30",
	  hora: "09:50",
	},
  ];
  

export function StockPage() {
  return (
	<div className='flex flex-col items-center h-screen'>
		<div>
			<ProductTable dados={dadosMock}/>
		</div>	
		<IfAdmin>
			<button>teste</button>
		</IfAdmin>
	</div>
  )
}