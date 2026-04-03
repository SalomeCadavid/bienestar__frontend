import { useNavigate } from "react-router-dom";
import logo from "../assets/TB.png";
import "./Planes.css";
import "./RutinaMantenimiento.css";

function RutinaPerdidaGrasa() {

  const navigate = useNavigate();

  const rutina = [
    {
      dia: "Lunes (Circuito)",
      ejercicios: ["Sentadilla (4x15)", "Flexiones (4x15)", "Escaladores (4x30s)", "Zancadas (4x12)", "Remo Polea (4x15)", "Jumping Jacks (4x45s)"]
    },
    {
      dia: "Martes (Fuerza Sup)",
      ejercicios: ["Press Pecho Máq. (3x15)", "Jalón Pecho (3x15)", "Press Hombro (3x15)", "Remo Sentado (3x15)", "Extensión Tríceps (3x15)", "Elíptica (15 min)"]
    },
    {
      dia: "Miércoles (HIIT)",
      ejercicios: ["Bici (1 min fuerte)", "Bici (1 min suave)", "Sentadilla Salto (3x12)", "Burpees (3x10)", "Plancha (3x45s)", "Repetir Ciclo x4"]
    },
    {
      dia: "Jueves (Fuerza Inf)",
      ejercicios: ["Prensa Piernas (3x20)", "Curl Pierna (3x15)", "Extensiones (3x15)", "Peso Muerto Rum. (3x15)", "Abductores (3x20)", "Caminata Inclinada (15m)"]
    },
    {
      dia: "Viernes (Metabólico)",
      ejercicios: ["Kettlebell Swing (3x20)", "Box Step Ups (3x15)", "Flexiones Inclin. (3x15)", "Pull-apart Bandas (3x20)", "Crunch Abdom. (3x20)", "Bici Estática (15 min)"]
    },
    {
      dia: "Sábado (LISS)",
      ejercicios: ["Caminata (20 min)", "Subir Escaleras (5 min)", "Sentadilla Isom. (3x30s)", "Plancha (3x45s)", "Supermans (3x15)", "Caminata (20 min)"]
    },
  ];

  return (
    <div className="planes-container">

      {/* Header */}
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <button className="btn-header" onClick={() => navigate("/")}>
          BIENESTAR TOTAL
        </button>
        <img src={logo} alt="logo" className="logo" />
      </div>

      {/* Badge título */}
      <div className="rutina-badge">
        Plan Perdida de Grasa
      </div>

      {/* Tabla */}
      <div className="rutina-tabla-wrapper">
        <table className="rutina-tabla">
          <thead>
            <tr>
              <th>Día</th>
              <th>Ejercicio 1</th>
              <th>Ejercicio 2</th>
              <th>Ejercicio 3</th>
              <th>Ejercicio 4</th>
              <th>Ejercicio 5</th>
              <th>Ejercicio 6</th>
            </tr>
          </thead>
          <tbody>
            {rutina.map((fila, i) => (
              <tr key={i}>
                <td><b>{fila.dia}</b></td>
                {fila.ejercicios.map((ej, j) => (
                  <td key={j}>{ej}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer style={{ marginTop: "auto", paddingBottom: "20px" }}>
        © 2025 BIENESTAR TOTAL.
      </footer>

    </div>
  );
}

export default RutinaPerdidaGrasa;