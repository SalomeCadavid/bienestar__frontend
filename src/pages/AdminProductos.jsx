import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // 🔥 IMPORT CORRECTO
import "./AdminProductos.css";
import ProductoModal from "../components/ProductoModal";
import logo from "../assets/TB.png";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/productos");
      console.log("ADMIN PRODUCTOS:", res.data); // 🔥 DEBUG
      setProductos(res.data || []);
    } catch (error) {

      console.log("STATUS:", error.response?.status);
      console.log("ERROR:", error.response?.data);

      alert(error.response?.data?.message || "No se pudo eliminar el producto");

    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?"))
      return;

    try {
      await api.delete(`/productos/${id}`);
      cargarProductos();
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("ERROR:", error.response?.data);
    }
  };

  const abrirCrear = () => {
    setProductoEditando(null);
    setModalOpen(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setModalOpen(true);
  };

  return (
    <div className="admin-container">

      <div className="barra-superior">
        <img src={logo} alt="logo" className="logo-bt" />

        <button 
          className="home-button"
          onClick={() => navigate("/")}
        >
          BIENESTAR TOTAL
        </button>

        <img src={logo} alt="logo" className="logo-bt" />
      </div>

      <div className="productos-admin">

        {loading && <p>Cargando productos...</p>}

        {!loading && productos.length === 0 && (
          <p>No hay productos registrados.</p>
        )}

        {!loading && productos.map((p) => (
          <div key={p.id} className="producto-row">

            <img
              src={
                p.imagen
                  ? `http://127.0.0.1:8000/storage/${p.imagen}`
                  : "https://via.placeholder.com/100"
              }
              alt={p.nombre}
              className="producto-img"
            />

            <div className="producto-nombre">
              {p.nombre?.toUpperCase()}
            </div>

            <div className="botones">
              <button
                className="btn-editar"
                onClick={() => abrirEditar(p)}
              >
                EDITAR
              </button>

              <button
                className="btn-borrar"
                onClick={() => eliminarProducto(p.id)}
              >
                BORRAR
              </button>
            </div>

          </div>
        ))}

        <div className="agregar-producto" onClick={abrirCrear}>
          <span className="plus">+</span>
          AGREGAR PRODUCTO
        </div>

      </div>

      {modalOpen && (
        <ProductoModal
          cerrar={() => setModalOpen(false)}
          recargar={cargarProductos}
          producto={productoEditando}
        />
      )}
    </div>
  );
};

export default AdminProductos;