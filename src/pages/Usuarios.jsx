import { useEffect, useState } from "react";
import api from "../services/api";

const Usuarios = () => {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const res = await api.get("/usuarios");
    setUsuarios(res.data);
  };

  const eliminarUsuario = async (id) => {
    if(confirm("Eliminar usuario?")){
      await api.delete(`/usuarios/${id}`);
      obtenerUsuarios();
    }
  };

  return (
    <div>

      <h2>Usuarios</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>

                <button>
                  Editar
                </button>

                <button onClick={() => eliminarUsuario(user.id)}>
                  Eliminar
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default Usuarios;