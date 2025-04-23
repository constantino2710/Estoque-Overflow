import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import {HomePage} from "@/pages/home";
import {AnalyticsPage} from "@/pages/analytics";
import {StockPage} from "@/pages/stock";

export function MainLayout() {
  return (
    <div className='grid grid-cols-[208px_1fr] gap-8 items-start'>
      <Sidebar />
      <div >
        <Routes>
          	<Route path="/" element={<HomePage />} />
			      <Route path="/AnalyticsPage" element={<AnalyticsPage />} />
          	<Route path="/StockPage" element={<StockPage />} />
        </Routes>
      </div>
    </div>
  );
}
