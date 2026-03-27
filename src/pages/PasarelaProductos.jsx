import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import logo from "../assets/TB.png";
import "./PasarelaPagos.css";

function PasarelaProductos() {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { producto_id } = location.state || {};

  const [metodo, setMetodo] = useState("tarjeta");
  const [loading, setLoading] = useState(false);
  const [precioProducto, setPrecioProducto] = useState(null);
  const [nombreProducto, setNombreProducto] = useState("");

  // Campos tarjeta
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [titular, setTitular] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");

  // Campos nequi
  const [celular, setCelular] = useState("");

  useEffect(() => {
    if (producto_id) {
      api.get(`/productos/${producto_id}`).then((res) => {
        setPrecioProducto(res.data.precio);
        setNombreProducto(res.data.nombre);
      });
    }
  }, [producto_id]);

  const validar = () => {
    if (metodo === "tarjeta") {
      if (!numeroTarjeta || numeroTarjeta.length < 16) {
        alert("Ingresa un número de tarjeta válido de 16 dígitos");
        return false;
      }
      if (!titular.trim()) {
        alert("Ingresa el nombre del titular");
        return false;
      }
      if (!fecha || fecha.length < 5) {
        alert("Ingresa la fecha de vencimiento (MM/AA)");
        return false;
      }
      if (!cvv || cvv.length < 3) {
        alert("Ingresa el CVV de 3 dígitos");
        return false;
      }
    }

    if (metodo === "nequi") {
      if (!celular || celular.length < 10) {
        alert("Ingresa un número de celular válido de 10 dígitos");
        return false;
      }
    }

    return true;
  };

  const pagar = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!validar()) return;

    try {
      setLoading(true);
      await api.post("/facturas", {
        productos: [{ producto_id: Number(producto_id), cantidad: 1 }]
      });
      alert("¡Pago exitoso! Producto adquirido correctamente.");
      navigate("/tienda");
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

        {/* Precio y nombre del producto */}
        {precioProducto && (
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <p style={{ margin: 0, fontWeight: "bold", fontSize: 13 }}>
              {nombreProducto}
            </p>
            <p style={{ margin: 0, color: "#f28c28", fontWeight: "bold", fontSize: 16 }}>
              Total: ${Number(precioProducto).toLocaleString("es-CO")}
            </p>
          </div>
        )}

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

export default PasarelaProductos;