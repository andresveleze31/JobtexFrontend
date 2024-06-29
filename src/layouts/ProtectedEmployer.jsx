import React from "react";
import useAuthEmployer from "../hooks/useAuthEmployer";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedEmployer() {
  const { authEmployer, cargando } = useAuthEmployer();

  if (cargando) return "Cargando...";

  return <>{authEmployer._id ? <Outlet /> : <Navigate to="/" />}</>;
}

export default ProtectedEmployer;
