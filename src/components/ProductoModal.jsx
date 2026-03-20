import React, { useState } from "react";
import api from "../api/api";
import "./ProductoModal.css";

const ProductoModal = ({ cerrar, recargar, producto }) => {

  const [form, setForm] = useState({
    nombre:           producto?.nombre           || "",
    descripcion:      producto?.descripcion      || "",
    precio:           producto?.precio           || "",
    categoria:        producto?.categoria        || "",
    stock:            producto?.stock            || "",
    tipo_producto_id: producto?.tipo_producto_id || "",
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview]       = useState(
    producto?.imagen
      ? `https://bienestar-production-782f.up.railway.app/storage/${producto.imagen}`
      : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagenFile(file);
    setPreview(URL.createObjectURL(file)); // preview local inmediato
  };

  const guardar = async () => {
    setError("");
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (imagenFile) {
        data.append("imagen", imagenFile);
      }

      if (producto) {
        // Laravel no acepta PUT con FormData, se usa POST + _method=PUT
        data.append("_method", "PUT");
        await api.post(`/productos/${producto.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/productos", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      recargar();
      cerrar();

    } catch (err) {
      console.error("ERROR:", err.response?.data || err);

      // Muestra el primer error de validación de Laravel si existe
      const errores = err.response?.data?.errors;
      if (errores) {
        const primero = Object.values(errores)[0][0];
        setError(primero);
      } else {
        setError(err.response?.data?.message || "Error al guardar el producto");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>{producto ? "Editar Producto" : "Nuevo Producto"}</h2>

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

        {/* Preview de imagen actual o nueva */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: 120, borderRadius: 8, margin: "8px 0" }}
          />
        )}

        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          onChange={handleImagen}
        />

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

export default ProductoModal;