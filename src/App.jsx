import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tienda from "./pages/Tienda";
import CalcularIMC from "./pages/Calcularimc";
import Planes from "./pages/Planes";
import Nosotros from "./pages/Nosotros";
import Recomendaciones from "./pages/recomendaciones";
import AdminProductos from "./pages/AdminProductos";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/calcular-imc"
            element={
              <ProtectedRoute>
                <CalcularIMC />
              </ProtectedRoute>
            }
          />

          <Route
            path="/planes"
            element={
              <ProtectedRoute>
                <Planes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nosotros"
            element={<Nosotros />}
          />

          <Route
            path="/recomendaciones"
            element={<Recomendaciones />}
          />

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 PROTEGIDAS */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productos"
            element={
              <ProtectedRoute>
                <Tienda />
              </ProtectedRoute>
            }
          />

          {/* 🔒 SOLO ADMIN */}
          <Route
            path="/admin-productos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminProductos />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;