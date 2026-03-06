import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api"; // 🔥 RESPETA TU RUTA ORIGINAL
import "./Tienda.css";
import logo from "../assets/TB.png";

const Tienda = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [productos, setProductos] = useState([]);

  // 🔥 CORRECCIÓN REAL DEL ADMIN
  const isAdmin = user?.rol_id === 1;

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await api.get("/productos");
      console.log("PRODUCTOS:", response.data); // 🔥 DEBUG
      setProductos(response.data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  const comprarProducto = async (producto) => {
    try {
      await api.post("/facturas", {
        producto_id: producto.id,
        cantidad: 1
      });

      alert("Producto comprado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al comprar");
    }
  };

  return (
    <div className="tienda-container">

      <div className="barra-superior">
        <img src={logo} alt="BT" className="logo-bt" />

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          BIENESTAR TOTAL
        </button>

        <img src={logo} alt="BT" className="logo-bt" />
      </div>

      <h2 className="titulo-tienda">Tienda - Bienestar Total</h2>

      {/* 🔥 BOTÓN SOLO ADMIN */}
      {isAdmin && (
        <button
          className="admin-btn"
          onClick={() => navigate("/admin-productos")}
        >
          Administrar Productos
        </button>
      )}

      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">

            <img
              src={
                producto.imagen
                  ? `http://127.0.0.1:8000/storage/${producto.imagen}`
                  : "https://via.placeholder.com/150"
              }
              alt={producto.nombre}
            />

            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <span className="precio">${producto.precio}</span>

            <button
              className="comprar-btn"
              onClick={() => comprarProducto(producto)}
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