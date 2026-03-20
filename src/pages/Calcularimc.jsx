import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CalcularIMC.css";
import logo from "../assets/TB.png";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

function CalcularIMC() {

  const navigate = useNavigate();
  const { fetchUser, token } = useContext(AuthContext);

  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const obtenerPlan = (imc) => {
    if (imc < 18.5) return "PLAN AUMENTO DE MASA";
    if (imc < 25) return "PLAN DE MANTENIMIENTO";
    if (imc < 30) return "PLAN PÉRDIDA DE GRASA";
    return "PLAN CONTROL INTENSIVO";
  };

  const calcularIMC = async () => {

    if (!peso || !altura) {
      alert("Por favor completa peso y altura");
      return;
    }

    try {

      setLoading(true);

      /*
      =========================
      CALCULAR IMC
      =========================
      */

      const res = await api.post(
        "/usuarios/calcular-imc",
        {
          genero,
          edad,
          peso,
          estatura: altura
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = res.data;

      setResultado(data);

      /*
      =========================
      GUARDAR PERFIL
      =========================
      */

      await api.put(
        "/perfil",
        {
          genero,
          edad,
          peso,
          estatura: altura
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      /*
      =========================
      REFRESCAR USUARIO
      =========================
      */

      if (fetchUser) {
        await fetchUser();
      }

      /*
      =========================
      GUARDAR PLAN
      =========================
      */

      const plan = obtenerPlan(parseFloat(data.imc));
      localStorage.setItem("plan_recomendado", plan);

    } catch (error) {

      console.error("ERROR COMPLETO:", error);

      if (error.response) {
        alert("Error del servidor: " + error.response.status);
      } else {
        alert("No se pudo conectar con el servidor");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="imc-container">

      <div className="header">

        <img src={logo} alt="logo" className="logo"/>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          BIENESTAR TOTAL
        </button>

        <img src={logo} alt="logo" className="logo"/>

      </div>

      <div className="card">

        <h2>CALCULAR IMC</h2>

        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">SELECCIONA GÉNERO</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </select>

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

              <br/>

              <strong>
                {obtenerPlan(parseFloat(resultado.imc))}
              </strong>

            </div>

            <button
              className="btn-siguiente"
              onClick={() => navigate("/perfil")}
            >
              IR A MI PERFIL
            </button>

          </div>

        )}

      </div>

      <footer>© 2025 BIENESTAR TOTAL.</footer>

    </div>

  );

}

export default CalcularIMC;