import React, { useState } from "react";
import api from "../api/api";
import "./ProductoModal.css";

const UsuarioModal = ({ cerrar, recargar, usuario }) => {

  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    password: "",
    rol_id: usuario?.rol_id || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async () => {

    try {

      if (usuario) {

        await api.put(`/usuarios/${usuario.id}`, form);

      } else {

        await api.post("/usuarios", form);

      }

      recargar();
      cerrar();

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div className="modal-overlay">

      <div className="modal-content">

        <h2>{usuario ? "Editar Usuario" : "Nuevo Usuario"}</h2>

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

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          name="rol_id"
          value={form.rol_id}
          onChange={handleChange}
        >
          <option value="">Seleccionar rol</option>
          <option value="1">Admin</option>
          <option value="2">Cliente</option>
        </select>

        <button onClick={guardar}>GUARDAR</button>
        <button onClick={cerrar}>CANCELAR</button>

      </div>

    </div>

  );
};

export default UsuarioModal;