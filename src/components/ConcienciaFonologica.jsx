import React, { useState, useEffect } from "react";
import "./styles.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Ruleta from "./Ruleta";

const vowels = ["A", "E", "I", "O", "U"];
const consonants = ["B", "C", "D", "F", "G", "J", "L", "P", "R", "S", "T"];

const images = [
  { id: 1, start: "BA", name: "barco" },
  { id: 2, start: "BE", name: "bebe" },
  { id: 3, start: "BI", name: "bicicleta" },
  { id: 4, start: "BO", name: "bota" },
  { id: 5, start: "BU", name: "bufanda" },
  { id: 6, start: "CA", name: "caballo" },
  { id: 7, start: "CE", name: "cereza" },
  { id: 8, start: "CI", name: "ciguena" },
  { id: 9, start: "CO", name: "conejo" },
  { id: 10, start: "CU", name: "cuchara" },
  { id: 11, start: "DA", name: "dado" },
  { id: 12, start: "DE", name: "delfin" },
  { id: 13, start: "DI", name: "dinosaurio" },
  { id: 14, start: "DO", name: "doctor" },
  { id: 15, start: "DU", name: "durazno" },
  { id: 16, start: "FA", name: "fantasma" },
  { id: 17, start: "FE", name: "feliz" },
  { id: 18, start: "FI", name: "fideo" },
  { id: 19, start: "FO", name: "foca" },
  { id: 20, start: "FU", name: "fuego" },
  { id: 21, start: "GA", name: "gato" },
  { id: 22, start: "GE", name: "gelatina" },
  { id: 23, start: "GI", name: "girasol" },
  { id: 24, start: "GO", name: "gorra" },
  { id: 25, start: "GU", name: "gusano" },
  { id: 26, start: "JA", name: "jarra" },
  { id: 27, start: "JE", name: "jeringa" },
  { id: 28, start: "JI", name: "jirafa" },
  { id: 29, start: "JO", name: "joya" },
  { id: 30, start: "JU", name: "juguete" },
  { id: 31, start: "LA", name: "lapiz" },
  { id: 32, start: "LE", name: "leon" },
  { id: 33, start: "LI", name: "limon" },
  { id: 34, start: "LO", name: "lobo" },
  { id: 35, start: "LU", name: "luna" },
  { id: 36, start: "PA", name: "pato" },
  { id: 37, start: "PE", name: "perro" },
  { id: 38, start: "PI", name: "pina" },
  { id: 39, start: "PO", name: "pomelo" },
  { id: 40, start: "PU", name: "pulpo" },
  { id: 41, start: "RA", name: "raton" },
  { id: 42, start: "RE", name: "reloj" },
  { id: 43, start: "RI", name: "rio" },
  { id: 44, start: "RO", name: "rosa" },
  { id: 45, start: "RU", name: "rueda" },
  { id: 46, start: "SA", name: "sandia" },
  { id: 47, start: "SE", name: "serpiente" },
  { id: 48, start: "SI", name: "sillon" },
  { id: 49, start: "SO", name: "sol" },
  { id: 50, start: "SU", name: "suricata" },
  { id: 51, start: "TA", name: "tarta" },
  { id: 52, start: "TE", name: "te" },
  { id: 53, start: "TI", name: "tijera" },
  { id: 54, start: "TO", name: "tortuga" },
  { id: 55, start: "TU", name: "tucan" },
];

// Función para barajar un array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generarImagenes = (consonant, vowel, images) => {
  const matchingImages = images.filter(
    (image) => image.start === consonant + vowel
  );
  if (matchingImages.length > 0) {
    const correctImage =
      matchingImages[Math.floor(Math.random() * matchingImages.length)];
    const otherImages = shuffleArray(
      images.filter((image) => image.start !== consonant + vowel)
    ).slice(0, 4);
    const allImages = shuffleArray([correctImage, ...otherImages]);
    return allImages;
  } else {
    return shuffleArray(images.slice(0, 5));
  }
};

const ConcienciaFonologica = () => {
  const [selectedConsonant, setSelectedConsonant] = useState("");
  const [selectedVowel, setSelectedVowel] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [randomImages, setRandomImages] = useState([]);

  const handleConsonantClick = (consonant) => {
    setSelectedConsonant(consonant);
    setSelectedVowel("");
    setSelectedImage(null);
    setIsCorrect(false);
  };

  const handleSpinEnd = (vowel) => {
    setSelectedVowel(vowel);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (image.start === selectedConsonant + selectedVowel) {
      setIsCorrect(true);

      Swal.fire({
        title: "¡Correcto!",
        text: "¡Muy bien! Has elegido la imagen correcta.",
        icon: "success",
      });
    } else {
      setIsCorrect(false);
      Swal.fire({
        title: "¡Incorrecto!",
        text: "¡Inténtalo de nuevo!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (selectedConsonant && selectedVowel) {
      setRandomImages(
        generarImagenes(selectedConsonant, selectedVowel, images.slice())
      );
    }
  }, [selectedConsonant, selectedVowel]);

  const resetGame = () => {
    setSelectedConsonant("");
    setSelectedVowel("");
    setSelectedImage(null);
    setIsCorrect(false);
    setRandomImages([]);
  };

  return (
    <>
      <img
        src="/images/fondoJuego1.jpg"
        alt="fondo"
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="bg-black Z-10 bg-opacity-50 w-full h-full absolute top-0 left-0">
        <div className="min-h-screen flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10">
          <Link
            to="/juegos"
            className="absolute top-0 left-0 m-4 z-10 flex text-white bg-black bg-opacity-50 p-2 rounded-md items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <span className="ml-2">Volver</span>
          </Link>
          <h1 className="font-bold text-4xl my-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:text-5xl">
            Conciencia Fonológica
          </h1>
          <div className="flex flex-col md:flex-row space-x-4 mb-4">
            <div className="flex  items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Elige una consonante:
                </h2>
                <div className="grid grid-cols-4 gap-4 md:mx-0 mx-5">
                  {Array.from(consonants).map((consonant, index) => (
                    <button
                      key={index}
                      onClick={() => handleConsonantClick(consonant)}
                      className={`px-10 py-5 bg-gray-300 rounded-3xl shadow-md hover:bg-orange-400 transition duration-300 ease-in-out ${
                        selectedConsonant === consonant && "bg-yellow-500"
                      }`}
                    >
                      {consonant}
                    </button>
                  ))}
                </div>
                {selectedConsonant && !selectedVowel && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2 mt-4 text-white">
                      Elige una vocal:
                    </h2>
                    <Ruleta onSpinEnd={handleSpinEnd} />
                  </div>
                )}
              </div>
            </div>
            {selectedVowel && (
              <div className="flex flex-col items-center text-white mt-4">
                <h2 className="text-xl font-semibold mb-2">Vocal elegida:</h2>
                <span className="text-2xl font-bold">{selectedVowel}</span>
              </div>
            )}
          </div>
          {selectedConsonant && selectedVowel && (
            <p className="text-lg font-semibold mb-4 text-white text-center">
              Debes seleccionar la imagen que comience con la sílaba:{" "}
              <span className="text-2xl text-yellow-300">
                {selectedConsonant + selectedVowel}
              </span>
            </p>
          )}
          <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mt-10">
            {randomImages.map((image) => (
              <button
                key={image.id}
                onClick={() => handleImageClick(image)}
                className={`flex flex-col items-center p-2 border border-gray-300 bg-white  rounded-md shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out ${
                  selectedImage && selectedImage.id === image.id && isCorrect
                    ? "bg-green-500"
                    : selectedImage &&
                      selectedImage.id === image.id &&
                      !isCorrect
                    ? "bg-red-500"
                    : ""
                }`}
              >
                <img
                  src={`/images/${image.name}.png`}
                  alt={image.name}
                  className="w-24 h-24 mb-2"
                />
              </button>
            ))}
          </div>
          {selectedImage && (
            <div className="text-lg font-semibold text-white">
              {isCorrect
                ? `¡Muy bien! es ${selectedImage.name}`
                : "¡Inténtalo de nuevo!"}
            </div>
          )}
          {selectedConsonant && selectedVowel && selectedImage && (
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
            >
              Reiniciar Juego
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ConcienciaFonologica;
