import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./AdminProductos.css";
import ProductoModal from "../components/ProductoModal";
import logo from "../assets/TB.png";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='12'%3ESin imagen%3C/text%3E%3C/svg%3E";

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
      setProductos(res.data || []);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("ERROR:", error.response?.data);
      alert(error.response?.data?.message || "No se pudo cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await api.delete(`/productos/${id}`);
      cargarProductos();
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("ERROR:", error.response?.data);
      alert(error.response?.data?.error || "Error al eliminar el producto");
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
        <button className="home-button" onClick={() => navigate("/")}>
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
              src={p.imagen || PLACEHOLDER}
              alt={p.nombre}
              className="producto-img"
            />
            <div className="producto-nombre">
              {p.nombre?.toUpperCase()}
            </div>
            <div className="botones">
              <button className="btn-editar" onClick={() => abrirEditar(p)}>
                EDITAR
              </button>
              <button className="btn-borrar" onClick={() => eliminarProducto(p.id)}>
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