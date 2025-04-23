import { useNavigate, useLocation } from "react-router-dom";
import { LogoutButton } from "./logoutButton";

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='w-[15rem] h-screen bg-[var(--green-300)] text-white flex flex-col justify-between'>
      <nav className='flex flex-col items-center pt-[1.5rem] gap-2'>
        <button
          className={`${pathname === "/" ? "text-[var(--text2)]" : "text-[var(--gray-500)]"} cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem] flex items-center gap-2`}
          onClick={() => navigate("/")} 
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house-icon lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Home
        </button> 
        
        <button
          className={`${pathname === "/stock" ? "text-[var(--text2)]" : "text-[var(--gray-500)]"} cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem] flex items-center gap-2`}
          onClick={() => navigate("/stock")} 
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-layers-icon lucide-layers"
          >
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
          </svg>
          Stock
        </button>       
        
        <button
          className={`${pathname === "/analytics" ? "text-[var(--text2)]" : "text-[var(--gray-500)]"} cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem] flex items-center gap-2`}
          onClick={() => navigate("/analytics")} 
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined"
          >
            <path d="M12 16v5" />
            <path d="M16 14v7" />
            <path d="M20 10v11" />
            <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
            <path d="M4 18v3" />
            <path d="M8 14v7" />
          </svg>
          Analytics
        </button> 

      </nav>
      <div className='pb-4'>
        <LogoutButton/>
      </div>
    </div>
  );
}
