import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/TB.png";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.type === "text" ? "nombre" : e.target.type]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error en registro");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="register-container">

      <header className="register-header">
        <img src={logo} alt="BT" className="logo-bt" />
        <button className="home-btn" onClick={() => navigate("/")}>
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="BT" className="logo-bt" />
      </header>

      <div className="register-card">
        <h2>REGÍSTRATE</h2>

        <input
          type="email"
          placeholder="CORREO ELECTRÓNICO"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="CONTRASEÑA"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="NOMBRE DE USUARIO"
          onChange={handleChange}
        />

        <button className="btn-primary" onClick={handleSubmit}>
          SIGUIENTE
        </button>
      </div>

      <div className="login-section">
        <p>¿YA TE HAS REGISTRADO?</p>
        <button
          className="btn-secondary"
          onClick={() => navigate("/login")}
        >
          INICIA SESIÓN
        </button>
      </div>

      <footer className="footer">
        © 2025 BIENESTAR TOTAL
      </footer>

    </div>
  );
}

export default Register;
