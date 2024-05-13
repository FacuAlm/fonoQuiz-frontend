import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [loading, setLoading] = useState(true);
  const [hola, setHola] = useState("hola");
  const [diagnósticos, setDiagnósticos] = useState([]);
  const [diagnóstico, setDiagnóstico] = useState({});
  const [moves, setMoves] = useState(0);
  const [cargando, setCargando] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patients`,
          config
        );

        setPacientes(data);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, [auth]);

  const submitPaciente = async (paciente) => {
    if (paciente.id) {
      await editarPaciente(paciente);
    } else {
      await nuevoPaciente(paciente);
    }
  };

  const editarPaciente = async (paciente) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/patients/${paciente.id}`,
        paciente,
        config
      );

      console.log(data);

      const pacientesActualizados = pacientes.map((paciente) =>
        paciente._id === data._id ? data : paciente
      );

      setPacientes(pacientesActualizados);
      Swal.fire({
        position: "top-end",
        toast: true,
        icon: "success",
        title: "Paciente editado correctamente. Redireccionando...",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const nuevoPaciente = async (paciente) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/patients`,

        paciente,
        config
      );
      console.log(data);

      await setPacientes((pacientes) => [...pacientes, data]);

      Swal.fire({
        position: "top-end",
        toast: true,
        icon: "success",
        title: "Paciente creado correctamente. Redireccionando...",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPaciente = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este paciente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/patients/${id}`,
            config
          );

          const pacientesActualizados = pacientes.filter(
            (paciente) => paciente._id !== id
          );

          setPacientes(pacientesActualizados);

          Swal.fire("Eliminado", "El paciente ha sido eliminado", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoDiagnostico = async (pacienteId, diagnostico) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/patients/${pacienteId}/diagnosticos`,

        diagnostico,
        config
      );

      setPaciente((paciente) => ({
        ...paciente,
        diagnosticos: [...paciente.diagnosticos, data],
      }));

      Swal.fire({
        position: "top-end",
        toast: true,
        icon: "success",
        title: "Diagnóstico creado correctamente",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDiagnosticos = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/patients/${id}/diagnosticos`,
        config
      );

      setDiagnósticos(data);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerPaciente = async (id) => {
    setCargando(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/patients/${id}`,
        config
      );

      setPaciente(data);
      // setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesionPacientes = () => {
    localStorage.removeItem("token");
    setPacientes([]);
    setPaciente({});
    setDiagnósticos([]);
    setDiagnóstico({});
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        setPacientes,
        paciente,
        setPaciente,
        loading,
        setLoading,
        submitPaciente,
        hola,
        setHola,
        obtenerPaciente,
        nuevoDiagnostico,
        obtenerDiagnosticos,
        diagnósticos,
        setDiagnósticos,
        diagnóstico,
        setDiagnóstico,
        moves,
        setMoves,
        cerrarSesionPacientes,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };
export default PacientesContext;
