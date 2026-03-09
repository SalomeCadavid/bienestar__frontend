import React, { useState } from "react";
import api from "../api/api";
import "./ProductoModal.css";


const ProductoModal = ({ cerrar, recargar, producto }) => {

  const [form, setForm] = useState({
    nombre: producto?.nombre || "",
    descripcion: producto?.descripcion || "",
    precio: producto?.precio || "",
    categoria: producto?.categoria || "",
    stock: producto?.stock || "",
    tipo_producto_id: producto?.tipo_producto_id || "",
  });

  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async () => {
    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (imagen) {
        data.append("imagen", imagen);
      }

      if (producto) {
        await api.post(`/productos/${producto.id}?_method=PUT`, data);
      } else {
        await api.post("/productos", data);
      }

      recargar();
      cerrar();

    } catch (error) {

      console.error("ERROR COMPLETO:", error);

      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("ERROR BACKEND COMPLETO:");
        console.error(JSON.stringify(error.response.data, null, 2));
      }

    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>{producto ? "Editar Producto" : "Nuevo Producto"}</h2>

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />

        <input
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <select
          name="tipo_producto_id"
          value={form.tipo_producto_id}
          onChange={handleChange}
        >
          <option value="">Seleccionar tipo</option>
          <option value="1">Plan</option>
          <option value="2">Producto</option>
        </select>

        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <button onClick={guardar}>GUARDAR</button>
        <button onClick={cerrar}>CANCELAR</button>

      </div>
    </div>
  );
};

export default ProductoModal;