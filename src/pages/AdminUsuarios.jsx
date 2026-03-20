import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./AdminProductos.css";
import UsuarioModal from "../components/UsuarioModal";
import logo from "../assets/TB.png";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const res = await api.get("/usuarios");
      setUsuarios(res.data || []);
    } catch (error) {
      console.log("ERROR:", error.response?.data);
      alert("No se pudo cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await api.delete(`/usuarios/${id}`);
      cargarUsuarios();
    } catch (error) {
      alert(error.response?.data?.error || "Error al eliminar el usuario");
    }
  };

  const abrirEditar = (usuario) => {
    setUsuarioEditando(usuario);
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

        <h2 style={{ color: "white", marginBottom: 20 }}>USUARIOS</h2>

        {loading && <p style={{ color: "white" }}>Cargando usuarios...</p>}

        {!loading && usuarios.length === 0 && (
          <p style={{ color: "white" }}>No hay usuarios registrados.</p>
        )}

        {!loading && usuarios.map((u) => (
          <div key={u.id} className="producto-row">

            <div style={{ fontSize: 14, flex: 1 }}>
              <p style={{ margin: 0 }}><b>ID:</b> {u.id}</p>
              <p style={{ margin: 0 }}><b>Nombre:</b> {u.nombre}</p>
              <p style={{ margin: 0 }}><b>Email:</b> {u.email}</p>
              <p style={{ margin: 0 }}><b>Rol:</b> {u.rol_id === 1 ? "Admin" : "Cliente"}</p>
            </div>

            <div className="botones">
              <button
                className="btn-editar"
                onClick={() => abrirEditar(u)}
              >
                EDITAR
              </button>
              <button
                className="btn-borrar"
                onClick={() => eliminarUsuario(u.id)}
              >
                BORRAR
              </button>
            </div>

          </div>
        ))}

      </div>

      {modalOpen && (
        <UsuarioModal
          cerrar={() => setModalOpen(false)}
          recargar={cargarUsuarios}
          usuario={usuarioEditando}
        />
      )}

    </div>
  );
};

export default AdminUsuarios;