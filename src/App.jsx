import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tienda from "./pages/tienda.jsx";
import CalcularIMC from "./pages/Calcularimc";
import Planes from "./pages/Planes";
import Nosotros from "./pages/nosotros.jsx";
import Recomendaciones from "./pages/recomendaciones.jsx";
import AdminProductos from "./pages/AdminProductos";
import Perfil from "./pages/Perfil";
import PasarelaPagos from "./pages/PasarelaPagos";
import AdminUsuarios from "./pages/AdminUsuarios";
import PasarelaProductos from "./pages/PasarelaProductos";
import RutinaMantenimiento from "./pages/RutinaMantenimiento";

/* PLANES */
import PlanAumentoMasa from "./pages/PlanAumentoMasa";
import PlanMantenimiento from "./pages/PlanMantenimiento";
import PlanPerdidaGrasa from "./pages/PlanPerdidaGrasa";
import PlanControlIntensivo from "./pages/PlanControlIntensivo";

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

          {/* PLANES INDIVIDUALES */}

          <Route
            path="/planes/aumento-masa"
            element={
              <ProtectedRoute>
                <PlanAumentoMasa />
              </ProtectedRoute>
            }
          />

          <Route
            path="/planes/mantenimiento"
            element={
              <ProtectedRoute>
                <PlanMantenimiento />
              </ProtectedRoute>
            }
          />

          <Route
            path="/planes/perdida-grasa"
            element={
              <ProtectedRoute>
                <PlanPerdidaGrasa />
              </ProtectedRoute>
            }
          />

          <Route
            path="/planes/control-intensivo"
            element={
              <ProtectedRoute>
                <PlanControlIntensivo />
              </ProtectedRoute>
            }
          />

          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/recomendaciones" element={<Recomendaciones />} />

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTEGIDAS */}

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

          {/* SOLO ADMIN */}

          <Route
            path="/admin-productos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminProductos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          <Route path="/pasarela" 
          element={
          <PasarelaPagos />
          } 
          />

          <Route path="/admin-usuarios" 
          element={
          <AdminUsuarios />
          } 
          />

          <Route path="/pasarela-producto" 
          element={
          <PasarelaProductos />
          } 
          />

          <Route path="/rutina-mantenimiento" 
          element={
          <RutinaMantenimiento />
          } 
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;