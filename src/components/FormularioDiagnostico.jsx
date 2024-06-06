import React from "react";
import { useState } from "react";
import usePacientes from "../hooks/usePacientes";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioDiagnostico = ({ closeModal }) => {
  const [fechaDiagnostico, setFechaDiagnostico] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { id } = useParams();
  const { nuevoDiagnostico } = usePacientes();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([fechaDiagnostico, descripcion].includes("")) {
      Swal.fire({
        toast: true,
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        position: "top-right",
        showConfirmButton: false,
      });

      return;
    }

    nuevoDiagnostico(id, { fechaDiagnostico, descripcion });

    setFechaDiagnostico("");
    setDescripcion("");

    closeModal();
  };

  return (
    <div className=" max-w-3xl mx-auto">
      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="mb-5 space-y-3">
          <label
            htmlFor="fechaDiagnostico"
            className="text-sm uppercase font-bold"
          >
            Fecha de la observación
          </label>
          <input
            id="fechaDiagnostico"
            className="w-full p-3  border border-gray-200"
            type="date"
            placeholder="Fecha de la observación"
            value={fechaDiagnostico}
            onChange={(e) => setFechaDiagnostico(e.target.value)}
          />
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="descripcion" className="text-sm uppercase font-bold">
            Observación del paciente
          </label>
          <input
            id="descripcion"
            className="w-full p-3  border border-gray-200"
            type="text"
            placeholder="Descripción del Diagnóstico"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-5 space-y-3 flex justify-center">
          <input
            type="submit"
            value="Agregar Diagnóstico"
            className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-1/2 mx-auto"
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioDiagnostico;
