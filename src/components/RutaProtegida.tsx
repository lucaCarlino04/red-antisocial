import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida() {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/iniciar" replace />;

  return <Outlet />;
}
