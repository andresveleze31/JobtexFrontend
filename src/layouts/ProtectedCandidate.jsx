import React from "react";
import useAuthCandidate from "../hooks/useAuthCandidate";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedCandidate() {
  const { authCandidate, cargando } = useAuthCandidate();

  if (cargando) return "Cargando...";

  return (
    <>
      {authCandidate._id ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default ProtectedCandidate;
