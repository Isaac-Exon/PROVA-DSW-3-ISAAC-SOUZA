import { Routes, Route } from "react-router-dom";
import EventoManager from "./pages/Evento";
import Navbar from "./components/Menu";

function Rotas() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventoManager />} />
      </Routes>
    </div>
  );
}

export default Rotas;
