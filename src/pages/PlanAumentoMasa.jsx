import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import logo from "../assets/TB.png";
import "./Planes.css";

function PlanAumentoMasa() {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [precio, setPrecio] = useState(null);

  useEffect(() => {
    api.get("/productos/2").then((res) => setPrecio(res.data.precio));
  }, []);

  const adquirirPlan = () => {
    if (!token) {
      alert("Debes iniciar sesión primero");
      navigate("/login");
      return;
    }
    navigate("/pasarela", { state: { producto_id: 2 } });
  };

  return (
    <div className="planes-container">

      {/* Header */}
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <button className="btn-header" onClick={() => navigate("/")}>
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="logo" className="logo" />
      </div>

      {/* Card del plan */}
      <div className="planes-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="plan-card">

          <h3>Plan Aumento de Masa</h3>

          <p>
            Programa diseñado para incrementar masa muscular mediante
            entrenamiento progresivo, nutrición estratégica y seguimiento mensual.
          </p>

          {precio && (
            <p style={{ color: "#000000", fontWeight: "bold", fontSize: 18 }}>
              ${Number(precio).toLocaleString("es-CO")}
            </p>
          )}

          <button onClick={adquirirPlan} disabled={loading}>
            {loading ? "PROCESANDO..." : "ADQUIRIR PLAN"}
          </button>

        </div>
      </div>

      <footer style={{ marginTop: "auto", paddingBottom: "20px" }}>
        © 2025 BIENESTAR TOTAL.
      </footer>

    </div>
  );
}

export default PlanAumentoMasa;