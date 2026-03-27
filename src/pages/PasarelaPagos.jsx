import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import logo from "../assets/TB.png";
import "./PasarelaPagos.css";

function PasarelaPagos() {

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

  const rutasPlanes = {
    2: "/rutina-aumento-masa",
    3: "/rutina-mantenimiento",
    4: "/rutina-perdida-grasa",
    5: "/rutina-control-intensivo",
  };

  useEffect(() => {
    if (producto_id) {
      api.get(`/productos/${producto_id}`).then((res) => {
        setPrecioProducto(res.data.precio);
        setNombreProducto(res.data.nombre);
      });
    }
  }, [producto_id]);

  const handlePlanChange = (id) => {
    setPlan(id);
    if (id) {
      api.get(`/productos/${id}`).then((res) => {
        setPrecioProducto(res.data.precio);
        setNombreProducto(res.data.nombre);
      });
    } else {
      setPrecioProducto(null);
      setNombreProducto("");
    }
  };

  const handlePlanNequiChange = (id) => {
    setPlanNequi(id);
    if (id) {
      api.get(`/productos/${id}`).then((res) => {
        setPrecioProducto(res.data.precio);
        setNombreProducto(res.data.nombre);
      });
    } else {
      setPrecioProducto(null);
      setNombreProducto("");
    }
  };

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
      if (!plan) {
        alert("Selecciona un plan");
        return false;
      }
    }

    if (metodo === "nequi") {
      if (!celular || celular.length < 10) {
        alert("Ingresa un número de celular válido de 10 dígitos");
        return false;
      }
      if (!planNequi) {
        alert("Selecciona un plan");
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

    const planSeleccionado = metodo === "tarjeta" ? plan : planNequi;

    try {
      setLoading(true);
      await api.post("/facturas", {
        productos: [{ producto_id: Number(planSeleccionado), cantidad: 1 }]
      });
      alert("¡Pago exitoso! Plan adquirido correctamente.");
      const ruta = rutasPlanes[Number(planSeleccionado)] || "/";
      navigate(ruta);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pasarela-container">

      <div className="pasarela-header">
        <img src={logo} alt="logo" className="pasarela-logo" />
        <button className="pasarela-btn-home" onClick={() => navigate("/")}>
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="logo" className="pasarela-logo" />
      </div>

      <div className="pasarela-titulo-badge">
        PASARELA DE PAGOS
      </div>

      <div className="pasarela-card">

        {precioProducto && (
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <p style={{ margin: 0, fontWeight: "bold", fontSize: 13 }}>
              {nombreProducto}
            </p>
            <p style={{ margin: 0, color: "#000000", fontWeight: "bold", fontSize: 16 }}>
              Total: ${Number(precioProducto).toLocaleString("es-CO")}
            </p>
          </div>
        )}

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

        {metodo === "tarjeta" && (
          <div className="pasarela-form">
            <input className="pasarela-input" placeholder="NÚMERO DE TARJETA"
              maxLength={16} value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)} />
            <input className="pasarela-input" placeholder="NOMBRE DEL TITULAR"
              value={titular} onChange={(e) => setTitular(e.target.value)} />
            <div className="pasarela-row">
              <input className="pasarela-input" placeholder="MM/AA"
                maxLength={5} value={fecha}
                onChange={(e) => setFecha(e.target.value)} />
              <input className="pasarela-input" placeholder="CVV"
                maxLength={3} value={cvv}
                onChange={(e) => setCvv(e.target.value)} />
            </div>
            <select className="pasarela-select" value={plan}
              onChange={(e) => handlePlanChange(e.target.value)}>
              <option value="">SELECCIONAR PLAN</option>
              {planes.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
        )}

        {metodo === "nequi" && (
          <div className="pasarela-form">
            <input className="pasarela-input" placeholder="NÚMERO DE CELULAR"
              maxLength={10} value={celular}
              onChange={(e) => setCelular(e.target.value)} />
            <select className="pasarela-select" value={planNequi}
              onChange={(e) => handlePlanNequiChange(e.target.value)}>
              <option value="">SELECCIONAR PLAN</option>
              {planes.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
        )}

        <button className="pasarela-btn-pagar" onClick={pagar} disabled={loading}>
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