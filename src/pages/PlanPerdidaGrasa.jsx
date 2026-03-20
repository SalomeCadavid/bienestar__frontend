import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/TB.png";
import "./Planes.css";

function PlanPerdidaGrasa() {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const adquirirPlan = () => {
    if (!token) {
      alert("Debes iniciar sesión primero");
      navigate("/login");
      return;
    }
    navigate("/pasarela", { state: { producto_id: 4 } });
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

          <h3>Plan Pérdida de Grasa</h3>

          <p>
            Programa enfocado en reducir grasa corporal mediante entrenamiento
            metabólico y control nutricional.
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

export default PlanPerdidaGrasa;