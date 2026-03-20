import "./nosotros.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/TB.png";
import mancuernas from "../assets/TB.png"; // usa tu imagen

function Nosotros() {
  const navigate = useNavigate();

  return (
    <div className="nosotros-container">
      
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

        {/* CUADRO IMAGEN */}
        <div className="card-box">
          <img src={mancuernas} alt="Mancuernas" className="gym-image" />
        </div>

        {/* CUADRO TEXTO */}
        <div className="card-box text-box">

          <h2 className="section-title">BIENESTAR TOTAL</h2>

          <div className="mision-vision">
            
            <div className="bloque">
              <h3>Misión</h3>
              <p>
                En BIENESTAR TOTAL creemos que el bienestar no se trata solo de verse bien,
                sino de sentirse bien en todos los aspectos de la vida.
                Nuestra misión es acompañar a cada persona en su proceso de transformación,
                brindándole un espacio donde pueda encontrar productos de calidad,
                rutinas personalizadas, planes de nutrición y la motivación necesaria
                para alcanzar sus metas.
              </p>
            </div>

            <div className="bloque">
              <h3>Visión</h3>
              <p>
                Queremos convertirnos en mucho más que una tienda online:
                aspiramos a ser un referente de bienestar integral.
                Visualizamos un futuro en el que nuestras herramientas
                impulsen cambios reales y duraderos en la salud
                y felicidad de nuestra comunidad.
              </p>
            </div>

          </div>
        </div>

      </div>

      <footer className="footer">
        © 2025 BIENESTAR TOTAL
      </footer>

    </div>
  );
}

export default Nosotros;