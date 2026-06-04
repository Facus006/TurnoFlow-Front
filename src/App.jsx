import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminNegocioTurnos from "./pages/AdminNegocioTurnos";
import AdminNegocios from "./pages/AdminNegocios";
import Negocios from "./pages/Negocios";
import NegocioDetalle from "./pages/NegocioDetalle";
import ReservarTurno from "./pages/ReservarTurno";
import MisTurnos from "./pages/MisTurnos";
import TurnosNegocio from "./pages/TurnosNegocio";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";
import MiNegocio from "./pages/MiNegocio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/negocios"
        element={
          <ProtectedRoute>
            <Negocios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/negocios/:id"
        element={
          <ProtectedRoute>
            <NegocioDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reservar/:servicioId"
        element={
          <ProtectedRoute>
            <ReservarTurno />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mis-turnos"
        element={
          <ProtectedRoute>
            <MisTurnos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mis-turnos-negocio"
        element={
          <ProtectedRoute>
            <TurnosNegocio />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/negocios"
        element={
          <ProtectedRoute>
            <AdminNegocios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/negocio/:id/turnos"
        element={
          <ProtectedRoute>
            <AdminNegocioTurnos />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />

      <Route path="/perfil" element={
        <ProtectedRoute><Perfil /></ProtectedRoute>
      } />

      <Route path="/mi-negocio" element={
        <ProtectedRoute><MiNegocio /></ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;