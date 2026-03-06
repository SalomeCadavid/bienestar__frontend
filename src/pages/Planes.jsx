import { useNavigate } from "react-router-dom";
import "./Planes.css";
import logo from "../assets/TB.png";


function Planes() {
  const navigate = useNavigate();

  const planes = [
    {
      nombre: "PLAN AUMENTO DE MASA",
      descripcion:
        "Enfocado en desarrollar fuerza y volumen mediante rutinas de pesas estratégicas. ¡Vamos a construir una base sólida y saludable para tu cuerpo!",
      ruta: "/planes/aumento-masa",
    },
    {
      nombre: "PLAN MANTENIMIENTO",
      descripcion:
        "Diseñado para tonificar tu figura y optimizar tu energía diaria. Mantén tu equilibrio con rutinas dinámicas que te harán sentir mejor que nunca.",
      ruta: "/planes/mantenimiento",
    },
    {
      nombre: "PLAN PERDIDA DE GRASA",
      descripcion:
        "Prioriza ejercicios metabólicos y cardiovasculares efectivos para reducir medidas. Transformaremos tu rutina paso a paso hacia tu peso ideal.",
      ruta: "/planes/perdida-grasa",
    },
    {
      nombre: "PLAN CONTROL INTENSIVO",
      descripcion:
        "Un programa integral, progresivo y seguro, diseñado para mejorar tu movilidad y salud cardiovascular. Estamos contigo para lograr un cambio sostenible.",
      ruta: "/planes/control-intensivo",
    },
  ];

  return (
    <div className="planes-container">
      {/* HEADER */}
      <div className="header">
        <img src={logo} alt="logo" className="logo" />

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          BIENESTAR TOTAL
        </button>

        <img src={logo} alt="logo" className="logo" />
      </div>

      {/* BOTÓN CALCULAR IMC */}
      <button
        className="btn-imc"
        onClick={() => navigate("/calcular-imc")}
      >
        CALCULAR TU IMC
      </button>

      {/* CARDS */}
      <div className="planes-grid">
        {planes.map((plan, index) => (
          <div key={index} className="plan-card">
            <h3>{plan.nombre}</h3>
            <p>{plan.descripcion}</p>

            <button onClick={() => navigate(plan.ruta)}>
              SIGUIENTE
            </button>
          </div>
        ))}
      </div>

      <footer>© 2026 BIENESTAR TOTAL.</footer>
    </div>
  );
}

export default Planes;