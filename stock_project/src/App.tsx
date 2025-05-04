import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { PrivateRoute } from "@/routes/privateRoute";
import { LoginPage } from "@/pages/login";
import { DashBoard } from "@/pages/dashBoard";
import { StockPage } from "@/pages/stock";
import { AdminPage } from "@/pages/admin";
import { MainLayout } from "@/components/layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública (sem layout) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas com layout */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashBoard />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
