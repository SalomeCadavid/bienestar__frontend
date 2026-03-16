import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState(storedToken || null);

  const [user, setUser] = useState(
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null
  );

  /*
  ==========================
  LOGIN
  ==========================
  */

  const login = async (email, password) => {

    try {

      const res = await api.post("/login", { email, password });

      const token = res.data.token;
      const usuario = res.data.usuario;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      setToken(token);
      setUser(usuario);

    } catch (error) {

      console.error("Error en login:", error);
      throw error;

    }

  };

  /*
  ==========================
  LOGOUT
  ==========================
  */

  const logout = async () => {

    try {

      if (token) {
        await api.post("/logout");
      }

    } catch (err) {

      console.error("Error cerrando sesión:", err);

    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

  };

  /*
  ==========================
  CARGAR USUARIO AUTENTICADO
  ==========================
  */

  const fetchUser = async () => {

    if (!token) return;

    try {

      const res = await api.get("/user");

      setUser(res.data);

      localStorage.setItem("user", JSON.stringify(res.data));

    } catch (error) {

      console.error("Error obteniendo usuario:", error);

    }

  };

  /*
  ==========================
  EFECTO CUANDO HAY TOKEN
  ==========================
  */

  useEffect(() => {

    if (token) {

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      fetchUser();

    }

  }, [token]);

  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        fetchUser // 🔥 esto permite refrescar datos del usuario
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};