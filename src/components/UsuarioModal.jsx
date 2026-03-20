import React, { useState } from "react";
import api from "../api/api";
import "./ProductoModal.css";

const UsuarioModal = ({ cerrar, recargar, usuario }) => {

  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    email:  usuario?.email  || "",
    rol_id: usuario?.rol_id || "2",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async () => {
    setError("");
    setLoading(true);

    try {
      await api.put(`/usuarios/${usuario.id}`, form);
      recargar();
      cerrar();
    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
      const errores = err.response?.data?.errors;
      if (errores) {
        const primero = Object.values(errores)[0][0];
        setError(primero);
      } else {
        setError(err.response?.data?.message || "Error al guardar el usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>Editar Usuario</h2>

        {error && (
          <p style={{ color: "red", marginBottom: 8 }}>{error}</p>
        )}

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <select name="rol_id" value={form.rol_id} onChange={handleChange}>
          <option value="1">Admin</option>
          <option value="2">Cliente</option>
        </select>

        <button onClick={guardar} disabled={loading}>
          {loading ? "GUARDANDO..." : "GUARDAR"}
        </button>
        <button onClick={cerrar} disabled={loading}>
          CANCELAR
        </button>

      </div>
    </div>
  );
};

export default UsuarioModal;