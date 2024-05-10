import React, { useState } from "react";
import Swal from "sweetalert2";
const wordsLevel1 = [
  { id: "chaleco", word: "chaleco", syllables: ["Cha", "le", "co"] },
  { id: "vestido", word: "vestido", syllables: ["Ves", "ti", "do"] },
  { id: "camisa", word: "camisa", syllables: ["Ca", "mi", "sa"] },
  { id: "remera", word: "remera", syllables: ["Re", "me", "ra"] },
  { id: "bufanda", word: "bufanda", syllables: ["Bu", "fan", "da"] },
  // Agrega más palabras de 3 sílabas según el nivel 1
];

const wordsLevel2 = [
  { id: "cocodrilo", word: "cocodrilo", syllables: ["Co", "co", "dri", "lo"] },
  { id: "suricata", word: "suricata", syllables: ["Su", "ri", "ca", "ta"] },
  { id: "elefante", word: "elefante", syllables: ["E", "le", "fan", "te"] },
  { id: "perezoso", word: "perezoso", syllables: ["Pe", "re", "zo", "so"] },
  { id: "mariposa", word: "mariposa", syllables: ["Ma", "ri", "po", "sa"] },
  // Agrega más palabras de 4 sílabas según el nivel 2
];

const wordsLevel3 = [
  {
    id: "destornillador",
    word: "destornillador",
    syllables: ["Des", "tor", "ni", "lla", "dor"],
  },
  {
    id: "helicoptero",
    word: "helicóptero",
    syllables: ["He", "li", "cóp", "te", "ro"],
  },
  {
    id: "hipopotamo",
    word: "hipopótamo",
    syllables: ["Hi", "po", "pó", "ta", "mo"],
  },
  {
    id: "aspiradora",
    word: "aspiradora",
    syllables: ["As", "pi", "ra", "do", "ra"],
  },
  {
    id: "calculadora",
    word: "calculadora",
    syllables: ["Cal", "cu", "la", "do", "ra"],
  },
];

const ConcienciaSilabica = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [clickedCount, setClickedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [showSyllables, setShowSyllables] = useState(false);
  const [mistakeIndex, setMistakeIndex] = useState(-1);
  const [circles, setCircles] = useState([]);
  const [level, setLevel] = useState(1); // Nivel por defecto

  const words =
    level === 1 ? wordsLevel1 : level === 2 ? wordsLevel2 : wordsLevel3;

  const handleNextSyllable = () => {
    if (ready) {
      if (clickedCount === words[currentWordIndex].syllables.length) {
        Swal.fire({
          title:
            "¡Incorrecto! La cantidad de círculos no coincide con las sílabas.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
        setShowSyllables(false);
        setTimeout(() => {
          setCurrentWordIndex((prev) =>
            prev === words.length - 1 ? 0 : prev + 1
          );
          setClickedCount(0);
          setReady(false);
          setMistakeIndex(-1);
        }, 500);
      } else {
        Swal.fire({
          title:
            "¡Incorrecto! La cantidad de círculos no coincide con las sílabas.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });

        setMistakeIndex(clickedCount);
      }
    } else {
      setClickedCount(clickedCount + 1);
    }
  };

  const handleReady = () => {
    setReady(true);
    setShowSyllables(true);

    if (clickedCount === words[currentWordIndex].syllables.length) {
      Swal.fire({
        title: "¡Correcto la palabra es " + words[currentWordIndex].word + "!",
        icon: "success",
        confirmButtonText: "Siguiente",
      });
      setClickedCount(0);
      setReady(false);
      setMistakeIndex(-1);

      setShowSyllables(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) =>
          prev === words.length - 1 ? 0 : prev + 1
        );
        setClickedCount(0);
        setReady(false);
        setMistakeIndex(-1);
      }, 500);
    } else {
      Swal.fire({
        title:
          "¡Incorrecto! La cantidad de círculos no coincide con las sílabas.",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
      setMistakeIndex(clickedCount);
    }
  };

  const handleRestartFromMistake = () => {
    setCurrentWordIndex((prev) => (prev === words.length - 1 ? 0 : prev));
    setClickedCount(mistakeIndex);
    setReady(false);
    setShowSyllables(false);
    setMistakeIndex(-1);
    setClickedCount(0);
  };

  const handleCircleClick = () => {
    setCircles((prev) => [...prev, clickedCount]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Juego de conciencia silábica
      </h1>
      <div className="flex justify-center items-center mb-3">
        <button
          className={`bg-gray-300 text-gray-800 font-semibold rounded-md px-4 py-2 mr-2 ${
            level === 1 && "bg-yellow-500"
          }`}
          onClick={() => setLevel(1)}
        >
          Fácil
        </button>
        <button
          className={`bg-gray-300 text-gray-800 font-semibold rounded-md px-4 py-2 mr-2 ${
            level === 2 && "bg-yellow-500"
          }`}
          onClick={() => setLevel(2)}
        >
          Intermedio
        </button>
        <button
          className={`bg-gray-300 text-gray-800 font-semibold rounded-md px-4 py-2 ${
            level === 3 && "bg-yellow-500"
          }`}
          onClick={() => setLevel(3)}
        >
          Difícil
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <img
          src={`/images/${words[currentWordIndex].id}.png`}
          alt={words[currentWordIndex].word}
          className="w-40 h-auto mb-4"
        />
        <div className="flex justify-center">
          {!ready && (
            <button
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mr-4 hover:bg-blue-600 focus:outline-none"
              onClick={handleNextSyllable}
            >
              Mostrar sílaba
            </button>
          )}
          {!ready && clickedCount > 0 && (
            <button
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleReady}
            >
              Listo para apretar
            </button>
          )}
          {mistakeIndex !== -1 && (
            <button
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none ml-4"
              onClick={handleRestartFromMistake}
            >
              Empezar de nuevo
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center">
          {Array.from(Array(clickedCount), (e, i) => (
            <div
              key={i}
              className="m-2"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="relative">
                <img
                  src={`/images/redondo-${words[currentWordIndex].id}.png`}
                  alt=""
                  className="w-20 h-auto visible"
                  onClick={handleCircleClick}
                />
                {showSyllables && (
                  <span className="text-xl font-semibold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {words[currentWordIndex].syllables[i]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcienciaSilabica;
