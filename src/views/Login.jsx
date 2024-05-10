import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Logo from "/images/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth, cargando } = useAuth();
  //   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios" });

      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          username,
          password,
        }
      );

      setAlerta({});
      localStorage.setItem("token", data.token);

      setAuth(data);

      navigate("/dashboard");
    } catch (error) {
      setAlerta({ msg: error.response?.data?.msg });
    }
  };

  const { msg } = alerta;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[1100px]  h-[750px] rounded-3xl overflow-auto shadow-2xl flex">
        <div className="w-1/2 flex md:flex-row flex-col justify-center  ">
          <div
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-center text-2xl font-bold mt-20 ">
            Iniciar Sesión
          </h1>
          <div className=" md:w-3/4 mx-20 ">
            <form onSubmit={handleSubmit}>
              <div className="mt-10 mb-4 ">
                <label
                  className="text-slate-900 font-semibold text-sm"
                  htmlFor="email"
                >
                  USUARIO
                </label>
                <input
                  placeholder="Ingresa tu Email"
                  className="w-full bg-gray-200 placeholder:px-3 p-3 rounded-xl"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-10 mb-4 ">
                <label
                  className="text-slate-900  font-semibold  text-sm"
                  htmlFor="email"
                >
                  PASSWORD
                </label>
                <input
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-gray-200 placeholder:px-3 p-3 rounded-xl"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className="text-xl text-red-500">{alerta.msg}</p>
              <div className="mt-20 mb-4 flex justify-center ">
                <button className="bg-slate-800 w-1/2 p-3 rounded-xl text-white font-semibold">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
