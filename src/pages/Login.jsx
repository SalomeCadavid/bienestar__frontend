import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/TB.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
  setError("");
  setLoading(true);

  try {
    await login(email, password);

    // Redirigir al HOME
    navigate("/", { replace: true });

  } catch (err) {
    setError("Correo o contraseña incorrectos");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">

      <header>
        <div className="login-header">
          <img src={logo} alt="BT" className="logo-bt" />
          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            BIENESTAR TOTAL
          </button>
          <img src={logo} alt="BT" className="logo-bt" />
        </div>
      </header>

      <div className="back-button">
        <button onClick={() => navigate("/register")}>
          Volver al registro
        </button>
      </div>

      <div className="login-card">
        <h2>INICIA SESIÓN</h2>

        <input
          type="email"
          placeholder="CORREO ELECTRÓNICO"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="CONTRASEÑA"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <div className="login-footer">
          <span className="forgot">¿Olvidaste tu contraseña?</span>

          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Cargando..." : "SIGUIENTE"}
          </button>
        </div>
      </div>

      <footer className="footer">
        © 2025 BIENESTAR TOTAL
      </footer>

    </div>
  );
}

export default Login;