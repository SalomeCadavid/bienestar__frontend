import "./recomendaciones.css";
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
            Tu cuerpo está en equilibrio, ¡y eso es un logro que vale la pena mantener! Con tu Plan de Mantenimiento, enfócate en sostener tus hábitos actuales: mantén una alimentación variada y balanceada, prioriza proteínas magras, frutas, verduras y carbohidratos de calidad. Combínalo con al menos 150 minutos de actividad física moderada a la semana, ya sea caminata, natación o ejercicio funcional. Recuerda hidratarte bien y descansar entre 7 y 8 horas diarias, porque el descanso es tan importante como el ejercicio. ¡Pequeñas constancias construyen grandes resultados!
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