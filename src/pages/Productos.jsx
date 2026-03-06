import { useEffect, useState } from "react";
import api from "../services/api"; // o donde tengas tu axios configurado

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await api.get("/productos");
      console.log("PRODUCTOS:", res.data);
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  return (
    <div>
      <h2>Lista de productos</h2>

      {productos.map((producto) => (
        <div key={producto.id}>
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p>${producto.precio}</p>

          {producto.imagen && (
            <img
              src={`http://localhost:8000/storage/${producto.imagen}`}
              alt={producto.nombre}
              width="100"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Productos;