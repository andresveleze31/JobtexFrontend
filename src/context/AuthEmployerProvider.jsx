import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthEmployerContext = createContext();

const AuthEmployerProvider = ({ children }) => {
  const [authEmployer, setAuthEmployer] = useState({});
  const [cargando, setCargando] = useState(true);
  const [tokenE, setTokenE] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    async function autenticarEmployer(){

        const tokenEmployer = localStorage.getItem("tokenEmployer");

        if (!tokenEmployer) {
          setCargando(false);
          return;
        }

        setTokenE(tokenEmployer);

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenEmployer}`,
          },
        };

        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/employers/profile`,
            config
          );
          setAuthEmployer(data);
        } catch (error) {
          console.log(error);
        }

        setCargando(false);


    }
    autenticarEmployer();

  }, [])


  return (
    <AuthEmployerContext.Provider
      value={{
        authEmployer,
        setAuthEmployer,
        cargando,
        tokenE,
      }}
    >
      {children}
    </AuthEmployerContext.Provider>
  );
};

export { AuthEmployerProvider };

export default AuthEmployerContext;