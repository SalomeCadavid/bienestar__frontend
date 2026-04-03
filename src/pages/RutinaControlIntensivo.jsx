import { useNavigate } from "react-router-dom";
import logo from "../assets/TB.png";
import "./Planes.css";
import "./RutinaMantenimiento.css";

function RutinaControlIntensivo() {

  const navigate = useNavigate();

  const rutina = [
    {
      dia: "Lunes (Fuerza Asist)",
      ejercicios: ["Sentarse/Pararse (3x10)", "Flexiones Pared (3x12)", "Remo con Banda (3x15)", "Press Hombro Sent. (3x12)", "Elevación Talón (3x15)", "Caminata (10 min)"]
    },
    {
      dia: "Martes (Movilidad)",
      ejercicios: ["Marcha en Sitio (3x2min)", "Círculos Brazos (3x15)", "Estiramiento Gato (3x10)", "Elevación Lateral (3x12)", "Rotación Tronco (3x15)", "Caminata (10 min)"]
    },
    {
      dia: "Miércoles (Resist.)",
      ejercicios: ["Caminata Plana (10 min)", "Step Ups bajos (3x10)", "Aperturas con Banda (3x15)", "Puente Glúteo (3x12)", "Press Pecho Sent. (3x12)", "Caminata Plana (10 min)"]
    },
    {
      dia: "Jueves (Core/Postura)",
      ejercicios: ["Deadbug Asistido (3x10)", "Bird-Dog (3x10)", "Plancha en Mesa (3x20s)", "Jalón con Goma (3x15)", "Remo un Brazo (3x12)", "Caminata (15 min)"]
    },
    {
      dia: "Viernes (Funcional)",
      ejercicios: ["Sentadilla Box (3x12)", "Empuje de Muro (3x30s)", "Remo Invertido Alto (3x12)", "Curls con Banda (3x15)", "Patada Glúteo (3x15)", "Elíptica Suave (10 min)"]
    },
    {
      dia: "Sábado (Actividad)",
      ejercicios: ["Paseo Continuo (15 min)", "Círculos Cadera (3x15)", "Elevación Rodilla (3x12)", "Apertura Pecho (3x15)", "Estiramiento Isquios", "Paseo Continuo (15 min)"]
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
        Plan Control Intensivo
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

export default RutinaControlIntensivo;