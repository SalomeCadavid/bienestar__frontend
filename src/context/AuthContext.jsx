import { createContext, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null
  );

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.usuario));

    setToken(res.data.token);
    setUser(res.data.usuario);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};