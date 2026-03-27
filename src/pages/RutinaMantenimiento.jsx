import { useNavigate } from "react-router-dom";
import logo from "../assets/TB.png";
import "./Planes.css";
import "./RutinaMantenimiento.css";

function RutinaMantenimiento() {

  const navigate = useNavigate();

  const rutina = [
    {
      dia: "Lunes (Full Body)",
      ejercicios: ["Sentadilla (3x12)", "Press de Banca (3x12)", "Remo Mancuerna (3x12)", "Zancadas (3x12)", "Press Hombro (3x12)", "Plancha (3x1min)"]
    },
    {
      dia: "Martes (Cardio/Core)",
      ejercicios: ["Trote/Bici (10 min)", "Elevación Piernas (3x15)", "Escaladores (3x30s)", "Bird-Dog (3x12)", "Russian Twist (3x20)", "Trote/Bici (10 min)"]
    },
    {
      dia: "Miércoles (Superior)",
      ejercicios: ["Jalón al Pecho (3x12)", "Press Inclinado (3x12)", "Remo al Mentón (3x12)", "Flexiones (3x15)", "Dippings en Banco (3x12)", "Curl Mancuerna (3x12)"]
    },
    {
      dia: "Jueves (Inferior)",
      ejercicios: ["Sentadilla Búlgara (3x10)", "Peso Muerto Rum. (3x12)", "Extensiones (3x15)", "Curl Femoral (3x15)", "Aducción Máquina (3x15)", "Gemelos (3x20)"]
    },
    {
      dia: "Viernes (Híbrido)",
      ejercicios: ["Kettlebell Swing (3x20)", "Burpees (3x10)", "Step Ups (3x12)", "Flexiones Diamante (3x12)", "Remo con Banda (3x15)", "Hollow Rock (3x45s)"]
    },
    {
      dia: "Sábado (Resistencia)",
      ejercicios: ["Caminata Rápida (15m)", "Natación/Elíptica (15m)", "Flexiones (3x12)", "Sentadilla Aire (3x20)", "Plancha Lateral (3x30s)", "Estiramiento Full"]
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
        Plan Mantenimiento
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

export default RutinaMantenimiento;