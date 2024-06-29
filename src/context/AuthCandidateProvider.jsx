import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthCandidateContext = createContext();

const AuthCandidateProvider = ({ children }) => {
  const [authCandidate, setAuthCandidate] = useState({});
  const [cargando, setCargando] = useState(true);
  const [tokenC, setTokenC] = useState();

  const navigate = useNavigate();

  //Cuando el componente este cargado
  useEffect(() => {
    async function autenticarCandidate() {
      const tokenCandidate = localStorage.getItem("tokenCandidate");

      if (!tokenCandidate) {
        setCargando(false);
        return;
      }

      setTokenC(tokenCandidate);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCandidate}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/candidates/profile`,
          config
        );
        setAuthCandidate(data);
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    }

    autenticarCandidate();
  }, []);

  return (
    <AuthCandidateContext.Provider
      value={{
        authCandidate,
        setAuthCandidate,
        cargando,
        tokenC
      }}
    >
      {children}
    </AuthCandidateContext.Provider>
  );

};

export { AuthCandidateProvider };

export default AuthCandidateContext;
