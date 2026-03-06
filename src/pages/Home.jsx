import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Home.css";
import mancuerna from "../assets/mancuerna.png";
import logo from "../assets/TB.png";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleProtectedNavigation = (path) => {
    if (!user) {
      navigate("/register");
      return;
    }
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="home-container">

      <header className="home-header">
        <img src={logo} alt="BT" className="logo-bt" />

        <div className="nav-buttons">
          <button onClick={() => handleProtectedNavigation("/productos")}>
            TIENDA
          </button>

          <button onClick={() => handleProtectedNavigation("/recomendaciones")}>
            RECOMENDACIONES
          </button>

          <button onClick={() => navigate("/nosotros")}>
            NOSOTROS
          </button>

          <button onClick={() => handleProtectedNavigation("/planes")}>
            NUESTROS PLANES
          </button>

          {!user ? (
            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              ¡REGÍSTRATE AHORA!
            </button>
          ) : (
            <button
              className="register-btn"
              onClick={handleLogout}
            >
              CERRAR SESIÓN
            </button>
          )}
        </div>

        <img src={logo} alt="BT" className="logo-bt" />
      </header>

      <main className="home-main">
        <div className="text-section">
          <h1>
            ¡TE ACOMPAÑAMOS EN <br />
            CADA PASO HACIA TU <br />
            MEJOR VERSIÓN!
          </h1>

          <p>
            ALCANZA TUS OBJETIVOS Y MEJORA TUS HÁBITOS <br />
            CON BIENESTAR TOTAL.
          </p>
        </div>

        <div className="image-section">
          <img src={mancuerna} alt="Mancuerna" />
        </div>
      </main>

      <footer className="home-footer">
        © 2025 BIENESTAR TOTAL.
      </footer>

    </div>
  );
};

export default Home;
