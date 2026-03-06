import "./Recomendaciones.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/TB.png";
import pesas from "../assets/TB.png"; // usa tu imagen

function Recomendaciones() {
  const navigate = useNavigate();

  return (
    <div className="reco-container">

      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="BT" className="logo-left" />

        <button 
          className="home-button"
          onClick={() => navigate("/")}
        >
          BIENESTAR TOTAL
        </button>

        <img src={logo} alt="BT" className="logo-right" />
      </header>

      {/* CONTENIDO */}
      <div className="content-wrapper">

        {/* IMAGEN */}
        <div className="card-box">
          <img src={pesas} alt="Pesas" className="gym-image" />
        </div>

        {/* TEXTO */}
        <div className="card-box text-box">

          <h2 className="section-title">BIENESTAR TOTAL</h2>

          <h3 className="subtitle">RECOMENDACIONES</h3>

          <p className="reco-text">
            Tu punto de partida hacia una vida más activa.
            Sabemos que dar el primer paso no siempre es fácil,
            pero en Bienestar Total queremos acompañarte en cada movimiento.
            Aquí encontrarás recomendaciones pensadas para ti,
            que estás comenzando tu camino hacia una vida más saludable.
          </p>

          <p className="reco-text">
            En esta sección mensualmente te compartiremos recomendaciones,
            para hacer de tu experiencia, la mejor de todas.
          </p>

        </div>

      </div>

      <footer className="footer">
        © 2025 BIENESTAR TOTAL
      </footer>

    </div>
  );
}

export default Recomendaciones;