import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import usePacientes from "../../hooks/usePacientes";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function CrearPaciente() {
  const { paciente, submitPaciente } = usePacientes();

  const params = useParams();

  const navigate = useNavigate();
 
 
  const [id, setId] = useState(null);
   const [fechaIngreso, setFechaIngreso] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [patologias, setPatologias] = useState("");

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  };

  useEffect(() => {
    if (params.id) {
      setId(paciente._id);
      setFechaIngreso(paciente.fechaIngreso?.split("T")[0]);
      setNombre(paciente.nombre);
      setApellido(paciente.apellido);

      setEdad(
        paciente.edad || calcularEdad(paciente.fechaNacimiento?.split("T")[0])
      );
      setFechaNacimiento(paciente.fechaNacimiento?.split("T")[0]);
      setPatologias(paciente.patologias);
    } else {
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, apellido, edad, fechaNacimiento, patologias].includes("")) {
      Swal.fire({
        toast: true,
        title: "Error",
        text: "Todos los campos son obligatorios, incluyendo la fecha de nacimiento o la edad",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        position: "top-right",
        showConfirmButton: false,
      });

      return;
    }
    try {
      await submitPaciente({
        id,
        fechaIngreso,
        nombre,
        apellido,
        edad,
        fechaNacimiento,
        patologias,
      });

      // Restablece los valores del formulario
      setId(null);
      setFechaIngreso("");
      setNombre("");
      setApellido("");
      setEdad("");
      setFechaNacimiento("");
      setPatologias("");


      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      // Manejo de errores, si es necesario
      console.error("Error al enviar el formulario:", error);
      // Puedes agregar lógica adicional de manejo de errores aquí
    }
  };
  return (
    <div className=" max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-700">Nuevo Paciente</h1>
      <p className="text-gray-600 font-light">
        Llena el formulario para agregar un nuevo paciente.
      </p>

      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-5 space-y-3">
          <label htmlFor="fechaIngreso" className="text-sm uppercase font-bold">
            Fecha de Ingreso
          </label>
          <input
            id="fechaIngreso"
            className="w-full p-3  border border-gray-200"
            type="date"
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
          />
        </div>
        <div className="mb-5 space-y-3">
          <label
            htmlFor="nombrePaciente"
            className="text-sm uppercase font-bold"
          >
            Nombre del Paciente
          </label>
          <input
            id="nombrePaciente"
            className="w-full p-3  border border-gray-200"
            type="text"
            placeholder="Nombre del Paciente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5 space-y-3">
          <label
            htmlFor="apellidoPaciente"
            className="text-sm uppercase font-bold"
          >
            Apellido del Paciente
          </label>
          <input
            id="apellidoPaciente"
            className="w-full p-3  border border-gray-200"
            type="text"
            placeholder="Apellido del Paciente"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="edad" className="text-sm uppercase font-bold">
            Edad del Paciente
          </label>
          <input
            type="text"
            id="edad"
            className="w-full p-3  border border-gray-200"
            placeholder="Edad del Paciente"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <div className="mb-5 space-y-3">
          <label
            htmlFor="fechaNacimiento"
            className="text-sm uppercase font-bold"
          >
            Fecha de Nacimiento
          </label>
          <input
            id="fechaNacimiento"
            className="w-full p-3  border border-gray-200"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => {
              setFechaNacimiento(e.target.value);
              setEdad(calcularEdad(e.target.value));
            }}
          />
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="patologias" className="text-sm uppercase font-bold">
            Patologías
          </label>
          <input
            id="patologias"
            className="w-full p-3  border border-gray-200"
            type="text"
            placeholder="Patologías"
            value={patologias}
            onChange={(e) => setPatologias(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Cargar Paciente"
          className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full"
        />
      </form>
    </div>
  );
}
