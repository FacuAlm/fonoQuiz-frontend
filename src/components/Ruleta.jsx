import React, { useState } from "react";
import "./styles.css";
import ruletaImage from "/images/ruleta.png"; // Ajusta la ruta a tu imagen

const Ruleta = ({ onSpinEnd }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [degree, setDegree] = useState(0);
  const [segmentWinner, setSegmentWinner] = useState(null); // Estado para el segmento ganador

  const segments = ["A", "E", "I", "O", "U"];
  const segmentAngle = 360 / segments.length;

  const startSpin = () => {
    if (!isSpinning) {
      const randomDegree = Math.floor(3600 + Math.random() * 360); // Girar al menos 10 veces
      setDegree(randomDegree);
      setIsSpinning(true);
      setSegmentWinner(null); // Resetea el segmento ganador al iniciar un nuevo giro

      setTimeout(() => {
        setIsSpinning(false);
        const normalizedDegree =
          ((randomDegree % 360) + segmentAngle / 2) % 360; // Normalizar y ajustar para el centro del segmento
        const segmentIndex = Math.floor(normalizedDegree / segmentAngle);
        const winningSegment = segments[segmentIndex];
        setSegmentWinner(winningSegment); // Actualiza el estado del segmento ganador
        onSpinEnd(winningSegment);
        console.log("El segmento ganador es:", winningSegment);
      }, 5000); // Tiempo que dura la animación
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="relative w-3/4">
        <div
          className={`ruleta ${isSpinning ? "spin" : ""}`}
          style={{ transform: `rotate(${degree}deg)` }}
        >
          <img src={ruletaImage} alt="Ruleta" className="" />
        </div>
        {/* si está girando o no hay un segmento ganador no se muestra el botón */}
        {!isSpinning && !segmentWinner && (
          <button
            onClick={startSpin}
            className="mt-4 p-2 bg-green-500 text-white rounded w-full"
          >
            Girar
          </button>
        )}
      </div>
    </div>
  );
};

export default Ruleta;
