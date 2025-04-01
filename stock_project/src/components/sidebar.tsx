import { useNavigate } from "react-router-dom";


export function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className='w-[19.375rem] h-screen bg-[var(--green-300)] text-white flex flex-col'>
      <nav className='flex flex-col items-center pt-[2.1875rem] gap-4'>
        <button className='bg-[var(--button-100)] text-black cursor-pointer text-base w-[17.5rem] rounded-lg h-[5.625rem]' onClick={() => navigate("/")}>Adicionar</button>
        <button className='bg-[var(--button-100)] text-black cursor-pointer text-base w-[17.5rem] rounded-lg h-[5.625rem]' onClick={() => navigate("/search")}>Pesquisar</button>
        <button className='bg-[var(--button-100)] text-black cursor-pointer text-base w-[17.5rem] rounded-lg h-[5.625rem]' onClick={() => navigate("/remove")}>Remover</button>
        <button className='bg-[var(--button-100)] text-black cursor-pointer text-base w-[17.5rem] rounded-lg h-[5.625rem]' onClick={() => navigate("/stock")}>Estoque</button>
      </nav>
    </div>
  );
}
