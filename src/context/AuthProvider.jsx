import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  // Move useNavigate outside the useEffect

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/perfil`,
          config
        );

        setAuth(data);
        const navigate = useNavigate(); 
        navigate("/dashboard"); // Use navigate here
       
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []); // Add navigate to the dependencies array to prevent any lint warnings

  const cerrarSesionAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        setCargando,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
