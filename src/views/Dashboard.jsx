import React from "react";
import { Link } from "react-router-dom";
import usePacientes from "../hooks/usePacientes";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import formatDate from "../helpers/formatDate";

export default function Dashboard() {
  const { pacientes, paciente } = usePacientes();
  console.log(paciente);
  return (
    <>
      <div className="flex md:flex-row flex-col justify-between items-center mx-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Mis Pacientes</h1>
          <p className="text-gray-600 font-light">
            Aquí puedes ver el listado de tus pacientes y sus avances en los
            juegos.
          </p>
        </div>

        <Link
          to="/pacientes/crear"
          className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md mt-4"
        >
          Agregar paciente
        </Link>
      </div>

      <div className="w-full mx-auto overflow-y-auto h-[80vh] pb-20">
        <ul
          role="list"
          className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg "
        >
          {pacientes.map((paciente) => (
            <li
              key={paciente._id}
              className="flex justify-between gap-x-6 px-5 py-10"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <Link
                    to={`/pacientes/${paciente._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-xl font-bold"
                  >
                    {paciente.nombre} {paciente.apellido}
                  </Link>

                  <p className="text-sm text-gray-400">
                    Edad{" "}
                    <span className="text-gray-600 font-bold">
                      {paciente.edad} años
                    </span>
                  </p>

                  <p className="text-sm text-gray-400">
                    fecha de ingreso: {""}
                    <span className="text-gray-600 font-bold">
                      {formatDate(paciente.fechaIngreso)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        <Link
                          to={`/pacientes/${paciente._id}`}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        >
                          Ver Paciente
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          to={`/pacientes/${paciente._id}`}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        >
                          Editar Paciente
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-red-500"
                          onClick={() => {}}
                        >
                          Eliminar Paciente
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
