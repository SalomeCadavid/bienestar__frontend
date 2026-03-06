import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CalcularIMC.css";
import logo from "../assets/TB.png";
import { AuthContext } from "../context/AuthContext";

function CalcularIMC() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Función que determina el plan según el IMC
  const obtenerPlan = (imc) => {
    if (imc < 18.5) {
      return "PLAN AUMENTO DE MASA";
    } else if (imc >= 18.5 && imc <= 24.9) {
      return "PLAN DE MANTENIMIENTO";
    } else if (imc >= 25 && imc <= 29.9) {
      return "PLAN PÉRDIDA DE GRASA";
    } else {
      return "PLAN DE CONTROL INTENSIVO";
    }
  };

  const calcularIMC = async () => {
    if (!peso || !altura) {
      alert("Por favor completa peso y altura");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/usuarios/calcular-imc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            genero,
            edad,
            peso,
            estatura: altura,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Error al calcular IMC");
        return;
      }

      setResultado(data);

      // 🔥 Determinar plan en frontend
      const planCalculado = obtenerPlan(parseFloat(data.imc));

      // Guardar plan en localStorage
      localStorage.setItem("plan_recomendado", planCalculado);

    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="imc-container">

      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="card">
        <h2>CALCULAR IMC</h2>

        <input
          type="text"
          placeholder="GENERO"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />

        <input
          type="number"
          placeholder="EDAD"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <input
          type="number"
          placeholder="PESO (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />

        <input
          type="number"
          placeholder="ALTURA (cm)"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />

        <button
          className="btn-calcular"
          onClick={calcularIMC}
          disabled={loading}
        >
          {loading ? "Calculando..." : "CALCULAR"}
        </button>

        {resultado && (
          <div className="resultado">
            <p>IMC: <strong>{resultado.imc}</strong></p>
            <p>Clasificación: <strong>{resultado.clasificacion}</strong></p>

            <div className="plan-destacado">
              Tu plan recomendado es:
              <br />
              <strong>
                {obtenerPlan(parseFloat(resultado.imc))}
              </strong>
            </div>

            <button
              className="btn-siguiente"
              onClick={() => navigate("/planes")}
            >
              Ver mi plan
            </button>
          </div>
        )}
      </div>

      <footer>© 2025 BIENESTAR TOTAL.</footer>
    </div>
  );
}

export default CalcularIMC;