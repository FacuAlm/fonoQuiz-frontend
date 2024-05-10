import React, { useEffect, useState } from "react";
import { imgs } from "../data/data";
import { Card } from "./Card";
import Swal from "sweetalert2";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  
  const [gameOver, setGameOver] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [level, setLevel] = useState(1); // Nivel por defecto

  const createBoard = () => {
    let cardsToUse = [];
    if (level === 1) {
      //10 cartas
      cardsToUse = imgs.slice(0, 5);
    } else if (level === 2) {
      //14 cartas
      cardsToUse = imgs.slice(0, 7);
    } else {
      //18 cartas
      cardsToUse = imgs.slice(0, 9);
    }

    const duplicatecards = cardsToUse.flatMap((img, i) => {
      const duplicate = {
        ...img,
        id: img.id + cardsToUse.length,
      };
      return [img, duplicate];
    });

    const newCards = shuffleArray(duplicatecards);
    const cards = newCards.map((card) => ({
      ...card,
      flipped: false,
      matched: false,
    }));
    setCards(cards);
  };

  useEffect(() => {
    createBoard();
  }, [level]); // Vuelve a crear el tablero cuando cambia el nivel

  const handleCardClick = (id) => {
    if (isDisabled) return;

    const [currentCard] = cards.filter((card) => card.id === id);

    if (!currentCard.flipped && !currentCard.matched) {
      currentCard.flipped = true;

      const newFlippedCards = [...flippedCards, currentCard];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setIsDisabled(true);
        const [firstCard, secondCard] = newFlippedCards;

        if (firstCard.img === secondCard.img) {
          firstCard.matched = true;
          secondCard.matched = true;
          setIsDisabled(false);
        } else {
          setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            setCards(cards);
            setIsDisabled(false);
          }, 1000);
        }

        setFlippedCards([]);
        setMoves(moves + 1);
      }

      setCards(cards);
    }

    if (cards.every((card) => card.matched)) {
      setGameOver(true);

      setIsDisabled(true);
      handleGameEnd();
    }
  };

  const handleNewGame = () => {
    setCards([]);
    createBoard();
    setMoves(0);
    setGameOver(false);
    setIsDisabled(false);
  };

  const handleGameEnd = async () => {
    // Lógica para mostrar el mensaje de ganador usando Swal
    await Swal.fire({
      title: "¡Ganaste!",
      text: `Movimientos: ${moves}`,
      icon: "success",
    });
    handleNewGame();
  };

  return (
    <>
      {gameOver && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      <div className="relative  flex items-center">
        <div className="mx-auto flex flex-col justify-center items-center">
          <h1 className="font-bold text-4xl my-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:text-5xl">
            Juego de la memoria
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
          <div className={`grid grid-cols-5 gap-4`}>
            {cards.map((card) => (
              <Card
                card={card}
                key={card.id}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>
          <button
            className="bg-black font-semibold mt-10 text-white rounded-md px-5 py-1 hover:bg-yellow-500 hover:text-black transition-all mb-3"
            onClick={handleNewGame}
          >
            Nuevo Juego
          </button>
        </div>
      </div>
    </>
  );
};