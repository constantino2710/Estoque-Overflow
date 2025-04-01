import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import {Add} from "@/pages/add";
import {Remove} from "@/pages/remove";
import {Search} from "@/pages/search";
import {Stock} from "@/pages/stock";

export function MainLayout() {
  return (
    <div className='grid grid-cols-[277px_1fr] gap-8 items-start'>
      <Sidebar />
      <div >
        <Routes>
          	<Route path="/" element={<Add />} />
			      <Route path="/remove" element={<Remove />} />
          	<Route path="/search" element={<Search />} />
          	<Route path="/stock" element={<Stock />} />
        </Routes>
      </div>
    </div>
  );
}
