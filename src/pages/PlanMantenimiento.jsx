import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/TB.png";
import "./Planes.css";

function PlanMantenimiento() {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const adquirirPlan = () => {
    if (!token) {
      alert("Debes iniciar sesión primero");
      navigate("/login");
      return;
    }
    navigate("/pasarela", { state: { producto_id: 3 } });
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

          <h3>Plan Mantenimiento</h3>

          <p>
            Diseñado para tonificar tu figura y optimizar tu energía
            diaria. Mantén tu equilibrio con rutinas dinámicas que te
            harán sentir mejor que nunca.
          </p>

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

export default PlanMantenimiento;