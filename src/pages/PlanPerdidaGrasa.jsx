import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./PlanDetalle.css";

function PlanPerdidaGrasa() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const adquirirPlan = async () => {
    if (!token) {
      alert("Debes iniciar sesión primero");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/ordenes",
        { producto_id: 6 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Orden creada: " + response.data.orden.referencia_pago);
    } catch (error) {
      console.error(error);
      alert("Error al crear la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plan-detalle-container">
      <h1>PLAN PÉRDIDA DE GRASA</h1>
      <p>
        Enfocado en reducción de grasa corporal mediante entrenamiento
        metabólico, cardio estratégico y control nutricional personalizado.
      </p>

      <button onClick={adquirirPlan} disabled={loading}>
        {loading ? "Procesando..." : "Adquirir Plan"}
      </button>
    </div>
  );
}

export default PlanPerdidaGrasa;