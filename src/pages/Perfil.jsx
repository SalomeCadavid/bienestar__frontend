import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Perfil.css";
import logo from "../assets/TB.png";

const Perfil = () => {

  const { user, logout, fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tienePlan, setTienePlan] = useState(false);

  useEffect(() => {
    if (fetchUser) {
      fetchUser();
    }
    verificarPlan();
  }, []);

  const verificarPlan = async () => {
    try {
      const res = await api.get("/facturas");
      // Si tiene al menos una factura con un plan (tipo_producto_id 1), tiene plan activo
      const facturas = res.data?.data || res.data || [];
      const planComprado = facturas.some((f) =>
        f.detalles?.some((d) => d.producto?.tipo_producto_id === 1)
      );
      setTienePlan(planComprado);
    } catch (error) {
      console.error("Error verificando plan:", error);
    }
  };

  const isAdmin = user?.rol_id === 1;

  const calcularEstadoIMC = () => {
    if (!user?.imc) return "Sin datos";
    if (user.imc < 18.5) return "Bajo peso";
    if (user.imc < 25) return "Normal";
    if (user.imc < 30) return "Sobrepeso";
    return "Obesidad";
  };

  const obtenerPlan = () => {
    if (!user?.imc) return "Sin plan";
    if (user.imc < 18.5) return "Aumento de masa";
    if (user.imc < 25) return "Mantenimiento";
    if (user.imc < 30) return "Pérdida de grasa";
    return "Control intensivo";
  };

  const rutasPlanes = {
    "Aumento de masa":   "/rutina-aumento-masa",
    "Mantenimiento":     "/rutina-mantenimiento",
    "Pérdida de grasa":  "/rutina-perdida-grasa",
    "Control intensivo": "/rutina-control-intensivo",
  };

  return (
    <div className="perfil-container">

      <div className="perfil-header">
        <img src={logo} alt="BT" className="logo-bt" />
        <button className="home-btn" onClick={() => navigate("/")}>
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="BT" className="logo-bt" />
      </div>

      <h2 className="titulo-perfil">PERFIL DE USUARIO</h2>

      {isAdmin && (
        <button
          className="admin-btn"
          onClick={() => navigate("/admin-usuarios")}
        >
          Dashboard Usuarios
        </button>
      )}

      <div className="perfil-grid">

        <div className="perfil-card">

          <h3>{user?.nombre || "Usuario"}</h3>

          <div className="perfil-info">
            <p><b>Email:</b> {user?.email || "No registrado"}</p>
            <p><b>Genero:</b> {user?.genero || "No registrado"}</p>
            <p><b>Edad:</b> {user?.edad || "No registrado"}</p>
            <p><b>Estatura:</b> {user?.estatura ? `${user.estatura} cm` : "No registrado"}</p>
            <p><b>Peso:</b> {user?.peso ? `${user.peso} kg` : "No registrado"}</p>
          </div>

          <button
            className="btn-perfil"
            onClick={() => navigate("/editar-perfil")}
          >
            EDITAR PERFIL
          </button>

        </div>

        <div className="perfil-card">

          <h3>PLAN ACTIVO</h3>

          <div className="perfil-info">
            <p><b>IMC actual:</b> {user?.imc || "Sin datos"}</p>
            <p><b>Estado:</b> {calcularEstadoIMC()}</p>
            <p><b>Plan:</b> {obtenerPlan()}</p>
            <p><b>Duración:</b> 12 semanas</p>
          </div>

          {/* Botón solo visible si tiene plan comprado */}
          {tienePlan && (
            <button
              className="btn-perfil"
              onClick={() => {
                const ruta = rutasPlanes[obtenerPlan()] || "/";
                navigate(ruta);
              }}
            >
              VER MI RUTINA
            </button>
          )}

        </div>

      </div>

      <div className="config-card">

        <h3>CONFIGURACIÓN</h3>

        <button
          className="btn-perfil"
          onClick={() => navigate("/cambiar-password")}
        >
          CAMBIAR CONTRASEÑA
        </button>

        <button
          className="btn-perfil"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          CERRAR SESIÓN
        </button>

      </div>

    </div>
  );
};

export default Perfil;