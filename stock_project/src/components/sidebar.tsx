import { useNavigate, useLocation } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='w-[15rem] h-screen bg-[var(--green-300)] text-white flex flex-col'>
      <nav className='flex flex-col items-center pt-[1.5rem] gap-2'>
        <button
          className={`${pathname === "/" ? "bg-[var(--button-active)]" : "bg-[var(--button-100)]"} text-black cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem]`}
          onClick={() => navigate("/")}
        >
          Adicionar
        </button>

        <button
          className={`${pathname === "/search" ? "bg-[var(--button-active)]" : "bg-[var(--button-100)]"} text-black cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem]`}
          onClick={() => navigate("/search")}
        >
          Pesquisar
        </button>

        <button
          className={`${pathname === "/remove" ? "bg-[var(--button-active)]" : "bg-[var(--button-100)]"} text-black cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem]`}
          onClick={() => navigate("/remove")}
        >
          Remover
        </button>

        <button
          className={`${pathname === "/stock" ? "bg-[var(--button-active)]" : "bg-[var(--button-100)]"} text-black cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem]`}
          onClick={() => navigate("/stock")}
        >
          Estoque
        </button>
      </nav>
    </div>
  );
}
