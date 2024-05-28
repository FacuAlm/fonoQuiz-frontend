import { Outlet } from "react-router-dom";
import { Board } from "../components/Board";
import ConcienciaSilabica from "../components/ConcienciaSilabica";
import ConcienciaFonologica from "../components/ConcienciaFonologica";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-4 text-white">
        <h1 className="text-xl font-bold text-center">
          FonoQuiz - Fonoaudiología
        </h1>
      </header>
      <div className="flex  h-screen">
        <aside className="md:w-64 w-16 bg-[#f9f6fe] text-white mx-2 shadow-lg">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 overflow-y-auto pb-28 pt-4 ">
          <Outlet />
        </main>
      </div>
    </>
  );
}
