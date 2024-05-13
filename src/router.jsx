import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./views/Dashboard";
import Juegos from "./views/Juegos";
import CrearPaciente from "./views/pacientes/CrearPaciente";
import DetallesPaciente from "./views/pacientes/DetallesPaciente";
import ConcienciaSilabica from "./components/ConcienciaSilabica";
import ConcienciaFonologica from "./components/ConcienciaFonologica";
import { Board } from "./components/Board";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} index />

          <Route path="/pacientes/crear" element={<CrearPaciente />} />
          <Route path="/pacientes/:id" element={<DetallesPaciente />} />
          <Route path="/pacientes/:id/editar" element={<CrearPaciente />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route
            path="/juegos/conciencia-silabica"
            element={<ConcienciaSilabica />}
          />
          <Route
            path="/juegos/conciencia-fonologica"
            element={<ConcienciaFonologica />}
          />
          <Route path="/juegos/memoria" element={<Board />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
