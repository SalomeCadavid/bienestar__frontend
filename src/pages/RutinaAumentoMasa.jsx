import { useNavigate } from "react-router-dom";
import logo from "../assets/TB.png";
import "./Planes.css";
import "./RutinaMantenimiento.css";

function RutinaAumentoMasa() {

  const navigate = useNavigate();

  const rutina = [
    {
      dia: "Lunes (Torso A)",
      ejercicios: ["Press Banca (4x8)", "Remo con Barra (4x8)", "Press Militar (3x10)", "Jalón al Pecho (3x10)", "Fondos Tríceps (3x12)", "Curl Bíceps (3x12)"]
    },
    {
      dia: "Martes (Pierna A)",
      ejercicios: ["Sentadilla (4x8)", "Prensa 45° (3x10)", "Peso Muerto Rumano (4x10)", "Extensiones Cua. (3x12)", "Curl Femoral (3x12)", "Gemelos (4x15)"]
    },
    {
      dia: "Miércoles (Torso B)",
      ejercicios: ["Dominadas (3xfallo)", "Press Inclinado (3x10)", "Remo c/Mancuerna (3x10)", "Vuelos Laterales (3x15)", "Press Francés (3x12)", "Martillo Bíceps (3x12)"]
    },
    {
      dia: "Jueves (Pierna B)",
      ejercicios: ["Zancadas (3x12)", "Hip Thrust (4x10)", "Goblet Squat (3x12)", "Peso Muerto (3x8)", "Leg Press (pies altos) (3x12)", "Core/Plancha (3x1min*)"]
    },
    {
      dia: "Viernes (Mixto)",
      ejercicios: ["Press Pecho Manc. (3x10)", "Remo Polea Baja (3x10)", "Press Hombro Sentado (3x12)", "Pull-over (3x12)", "Facepulls (3x15)", "Flexiones (3xFallo)"]
    },
    {
      dia: "Sábado (Full Body)",
      ejercicios: ["Sentadilla Copa (3x12)", "Peso Muerto Sumo (3x10)", "Remo Invertido (3x12)", "Press Arnold (3x12)", "Puentes Glúteo (3x20)", "Rueda Abdominal (3x12)"]
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
        Plan de Aumento de Masa
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

export default RutinaAumentoMasa;