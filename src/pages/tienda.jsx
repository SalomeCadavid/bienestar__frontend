import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import "./tienda.css";
import logo from "../assets/TB.png";

const BASE_URL = "https://bienestar-production-782f.up.railway.app";

const Tienda = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [productos, setProductos] = useState([]);

  const isAdmin = user?.rol_id === 1;

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await api.get("/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  // Filtra según rol: admin ve todo, cliente solo ve productos (tipo 2)
  const productosFiltrados = isAdmin
    ? productos
    : productos.filter((p) => Number(p.tipo_producto_id) === 2);

  const handleComprar = (producto) => {
    navigate("/pasarela-producto", { state: { producto_id: producto.id } });
  };

  return (
    <div className="tienda-container">

      <div className="barra-superior">
        <img src={logo} alt="BT" className="logo-bt" />
        <button className="home-btn" onClick={() => navigate("/")}>
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="BT" className="logo-bt" />
      </div>

      <h2 className="titulo-tienda">Tienda - Bienestar Total</h2>

      {isAdmin && (
        <button className="admin-btn" onClick={() => navigate("/admin-productos")}>
          Dashboard Productos
        </button>
      )}

      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="producto-card">

            <img
              src={
                producto.imagen
                  ? `${BASE_URL}/storage/${producto.imagen}`
                  : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='12'%3ESin imagen%3C/text%3E%3C/svg%3E"
              }
              alt={producto.nombre}
            />

            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <span className="precio">${producto.precio}</span>

            <button
              className="comprar-btn"
              onClick={() => handleComprar(producto)}
            >
              Comprar
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Tienda;