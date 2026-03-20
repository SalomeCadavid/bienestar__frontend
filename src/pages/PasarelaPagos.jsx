import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import logo from "../assets/TB.png";
import "./PasarelaPagos.css";

function PasarelaPagos() {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Recibe el producto_id desde el plan que llama la pasarela
  const { producto_id } = location.state || {};

  const [metodo, setMetodo] = useState("tarjeta"); // "tarjeta" o "nequi"
  const [loading, setLoading] = useState(false);

  // Campos tarjeta
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [titular, setTitular] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");
  const [plan, setPlan] = useState(producto_id || "");

  // Campos nequi
  const [celular, setCelular] = useState("");
  const [planNequi, setPlanNequi] = useState(producto_id || "");

  const planes = [
    { id: 2, nombre: "Plan Aumento de Masa" },
    { id: 3, nombre: "Plan Mantenimiento" },
    { id: 4, nombre: "Plan Pérdida de Grasa" },
    { id: 5, nombre: "Plan Control Intensivo" },
  ];

  const pagar = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const planSeleccionado = metodo === "tarjeta" ? plan : planNequi;

    if (!planSeleccionado) {
      alert("Selecciona un plan");
      return;
    }

    try {
      setLoading(true);
      await api.post("/facturas", {
        productos: [{ producto_id: Number(planSeleccionado), cantidad: 1 }]
      });
      alert("¡Pago exitoso! Plan adquirido correctamente.");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pasarela-container">

      {/* Header */}
      <div className="pasarela-header">
        <img src={logo} alt="logo" className="pasarela-logo" />
        <button className="pasarela-btn-home" onClick={() => navigate("/")}>
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="logo" className="pasarela-logo" />
      </div>

      {/* Título */}
      <div className="pasarela-titulo-badge">
        PASARELA DE PAGOS
      </div>

      {/* Card */}
      <div className="pasarela-card">

        {/* Tabs */}
        <div className="pasarela-tabs">
          <button
            className={`pasarela-tab ${metodo === "tarjeta" ? "activo" : ""}`}
            onClick={() => setMetodo("tarjeta")}
          >
            TARJETA
          </button>
          <button
            className={`pasarela-tab ${metodo === "nequi" ? "activo" : ""}`}
            onClick={() => setMetodo("nequi")}
          >
            NEQUI
          </button>
        </div>

        {/* Formulario Tarjeta */}
        {metodo === "tarjeta" && (
          <div className="pasarela-form">
            <input
              className="pasarela-input"
              placeholder="NÚMERO DE TARJETA"
              maxLength={16}
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
            />
            <input
              className="pasarela-input"
              placeholder="NOMBRE DEL TITULAR"
              value={titular}
              onChange={(e) => setTitular(e.target.value)}
            />
            <div className="pasarela-row">
              <input
                className="pasarela-input"
                placeholder="MM/AA"
                maxLength={5}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
              <input
                className="pasarela-input"
                placeholder="CVV"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
            <select
              className="pasarela-select"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="">SELECCIONAR PLAN</option>
              {planes.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
        )}

        {/* Formulario Nequi */}
        {metodo === "nequi" && (
          <div className="pasarela-form">
            <input
              className="pasarela-input"
              placeholder="NÚMERO DE CELULAR"
              maxLength={10}
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
            <select
              className="pasarela-select"
              value={planNequi}
              onChange={(e) => setPlanNequi(e.target.value)}
            >
              <option value="">SELECCIONAR PLAN</option>
              {planes.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
        )}

        <button
          className="pasarela-btn-pagar"
          onClick={pagar}
          disabled={loading}
        >
          {loading ? "PROCESANDO..." : "PAGAR"}
        </button>

      </div>

      <footer className="pasarela-footer">
        © 2025 BIENESTAR TOTAL.
      </footer>

    </div>
  );
}

export default PasarelaPagos;