import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./PlanDetalle.css";

function PlanAumentoMasa() {
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
        { producto_id: 7 },
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
      <h1>PLAN AUMENTO DE MASA</h1>
      <p>
        Programa diseñado para incrementar masa muscular mediante
        entrenamiento progresivo, nutrición estratégica y seguimiento mensual.
      </p>

      <button onClick={adquirirPlan} disabled={loading}>
        {loading ? "Procesando..." : "Adquirir Plan"}
      </button>
    </div>
  );
}

export default PlanAumentoMasa;