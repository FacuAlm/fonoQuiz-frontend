import React from "react";
import { Link } from "react-router-dom";

export default function Juegos() {
  return (
    <div>
        <div>
          <h1 className="text-2xl font-bold text-gray-700">
            Juegos
          </h1>
          <p className="text-gray-600 font-light">
            Aquí puedes ver los juegos disponibles.
          </p>
        </div>

      <div className="flex gap-10 md:flex-row flex-col mt-10">
        <div className="mt-4">
          <Link to="/juegos/conciencia-fonologica" className=" ">
            <img
              src="/images/fonologica.png"
              alt="Conciencia silábica"
              className="rounded-lg mb-4 w-[200px] h-[200px] shadow-2xl"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Conciencia fonológica
            </h2>
          </Link>
        </div>

        <div className="mt-4">
          <Link to="/juegos/conciencia-silabica" className=" ">
            <img
              src="/images/silabica.png"
              alt="Conciencia silábica"
              className="rounded-lg mb-4 w-[200px] h-[200px] shadow-2xl"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Conciencia silábica
            </h2>
          </Link>
        </div>

        <div className="mt-4">
          <Link to="/juegos/memoria" className="">
            <img
              src="/images/memoria.png"
              alt="Conciencia silábica"
              className="rounded-lg mb-4 w-[200px] h-[200px] shadow-2xl object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Juego de memoria
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
