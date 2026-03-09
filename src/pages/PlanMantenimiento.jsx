import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./PlanDetalle.css";

function PlanMantenimiento() {

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

      await axios.post(
        "https://bienestar-production-782f.up.railway.app/api/facturas",
        {
          productos: [
            {
              producto_id: 3,
              cantidad: 1
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Plan adquirido correctamente");

    } catch (error) {

      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error al adquirir el plan");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="plan-detalle-container">

      <h1>PLAN MANTENIMIENTO</h1>

      <p>
        Plan ideal para mantener tu peso ideal, mejorar resistencia y
        conservar hábitos saludables con seguimiento continuo.
      </p>

      <button onClick={adquirirPlan} disabled={loading}>
        {loading ? "Procesando..." : "Adquirir Plan"}
      </button>

    </div>
  );

}

export default PlanMantenimiento;